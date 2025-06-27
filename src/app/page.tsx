"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import ChatUI from "@/components/ChatUI";
import { SiLinkedin, SiGithub } from "react-icons/si";
import { TbWorldWww } from "react-icons/tb";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const router = useRouter();

  const generateCode = async (prompt: string) => {
  setIsLoading(true);
  setShowResult(false);
  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();

    localStorage.setItem("generatedCode", JSON.stringify(data));

    router.push("/result");
  } catch (err) {
    console.error("Error generating code:", err);
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="bg-[url('/images/bubbles.png')] bg-cover min-h-screen w-screen flex flex-col items-center px-4 sm:px-10 md:px-20 py-10 font-sans">
      <main className="flex flex-col items-center gap-8 flex-grow w-full">
        <Image
          className="hover:scale-105 transition-transform h-32 w-32 sm:h-36 sm:w-36 md:h-48 md:w-48 lg:h-60 lg:w-60"
          src="/images/bubbles_logo.png"
          alt="Bubbles logo"
          width={200}
          height={200}
          priority
        />
        <h2 className="text-xl md:text-3xl font-bold text-gray-800 text-center">
          Generate your Web3 boilerplate in <span className="italic">minutes</span>.
        </h2>
        <div className="flex justify-center">
          {!isLoading && !showResult && (
          <div>
            <ChatUI onSubmit={generateCode} />
          </div>)}
        </div>

        {isLoading && (
          <div className="text-center text-xl text-blue-600 font-medium animate-pulse py-10">
            🍳 Your Web3 application is cooking...
          </div>
        )}
      </main>

      <div className="mt-10 flex gap-6 flex-wrap items-center justify-center text-gray-800 text-3xl">
        <a href="https://github.com/lamak-shahiwala" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
          <SiGithub />
        </a>
        <a href="https://lamaks-desktop.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
          <TbWorldWww />
        </a>
        <a href="https://www.linkedin.com/in/lamak-shahiwala-766986256" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
          <SiLinkedin />
        </a>
      </div>
    </div>
  );
}
