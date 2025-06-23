"use client";
import React, { useState } from 'react';
import { IoSend, IoBulb } from "react-icons/io5";

export default function ChatUI() {
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);

  const web3Prompts = [
    "Build an ERC20 token dashboard with transfer UI",
    "Build a decentralized voting app using smart contracts.",
    "Create a Web3-based crowdfunding platform like Kickstarter.",
    "Develop a blockchain-based certification verifier.",
    "Design a decentralized blogging platform with content ownership.",
    "Create an NFT ticketing system for events.",
    "Build a Web3 job board that pays in crypto.",
    "Make a DAO for community decision-making.",
    "Create a gasless wallet for onboarding new users.",
    "Design a decentralized ride-sharing dApp.",
    "Build a crypto donation tracker for NGOs.",
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    console.log("Submitted:", input);
    setInput("");
    setFocused(false);
  };

  const handleRandomPrompt = () => {
    const random = web3Prompts[Math.floor(Math.random() * web3Prompts.length)];
    setInput(random);
    setFocused(true);
  };

  return (
    <div
      className={`relative w-full transition-all duration-300
        ${focused || input ? "h-[155px] md:h-[170px] lg:h-[170px]" : "h-[72px]"} 
        md:w-[600px] lg:w-[775px] 
        bg-blue-50 bg-opacity-75 rounded-lg p-4 md:p-6 flex flex-col justify-between shadow-md`}
    >
      <div className={`flex w-full items-center gap-3 ${!focused ? "flex-1" : ""}`}>
        <textarea
          value={input}
          placeholder={focused ? 'Describe your Web3 App' : "Different Prompts"}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            if (!input.trim()) setFocused(false);
          }}
          onChange={(e) => setInput(e.target.value)}
          rows={1}
          className="bg-transparent resize-none w-full h-full outline-none text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed"
        />
        {!focused && (
        <button
          onClick={handleRandomPrompt}
          className="flex items-center px-3 py-1.5 border border-blue-500 text-blue-600 rounded-full text-sm hover:bg-blue-100 transition whitespace-nowrap flex-shrink-0"
        >
          <span className="hidden md:flex items-center gap-1"><IoBulb /> Random Prompt</span>
          <span className="md:hidden"><IoBulb /></span>
        </button>
      )}
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
          onClick={handleSend}
          className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white text-xl transition"
        >
          <IoSend />
        </button>
         )}
      </div>
    </div>
  );
}