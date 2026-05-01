"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const features = [
  { icon: "📅", title: "Election Timeline", desc: "Step-by-step journey through 7 election phases", href: "/timeline" },
  { icon: "🗺️", title: "Process Flow", desc: "Interactive flowchart of the entire election process", href: "/flowchart" },
  { icon: "🎮", title: "Simulation Engine", desc: "Experience elections as a Voter, Candidate, or Officer", href: "/simulation" },
  { icon: "🤖", title: "AI Assistant", desc: "Ask questions about elections powered by Qwen AI", href: "/assistant" },
];

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function HomePage() {
  return (
    <main>
      <div className="container">
        {/* Hero */}
        <motion.section className="hero" initial="hidden" animate="visible" variants={stagger}>
          <motion.span className="label-caps" variants={fadeUp}>Next-Gen Civic Education Platform</motion.span>
          <motion.h1 className="heading-xl" variants={fadeUp}>
            <span className="text-gradient">Understand Democracy.</span>
            <br />Simulate Elections.
          </motion.h1>
          <motion.p className="hero__subtitle" variants={fadeUp}>
            Interactive platform to learn Indian election processes through visualization,
            role-based simulations, and AI-powered education.
          </motion.p>
          <motion.div className="hero__actions" variants={fadeUp}>
            <Link href="/simulation" className="btn btn--cta">🎮 Start Simulation</Link>
            <Link href="/timeline" className="btn btn--ghost">📅 Explore Timeline</Link>
          </motion.div>
        </motion.section>

        {/* Features */}
        <motion.section className="section" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <div className="feature-grid">
            {features.map((f) => (
              <motion.div key={f.title} variants={fadeUp}>
                <Link href={f.href} style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="glass-card feature-card">
                    <div className="feature-card__icon">{f.icon}</div>
                    <div className="feature-card__title">{f.title}</div>
                    <div className="feature-card__desc">{f.desc}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section className="section" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ textAlign: "center" }}>
          <motion.div variants={fadeUp} style={{ display: "flex", justifyContent: "center", gap: "64px", flexWrap: "wrap" }}>
            {[
              { value: "7", label: "Election Phases" },
              { value: "3", label: "Simulation Roles" },
              { value: "18+", label: "Decision Points" },
              { value: "AI", label: "Powered Assistant" },
            ].map((s) => (
              <div key={s.label}>
                <div className="heading-lg text-gradient">{s.value}</div>
                <div className="label-caps" style={{ marginTop: 8 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}
