import { useEffect, useState, useRef } from "react";
import socket from "../api/socket";
import axios from "../api/axiosInstance";

export default function ChatBox({ communityId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get(`/chat/${communityId}`);
      setMessages(res.data);
      scrollToBottom();
    };
    fetchMessages();
  }, [communityId]);

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      if (msg.communityId === communityId) {
        setMessages((prev) => [...prev, msg]);
        scrollToBottom();
      }
    });
    return () => socket.off("receiveMessage");
  }, [communityId]);

  const sendMessage = () => {
    if (!text.trim()) return;
    const userId = localStorage.getItem("userId"); // from AuthContext
    socket.emit("sendMessage", { communityId, text, userId });
    setText("");
  };

  return (
    <div className="flex flex-col flex-1 h-full">
      <div className="flex-1 overflow-y-auto space-y-3 mb-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl max-w-[80%] bg-gradient-to-r from-purple-700 via-purple-600 to-purple-500 text-white shadow-md hover:scale-105 transition-transform"
          >
            <span className="font-semibold text-amber-300">{msg.userId}</span>: {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
        />
        <button
          onClick={sendMessage}
          className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 transition shadow-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}