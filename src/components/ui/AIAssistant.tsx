"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2 } from "lucide-react";
import Image from "next/image";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const WELCOME = "Olá! Sou o assistente da Helarys. Posso ajudar-te com informações sobre os nossos serviços, processo ou como pedir um orçamento. Em que posso ajudar?";

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const updated: Message[] = [...messages, { role: "user", content: text }];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updated.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.text || "Desculpa, ocorreu um erro." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Desculpa, algo correu mal. Tenta novamente." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed bottom-24 right-6 z-[150] flex w-[340px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-[0_24px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(34,211,238,0.06)]"
            style={{ maxHeight: "min(520px, calc(100vh - 120px))" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#0B0F19] border border-white/10">
                <Image src="/brand/icon.svg" alt="Helarys" width={20} height={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">Helarys Assistant</p>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="text-xs text-zinc-500">Online</span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-zinc-500 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-6 ${
                      msg.role === "user"
                        ? "bg-white text-black rounded-br-sm"
                        : "bg-white/[0.06] text-zinc-200 rounded-bl-sm border border-white/[0.06]"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-white/[0.06] bg-white/[0.06] px-3.5 py-3">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:0ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:300ms]" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="border-t border-white/[0.06] bg-white/[0.02] px-3 py-3">
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#0B0F19] px-3 py-2 focus-within:border-cyan-400/40">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
                  placeholder="Escreve uma mensagem..."
                  className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
                />
                <button
                  onClick={send}
                  disabled={!input.trim() || loading}
                  aria-label="Send message"
                  className="shrink-0 rounded-lg p-1.5 text-zinc-500 transition hover:text-cyan-400 disabled:opacity-30"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-[150] flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-[#0d1117] shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_0_1px_rgba(34,211,238,0.08)] transition-colors hover:border-cyan-400/30 hover:shadow-[0_8px_32px_rgba(34,211,238,0.12)]"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        aria-label="Open Helarys assistant"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              className="text-zinc-400"
            >
              <X className="h-5 w-5" />
            </motion.span>
          ) : (
            <motion.span
              key="logo"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.18 }}
            >
              <Image src="/brand/icon.svg" alt="Helarys" width={28} height={28} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
