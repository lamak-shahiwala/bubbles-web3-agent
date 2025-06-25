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
You are a Web3 full-stack expert developer.

When given a natural language description of a Web3 application, return a STRICTLY VALID JSON object with the following structure:

{
  "contract.sol": "string of complete Solidity contract code",
  "frontend.jsx": "string of React component code (written as an IIFE)",
  "backend.js": "string of Node.js/Express backend code"
}

Rules:
- Return ONLY a valid JSON object — no markdown, comments, explanations, or extra text.
- All strings must be properly escaped:
  - Use \\n for line breaks.
  - Use \\" to escape double quotes inside strings.
  - Escape backslashes where necessary (e.g., in Solidity strings).
- Wrap all code in string values — do NOT use raw multiline blocks.
- The "frontend.jsx" must be a fully working IIFE-style React component:
  - Compatible with environments using global React/ReactDOM.
  - Include interactivity like wallet connection, voting, toggles, etc.
  - Visually clean, responsive, and dApp-like UI.
- The Solidity contract must include:
  - SPDX-License-Identifier comment
  - pragma solidity ^0.8.0;
  - Real-world logic such as ERC20, NFTs, Voting, DAOs, etc.
- The "backend.js" should be a minimal Express server:
  - With routes like /health or endpoints interacting with blockchain data.
  - Use middleware like cors and express.json().
- NEVER add any text before or after the JSON object.
- ALWAYS output a single, valid JSON object that can be parsed with JSON.parse().

IMPORTANT:
- Do NOT use markdown code blocks (like \`\`\`json).
- Do NOT explain anything.
- ONLY return the JSON.
`;


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
