"use client"
import { useState } from "react";
import Image from "next/image";
import ChatUI from "@/components/ChatUI";
import { SiLinkedin, SiGithub } from "react-icons/si";
import { TbWorldWww } from "react-icons/tb";
import CodeEditor from "@/components/CodeEditor";
import PreviewWindow from "@/components/PreviewWindow";

export default function Home() {

  const [code, setCode] = useState<{ [key: string]: string }>({});

  const generateCode = async (prompt: string) => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setCode(data);
  };

  return (
    <div className="bg-[url('/images/bubbles.png')] bg-cover min-h-screen w-screen flex flex-col items-center px-4 sm:px-10 md:px-20 py-10 font-sans">
      <main className="flex flex-col items-center gap-8 flex-grow">
        <Image
          className="hover:scale-105 transition-transform h-32 w-32 sm:h-36 sm:w-36 md:h-48 md:w-48 lg:h-60 lg:w-60"
          src="/images/bubbles_logo.png"
          alt="Bubbles logo"
          width={200}
          height={200}
          priority
        />
        <h2 className="text-xl md:text-3xl font-bold text-gray-800 text-center">
          Launch a Web3 App in <span className="italic">minutes</span>.
        </h2>
        <ChatUI onSubmit={generateCode}/>
        {code["contract.sol"] && (
        <div className="my-4">
          <h2 className="text-lg font-semibold">Smart Contract</h2>
          <CodeEditor code={code["contract.sol"]} language="solidity" />
        </div>
      )}
      {code["frontend.jsx"] && (
        <div className="my-4">
          <h2 className="text-lg font-semibold">React Code</h2>
          <CodeEditor code={code["frontend.jsx"]} language="react" />
        </div>
      )}
      {code["frontend.jsx"] && (
        <div className="my-4">
          <h2 className="text-lg font-semibold">Live Preview</h2>
          <PreviewWindow code={code["frontend.jsx"]} />
        </div>
      )} 
      </main>

      <div className="mt-10 flex gap-6 flex-wrap items-center justify-center text-gray-800 text-3xl">
        <a
          href="https://github.com/lamak-shahiwala"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform"
        >
          <SiGithub />
        </a>
        <a
          href="https://lamaks-desktop.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform"
        >
          <TbWorldWww />
        </a>
        <a
          href="https://www.linkedin.com/in/lamak-shahiwala-766986256"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform"
        >
          <SiLinkedin />
        </a>
      </div>
    </div>
  );
}