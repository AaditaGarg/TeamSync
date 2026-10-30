import React, { useState, useRef, useEffect } from "react";
import { Send, Users } from "lucide-react";
import { Button, Avatar } from "./ui";
import { currentUser, candidates } from "../data/mockData";

export default function ChatView({ chatMessages, onSendMessage }) {
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText("");
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col lg:flex-row gap-5">
      {/* Left Roster Panel */}
      <div className="lg:w-72 shrink-0 rounded-2xl bg-[#0b121e] border border-white/[0.08] p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <span className="font-head text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Users size={14} className="text-teal-400" />
            <span>Squad Nimbus</span>
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 font-bold border border-emerald-500/30">
            3 Online
          </span>
        </div>

        <div className="space-y-2 flex-1 overflow-y-auto scroll-quiet">
          {/* Active Teammates */}
          <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center gap-3">
            <Avatar user={currentUser} size={36} showVerified={true} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white truncate">{currentUser.name} (You)</span>
                <span className="w-2 h-2 rounded-full bg-teal-400" />
              </div>
              <span className="text-[10px] text-teal-300 font-mono block truncate">{currentUser.role}</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center gap-3">
            <Avatar user={candidates[0]} size={36} showVerified={true} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white truncate">{candidates[0].name}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <span className="text-[10px] text-slate-400 font-mono block truncate">Full-Stack Lead</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center gap-3">
            <Avatar user={candidates[1]} size={36} showVerified={true} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white truncate">{candidates[1].name}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <span className="text-[10px] text-slate-400 font-mono block truncate">Backend & Security</span>
            </div>
          </div>
        </div>

        {/* Channel Info */}
        <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 text-[11px] text-slate-400 font-mono space-y-1">
          <div className="text-teal-300 font-bold">HackThapar 2026 Sprint</div>
          <div>Repository: AaditaGarg/TeamSync</div>
        </div>
      </div>

      {/* Main Chat Thread Area */}
      <div className="flex-1 rounded-2xl bg-[#0f1826] border border-white/[0.08] flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-white/[0.08] bg-slate-900/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
            <div>
              <h3 className="font-head text-sm font-bold text-white">#squad-nimbus-general</h3>
              <p className="text-[11px] text-slate-400">Encrypted internal coordination channel</p>
            </div>
          </div>
          <div className="text-[11px] font-mono text-teal-400">
            Handshake Verified Protocol
          </div>
        </div>

        {/* Message Bubble Feed */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 scroll-quiet">
          {chatMessages.map((msg) => {
            const isMe = msg.sender?.id === currentUser.id;

            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isMe ? "flex-row-reverse" : "flex-row"}`}
              >
                <Avatar user={msg.sender} size={34} showVerified={true} />

                <div className={`max-w-[80%] sm:max-w-md ${isMe ? "items-end" : "items-start"}`}>
                  <div className={`flex items-center gap-2 mb-1 ${isMe ? "justify-end" : "justify-start"}`}>
                    <span className="text-xs font-bold text-white">{msg.sender?.name}</span>
                    <span className="text-[10px] font-mono text-slate-400">{msg.time}</span>
                  </div>

                  <div
                    className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isMe
                        ? "bg-gradient-to-r from-teal-500 to-teal-600 text-slate-950 font-medium rounded-tr-sm shadow-lg shadow-teal-500/15"
                        : "bg-slate-900/90 text-slate-200 border border-white/[0.08] rounded-tl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Box */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-white/[0.08] bg-[#0b121e] flex items-center gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message to Squad Nimbus teammates..."
            className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30"
          />
          <Button type="submit" variant="primary" size="md" disabled={!inputText.trim()}>
            <Send size={15} />
            <span className="hidden sm:inline">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
