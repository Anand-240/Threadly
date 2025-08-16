import React from "react";

export default function MessageBubble({ message, isOwn }) {
  return (
    <div
      className={`max-w-[75%] p-3 rounded-xl shadow-md mb-2 break-words
        ${isOwn 
          ? "bg-amber-400 text-gray-900 self-end hover:scale-105 transform transition" 
          : "bg-purple-700 text-white self-start hover:scale-105 transform transition"
        }`}
    >
      <span className="font-semibold">{message.username || message.userId}</span>: {message.text}
    </div>
  );
}