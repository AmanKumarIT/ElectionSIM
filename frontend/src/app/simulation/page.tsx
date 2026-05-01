"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { startSimulation, submitAction, SimSession, SimStep } from "@/lib/api";

const ROLES = [
  { id: "voter", icon: "🗳️", title: "Voter", desc: "Experience the voting journey" },
  { id: "candidate", icon: "👤", title: "Candidate", desc: "Contest in an election" },
  { id: "officer", icon: "👮", title: "Election Officer", desc: "Manage a polling booth" },
];

export default function SimulationPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [session, setSession] = useState<SimSession | null>(null);
  const [loading, setLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: string; text: string }[]>([
    { role: "ai", text: "I can help explain any step in the simulation. Ask me anything about elections!" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const handleStart = async (roleId: string) => {
    setSelectedRole(roleId);
    setLoading(true);
    try {
      const s = await startSimulation(roleId);
      setSession(s);
    } catch {
      // Use local fallback for voter
      setSession({
        session_id: "local",
        role: roleId,
        title: ROLES.find((r) => r.id === roleId)?.title,
        step: {
          id: "start", step_number: 1, total_steps: 8,
          prompt: "Welcome! You are a citizen of India. An election has been announced. Are you registered on the Electoral Roll?",
          info: "Every Indian citizen aged 18+ must be registered on the Electoral Roll to vote.",
          choices: [
            { label: "Yes, I'm registered", action: "registered", next: "check_id" },
            { label: "No, I'm not registered", action: "not_registered", next: "register" },
          ],
        },
        score: 0, status: "active",
      });
    }
    setLoading(false);
  };

  const handleAction = async (action: string) => {
    if (!session) return;
    setLoading(true);
    try {
      const s = await submitAction(session.session_id, action);
      setSession(s);
    } catch {
      // fallback: mark completed
      setSession((prev) => prev ? { ...prev, status: "completed", step: { ...prev.step, is_end: true, prompt: "Simulation step completed! (Backend offline — connect for full experience)", choices: [] }, score: 50 } : null);
    }
    setLoading(false);
  };

  const handleChat = async () => {
    if (!chatInput.trim()) return;
    const q = chatInput;
    setChatMessages((m) => [...m, { role: "user", text: q }]);
    setChatInput("");
    setChatLoading(true);
    try {
      const res = await import("@/lib/api").then((m) => m.askAI(q, session?.step?.prompt));
      setChatMessages((m) => [...m, { role: "ai", text: res.answer }]);
    } catch {
      setChatMessages((m) => [...m, { role: "ai", text: "Unable to connect to AI. Please ensure the backend is running." }]);
    }
    setChatLoading(false);
  };

  const step = session?.step;
  const progress = step?.step_number && step?.total_steps ? (step.step_number / step.total_steps) * 100 : 0;
  const circumference = 2 * Math.PI * 42;

  return (
    <main>
      <div className="container section">
        <div className="sim-layout">
          {/* Left Sidebar */}
          <div className="sim-sidebar">
            <div className="label-caps" style={{ padding: "0 4px" }}>Select Role</div>
            {ROLES.map((r) => (
              <motion.div
                key={r.id}
                className={`glass-card sim-role-card ${selectedRole === r.id ? "glass-card--active" : ""}`}
                onClick={() => handleStart(r.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="sim-role-card__icon">{r.icon}</div>
                <div>
                  <div className="sim-role-card__title">{r.title}</div>
                  <div className="sim-role-card__desc">{r.desc}</div>
                </div>
              </motion.div>
            ))}

            {session && (
              <div className="glass-card sim-progress">
                <div className="label-caps" style={{ marginBottom: 12 }}>Progress</div>
                <div className="progress-ring">
                  <svg width="100" height="100" className="progress-ring__svg">
                    <defs>
                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="42" className="progress-ring__bg" />
                    <circle
                      cx="50" cy="50" r="42" className="progress-ring__fill"
                      strokeDasharray={circumference}
                      strokeDashoffset={circumference - (circumference * progress) / 100}
                    />
                  </svg>
                  <div className="progress-ring__text">
                    {step?.step_number || 0}/{step?.total_steps || 0}
                  </div>
                </div>
                <div className="sim-score">Score: {session.score}</div>
              </div>
            )}
          </div>

          {/* Center: Decision Panel */}
          <div className="glass-card sim-decision">
            <AnimatePresence mode="wait">
              {!session ? (
                <motion.div key="prompt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center", padding: "60px 20px" }}>
                  <div style={{ fontSize: 64, marginBottom: 16 }}>🎮</div>
                  <div className="heading-md">Select a Role to Begin</div>
                  <p className="text-body" style={{ marginTop: 8 }}>Choose Voter, Candidate, or Officer from the sidebar</p>
                </motion.div>
              ) : loading ? (
                <motion.div key="loading" className="loading">
                  <div className="loading-dot" /><div className="loading-dot" /><div className="loading-dot" />
                </motion.div>
              ) : step?.is_end ? (
                <motion.div key="end" className="sim-end-badge" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                  <div className="sim-end-badge__icon">{session.outcome === "success" ? "🎉" : "📋"}</div>
                  <div className="heading-md" style={{ marginBottom: 8 }}>Simulation Complete!</div>
                  <p className="text-body">{step.prompt}</p>
                  <div className="sim-end-badge__score" style={{ marginTop: 16 }}>{session.score}/100</div>
                  <p className="label-caps" style={{ marginTop: 4 }}>Final Score</p>
                  {step.info && (
                    <div className="sim-decision__info" style={{ marginTop: 20, textAlign: "left" }}>
                      <span className="sim-decision__info-icon">💡</span>
                      <span>{step.info}</span>
                    </div>
                  )}
                  <button className="btn btn--primary" style={{ marginTop: 24 }} onClick={() => { setSession(null); setSelectedRole(null); }}>
                    Try Another Role
                  </button>
                </motion.div>
              ) : (
                <motion.div key={step?.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
                  <div className="label-caps" style={{ marginBottom: 8 }}>
                    {session.title || session.role} — Step {step?.step_number}
                  </div>
                  <div className="sim-decision__prompt">{step?.prompt}</div>
                  {step?.info && (
                    <div className="sim-decision__info">
                      <span className="sim-decision__info-icon">💡</span>
                      <span>{step.info}</span>
                    </div>
                  )}
                  <div className="sim-choices">
                    {step?.choices.map((c, i) => (
                      <motion.button
                        key={c.action}
                        className="btn btn--choice"
                        onClick={() => handleAction(c.action)}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.01 }}
                      >
                        {c.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Chat */}
          <div className="glass-card chat-panel">
            <div className="chat-panel__header">🤖 AI Assistant</div>
            <div className="chat-panel__messages">
              {chatMessages.map((m, i) => (
                <div key={i} className={`chat-message chat-message--${m.role}`}>{m.text}</div>
              ))}
              {chatLoading && (
                <div className="chat-message chat-message--ai">
                  <div className="loading" style={{ padding: 4 }}>
                    <div className="loading-dot" /><div className="loading-dot" /><div className="loading-dot" />
                  </div>
                </div>
              )}
            </div>
            <div className="chat-suggestions">
              {["What is EPIC?", "How does EVM work?", "Who can contest?"].map((s) => (
                <button key={s} className="chat-chip" onClick={() => { setChatInput(s); }}>
                  {s}
                </button>
              ))}
            </div>
            <div className="chat-input-row">
              <input
                className="chat-input"
                placeholder="Ask about elections..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleChat()}
              />
              <button className="btn btn--primary btn--sm" onClick={handleChat}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
