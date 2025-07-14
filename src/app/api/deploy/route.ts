import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { code, projectName = "web3-user-app" } = await req.json();

  const files = Object.entries(code).map(([file, content]) => ({
    file: file.startsWith("/") ? file.slice(1) : file,
    data: content,
  }));

  try {
    const deployRes = await fetch("https://api.vercel.com/v13/deployments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_TOKEN!}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: projectName,
        files,
        projectSettings: {
          framework: "create-react-app",
        },
      }),
    });

    const result = await deployRes.json();

    if (!deployRes.ok) {
      console.error("Vercel Deploy Error:", result);
      return new Response(JSON.stringify({ error: result }), { status: 500 });
    }

    return new Response(JSON.stringify({ url: result.url }), { status: 200 });
  } catch (error) {
    console.error("Unexpected Error:", error);
    return new Response(JSON.stringify({ error: "Unexpected error" }), { status: 500 });
  }
}
