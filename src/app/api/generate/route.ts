import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";
import { getSystemPrompt } from "./prompt";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

function cleanJSONResponse(raw: string): string {
  try {
    raw = raw.replace(/```(?:json)?|```/g, "").trim();
    const firstBrace = raw.indexOf("{");
    const lastBrace = raw.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      return raw.slice(firstBrace, lastBrace + 1);
    }
    return raw;
  } catch (err) {
    console.error("Failed to clean JSON response:", err);
    return "{}";
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const prompt = body?.prompt;

  if (!prompt || typeof prompt !== "string") {
    return NextResponse.json({ error: "Invalid prompt" }, { status: 400 });
  }
  
  const systemPrompt = getSystemPrompt;

  try {
    const response = await openai.chat.completions.create({
      model: "qwen/qwen3-32b:free",
      messages: [
        { role: "system", content: systemPrompt },
        //{ role: "user", content: BASE_PROMPT },
        { role: "user", content: prompt },
      ], 
      temperature: 0,
    });
    console.error(response)
    const rawContent = response.choices[0].message.content || "{}";
    const cleaned = cleanJSONResponse(rawContent);

    try {
  const parsed = JSON.parse(cleaned);
  return NextResponse.json(parsed);
} catch (err) {
  console.error("Failed to parse:", cleaned, ":", err);
  return NextResponse.json({ error: "Parse error", raw: cleaned }, { status: 500 });
}
  } catch (err) {
    
    console.error("Parse error:", err);
    return NextResponse.json({ error: "Failed to parse OpenAI response" }, { status: 500 });
  }
}
