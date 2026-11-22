import Reveal from "../Reveal";
import Timeline from "../Timeline";
import { VENTURES } from "@/data/experience";

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
