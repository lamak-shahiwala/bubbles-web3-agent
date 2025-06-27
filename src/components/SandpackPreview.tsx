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
        active: path === "/src/index.jsx" || path === "/src/App.jsx",
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
          "react-dom": "^18.2.0",
          "ethers": "^6.8.1",
          "lucide-react": "^0.300.0",
          "react-use": "^17.4.0",
          "tailwindcss": "^3.4.1",
          "postcss": "^8.4.24",
          "autoprefixer": "^10.4.14"
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

