import { BrainCircuit, Briefcase, GraduationCap, MapPin } from "lucide-react";
import Reveal from "../Reveal";
import { asset } from "@/lib/asset";

const FACTS = [
  {
    Icon: GraduationCap,
    title: "Education",
    text: "B.Sc. Information Systems @ CIn/UFPE (expected Dec 2026) · began in Statistics",
  },
  { Icon: BrainCircuit, title: "Specialization", text: "Artificial Intelligence & Machine Learning" },
  { Icon: MapPin, title: "Based in", text: "Recife, Brazil — working remotely" },
  { Icon: Briefcase, title: "Currently", text: "Getronics, embedded at Banco do Brasil · AI research at CIn/UFPE" },
];

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container about-grid">
        <Reveal className="about-visual reveal-left">
          <div className="about-photo-frame">
            <img src={asset("assets/img/victor.jpg")} alt="Victor Amarante" className="about-photo" />
            <div className="about-badge">
              <span className="about-badge-dot"></span>
              <div>
                <div className="about-badge-title">Available for opportunities</div>
                <div className="about-badge-sub">Remote · Recife, Brazil</div>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal className="about-content reveal-right">
          <span className="section-label">Who I am</span>
          <h2>
            From quantitative foundations to{" "}
            <span className="text-gradient">production software.</span>
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
          <div className="about-facts">
            {FACTS.map(({ Icon, title, text }) => (
              <div key={title} className="about-fact">
                <Icon />
                <div>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
