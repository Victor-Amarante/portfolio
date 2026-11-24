import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../Reveal";

// Each row is a short case study: what it is (`sub`), Victor's part in it
// (`role`), then contribution and outcome (`desc`). `flag` marks internal
// work; `href` turns the row into an outbound link with an arrow, labelled
// with where it goes (GitHub, or the company/product site's domain — not
// necessarily the project itself). `id` is the anchor the Expertise section links
// to. `ratios` draws before/after bars — only for measured increases, with
// the baseline at 1. Enterprise work stays at a non-confidential level.
type Project = {
  id: string;
  title: string;
  role: string;
  sub: string;
  desc: ReactNode;
  tags: string[];
  flag?: string;
  href?: string;
  ratios?: { label: string; value: number; text: string }[];
};

const PROJECTS: Project[] = [
  {
    id: "card-services",
    title: "Card-Services AI Assistant",
    flag: "Enterprise · Current",
    href: "https://www.bb.com.br/site/",
    role: "Senior Software Engineer, AI · Getronics at Banco do Brasil",
    sub: "A banking assistant designed for millions of users",
    desc: (
      <>
        An orchestrator and specialist services run as independent microservices, integrated with
        banking systems over REST, MCP and A2A. My work spans the architecture and implementation,
        PII and input/output safeguards, and failure diagnosis with OpenTelemetry — weighing response
        quality against latency, token consumption and inference cost.
      </>
    ),
    tags: ["Multi-Agent", "Microservices", "MCP", "A2A", "OpenTelemetry"],
  },
  {
    id: "amigo-flow",
    title: "Amigo Flow",
    flag: "Production",
    href: "https://www.amigotech.com.br/produtos/amigo-flow",
    role: "Led engineering · Amigo Tech",
    sub: "Multi-agent RAG system for the patient journey",
    desc: (
      <>
        An orchestrator, specialist agents and dedicated RAG pipelines supporting tens of thousands of
        monthly appointments. I redesigned the core AI application architecture and set up
        version-controlled prompts, iterative evaluation, token-consumption analysis and LangSmith
        tracing. Automated scheduling grew <strong>7.5×</strong>, confirmations more than{" "}
        <strong>200%</strong>, and response quality and accuracy improved by about{" "}
        <strong>90%</strong>.
      </>
    ),
    tags: ["Multi-Agent", "RAG", "LangGraph", "LangSmith", "FastAPI"],
    ratios: [
      { label: "Automated scheduling", value: 7.5, text: "7.5×" },
      // "more than 200%" — drawn at the floor, 3× the baseline
      { label: "Confirmations", value: 3, text: "+200%" },
    ],
  },
  {
    id: "zup-sdd",
    title: "Zup SDD Agents",
    flag: "Research",
    href: "https://github.com/athospugliese/cin-zup-agents",
    role: "Architect · CIn/UFPE with Zup Innovation",
    sub: "Agentic software engineering, from user story to committed code",
    desc: (
      <>
        A LangGraph state machine that takes a user story through specification, supervised
        planning, specialist execution, verification and business review. Persistent agent
        handoffs, structured reasoning events, SSE streaming and optional tracing make each run
        inspectable; technical quality gates and business-alignment checks with human-in-the-loop
        checkpoints keep it on track. The research around it — role-specialized small language
        models — is ongoing.
      </>
    ),
    tags: ["LangGraph", "SSE", "Human-in-the-loop", "SLMs", "LoRA", "Multi-Agent"],
  },
  {
    id: "retrieval",
    title: "Enterprise Retrieval & GraphRAG",
    flag: "Enterprise",
    href: "https://www.cesar.org.br/",
    role: "AI Engineer · C.E.S.A.R",
    sub: "Retrieval architectures over siloed enterprise data",
    desc: (
      <>
        Semantic search and contextual generation on PostgreSQL/pgvector, and a Neo4j GraphRAG
        solution that combines vector search with entity-relationship traversal over previously
        siloed logistics data — fed by an LLM-enriched ingestion platform and containerized pipelines
        on AWS and GCP.
      </>
    ),
    tags: ["RAG", "GraphRAG", "pgvector", "Neo4j", "Bedrock", "AWS"],
  },
  {
    id: "redduo",
    title: "Redduo.AI",
    flag: "1st · PoloTec 2024",
    role: "Co-founder & ML Engineer",
    sub: "LLM-powered feedback on ENEM essays",
    desc: (
      <>
        Personalized feedback on essays for Brazil&apos;s ENEM exam. I owned the data pipelines,
        backend architecture, cloud and model integrations, scalability and evaluation consistency.
        First place at UFPE&apos;s PoloTec Pre-Incubation and DemoDay 2024.
      </>
    ),
    tags: ["LLMs", "NLP", "Prompt Engineering", "Evals", "Python"],
  },
  {
    id: "conecte",
    title: "Conecte.se",
    href: "https://github.com/Victor-Amarante/conecte.se",
    role: "Open source",
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
    id: "insighttalk",
    title: "InsightTalk.AI",
    href: "https://github.com/Victor-Amarante/ai-agent-data-analysis",
    role: "Open source",
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

function Ratios({ ratios }: { ratios: NonNullable<Project["ratios"]> }) {
  const max = Math.max(...ratios.map((r) => r.value));
  return (
    <dl className="ratios">
      {ratios.map((r) => (
        <div key={r.label} className="ratio">
          <dt>{r.label}</dt>
          <dd>
            <span className="ratio-bars" aria-hidden="true">
              <span className="ratio-before" style={{ width: `${100 / max}%` }}></span>
              <span className="ratio-after" style={{ width: `${(r.value / max) * 100}%` }}></span>
            </span>
            <span className="ratio-val">{r.text}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

// "https://www.bb.com.br/site/" → "bb.com.br"; GitHub links just say GitHub
function linkLabel(href: string) {
  const host = new URL(href).hostname.replace(/^www\./, "");
  return host === "github.com" ? "GitHub" : host;
}

function ProjectBody({ project, index }: { project: Project; index: number }) {
  return (
    <>
      <div className="project-meta">
        <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
        {project.flag && <span className="project-flag">{project.flag}</span>}
        {project.href && <span className="project-flag">{linkLabel(project.href)}</span>}
      </div>
      <div className="project-head">
        <h3 className="project-title">
          {project.title}
          {project.href && <ArrowUpRight className="project-arrow" aria-hidden="true" />}
        </h3>
        <p className="project-role">{project.role}</p>
      </div>
      <div className="project-body">
        <p className="project-sub">{project.sub}</p>
        <p className="project-desc">{project.desc}</p>
        {project.ratios && <Ratios ratios={project.ratios} />}
        <p className="project-tags">{project.tags.join(" · ")}</p>
      </div>
    </>
  );
}

export default function Projects() {
  return (
    <section className="section section-alt" id="projects">
      <div className="container">
        <Reveal className="section-header reveal">
          <span className="section-label">Selected work</span>
          <h2>
            Systems I&apos;ve built, <span className="h-soft">and what changed after.</span>
          </h2>
          <p>
            Production, enterprise and research work — my part in each, the engineering behind it and
            the measured result — plus open-source projects you can read end to end. Enterprise work
            is described at a non-confidential level.
          </p>
        </Reveal>
        <Reveal className="projects-list stagger-up">
          {PROJECTS.map((project, i) =>
            project.href ? (
              <a
                key={project.id}
                id={`work-${project.id}`}
                className="project-row reveal-child"
                href={project.href}
                target="_blank"
                rel="noopener"
              >
                <ProjectBody project={project} index={i} />
              </a>
            ) : (
              <article key={project.id} id={`work-${project.id}`} className="project-row reveal-child">
                <ProjectBody project={project} index={i} />
              </article>
            )
          )}
        </Reveal>
      </div>
    </section>
  );
}
