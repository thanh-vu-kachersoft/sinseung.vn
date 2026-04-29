"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";

interface Message {
  role: "user" | "ai";
  content: string;
}

export default function AiChatWindow() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Tự động cuộn xuống khi có tin nhắn mới
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          history: messages,
          language: language,
        }),
      });

      const data = await response.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: "ai", content: data.reply }]);
      } else {
        throw new Error("No response from AI");
      }
    } catch (error) {
      console.error("AI Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            language === "vi"
              ? "Xin lỗi, tôi đang bận một chút. Vui lòng thử lại sau nhé!"
              : "Sorry, I'm a bit busy right now. Please try again in a moment!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm để render nội dung tin nhắn với liên kết có thể nhấp
  const renderMessageContent = (content: string) => {
    // Regex tìm định dạng [Text](URL)
    const parts = content.split(/(\[.*?\]\(.*?\))/g);
    return parts.map((part, index) => {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        const linkText = match[1];
        const linkUrl = match[2];
        const isExternal = linkUrl.startsWith("http");

        return (
          <a
            key={index}
            href={linkUrl}
            target={isExternal ? "_blank" : "_self"}
            rel={isExternal ? "noopener noreferrer" : ""}
            className="inline-block bg-white text-[#C8102E] font-bold px-3 py-1 rounded-lg my-1 border border-[#C8102E]/20 hover:bg-[#C8102E] hover:text-white transition-all shadow-sm"
          >
            {linkText}
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <>
      {/* Floating Trigger Icon */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-16 h-16 rounded-full overflow-hidden shadow-2xl transition-transform hover:scale-110 active:scale-95 border-2 border-white/20 block"
          title="AI Assistant"
        >
          <video
            src="https://magenta-stork-113658.hostingersite.com/wp-content/uploads/2026/04/2026-04-29-02.05.29.mov"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          {!isOpen && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />
          )}
        </button>
      </div>

      {/* Chat Window - Positioned to the LEFT of the icons */}
      <div
        className={`fixed right-4 md:right-[100px] bottom-4 md:bottom-10 w-[calc(100vw-32px)] md:w-[450px] max-h-[85vh] md:max-h-[80vh] h-[600px] md:h-[650px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-[10000] flex flex-col overflow-hidden transition-all duration-500 border border-black/5 ${
          isOpen
            ? "opacity-100 translate-y-0 md:translate-x-0 scale-100"
            : "opacity-0 translate-y-10 md:translate-x-10 scale-95 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-[#1B2A4A] p-5 text-white flex justify-between items-center shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
              <span className="text-2xl">🤖</span>
            </div>
            <div>
              <p className="font-bold text-lg leading-none">
                Sinseung Sales AI
              </p>
              <p className="text-[11px] text-green-400 mt-1.5 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Expert Consultation
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-gray-50/50 scrollbar-hide">
          {messages.length === 0 && (
            <div className="text-center py-12 px-8">
              <div className="w-20 h-20 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                👋
              </div>
              <h4 className="text-[#1B2A4A] font-bold text-lg mb-2">
                Xin chào!
              </h4>
              <p className="text-gray-500 text-[15px] leading-relaxed">
                Tôi là chuyên viên tư vấn AI của Sinseung Việt Nam. Tôi có thể
                hỗ trợ bạn tìm kiếm sản phẩm hoặc báo giá sỉ tốt nhất.
              </p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                  msg.role === "user"
                    ? "bg-[#C8102E] text-white rounded-tr-none"
                    : "bg-white text-[#333e48] border border-gray-100 rounded-tl-none"
                }`}
              >
                {msg.role === "ai"
                  ? renderMessageContent(msg.content)
                  : msg.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex gap-1.5 items-center">
                <span className="w-2 h-2 bg-[#C8102E]/30 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 bg-[#C8102E]/60 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 bg-[#C8102E] rounded-full animate-bounce" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form
          onSubmit={handleSend}
          className="p-5 bg-white border-t border-gray-100 shadow-[0_-5px_15px_rgba(0,0,0,0.02)]"
        >
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                language === "vi"
                  ? "Hỏi về sản phẩm Sinseung..."
                  : "Ask about Sinseung products..."
              }
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-6 pr-14 text-[15px] focus:outline-none focus:border-[#C8102E] focus:bg-white transition-all shadow-inner"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#C8102E] text-white rounded-xl flex items-center justify-center hover:bg-[#a50d26] transition-all duration-300 disabled:opacity-30 shadow-md active:scale-90"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
          <div className="flex justify-between items-center mt-4 px-1">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold italic">
              AI Sales Expert
            </p>
            <p className="text-[10px] text-gray-300">sinseungok.com</p>
          </div>
        </form>
      </div>
    </>
  );
}
