import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../Reveal";

// `flag` marks internal work (rendered as a static card); `href` turns the
// card into an outbound link with an arrow instead.
type Project = {
  title: string;
  sub: string;
  desc: ReactNode;
  tags: string[];
  flag?: string;
  href?: string;
};

const PROJECTS: Project[] = [
  {
    title: "Zup SDD Agents",
    flag: "Research",
    sub: "Spec-driven development as a multi-agent pipeline",
    desc: (
      <>
        A ~19-node LangGraph state machine that carries a User Story all the way to committed code
        — role-specialized agents, a dual quality gate separating technical verification from
        business curation, and human-in-the-loop interrupts. Built at CIn/UFPE with Zup Innovation.
      </>
    ),
    tags: ["LangGraph", "SLMs", "LoRA", "Multi-Agent"],
  },
  {
    title: "Amigo Flow",
    flag: "Production",
    sub: "Supervised multi-agent system for the patient journey",
    desc: (
      <>
        Orchestrator and specialist agents covering scheduling, confirmation and triage across tens
        of thousands of monthly appointments — <strong>7.5×</strong> automated scheduling,{" "}
        <strong>200%+</strong> confirmation rate and <strong>~90%</strong> better response quality
        after the multi-agent redesign.
      </>
    ),
    tags: ["Multi-Agent", "LangGraph", "LangSmith", "FastAPI"],
  },
  {
    title: "GraphRAG for Logistics",
    flag: "Production",
    sub: "Knowledge graph + vector search over siloed data",
    desc: (
      <>
        A Neo4j knowledge graph paired with vector retrieval so a logistics platform could answer
        questions that span systems — entity-relationship traversal where flat semantic search
        returned fragments. Delivered at C.E.S.A.R.
      </>
    ),
    tags: ["GraphRAG", "Neo4j", "pgvector", "Bedrock"],
  },
  {
    title: "Redduo.AI",
    flag: "1st · PoloTec 2024",
    sub: "LLM-based essay grading for Brazil's ENEM",
    desc: (
      <>
        An AI platform that grades ENEM essays against the exam&apos;s five official competencies
        and returns structured feedback — first place at the PoloTec Pre-Incubation &amp; DemoDay
        2024.
      </>
    ),
    tags: ["LLMs", "Prompt Engineering", "Evals", "Python"],
  },
  {
    title: "Conecte.se",
    href: "https://github.com/Victor-Amarante/conecte.se",
    sub: "Real-time public-transit monitoring chatbot",
    desc: (
      <>
        A WhatsApp-integrated AI chatbot monitoring Recife&apos;s bus fleet in real time —
        geographic query systems delivering accurate arrival estimates and vehicle location for
        citizens.
      </>
    ),
    tags: ["FastAPI", "LangChain", "Groq", "React"],
  },
  {
    title: "InsightTalk.AI",
    href: "https://github.com/Victor-Amarante/ai-agent-data-analysis",
    sub: "AI agent for data analysis via voice",
    desc: (
      <>
        A voice-interactive conversational agent for natural-language data exploration — LLMs +
        LangChain + Whisper (ASR) + TTS, with dynamic routes for real-time analytical queries.
      </>
    ),
    tags: ["LangChain", "Whisper", "TTS", "FastAPI"],
  },
];

function ProjectBody({ project, index }: { project: Project; index: number }) {
  return (
    <>
      <div className="pc-grid"></div>
      <div className="project-top">
        <div className="project-index">{String(index + 1).padStart(2, "0")}</div>
        {project.flag && <span className="project-flag">{project.flag}</span>}
        {project.href && <ArrowUpRight className="project-arrow" />}
      </div>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-sub">{project.sub}</p>
      <p className="project-desc">{project.desc}</p>
      <div className="project-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="int-badge">
            {tag}
          </span>
        ))}
      </div>
    </>
  );
}

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="section-sep"></div>
      <div className="container">
        <Reveal className="section-header reveal">
          <span className="section-label">Selected Projects</span>
          <h2>
            Things I&apos;ve designed <span className="text-gradient">and shipped</span>
          </h2>
          <p>
            The systems I&apos;m proudest of — multi-agent pipelines and retrieval architectures
            running in production, plus open-source work you can read end to end.
          </p>
        </Reveal>
        <Reveal className="projects-grid stagger-up">
          {PROJECTS.map((project, i) =>
            project.href ? (
              <a
                key={project.title}
                className="project-card reveal-child"
                href={project.href}
                target="_blank"
                rel="noopener"
              >
                <ProjectBody project={project} index={i} />
              </a>
            ) : (
              <div key={project.title} className="project-card project-card-static reveal-child">
                <ProjectBody project={project} index={i} />
              </div>
            )
          )}
        </Reveal>
      </div>
    </section>
  );
}
