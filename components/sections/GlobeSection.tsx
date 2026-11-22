import { Check } from "lucide-react";
import Reveal from "../Reveal";
import GlobeCanvas from "../canvas/GlobeCanvas";

const POINTS = [
  "Autonomous agents that reason, plan and act",
  "Knowledge graphs unifying siloed enterprise data",
  "Enterprise-grade safety, PII handling & compliance",
  "Observable, evaluated, cost-optimized at scale",
];

// The site's expressive showcase: an atmospheric spatial panel around the globe.
export default function GlobeSection() {
  return (
    <section className="section" id="globe-section">
      <div className="container">
        <div className="globe-panel">
          <Reveal className="globe-copy reveal-left">
            <span className="section-label">The intelligence layer</span>
            <h2>
              Distributed systems that <span className="text-gradient">reason and act.</span>
            </h2>
            <p>
              I build AI agents with contextual memory, autonomous reasoning and generative
              capabilities — orchestrating LLMs and complex interaction flows into distributed
              intelligent systems that connect, retrieve and decide across an entire organization.
            </p>
            <ul className="globe-list">
              {POINTS.map((point) => (
                <li key={point}>
                  <Check />
                  {point}
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
