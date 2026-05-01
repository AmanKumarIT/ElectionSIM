"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { askAI } from "@/lib/api";

const SUGGESTIONS = [
  "What are the phases of an Indian election?",
  "How does the EVM (Electronic Voting Machine) work?",
  "What is the Model Code of Conduct?",
  "Who is eligible to vote in India?",
  "What happens if there is a tie between candidates?",
  "How are election results declared?",
  "What is NOTA and what happens if NOTA wins?",
  "Explain the role of the Election Commission of India",
];

type Msg = { role: "user" | "ai"; text: string };

export default function AssistantPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Hello! I'm ElectionSim AI, your election education assistant. Ask me anything about Indian elections, voting processes, or democratic systems. I'm here to provide factual, unbiased information. 🗳️" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async (q?: string) => {
    const question = q || input.trim();
    if (!question) return;
    setMessages((m) => [...m, { role: "user", text: question }]);
    setInput("");
    setLoading(true);
    try {
      const res = await askAI(question);
      setMessages((m) => [...m, { role: "ai", text: res.answer }]);
    } catch {
      setMessages((m) => [...m, { role: "ai", text: "Unable to connect to the AI service." }]);
    }
    setLoading(false);
  };

  return (
    <main>
      <div className="container section">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24, maxWidth: 1100, margin: "0 auto", height: "calc(100vh - 200px)" }}>
          {/* Chat area */}
          <div className="glass-card" style={{ display: "flex", flexDirection: "column", minHeight: 0 }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 18 }}>
              🤖 AI Election Assistant
              <span style={{ fontSize: 12, color: "var(--text-muted)", marginLeft: 8 }}>Powered by Indian Constitution</span>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  className={`chat-message chat-message--${m.role}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {m.text}
                </motion.div>
              ))}
              {loading && (
                <div className="chat-message chat-message--ai">
                  <div className="loading" style={{ padding: 0, justifyContent: "flex-start" }}>
                    <div className="loading-dot" /><div className="loading-dot" /><div className="loading-dot" />
                  </div>
                </div>
              )}
            </div>
            <div className="chat-input-row">
              <input
                className="chat-input"
                placeholder="Ask anything about elections..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
              />
              <button className="btn btn--primary btn--sm" onClick={() => send()} disabled={loading}>
                Send
              </button>
            </div>
          </div>

          {/* Suggestions sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, overflowY: "auto", paddingRight: 4 }}>
            <div className="label-caps" style={{ padding: "0 4px" }}>Suggested Questions</div>
            {SUGGESTIONS.map((s) => (
              <motion.button
                key={s}
                className="glass-card"
                style={{ cursor: "pointer", textAlign: "left", padding: "14px 16px", fontSize: 13, color: "var(--text-secondary)", border: "1px solid var(--border)", fontFamily: "var(--font-body)", flexShrink: 0 }}
                whileHover={{ scale: 1.02, borderColor: "rgba(99,102,241,0.4)" }}
                onClick={() => send(s)}
              >
                {s}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
