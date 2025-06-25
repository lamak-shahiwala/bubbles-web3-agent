import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

function cleanJSONResponse(raw: string): string {
  if (raw.startsWith("```")) {
    raw = raw.replace(/```json|```/g, "").trim();
  }
  return raw;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const prompt = body?.prompt;

  if (!prompt || typeof prompt !== "string") {
    return NextResponse.json({ error: "Invalid prompt" }, { status: 400 });
  }

  const systemPrompt = `
You are a Web3 developer.

Respond ONLY with a valid JSON object that has the following **structure**:
{
  "contract.sol": "Solidity code here",
  "frontend.jsx": "React/JSX code here"
}

⚠️ Strict requirements:
- Use ONLY double-quoted property names
- Return no markdown, no comments, no extra text
- The JSON must be parsable using JSON.parse()

Output ONLY raw JSON.`;


  try {
    const response = await openai.chat.completions.create({
      model: "qwen/qwen3-32b:free",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
    });

    const rawContent = response.choices[0].message.content || "{}";
    const cleaned = cleanJSONResponse(rawContent);

    const parsed = JSON.parse(cleaned);
    return NextResponse.json(parsed);

  } catch (err) {
    console.error("Parse error:", err);
    return NextResponse.json({ error: "Failed to parse OpenAI response" }, { status: 500 });
  }
}
