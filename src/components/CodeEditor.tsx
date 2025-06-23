import Editor from "@monaco-editor/react";

export default function CodeEditor({ code = "", language = "solidity" }) {
  return (
    <div className="border rounded-md overflow-hidden">
      <Editor
        height="400px"
        width="900px"
        defaultLanguage={language}
        defaultValue={code}
        theme="vs-dark"
      />
    </div>
  );
}
