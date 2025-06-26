"use client";
import JSZip from "jszip";
import { FiDownload } from "react-icons/fi";

interface ZipDownloadButtonProps {
  files: { [key: string]: string };
}

export default function ZipDownloadButton({ files }: ZipDownloadButtonProps) {
  async function downloadZip() {
    const zip = new JSZip();

    for (const filePath in files) {
      const normalizedPath = filePath.startsWith("/") ? filePath.slice(1) : filePath;
      zip.file(normalizedPath, files[filePath]);
    }

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = url;
    a.download = "web3-project.zip";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={downloadZip}
      className="flex flex-row items-center ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      <FiDownload className="mr-2" />(.zip)
    </button>
  );
}
