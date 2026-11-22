import { BrainCircuit, GraduationCap, Languages, MapPin } from "lucide-react";
import Reveal from "../Reveal";
import { asset } from "@/lib/asset";

const FACTS = [
  { Icon: GraduationCap, title: "Education", text: "Information Systems @ CIn/UFPE · from Statistics" },
  { Icon: BrainCircuit, title: "Specialization", text: "LLMs & Agentic Systems · RAG/GraphRAG" },
  { Icon: MapPin, title: "Based in", text: "Recife, Brazil — working globally" },
  { Icon: Languages, title: "Currently", text: "Senior Applied AI Engineer @ Getronics · AI Researcher @ CIn" },
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
            An Applied AI Engineer who <span className="text-gradient">builds systems that ship.</span>
          </h2>
          <p className="about-lead">
            I&apos;m Victor Amarante, a Senior Applied AI Engineer working on{" "}
            <strong>LLMs &amp; agentic systems</strong>. I started in <strong>Statistics</strong> at
            UFPE&apos;s CCEN — probability, linear algebra, numerical calculus — and transferred to
            Information Systems at the <strong>CIn/UFPE</strong> to pair that math with real systems
            engineering.
          </p>
          <p>
            The progression was a natural one: statistics → classical machine learning → deep
            learning → LLMs → agentic systems. Each layer still runs underneath the next. It&apos;s
            why I can reason about what actually happens inside a model <em>and</em> put it in
            production across <strong>healthcare, fintech, legal and logistics</strong>.
          </p>
          <p>
            Today my focus is autonomous intelligent systems: LLM orchestration, agentic workflows,
            and RAG/GraphRAG retrieval — built to be observable, evaluated and reliable under real
            traffic.
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
