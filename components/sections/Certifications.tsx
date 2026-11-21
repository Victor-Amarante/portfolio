import { BadgeCheck } from "lucide-react";
import Reveal from "../Reveal";

const CERTS = [
  { title: "Building Agents with Agno", issuer: "Asimov Academy · 2025" },
  { title: "Multi-Agent Systems with CrewAI", issuer: "Asimov Academy · 2025" },
  { title: "Knowledge Graphs for RAG", issuer: "DeepLearning.AI · 2025" },
  { title: "Functions, Tools & Agents with LangChain", issuer: "DeepLearning.AI · 2024" },
  { title: "LangChain for LLM App Development", issuer: "DeepLearning.AI · 2024" },
  { title: "LangChain: Chat with Your Data", issuer: "DeepLearning.AI · 2024" },
  { title: "ChatGPT Prompt Engineering for Devs", issuer: "DeepLearning.AI · 2024" },
  { title: "Developing Chatbots", issuer: "Rocketseat · 2025" },
];

export default function Certifications() {
  return (
    <section className="section" id="certs">
      <div className="section-sep"></div>
      <div className="container">
        <Reveal className="section-header reveal">
          <span className="section-label">Continuous Learning</span>
          <h2>
            Certifications &amp; <span className="text-gradient">credentials</span>
          </h2>
        </Reveal>
        <Reveal className="certs-grid reveal">
          {CERTS.map((c) => (
            <div key={c.title} className="cert-item">
              <BadgeCheck />
              <div>
                <strong>{c.title}</strong>
                <span>{c.issuer}</span>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
