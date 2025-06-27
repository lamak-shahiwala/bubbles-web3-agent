"use client";
import { useEffect, useState, useMemo } from "react";
import { Tree } from "react-arborist";
import CodeEditor from "@/components/CodeEditor";
import LiveSandpackPreview from "@/components/SandpackPreview";
import ZipDownloadButton from "@/components/downloadZip";
import Image from "next/image";
import FollowUpChatUI from "@/components/FollowUpChatUI";

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
        child = { id, name: part, children: [] };
        current.children.push(child);
      }
      current = child;
    }
  }

  return root.children;
}

export default function ResultPage() {
  const [code, setCode] = useState<{ [key: string]: string }>({});
  const [selectedFile, setSelectedFile] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem("generatedCode");
    if (stored) {
      const raw = JSON.parse(stored);
      const parsed: { [key: string]: string } = {};

      for (const [key, value] of Object.entries(raw)) {
        if (typeof value === "string") {
          parsed[key.startsWith("/") ? key : "/" + key] = value;
        }
      }

      if (!parsed["/src/index.jsx"]) {
        parsed["/src/index.jsx"] = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`;
      }

      setCode(parsed);

      const files = Object.keys(parsed);
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

  const reGenerateCode = async (prompt: string) => {
  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();

    localStorage.setItem("generatedCode", JSON.stringify(data));

  } catch (err) {
    console.error("Error generating code:", err);
  } finally {
    //setIsLoading(false);
  }
};

  return (
    <div className="h-screen flex flex-col bg-gradient-to-r from-[#0085FF] to-[#FEC8FF]">
      <div className="flex justify-between border-b items-center p-4 bg-white bg-opacity-50 backdrop-blur-sm">
        <div className="flex text-[1.75rem] font-bold items-center flex-row">
          <Image
          className="pr-2"
          src="/images/bubbles_logo.png"
          alt="Bubbles logo"
          width={60}
          height={60}
          priority
          />
          Web3 Project
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col w-1/2 border-r-2 border-gradient-to-r from-[#0085FF] to-[#FEC8FF] bg-white bg-opacity-50 backdrop-blur-sm">
          <div className="flex h-full overflow-hidden">
            {/* File Tree */}
            <div className="w-64 bg-gray-100 opacity-90 overflow-auto">
              <Tree<FileNode>
                data={fileTree}
                openByDefault
                rowHeight={30}
                indent={14}
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
                    className={`px-4 py-2 cursor-pointer rounded ${
                      node.data.id === selectedFile
                        ? "bg-blue-200 font-semibold"
                        : "hover:bg-blue-100"
                    }`}
                  >
                    <span className="pl-2">{node.data.name}</span>
                  </div>
                )}
              </Tree>
            </div>
            {/* Code Editor */}
            <div className="flex-1 p-2 overflow-auto">
              <div className="flex flex-row items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">{selectedFile}</h2>
                <ZipDownloadButton files={code} />
              </div>
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
        </div>
        {/* Preview Panel */}
        <div className="flex flex-col w-1/2 p-2 overflow-auto bg-white bg-opacity-50 backdrop-blur-sm">
          <div className="flex-1">
          {sandpackFiles["/src/index.jsx"] || sandpackFiles["/frontend.jsx"] ? (
            <LiveSandpackPreview files={code} template="react" />
          ) : (
            <p className="text-gray-600">No frontend code to preview.</p>
          )}
          </div>
          <div className="">
            <FollowUpChatUI onSubmit={reGenerateCode} />
          </div>
        </div>
      </div>
    </div>
  );
}