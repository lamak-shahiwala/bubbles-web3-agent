"use client";
import React, { useState } from 'react';
import { IoSend, IoBulb } from "react-icons/io5";
import DifferentPrompts from './DifferentPrompts';

export default function ChatUI({ onSubmit }: { onSubmit: (prompt: string) => void }) {
  const [prompt, setPrompt] = useState("");
  const [focused, setFocused] = useState(false);

  const web3Prompts = [
    "Build an ERC20 token dashboard with transfer UI",
    "Create an NFT mining UI with an ERC721",
    "Build a dashboard that shows ETH balance and allow transfers",
    "Generate a staking contract and UI to lock tokens for 30 days",
  ];

  const handleRandomPrompt = () => {
    const random = web3Prompts[Math.floor(Math.random() * web3Prompts.length)];
    setPrompt(random);
    setFocused(true);
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 w-screen pl-[2rem] pr-[2rem] md:pl-[5rem] md:pr-[5rem] lg:pl-[20rem] lg:pr-[20rem] ">
    <div
      className={`relative transition-all duration-300 w-full
        ${focused || prompt ? "h-[155px] md:h-[170px] lg:h-[170px]" : "h-[72px]"} 
        bg-blue-50 bg-opacity-75 rounded-lg p-4 md:p-6 flex flex-col justify-between shadow-md`}
    >
      <div className={`flex w-full items-center gap-3 ${!focused ? "flex-1" : ""}`}>

        {!focused && prompt === "" && (
            <div className="absolute top-0 pl-2 pr-2 w-full h-full text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl pointer-events-none flex items-center">
                <DifferentPrompts />
            </div>
        )}

        <textarea
          value={prompt}
          placeholder={focused ? 'Describe your Web3 App...' : ""}
          onFocus={() => setFocused(true)}
          onChange={(e) => setPrompt(e.target.value)}
          rows={focused ? 3 : 1}
          className="bg-transparent resize-none w-full h-full outline-none text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed"
        />
      </div>

      <div className="flex items-center justify-end space-x-3 mt-2">
        {focused && (
        <button
          onClick={handleRandomPrompt}
          className="md:flex hidden items-center gap-1 px-3 py-1.5 border border-blue-500 text-blue-600 rounded-full text-sm hover:bg-blue-100 transition"
        >
          <IoBulb /> Random Prompt
        </button>
        )}
        {focused && (
        <button
          onClick={handleRandomPrompt}
          className="md:hidden flex items-center gap-1 px-3 py-1.5 border border-blue-500 text-blue-600 rounded-full text-sm hover:bg-blue-100 transition"
        >
          <IoBulb />
        </button>
        )}
        {focused && (
        <button
          onClick={() => onSubmit(prompt)}
          className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white text-xl transition"
        >
          <IoSend />
        </button>
         )}
      </div>
      
    </div>
    {!focused && (
        <button
          onClick={handleRandomPrompt}
          className="hidden md:flex items-center px-3 py-1.5 border border-blue-500 text-blue-600 rounded-full text-sm hover:bg-blue-100 transition whitespace-nowrap flex-shrink-0"
        >
            <IoBulb /> Random Prompt
        </button>
      )}
    </div>
  );
}