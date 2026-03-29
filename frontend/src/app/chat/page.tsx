"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { log } from "@/lib/logger";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const INITIAL: Message = {
  id: "0",
  role: "assistant",
  content: "Hi Tasya. I'm Aura — I'm here whenever you need someone to talk to.",
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([INITIAL]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { log("page.visit", "chat"); }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    log("chat.message", text);
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((p) => [...p, userMsg]);
    setLoading(true);

    try {
      const res = await fetch(`/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-8).map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      setMessages((p) => [...p, { id: (Date.now() + 1).toString(), role: "assistant", content: data.reply }]);
    } catch {
      setMessages((p) => [...p, { id: (Date.now() + 1).toString(), role: "assistant", content: "Lost connection for a moment. Try again?" }]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col pt-16 bg-cream">

      {/* Header */}
      <div className="border-b border-border py-7 px-6 text-center bg-cream">
        <p className="section-label mb-1.5">AI Companion</p>
        <h1 className="heading-display text-4xl text-charcoal italic">Aura</h1>
        <div className="flex items-center justify-center gap-2 mt-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-rose/60 inline-block" />
          <span className="text-xs text-muted tracking-wide">Always here</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-8 max-w-2xl mx-auto w-full">
        <div className="space-y-5">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-rose-pale border border-rose/20 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                    <span className="font-display italic text-rose text-xs">S</span>
                  </div>
                )}
                <div
                  className={`max-w-[72%] px-5 py-3.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-rose text-white rounded-2xl rounded-br-sm"
                      : "bg-white border border-border text-charcoal rounded-2xl rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start items-end gap-3">
              <div className="w-7 h-7 rounded-full bg-rose-pale border border-rose/20 flex items-center justify-center shrink-0">
                <span className="font-display italic text-rose text-xs">S</span>
              </div>
              <div className="bg-white border border-border px-5 py-4 rounded-2xl rounded-bl-sm">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-sand"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="px-5 py-4">
        <div className="max-w-2xl mx-auto flex gap-3 items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
            placeholder="Say something..."
            className="flex-1 bg-cream border border-border rounded-full px-5 py-3 text-sm text-charcoal placeholder:text-muted focus:outline-none focus:border-rose/40 transition-colors"
          />
          <button
            onClick={send}
            disabled={!input.trim() || loading}
            className="w-10 h-10 bg-rose text-white rounded-full flex items-center justify-center hover:bg-rose/90 transition-colors disabled:opacity-40 shrink-0"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
