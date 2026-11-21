import {
  Activity, Bot, Brain, ChartLine, Cloud, CodeXml, Network, Sigma, type LucideIcon,
} from "lucide-react";
import { Fragment } from "react";
import Reveal from "../Reveal";

const EVOLUTION = [
  "Statistics & Probability",
  "Classical ML & Data Science",
  "Deep Learning & NLP",
  "LLMs & Retrieval",
  "Multi-Agent Systems",
];

type Card = { Icon: LucideIcon; title: string; tag?: string; wide?: boolean; text: string; badges: string[] };

const CARDS: Card[] = [
  {
    Icon: Bot,
    title: "Multi-Agent & Agentic Systems",
    tag: "Where I am now",
    wide: true,
    text: "The frontier my whole trajectory led to. Supervised multi-agent architectures — orchestrator + specialist agents — with ReAct, self-reflection, hierarchical delegation, contextual memory and event-driven workflows over MCP & A2A tool integration.",
    badges: ["LangGraph", "CrewAI", "Agno", "MCP servers", "ReAct", "A2A"],
  },
  {
    Icon: ChartLine,
    title: "ML & Data Science",
    tag: "Where it started",
    text: "The foundation everything builds on. Predictive modeling, EDA, feature engineering, time-series forecasting and rigorous model selection & validation.",
    badges: ["Scikit-learn", "Pandas", "NumPy", "MLflow", "Time Series"],
  },
  {
    Icon: Brain,
    title: "Deep Learning & NLP",
    text: "Neural networks and language. Embeddings, tokenization and LoRA fine-tuning of small language models — plus computer vision: YOLO detection and VLMs generating structured diagnostic reports.",
    badges: ["PyTorch", "TensorFlow", "LoRA", "spaCy", "YOLO"],
  },
  {
    Icon: Sigma,
    title: "Mathematics & Statistics",
    text: "Formal training in probability, applied statistics, linear algebra and numerical calculus — the mathematical backbone that makes AI work for real.",
    badges: ["Probability", "Linear Algebra", "SciPy", "Statsmodels"],
  },
  {
    Icon: Network,
    title: "LLMs, RAG & GraphRAG",
    text: "Retrieval architectures combining vector search with entity-relationship traversal. Chunking, reranking, hybrid & semantic search over siloed enterprise data.",
    badges: ["Neo4j", "pgvector", "FAISS", "ChromaDB", "LlamaIndex"],
  },
  {
    Icon: Activity,
    title: "MLOps & LLMOps",
    text: "Reliability end to end — from experiment tracking and model monitoring to prompt lifecycle governance, distributed tracing and inference/cost optimization.",
    badges: ["MLflow", "LangSmith", "OpenTelemetry", "Evals"],
  },
  {
    Icon: Cloud,
    title: "Cloud & Deployment",
    text: "Cloud-native, containerized AI microservices built for scale, performance and reliability across AWS and GCP.",
    badges: ["Bedrock", "SageMaker", "Vertex AI", "Docker", "Kubernetes"],
  },
  {
    Icon: CodeXml,
    title: "Software Engineering",
    text: "Backend services with Hexagonal Architecture and DDD, adhering to Clean Code and SOLID — because AI is only as good as the engineering it ships on.",
    badges: ["FastAPI", "Django", "DDD", "SOLID", "TypeScript"],
  },
];

export default function Expertise() {
  return (
    <section className="section" id="expertise">
      <div className="section-sep"></div>
      <div className="container">
        <Reveal className="section-header reveal">
          <span className="section-label">Core Expertise</span>
          <h2>
            From data foundations to
            <br />
            <span className="text-gradient">agentic systems</span>
          </h2>
          <p>
            My path didn&apos;t start with LLM APIs — it started in data. Statistics and classical
            machine learning, then deep learning and NLP, and naturally into LLM-powered retrieval
            and the multi-agent systems I build today. Every layer still runs underneath the next.
          </p>
        </Reveal>

        {/* evolution path */}
        <Reveal className="evo-path reveal">
          {EVOLUTION.map((label, i) => (
            <Fragment key={label}>
              {i > 0 && <div className="evo-line"></div>}
              <div className={i === EVOLUTION.length - 1 ? "evo-node evo-current" : "evo-node"}>
                <span className="evo-dot"></span>
                <span className="evo-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="evo-label">{label}</span>
              </div>
            </Fragment>
          ))}
        </Reveal>

        <Reveal className="bento-grid stagger-up" id="bentoGrid">
          {CARDS.map(({ Icon, title, tag, wide, text, badges }) => (
            <div key={title} className={wide ? "bento-card reveal-child bento-wide" : "bento-card reveal-child"}>
              <div className="bc-grid"></div>
              <div className="bc-shimmer"></div>
              <div className="bc-corner bc-corner-tl"></div>
              <div className="bc-corner bc-corner-br"></div>
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
