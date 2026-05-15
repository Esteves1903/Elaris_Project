"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import { Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: string;
  project_id: string;
  sender_role: "admin" | "client";
  content: string;
  created_at: string;
};

const copy = {
  title: { en: "Messages", pt: "Mensagens" },
  placeholder: { en: "Write a message...", pt: "Escreve uma mensagem..." },
  empty: { en: "No messages yet. Send one below.", pt: "Ainda sem mensagens. Envia uma abaixo." },
  sending: { en: "Sending...", pt: "A enviar..." },
};

type Props = {
  projectId: string;
  currentRole: "admin" | "client";
  lang: "en" | "pt";
};

export function MessagesPanel({ projectId, currentRole, lang }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  async function getAuthHeader() {
    const { data: { session } } = await supabase.auth.getSession();
    return { Authorization: `Bearer ${session?.access_token ?? ""}` };
  }

  async function fetchMessages() {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/messages?project_id=${projectId}`, { headers });
    if (!res.ok) return;
    const json = await res.json();
    setMessages(json.messages ?? []);
  }

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 6000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  async function handleSend(e: FormEvent) {
    e.preventDefault();
    if (!input.trim() || sending) return;
    setSending(true);
    const headers = await getAuthHeader();
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify({ project_id: projectId, content: input.trim() }),
    });
    setSending(false);
    if (!res.ok) return;
    const json = await res.json();
    setMessages((prev) => [...prev, json.message]);
    setInput("");
  }

  function formatTime(iso: string) {
    return new Date(iso).toLocaleTimeString(lang === "pt" ? "pt-PT" : "en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString(lang === "pt" ? "pt-PT" : "en-GB", {
      day: "2-digit",
      month: "short",
    });
  }

  // Group messages by date
  const grouped: { date: string; msgs: Message[] }[] = [];
  for (const msg of messages) {
    const date = formatDate(msg.created_at);
    const last = grouped[grouped.length - 1];
    if (last?.date === date) last.msgs.push(msg);
    else grouped.push({ date, msgs: [msg] });
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Message list */}
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto flex flex-col justify-end pr-1">
        {messages.length === 0 ? (
          <p className="text-sm text-zinc-500 text-center py-2">{copy.empty[lang]}</p>
        ) : (
          <div className="space-y-4">
            {grouped.map(({ date, msgs }) => (
              <div key={date}>
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-white/[0.06]" />
                  <span className="text-xs text-zinc-600">{date}</span>
                  <div className="flex-1 h-px bg-white/[0.06]" />
                </div>
                <div className="space-y-2">
                  <AnimatePresence initial={false}>
                    {msgs.map((msg) => {
                      const isOwn = msg.sender_role === currentRole;
                      return (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                        >
                          <div className={`max-w-[78%] rounded-2xl px-4 py-2.5 ${
                            isOwn
                              ? "rounded-br-sm bg-cyan-400/15 border border-cyan-400/20 text-white"
                              : "rounded-bl-sm bg-white/[0.06] border border-white/10 text-zinc-200"
                          }`}>
                            <p className="text-sm leading-relaxed">{msg.content}</p>
                            <p className={`mt-1 text-[10px] ${isOwn ? "text-cyan-400/60 text-right" : "text-zinc-600"}`}>
                              {formatTime(msg.created_at)}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={copy.placeholder[lang]}
          disabled={sending}
          className="flex-1 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-400/40 focus:bg-white/[0.07] disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={!input.trim() || sending}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-400/15 border border-cyan-400/20 text-cyan-400 transition hover:bg-cyan-400/25 disabled:opacity-40"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
