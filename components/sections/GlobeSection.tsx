import { Check } from "lucide-react";
import Reveal from "../Reveal";
import GlobeCanvas from "../canvas/GlobeCanvas";

// The decision dimensions behind every system design.
const POINTS = [
  { name: "Quality", text: "evaluation, failure modes and human review" },
  { name: "Latency & cost", text: "service boundaries, orchestration overhead, tokens and inference" },
  { name: "Reliability", text: "tracing, quality gates and production monitoring" },
  { name: "Security & privacy", text: "PII safeguards and careful data handling" },
  { name: "Maintainability", text: "modular design, clear interfaces, independent deployment" },
];

// The site's expressive showcase: an atmospheric spatial panel around the globe.
export default function GlobeSection() {
  return (
    <section className="section" id="globe-section">
      <div className="container">
        <div className="globe-panel">
          <Reveal className="globe-copy reveal-left">
            <span className="section-label">Engineering philosophy</span>
            <h2>
              AI is a system design problem, <span className="text-gradient">not only a modeling one.</span>
            </h2>
            <p>
              A capable model is one component of a production solution. The architecture, service
              contracts, data flows, evaluation and operational constraints around it decide whether it
              delivers reliable value — so I start from the problem, choose the technology to fit it,
              design with clear boundaries and validate behavior throughout the lifecycle.
            </p>
            <ul className="globe-list">
              {POINTS.map(({ name, text }) => (
                <li key={name}>
                  <Check />
                  <span>
                    <strong>{name}</strong> — {text}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="globe-visual reveal-right">
            <GlobeCanvas />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
