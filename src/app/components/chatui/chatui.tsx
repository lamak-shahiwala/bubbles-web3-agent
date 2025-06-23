"use client";
import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";

export default function ChatUI() {
  const [input, setInput] = useState("");

  const web3Prompts = [
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
  };

  const handleRandomPrompt = () => {
    const random = web3Prompts[Math.floor(Math.random() * web3Prompts.length)];
    setInput(random);
  };

  return (
    <div className="relative  w-full h-[92px] sm:h-[155px] md:w-[600px] md:h-[170px] lg:w-[775px] lg:h-[170px] bg-blue-50 bg-opacity-80 rounded-3xl p-6 flex flex-row md:flex-col  justify-between shadow-md">
        <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Describe your Web3 App"
        className="bg-transparent resize-none w-full h-full outline-none text-gray-700 placeholder-gray-400 text-xs sm:text-xs  md:text-lg lg:text-xl leading-relaxed"
      />
      <div className="flex items-center justify-end space-x-3 mt-2">
        <button
          onClick={handleRandomPrompt}
          className="md:flex hidden items-center gap-1 px-3 py-1.5 border border-blue-500 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition"
        >
          💡 Random Prompt
        </button>

        <button
          onClick={handleSend}
          className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white text-xl transition"
        >
          <IoSend />
        </button>
      </div>
      </div>
  );
};