// src/app/api/generate/route.ts
import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";
import { getSystemPrompt } from "./prompt";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
  maxRetries: 0,       
  timeout: 40000,      // Generous timeout for large application builds
});

function cleanJSONResponse(raw: string): string {
  try {
    let cleaned = raw.replace(/```(?:json)?|```/g, "").trim();
    
    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");
    
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      return cleaned.slice(firstBrace, lastBrace + 1);
    }
    return cleaned;
  } catch (err) {
    console.error("Failed to clean JSON response:", err);
    return "{}";
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = body?.prompt;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Invalid prompt" }, { status: 400 });
    }
    
    const response = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash", // 👈 Paid version: massive token window, highly stable JSON output
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: getSystemPrompt },
        { role: "user", content: prompt },
      ], 
      temperature: 0.2,   
    });

    const choice = response.choices[0];
    
    if (choice?.finish_reason === "length") {
      return NextResponse.json({ 
        error: "The generated application code was too large for the current token limits." 
      }, { status: 422 });
    }

    const rawContent = choice?.message?.content || "{}";
    const cleaned = cleanJSONResponse(rawContent);

    try {
      const parsed = JSON.parse(cleaned);
      return NextResponse.json(parsed);
    } catch (err) {
      console.error("JSON Parse failure. Cleaned input was:", cleaned);
      return NextResponse.json({ error: "Malformed JSON structure returned from AI", raw: cleaned }, { status: 500 });
    }

  } catch (err: any) {
    console.error("API Route global error:", err);
    return NextResponse.json({ 
      error: err?.message || "Failed to execute generation request" 
    }, { status: err?.status || 500 });
  }
}