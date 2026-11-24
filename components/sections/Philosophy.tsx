import type { CSSProperties } from "react";
import Reveal from "../Reveal";

// The decision dimensions behind every system design.
const POINTS = [
  { name: "Quality", text: "evaluation, failure modes and human review" },
  { name: "Latency & cost", text: "service boundaries, orchestration overhead, tokens and inference" },
  { name: "Reliability", text: "tracing, quality gates and production monitoring" },
  { name: "Security & privacy", text: "PII safeguards and careful data handling" },
  { name: "Maintainability", text: "modular design, clear interfaces, independent deployment" },
];

// Everything around the model, placed on a 6×5 grid: [label, column, row].
// The model gets an ordinary cell but draws itself as a small square inside it.
const BOXES: [string, string, string][] = [
  ["Data ingestion", "1 / 3", "1 / 2"],
  ["Retrieval & embeddings", "3 / 5", "1 / 2"],
  ["Service contracts & APIs", "5 / 7", "1 / 2"],
  ["Orchestration & routing", "1 / 3", "2 / 4"],
  ["Prompt & config versioning", "3 / 4", "2 / 3"],
  ["Tool integrations", "5 / 7", "2 / 3"],
  ["Guardrails & PII", "3 / 5", "3 / 4"],
  ["Human review", "5 / 7", "3 / 4"],
  ["Evaluation", "1 / 3", "4 / 5"],
  ["Tracing & monitoring", "3 / 5", "4 / 5"],
  ["Latency & cost budgets", "5 / 7", "4 / 5"],
  ["Serving infrastructure & deployment", "1 / 7", "5 / 6"],
];

// Engineering philosophy, argued with a figure.
export default function Philosophy() {
  return (
    <section className="section" id="philosophy">
      <div className="container philosophy">
        <Reveal className="philosophy-copy reveal">
          <span className="section-label">Engineering philosophy</span>
          <h2>
            The model is the smallest box in the diagram.{" "}
            <span className="h-soft">The rest is engineering.</span>
          </h2>
          <p>
            A capable model is one component of a production solution. The architecture, service
            contracts, data flows, evaluation and operational constraints around it decide whether it
            delivers reliable value — so I start from the problem, choose the technology to fit it,
            design with clear boundaries and validate behavior throughout the lifecycle.
          </p>
          <dl className="philosophy-points">
            {POINTS.map(({ name, text }) => (
              <div key={name}>
                <dt>{name}</dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className="sysfig-wrap reveal">
          <figure className="sysfig">
            <div className="sysfig-grid" aria-hidden="true">
              {BOXES.map(([label, col, row], i) => (
                <span
                  key={label}
                  className="sysfig-box"
                  style={{ gridColumn: col, gridRow: row, "--i": i } as CSSProperties}
                >
                  {label}
                </span>
              ))}
              <span
                className="sysfig-model-cell"
                style={{ gridColumn: "4 / 5", gridRow: "2 / 3", "--i": BOXES.length } as CSSProperties}
              >
                <span className="sysfig-model">model</span>
              </span>
            </div>
            <figcaption>
              <span className="fig-num">Fig. 1</span> Where the model sits in a production AI system.
              After the figure in Sculley et al.,{" "}
              <cite>Hidden Technical Debt in Machine Learning Systems</cite> (NeurIPS 2015) — still true
              with LLMs.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
