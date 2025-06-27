import {
  SandpackProvider,
  SandpackLayout,
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
 try {
  return (
    <SandpackProvider
      template={template}
      files={sandpackFiles}
      options={{ autorun: true }}
      customSetup={
        {entry: "/src/index.jsx",
        dependencies: {
          "react": "^18.2.0",
          "react-dom": "^18.2.0"
        }
        }
      }
    >
      <SandpackLayout className="h-full border rounded">
        <SandpackPreview className="flex-1 border-l" />
      </SandpackLayout>
    </SandpackProvider>
  );
 } catch (z) {
    return (
      <div className="p-4 text-red-600">
        Live preview crashed due to invalid code!!<br />
        Check your syntax and try again.<br />
        {"error: "+ z}
      </div>
    );
  }
}

