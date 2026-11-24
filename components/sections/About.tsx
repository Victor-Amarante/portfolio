import Reveal from "../Reveal";
import { asset } from "@/lib/asset";

const FACTS = [
  { title: "Education", text: "B.Sc. Information Systems, CIn/UFPE — expected Dec 2026. Began in Statistics." },
  { title: "Specialization", text: "Artificial Intelligence & Machine Learning" },
  { title: "Currently", text: "Getronics, embedded at Banco do Brasil · AI research at CIn/UFPE" },
];

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container about-grid">
        <Reveal className="about-visual reveal">
          <figure className="about-photo-frame">
            <img src={asset("assets/img/victor.jpg")} alt="Victor Amarante" className="about-photo" />
            <figcaption>
              <span className="about-status"></span>
              Available for opportunities · remote, from Recife
            </figcaption>
          </figure>
        </Reveal>
        <Reveal className="about-content reveal">
          <span className="section-label">Who I am</span>
          <h2>
            I came to software through statistics.{" "}
            <span className="h-soft">It still shapes how I build.</span>
          </h2>
          <p className="about-lead">
            I&apos;m Victor Amarante, a <strong>Senior Software Engineer</strong> specializing in{" "}
            <strong>Artificial Intelligence and Machine Learning</strong>, with 5+ years across
            statistical consulting, intelligent automation, applied ML and production software in
            banking, healthcare, logistics and legal operations.
          </p>
          <p>
            My path into software engineering began with statistics, probability, machine learning and
            intelligent automation. As the work moved from statistical models and automated workflows to
            generative AI applications, I became increasingly focused on the architecture of the
            software that makes AI useful in real products.
          </p>
          <p>
            Today my work brings together <strong>backend engineering, distributed systems, agentic AI
            and system design</strong>. I care about how models behave <em>and</em> about the qualities
            that decide whether they hold up in production: security, maintainability, observability,
            scalability, latency and cost.
          </p>
          <p>
            I enjoy turning complex AI ideas into dependable software, and making the engineering
            decisions that connect what&apos;s technically possible with what a product actually needs.
          </p>
          <dl className="about-facts">
            {FACTS.map(({ title, text }) => (
              <div key={title} className="about-fact">
                <dt>{title}</dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
