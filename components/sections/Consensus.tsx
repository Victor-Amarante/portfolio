import Reveal from "../Reveal";
import Testimonials from "../Testimonials";

export default function Consensus() {
  return (
    <section className="section section-alt" id="consensus">
      <div className="consensus-inner container">
        <Reveal className="section-header reveal">
          <span className="section-label">In their words</span>
          <h2>
            The people I&apos;ve <span className="h-soft">built with.</span>
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
