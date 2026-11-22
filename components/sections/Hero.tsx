import { ArrowRight, Mail } from "lucide-react";
import HeroVisual from "../HeroVisual";

const SPECIALIZATION = [
  "AI Systems Architecture",
  "Backend Engineering",
  "Distributed Systems",
  "Agentic AI",
];

const METRICS = [
  { val: "5+", label: "Years across ML, automation and software" },
  { val: "4", label: "Industries, from banking to healthcare" },
  { val: "10k+", label: "Monthly appointments on a platform I led" },
  { val: "50+", label: "Automation, analytics and ML initiatives" },
];

export default function Hero() {
  return (
    <section id="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="hero-eyebrow">
            <span className="pulse-dot"></span>
            Victor Amarante<span className="hero-eyebrow-sep" aria-hidden="true">·</span>
            <strong>Senior Software Engineer, AI</strong>
          </p>
          <h1 className="hero-title">
            Engineering intelligent
            <br />
            systems <span className="text-gradient">for production.</span>
          </h1>
          <p className="hero-subtitle">
            I design and build reliable, scalable AI-powered software, combining software
            architecture, backend engineering and distributed systems with a strong foundation in
            artificial intelligence and machine learning.
          </p>
          <ul className="hero-specialization" aria-label="Core expertise">
            {SPECIALIZATION.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
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
