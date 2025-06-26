import Editor from "@monaco-editor/react";

type CodeEditorProps = {
  code: string;
  language: string;
  onChange?: (newValue: string) => void;
};

export default function CodeEditor({ code, language, onChange }: CodeEditorProps) {
  return (
    <div className="border rounded-md overflow-hidden">
      <Editor
        height="400px"
        width="900px"
        defaultLanguage={language}
        defaultValue={code}
        onChange={(value) => onChange?.(value ?? "")}
        theme="vs-dark"
      />
    </div>
  );
}
