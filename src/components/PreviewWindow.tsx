import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

export default function PreviewWindow({ code }: { code: string }) {
  return (
    <LiveProvider code={code}>
      <LivePreview className="border p-4 bg-white" />
      <LiveError className="text-red-600" />
    </LiveProvider>
  );
}
