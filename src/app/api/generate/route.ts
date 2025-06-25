import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
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
You are a Web3 expert developer.
When given a natural language description of a Web3 application, you must return valid, functional code in this exact JSON format:

{
  "contract.sol": "// Solidity contract code here",
  "frontend.jsx": "// React component code here"
}

Only include code inside the JSON. No markdown or explanations.`;

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
