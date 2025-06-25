import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

export default function PreviewWindow({ code }: { code: string }) {
  return (
    <LiveProvider code={code}>
      <div className="w-full min-h-[300px] resize-x overflow-auto border p-4 bg-white">
        <LivePreview className="w-full h-full" />
      </div>
      <LiveError className="text-red-600" />
    </LiveProvider>
  );
}
