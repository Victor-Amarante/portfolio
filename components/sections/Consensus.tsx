import Reveal from "../Reveal";
import Testimonials from "../Testimonials";

export default function Consensus() {
  return (
    <section id="consensus">
      <div className="section-sep"></div>
      <div className="consensus-inner container">
        <Reveal className="section-header reveal">
          <span className="section-label">
            <span className="pulse-dot"></span>Consensus
          </span>
          <h2>
            The people I&apos;ve <span className="text-gradient">built with</span>
          </h2>
          <p>
            Colleagues, leaders and mentors from the teams and labs where I&apos;ve shipped — in
            their own words.
          </p>
        </Reveal>
        <Reveal className="tstack-wrap reveal">
          <Testimonials />
        </Reveal>
      </div>
    </section>
  );
}
