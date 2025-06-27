"use client";
import { useEffect, useState, useMemo } from "react";
import { Tree } from "react-arborist";
import CodeEditor from "@/components/CodeEditor";
import LiveSandpackPreview from "@/components/SandpackPreview";
import ZipDownloadButton from "@/components/downloadZip";

type FileNode = {
  id: string;
  name: string;
  children: FileNode[];
};

function buildFileTree(files: { [key: string]: string }): FileNode[] {
  const root: FileNode = { id: "", name: "", children: [] };

  for (const path of Object.keys(files)) {
    const parts = path.split("/").filter(Boolean);
    let current = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const id = "/" + parts.slice(0, i + 1).join("/");
      let child = current.children.find((c) => c.name === part);
      if (!child) {
        child = {
          id,
          name: part,
          children: [],
        };
        current.children.push(child);
      }
      current = child;
    }
  }

  return root.children;
}

export default function ResultPage() {
  const [code, setCode] = useState<{ [key: string]: string }>({});
  const [selectedTab, setSelectedTab] = useState<"code" | "preview">("code");
  const [selectedFile, setSelectedFile] = useState<string>("");

  useEffect(() => {
  const stored = localStorage.getItem("generatedCode");
  if (stored) {
    const raw = JSON.parse(stored);
    const parsed: { [key: string]: string } = {};

    for (const [key, value] of Object.entries(raw)) {
      if (typeof value === "string") {
        parsed[key] = value;
      }
    }

    const normalized = Object.fromEntries(
      Object.entries(parsed).map(([k, v]) =>
        [k.startsWith("/") ? k : "/" + k, v]
      )
    );

    if (!normalized["/src/index.jsx"]) {
      normalized["/src/index.jsx"] = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
`;
    }

    setCode(normalized);

    const files = Object.keys(normalized);
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  }
}, []);


  const fileTree = buildFileTree(code);

  const detectLanguage = (file: string): string => {
    if (file.endsWith(".sol")) return "solidity";
    if (file.endsWith(".js")) return "javascript";
    if (file.endsWith(".jsx")) return "jsx";
    if (file.endsWith(".ts") || file.endsWith(".tsx")) return "typescript";
    if (file.endsWith(".json")) return "json";
    return "plaintext";
  };

  const sandpackFiles = useMemo(() => {
    const result: { [key: string]: string } = {};
    for (const path in code) {
      result[path] = code[path];
    }
    return result;
  }, [code]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-center flex-grow">🚀 Web3 Project Generated</h1>
        <ZipDownloadButton files={code} />
      </div>

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

      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden h-[70vh]">
        {selectedTab === "code" && (
          <div className="flex w-full">
            <div className="w-64 border-r bg-gray-100 overflow-auto p-2">
              <Tree<FileNode>
                data={fileTree}
                openByDefault
                rowHeight={30}
                indent={16}
                selection="single"
                onSelect={(nodes) => {
                  if (nodes.length > 0) {
                    setSelectedFile(nodes[0].data.id);
                  }
                }}
              >
                {({ node, style }) => (
                  <div
                    style={style}
                    className={`px-2 py-1 cursor-pointer rounded ${
                      node.data.id === selectedFile
                        ? "bg-blue-200 font-semibold"
                        : "hover:bg-blue-100"
                    }`}
                  >
                    {node.data.name}
                  </div>
                )}
              </Tree>
            </div>
            <div className="flex-1 p-4 overflow-auto">
              <h2 className="text-md font-semibold mb-2">{selectedFile}</h2>
              <CodeEditor
                key={selectedFile}
                code={code[selectedFile] || "// No content"}
                language={detectLanguage(selectedFile)}
                onChange={(newCode) => {
                  setCode((prev) => ({
                    ...prev,
                    [selectedFile]: newCode,
                  }));
                }}
              />
            </div>
          </div>
        )}

        {selectedTab === "preview" && (
          <div className="w-full p-4">
            {sandpackFiles["/src/index.jsx"] || sandpackFiles["/frontend.jsx"] ? (
              <LiveSandpackPreview files={code} template="react" />
            ) : (
              <p className="text-gray-600">No frontend code to preview.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}