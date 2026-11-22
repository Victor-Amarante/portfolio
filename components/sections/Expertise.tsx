import {
  Activity, Bot, Brain, Cloud, CodeXml, Database, Server, Users, type LucideIcon,
} from "lucide-react";
import { Fragment } from "react";
import Reveal from "../Reveal";

// Career journey — phases overlap; the last one is where the work is now.
const EVOLUTION = [
  "Statistics & Applied ML",
  "Intelligent Automation",
  "Generative AI & Backend Engineering",
  "Production Agentic Systems",
  "Enterprise AI Systems Engineering",
];

type Card = { Icon: LucideIcon; title: string; tag?: string; wide?: boolean; text: string; badges: string[] };

// Grouped by the engineering problem each set of skills solves; badges are evidence, not a wall of logos.
const CARDS: Card[] = [
  {
    Icon: Bot,
    title: "Agentic AI & LLM Systems",
    tag: "Current focus",
    wide: true,
    text: "Multi-agent orchestration with an orchestrator and specialist services: tool calling, structured outputs, contextual memory and human-in-the-loop checkpoints, connected to enterprise systems through MCP (Model Context Protocol) and A2A (agent-to-agent communication).",
    badges: ["LangGraph", "LangChain", "Agno", "CrewAI", "MCP servers", "A2A", "ReAct"],
  },
  {
    Icon: CodeXml,
    title: "Software Engineering & System Design",
    text: "Backend services designed around clear boundaries: layered and hexagonal architectures, Domain-Driven Design, SOLID and clean code.",
    badges: ["Python", "TypeScript", "FastAPI", "Django", "DDD", "SOLID"],
  },
  {
    Icon: Server,
    title: "Backend & Distributed Systems",
    text: "Microservices, REST APIs and service integrations; state machines, event streaming over Server-Sent Events and tracing across service boundaries.",
    badges: ["Microservices", "REST APIs", "State machines", "SSE"],
  },
  {
    Icon: Brain,
    title: "AI & ML Engineering",
    tag: "Where it started",
    text: "Probability, statistics and linear algebra first; then supervised learning, forecasting, classification, NLP, deep learning and computer vision — YOLO detection and VLM-generated reports.",
    badges: ["PyTorch", "TensorFlow", "Scikit-learn", "Pandas", "NumPy", "SciPy", "Statsmodels", "spaCy", "LoRA", "YOLO", "VLMs"],
  },
  {
    Icon: Database,
    title: "Retrieval & Data Systems",
    text: "RAG and GraphRAG over enterprise data: embeddings, semantic and hybrid search, vector databases, knowledge graphs and LLM-enriched ingestion.",
    badges: ["PostgreSQL", "pgvector", "MongoDB", "Neo4j", "FAISS", "ChromaDB", "LlamaIndex"],
  },
  {
    Icon: Cloud,
    title: "Cloud & Production Infrastructure",
    text: "Containerized services and data pipelines on AWS and GCP, with production monitoring, reliability work and privacy and PII controls.",
    badges: ["AWS", "GCP", "Azure", "Bedrock", "SageMaker", "Vertex AI", "Docker", "Kubernetes"],
  },
  {
    Icon: Activity,
    title: "Evaluation & Observability",
    text: "Prompt versioning, quality gates, distributed tracing and failure analysis — plus token-usage and inference-cost analysis, because quality, latency and cost are design decisions.",
    badges: ["OpenTelemetry", "LangSmith", "MLflow", "Evals"],
  },
  {
    Icon: Users,
    title: "Engineering Delivery",
    text: "Requirements discovery, stakeholder alignment, technical scoping and architecture decisions, carried through cross-functional delivery to production readiness; mentoring along the way.",
    badges: ["Discovery", "Technical scoping", "Mentoring"],
  },
];

export default function Expertise() {
  return (
    <section className="section section-alt" id="expertise">
      <div className="container">
        <Reveal className="section-header reveal">
          <span className="section-label">Core Expertise</span>
          <h2>
            Software engineering,
            <br />
            <span className="text-gradient">specialized in AI</span>
          </h2>
          <p>
            My work connects AI capabilities with the software, infrastructure and engineering
            decisions needed to make them reliable in production: interfaces, orchestration, data,
            security, evaluation, observability, latency and cost.
          </p>
        </Reveal>

        {/* evolution path */}
        <Reveal className="reveal">
          <ol className="evo-path" aria-label="Career journey">
            {EVOLUTION.map((label, i) => (
              <Fragment key={label}>
                {i > 0 && <li className="evo-line" aria-hidden="true"></li>}
                <li
                  className={i === EVOLUTION.length - 1 ? "evo-node evo-current" : "evo-node"}
                  aria-current={i === EVOLUTION.length - 1 ? "step" : undefined}
                >
                  <span className="evo-dot"></span>
                  <span className="evo-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="evo-label">{label}</span>
                </li>
              </Fragment>
            ))}
          </ol>
        </Reveal>

        <Reveal className="bento-grid stagger-up" id="bentoGrid">
          {CARDS.map(({ Icon, title, tag, wide, text, badges }) => (
            <div key={title} className={wide ? "bento-card reveal-child bento-wide bento-feature" : "bento-card reveal-child"}>
              <div className="bc-header">
                <div className="bc-icon">
                  <Icon />
                </div>
                <span className="bc-header-title">{title}</span>
                {tag && <span className="bc-header-tag">{tag}</span>}
              </div>
              <div className="bc-body">
                <p>{text}</p>
                <div className="bento-tags">
                  {badges.map((b) => (
                    <span key={b} className="int-badge">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
