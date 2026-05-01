import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ElectionSim — Interactive Election Education Platform",
  description:
    "Learn Indian election processes through interactive timelines, simulations, and AI-powered education. Experience democracy as a Voter, Candidate, or Election Officer.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Background effects */}
        <div className="bg-grid" />
        <div className="bg-glow bg-glow--primary" />
        <div className="bg-glow bg-glow--secondary" />

        <div className="page-wrapper">
          <nav className="navbar">
            <div className="navbar__inner">
              <a href="/" className="navbar__logo">🗳️ ElectionSim</a>
              <ul className="navbar__links">
                <li><a href="/timeline" className="navbar__link">Timeline</a></li>
                <li><a href="/simulation" className="navbar__link">Simulation</a></li>
                <li><a href="/flowchart" className="navbar__link">Process Flow</a></li>
                <li><a href="/assistant" className="navbar__link">AI Assistant</a></li>
              </ul>
            </div>
          </nav>
          {children}
          <footer className="footer">
            <div className="container">Built for civic education · ElectionSim © 2026</div>
          </footer>
        </div>
      </body>
    </html>
  );
}
