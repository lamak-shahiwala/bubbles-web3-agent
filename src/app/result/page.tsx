"use client";
import { useEffect, useState } from "react";
import CodeEditor from "@/components/CodeEditor";
import PreviewWindow from "@/components/PreviewWindow";

export default function ResultPage() {
  const [code, setCode] = useState<{ [key: string]: string }>({});
  const [selectedTab, setSelectedTab] = useState<"code" | "preview">("code");

  useEffect(() => {
    const stored = localStorage.getItem("generatedCode");
    if (stored) {
      setCode(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">🚀 Web3 Project Generated</h1>

      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 rounded-t-md ${
            selectedTab === "code" ? "bg-white shadow font-semibold" : "bg-blue-100"
          }`}
          onClick={() => setSelectedTab("code")}
        >
          Code Editor
        </button>
        <button
          className={`px-4 py-2 rounded-t-md ${
            selectedTab === "preview" ? "bg-white shadow font-semibold" : "bg-blue-100"
          }`}
          onClick={() => setSelectedTab("preview")}
        >
          Live Preview
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg">
        {selectedTab === "code" && (
          <div className="space-y-6">
            {code["contract.sol"] && (
              <div>
                <h2 className="text-lg font-semibold">Smart Contract</h2>
                <CodeEditor code={code["contract.sol"]} language="solidity" />
              </div>
            )}
            {code["frontend.jsx"] && (
              <div>
                <h2 className="text-lg font-semibold">React Code</h2>
                <CodeEditor code={code["frontend.jsx"]} language="jsx" />
              </div>
            )}
            {code["backend.js"] && (
              <div>
                <h2 className="text-lg font-semibold">Backend Code</h2>
                <CodeEditor code={code["backend.js"]} language="javascript" />
              </div>
            )}
          </div>
        )}

        {selectedTab === "preview" && code["frontend.jsx"] && (
          <PreviewWindow code={code["frontend.jsx"]} />
        )}
      </div>
    </div>
  );
}