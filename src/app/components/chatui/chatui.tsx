"use client";
import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";

export default function ChatUI() {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    console.log("Submitted:", input);
    setInput("");
  };

  return (
    <div className="relative  w-full h-[92px] sm:h-[155px] md:w-[600px] md:h-[170px] lg:w-[900px] lg:h-[180px] bg-gradient-to-br from-blue-50 to-blue-100 bg-opacity-80 rounded-3xl p-6 flex flex-row md:flex-col  justify-between shadow-md">
        <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your project's description"
        className="bg-transparent resize-none w-full h-full outline-none text-gray-700 placeholder-gray-400 text-xs sm:text-xs  md:text-lg leading-relaxed"
      />
      <div className="flex items-center justify-end space-x-3 mt-2">
        <button
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