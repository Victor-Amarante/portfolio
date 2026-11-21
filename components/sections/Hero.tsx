import { Fragment } from "react";
import { Mail, Sparkles } from "lucide-react";
import HeroCanvas from "../canvas/HeroCanvas";

const METRICS = [
  { val: "5+", label: "Years in production AI" },
  { val: "7.5×", label: "Automated scheduling lift" },
  { val: "4", label: "Industries shipped in" },
  { val: "50+", label: "Automation projects" },
];

export default function Hero() {
  return (
    <section id="hero">
      <HeroCanvas />
      <div className="hero-orb hero-orb-1"></div>
      <div className="hero-orb hero-orb-2"></div>
      <div className="hero-orb hero-orb-3"></div>
      <div className="hero-stars">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <div key={n} className={`hero-star hero-star-${n}`}></div>
        ))}
      </div>
      <div className="hero-orbits">
        {[1, 2, 3].map((n) => (
          <div key={n} className={`hero-orbit hero-orbit-${n}`}>
            <div className="hero-orbit-dot"></div>
          </div>
        ))}
      </div>
      <div className="hero-content">
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
          <a href="#projects" className="btn-hero-primary">
            <Sparkles />
            Explore my work
          </a>
          <a href="#contact" className="btn-hero-ghost">
            <Mail />
            Get in touch
          </a>
        </div>
        <div className="hero-metrics">
          {METRICS.map((m, i) => (
            <Fragment key={m.label}>
              {i > 0 && <div className="hero-metric-sep"></div>}
              <div className="hero-metric">
                <span className="hero-metric-val">{m.val}</span>
                <span className="hero-metric-label">{m.label}</span>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      <a href="#about" className="hero-scroll" aria-label="Scroll down">
        <span></span>
      </a>
    </section>
  );
}
