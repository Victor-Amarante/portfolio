import { ArrowRight, Mail } from "lucide-react";
import HeroVisual from "../HeroVisual";

const METRICS = [
  { val: "5+", label: "Years in production AI" },
  { val: "7.5×", label: "Automated scheduling lift" },
  { val: "4", label: "Industries shipped in" },
  { val: "50+", label: "Automation projects" },
];

export default function Hero() {
  return (
    <section id="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="pulse-dot"></span>Senior Applied AI Engineer · 5+ years in production
          </div>
          <h1 className="hero-title">
            Engineering intelligence,
            <br />
            <span className="text-gradient">from research to scale.</span>
          </h1>
          <p className="hero-subtitle">
            I build LLM-powered and agentic systems on a real mathematical foundation — statistics,
            probability and applied ML — and take them all the way to production: orchestration,
            retrieval, evaluation and observability at scale.
          </p>
          <div className="hero-ctas">
            <a href="#projects" className="btn btn-primary">
              Explore my work
              <ArrowRight />
            </a>
            <a href="#contact" className="btn btn-secondary">
              <Mail />
              Get in touch
            </a>
          </div>
          <ul className="hero-metrics">
            {METRICS.map((m) => (
              <li key={m.label} className="hero-metric">
                <span className="hero-metric-val">{m.val}</span>
                <span className="hero-metric-label">{m.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}
