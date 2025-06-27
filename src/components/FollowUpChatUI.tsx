"use client";
import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";

export default function FollowUpChatUI({ onSubmit }: { onSubmit: (prompt: string) => void }) {

  const [prompt, setPrompt] = useState("");

  return (
    <div className="w-fill">
    <h3 className='text-xl mb-1'>Chat with Bubbles: </h3>
    <div
      className={` 
        bg-white bg-opacity-100 rounded-lg p-4 md:p-6 flex flex-col justify-between shadow-md`}
    >
      <div className={`flex w-full items-center gap-3 flex-1`}>
        <textarea
          value={prompt}
          placeholder='Describe or ask what you want to change...'
          onChange={(e) => setPrompt(e.target.value)}
          rows={2}
          className="bg-transparent resize-none w-full h-full outline-none text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed"
        />
      </div>

      <div className="flex items-center justify-end space-x-3 mt-2">
        <button
          onClick={() => onSubmit(prompt)}
          className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white text-xl transition"
        >
          <IoSend />
        </button>
      </div>
      
    </div>
    </div>
  );
}