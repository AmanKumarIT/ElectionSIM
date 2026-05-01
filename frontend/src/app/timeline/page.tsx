"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getTimeline, Phase } from "@/lib/api";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function TimelinePage() {
  const [phases, setPhases] = useState<Phase[]>([]);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTimeline()
      .then((d) => { setPhases(d.phases); setLoading(false); })
      .catch(() => {
        // Fallback data if backend is not running
        setPhases([
          { id: "announcement", step: "Announcement", icon: "📢", day: 0, duration: "Day 0", color: "#6366f1", description: "The Election Commission officially announces the election schedule.", key_activities: ["Model Code of Conduct activated", "Election dates announced", "Transfer of officials", "Monitoring teams deployed"] },
          { id: "nomination", step: "Nomination Filing", icon: "📝", day: 3, duration: "Day 3-7", color: "#8b5cf6", description: "Candidates file nomination papers with the Returning Officer.", key_activities: ["Nomination papers filed", "Security deposit submitted", "Affidavit with details", "Party symbols allocated"] },
          { id: "scrutiny", step: "Scrutiny", icon: "🔍", day: 8, duration: "Day 8-10", color: "#f97316", description: "Returning Officer examines nomination papers for validity.", key_activities: ["Document verification", "Eligibility check", "Invalid nominations rejected", "Withdrawal period"] },
          { id: "campaign", step: "Campaign Period", icon: "📣", day: 10, duration: "Day 10-28", color: "#22c55e", description: "Parties campaign to persuade voters. Must stop 48hrs before polling.", key_activities: ["Public rallies", "Door-to-door outreach", "Media campaigns", "Expenditure monitoring"] },
          { id: "polling", step: "Polling Day", icon: "🗳️", day: 30, duration: "Day 30", color: "#6366f1", description: "Voters cast votes using EVMs at designated polling booths.", key_activities: ["Voting via EVM+VVPAT", "Identity verification", "Indelible ink applied", "Observer monitoring"] },
          { id: "counting", step: "Vote Counting", icon: "📊", day: 32, duration: "Day 32", color: "#f59e0b", description: "Votes counted under supervision with VVPAT verification.", key_activities: ["EVMs opened", "VVPAT verification", "Round-wise results", "Agent observation"] },
          { id: "result", step: "Result Declaration", icon: "🏆", day: 33, duration: "Day 33", color: "#eab308", description: "Winner declared. Government formation begins.", key_activities: ["Winner declared", "Certificate issued", "Results published", "Government formation"] },
        ]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container"><div className="loading">
        <div className="loading-dot" /><div className="loading-dot" /><div className="loading-dot" />
      </div></div>
    );
  }

  const current = phases[active];

  return (
    <main>
      <div className="container">
        <div className="page-header">
          <h1 className="heading-lg text-gradient">Election Timeline</h1>
          <p className="page-header__subtitle">Follow the journey from announcement to results</p>
        </div>

        {/* Timeline Track */}
        <div className="timeline-container">
          <div className="timeline-track">
            {phases.map((phase, i) => (
              <div key={phase.id} style={{ display: "flex", alignItems: "center" }}>
                <motion.div
                  className={`timeline-node ${i === active ? "timeline-node--active" : ""}`}
                  onClick={() => setActive(i)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="timeline-node__circle" style={{ borderColor: i === active ? phase.color : undefined }}>
                    {phase.icon}
                  </div>
                  <div className="timeline-node__label">{phase.step}</div>
                  <div className="timeline-node__day">{phase.duration}</div>
                </motion.div>
                {i < phases.length - 1 && <div className="timeline-connector" />}
              </div>
            ))}
          </div>
        </div>

        {/* Detail Card */}
        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={current.id}
              className="glass-card timeline-detail"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <div className="timeline-detail__header">
                <div className="timeline-detail__icon">{current.icon}</div>
                <div>
                  <div className="timeline-detail__title">{current.step}</div>
                  <div className="timeline-detail__duration">{current.duration}</div>
                </div>
              </div>
              <p className="timeline-detail__desc">{current.description}</p>
              <div className="label-caps" style={{ marginBottom: 12 }}>Key Activities</div>
              <ul className="timeline-detail__activities">
                {current.key_activities.map((a, j) => (
                  <motion.li key={j} className="timeline-detail__activity" initial={fadeUp.hidden} animate={fadeUp.visible} transition={{ delay: j * 0.08 }}>
                    {a}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
