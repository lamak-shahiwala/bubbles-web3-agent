import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackProviderProps,
} from "@codesandbox/sandpack-react";

interface SandpackPreviewProps {
  files: Record<string, string>;
  template?: SandpackProviderProps["template"];
}

export default function LiveSandpackPreview({
  files,
  template = "react",
}: SandpackPreviewProps) {
  const sandpackFiles: SandpackProviderProps["files"] = Object.fromEntries(
    Object.entries(files).map(([path, code]) => [
      path,
      {
        code,
        active: path === "/src/index.js" || path === "/src/App.js",
      },
    ])
  );

  return (
    <SandpackProvider
      template={template}
      files={sandpackFiles}
      options={{ autorun: true }}
    >
      <SandpackLayout className="h-full border rounded">
        <SandpackPreview className="flex-1 border-l" />
      </SandpackLayout>
    </SandpackProvider>
  );
}
