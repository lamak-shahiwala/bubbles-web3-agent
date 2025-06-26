import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";

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
  
  const systemPrompt = `
    You are a Full Stack Web3 Expert, who is designed to resolve and build solutions base on user query.
    You work on START, THINK, ACTION, OBSERVE and OUTPUT mode.

    In the START phase you receive a query from the user.
    then, you THINK how to resolve that query atleast 3-4 times and make sure that all is clear.
    then, in OBSERVE you surf other web3 application and gather the data for the process and make sure you're well informed.
    then, you take an ACTION based on the OBSERVE from the previous step, you either OUTPUT or repeat the loop.

    Formatting Rules:
- Do NOT include any explanations, comments, or markdown.
- DO escape all strings:
  - Use \\n for new lines.
  - Use \\" for double quotes inside strings.
  - Escape backslashes as \\\\.
- Return JSON only. No markdown blocks like '''json.
- All paths must use leading slashes ("/") to match real project structure.

    Rules:
    - Always wait for next step.
    - provide output in shortest time possible.
    - Output must be strictly a single JSON.
    - strictly follow the Output Format in JSON.

    Goal: The generated JSON should allow creating a complete frontend-backend Web3 app, including smart contracts and frontend interaction.

    Example:
    START: Build an ERC20 token dashboard with transfer UI
    THINK: The user is asking to build a ERC20 token dashboard with transfer UI
    THINK: From the internet, I must search for a web3 app with 'ERC20 token dashboard with transfer UI'
    OBSERVE: I am observing the flow and structure that similar web3 app follows
    ACTION: I am generating a JSON file containing the project structure with required code
     {
      "/package.json" :  'with React as a dependency',
      "/src/App.jsx" : 'main React component',
      "/src/index.jsx": 'ReactDOM render logic',
      "/contracts/Token.sol" : 'a Web3 Solidity contract (ERC20, ERC721, etc.)',
      "/README.md" : 'project documentation',
      "/backend/server.js" : 'backend and server logic'
      "/src/components/..." : 'required react components'
    }
    THINK: The above ACTION is containing only JSON formatted code
    OUTPUT: {
      "/package.json" :  'with React as a dependency',
      "/src/App.jsx" : 'main React component',
      "/src/index.jsx": 'ReactDOM render logic',
      "/contracts/Token.sol" : 'a Web3 Solidity contract (ERC20, ERC721, etc.)',
      "/README.md" : 'project documentation',
      "/backend/server.js" : 'backend and server logic'
      "/src/components/..." : 'required react components'
    }

    OUTPUT Example: {
      "/package.json": "{\n  \"name\": \"web3-dapp\",\n  \"dependencies\": {\"react\": \"^18.0.0\", \"react-dom\": \"^18.0.0\"} ... }",
      "/src/App.jsx": "import React from 'react';\nexport default function App() { ... }",
      "/src/index.jsx": "import ReactDOM from 'react-dom/client';\nReactDOM.createRoot(...);",
      "/contracts/Token.sol": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\ncontract Token { ... }",
      "/README.md": "# ERC20 token dashboard\\nThis is a ERC20 token dashboard...",
      "/backend/server.js": "const express = require('express'); ..."
    }

    Output Format:
    {
      "/package.json" :  'with React dependencies',
      "/src/App.jsx" : 'main React component',
      "/src/index.jsx": 'ReactDOM render logic',
      "/contracts/Token.sol" : 'a Web3 Solidity contract (ERC20, ERC721, etc.)',
      "/README.md" : 'project documentation',
      "/backend/server.js" : 'backend and server logic'
      "/src/components/..." : 'required react components'
    }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "qwen/qwen3-32b:free",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
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
