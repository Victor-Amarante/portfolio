import { Fragment } from "react";
import Reveal from "../Reveal";
import Timeline from "../Timeline";
import { VENTURES } from "@/data/experience";

// Career journey — phases overlap; the last one is where the work is now.
const EVOLUTION = [
  "Statistics & Applied ML",
  "Intelligent Automation",
  "Generative AI & Backend Engineering",
  "Production Agentic Systems",
  "Enterprise AI Systems Engineering",
];

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <Reveal className="section-header reveal">
          <span className="section-label">Experience</span>
          <h2>
            From statistics to <span className="text-gradient">production AI systems</span>
          </h2>
          <p>
            One continuous progression: statistical consulting, intelligent automation, generative AI
            and backend architecture, then agentic systems in production — across banking, healthcare,
            logistics and legal operations.
          </p>
        </Reveal>

        <Reveal className="reveal">
          <ol className="evo-path" aria-label="Career journey">
            {EVOLUTION.map((label, i) => (
              <Fragment key={label}>
                {i > 0 && <li className="evo-line" aria-hidden="true"></li>}
                <li
                  className={i === EVOLUTION.length - 1 ? "evo-node evo-current" : "evo-node"}
                  aria-current={i === EVOLUTION.length - 1 ? "step" : undefined}
                >
                  <span className="evo-dot"></span>
                  <span className="evo-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="evo-label">{label}</span>
                </li>
              </Fragment>
            ))}
          </ol>
        </Reveal>

        <Timeline />

        {/* Research, ventures & community */}
        <h3 className="ventures-head" id="research">
          Research, ventures &amp; community
        </h3>
        <Reveal className="ventures reveal">
          {VENTURES.map(({ Icon, role, org, meta, wide, text }) => (
            <div key={org} className={wide ? "venture-card venture-wide" : "venture-card"}>
              <div className="venture-icon">
                <Icon />
              </div>
              <div className="venture-role">{role}</div>
              <div className="venture-org">{org}</div>
              <div className="venture-meta">{meta}</div>
              <p>{text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
