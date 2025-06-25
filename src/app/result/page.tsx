"use client";
import { useEffect, useState } from "react";
import { Tree } from "react-arborist";
import CodeEditor from "@/components/CodeEditor";
import PreviewWindow from "@/components/PreviewWindow";

type FileNode = {
  id: string;
  name: string;
  children: FileNode[];
};

export default function ResultPage() {
  const [code, setCode] = useState<{ [key: string]: string }>({});
  const [selectedTab, setSelectedTab] = useState<"code" | "preview">("code");
  const [selectedFile, setSelectedFile] = useState<string>("");

  // Load generated code from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("generatedCode");
    if (stored) {
      const parsed = JSON.parse(stored);
      setCode(parsed);
      const files = Object.keys(parsed);
      if (files.length > 0) {
        setSelectedFile(files[0]); // Auto-select first file
      }
    }
  }, []);

  // Tree format
  const fileTree: FileNode[] = Object.keys(code).map((filename) => ({
    id: filename,
    name: filename,
    children: [],
  }));

  // Language detection
  const detectLanguage = (file: string): string => {
    if (file.endsWith(".sol")) return "solidity";
    if (file.endsWith(".js")) return "javascript";
    if (file.endsWith(".jsx")) return "jsx";
    if (file.endsWith(".ts") || file.endsWith(".tsx")) return "typescript";
    if (file.endsWith(".json")) return "json";
    return "plaintext";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <h1 className="text-2xl font-bold text-center mb-6">🚀 Web3 Project Generated</h1>

      {/* Tabs */}
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

      {/* Main Content */}
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden h-[70vh]">
        {selectedTab === "code" && (
          <div className="flex w-full">
            {/* Sidebar */}
            <div className="w-64 border-r bg-gray-100 overflow-auto p-2">
              <Tree<FileNode>
  data={fileTree}
  openByDefault
  rowHeight={30}
  indent={16}
  selection="single" // Optional: ensures only one node can be selected
  onSelect={(nodes) => {
    if (nodes.length > 0) {
      setSelectedFile(nodes[0].data.id); // Use .data to access your actual FileNode
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

            {/* Editor */}
            <div className="flex-1 p-4 overflow-auto">
              <h2 className="text-md font-semibold mb-2">{selectedFile}</h2>
              <CodeEditor
                code={code[selectedFile] || "// No content"}
                language={detectLanguage(selectedFile)}
              />
            </div>
          </div>
        )}

        {selectedTab === "preview" && (
          <div className="w-full p-4">
            {code["frontend.jsx"] ? (
              <PreviewWindow code={code["frontend.jsx"]} />
            ) : (
              <p className="text-gray-600">No frontend code to preview.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}