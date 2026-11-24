import Reveal from "../Reveal";
import Timeline from "../Timeline";
import CareerChart from "../CareerChart";
import { VENTURES } from "@/data/experience";

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <Reveal className="section-header reveal">
          <span className="section-label">Experience</span>
          <h2>
            From statistics to production AI systems.
          </h2>
          <p>
            Statistical consulting, intelligent automation, generative AI and backend architecture,
            then agentic systems in production — across banking, healthcare, logistics and legal
            operations.
          </p>
        </Reveal>

        <Reveal className="reveal">
          <CareerChart />
        </Reveal>

        <Timeline />

        {/* Research, ventures & community */}
        <h3 className="ventures-head" id="research">
          Research, ventures &amp; community
        </h3>
        <Reveal className="ventures reveal">
          {VENTURES.map(({ role, org, meta, wide, text }) => (
            <div key={org} className={wide ? "venture-card venture-wide" : "venture-card"}>
              <div className="venture-meta">{meta}</div>
              <div className="venture-role">{role}</div>
              <div className="venture-org">{org}</div>
              <p>{text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
