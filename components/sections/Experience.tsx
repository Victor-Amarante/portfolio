import Reveal from "../Reveal";
import Timeline from "../Timeline";
import { VENTURES } from "@/data/experience";

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <Reveal className="section-header reveal">
          <span className="section-label">Career</span>
          <h2>
            A track record built <span className="text-gradient">in production</span>
          </h2>
          <p>
            Five years across financial institutions, healthcare, R&amp;D centers and legal — always
            owning the full model lifecycle, from conception to production monitoring.
          </p>
        </Reveal>
        <Timeline />

        {/* Parallel ventures */}
        <h3 className="ventures-head">In parallel</h3>
        <Reveal className="ventures reveal">
          {VENTURES.map(({ Icon, role, org, meta, text }) => (
            <div key={org} className="venture-card">
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
