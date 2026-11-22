import {
  Activity, Bot, Brain, Cloud, CodeXml, Database, Layers, Network, Server, Sigma, Users,
  type LucideIcon,
} from "lucide-react";
import Reveal from "../Reveal";

// The four core areas of practice — one line each, meant to be read at a glance.
const PILLARS: { Icon: LucideIcon; title: string; text: string }[] = [
  { Icon: Layers, title: "AI Systems Architecture", text: "Models, data and evaluation designed as one system." },
  { Icon: Server, title: "Backend Engineering", text: "Clean, well-bounded services in Python and TypeScript." },
  { Icon: Network, title: "Distributed Systems", text: "Microservices, orchestration and tracing across boundaries." },
  { Icon: Bot, title: "Agentic AI", text: "Multi-agent systems with tools, memory and human review." },
];

// The full toolkit, grouped by domain. Chips only — no prose.
const DOMAINS: { Icon: LucideIcon; name: string; items: string[] }[] = [
  {
    Icon: Sigma,
    name: "Foundations",
    items: ["Probability", "Statistics", "Linear Algebra", "Time Series", "Forecasting", "Classification"],
  },
  {
    Icon: Bot,
    name: "Agentic AI & LLMs",
    items: ["LangGraph", "LangChain", "Agno", "CrewAI", "MCP servers", "A2A", "ReAct", "Tool calling", "Human-in-the-loop"],
  },
  {
    Icon: CodeXml,
    name: "Backend & Architecture",
    items: ["Python", "TypeScript", "FastAPI", "Django", "REST APIs", "Microservices", "SSE", "DDD", "SOLID", "Hexagonal"],
  },
  {
    Icon: Database,
    name: "Retrieval & Data",
    items: ["RAG", "GraphRAG", "PostgreSQL", "pgvector", "MongoDB", "Neo4j", "FAISS", "ChromaDB", "LlamaIndex"],
  },
  {
    Icon: Brain,
    name: "Machine & Deep Learning",
    items: ["PyTorch", "TensorFlow", "Scikit-learn", "Pandas", "NumPy", "SciPy", "Statsmodels", "spaCy", "LoRA", "YOLO", "VLMs"],
  },
  {
    Icon: Cloud,
    name: "Cloud & Infrastructure",
    items: ["AWS", "GCP", "Azure", "Bedrock", "SageMaker", "Vertex AI", "Docker", "Kubernetes"],
  },
  {
    Icon: Activity,
    name: "Evaluation & Observability",
    items: ["OpenTelemetry", "LangSmith", "MLflow", "Evals", "Prompt versioning", "Quality gates"],
  },
  {
    Icon: Users,
    name: "Engineering Delivery",
    items: ["Requirements discovery", "Technical scoping", "Architecture decisions", "Mentoring"],
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
          <p>Four areas of practice, grounded in statistics, probability and machine learning.</p>
        </Reveal>

        <Reveal className="pillars stagger-up">
          {PILLARS.map(({ Icon, title, text }, i) => (
            <article key={title} className="pillar reveal-child">
              <div className="pillar-top">
                <span className="pillar-icon">
                  <Icon />
                </span>
                <span className="pillar-num">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="pillar-title">{title}</h3>
              <p className="pillar-text">{text}</p>
            </article>
          ))}
        </Reveal>

        <Reveal className="domains reveal">
          <h3 className="domains-head">Toolkit by domain</h3>
          <dl className="domains-list">
            {DOMAINS.map(({ Icon, name, items }) => (
              <div key={name} className="domain-row">
                <dt className="domain-name">
                  <Icon />
                  {name}
                </dt>
                <dd>
                  <ul className="domain-items">
                    {items.map((item) => (
                      <li key={item} className="int-badge">
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
