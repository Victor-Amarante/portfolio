import Reveal from "../Reveal";

// The four core areas of practice, each with where it was actually done.
// `seen` links point at project ids in Projects.tsx.
const PILLARS: { title: string; text: string; seen: [string, string][] }[] = [
  {
    title: "AI Systems Architecture",
    text: "Models, data and evaluation designed as one system.",
    seen: [["Card-services assistant", "#work-card-services"], ["Amigo Flow", "#work-amigo-flow"]],
  },
  {
    title: "Backend Engineering",
    text: "Clean, well-bounded services in Python and TypeScript.",
    seen: [["Retrieval at C.E.S.A.R", "#work-retrieval"], ["Redduo.AI", "#work-redduo"]],
  },
  {
    title: "Distributed Systems",
    text: "Microservices, orchestration and tracing across boundaries.",
    seen: [["Card-services assistant", "#work-card-services"]],
  },
  {
    title: "Agentic AI",
    text: "Multi-agent systems with tools, memory and human review.",
    seen: [["Amigo Flow", "#work-amigo-flow"], ["Zup SDD Agents", "#work-zup-sdd"]],
  },
];

// The full toolkit, grouped by domain — an index, not a wall of badges.
const DOMAINS: { name: string; items: string[] }[] = [
  { name: "Foundations", items: ["Probability", "Statistics", "Linear Algebra", "Time Series", "Forecasting", "Classification"] },
  { name: "Agentic AI & LLMs", items: ["LangGraph", "LangChain", "Agno", "CrewAI", "MCP servers", "A2A", "ReAct", "Tool calling", "Human-in-the-loop"] },
  { name: "Backend & Architecture", items: ["Python", "TypeScript", "FastAPI", "Django", "REST APIs", "Microservices", "SSE", "DDD", "SOLID", "Hexagonal"] },
  { name: "Retrieval & Data", items: ["RAG", "GraphRAG", "PostgreSQL", "pgvector", "MongoDB", "Neo4j", "FAISS", "ChromaDB", "LlamaIndex"] },
  { name: "Machine & Deep Learning", items: ["PyTorch", "TensorFlow", "Scikit-learn", "Pandas", "NumPy", "SciPy", "Statsmodels", "spaCy", "LoRA", "YOLO", "VLMs"] },
  { name: "Cloud & Infrastructure", items: ["AWS", "GCP", "Azure", "Bedrock", "SageMaker", "Vertex AI", "Docker", "Kubernetes"] },
  { name: "Evaluation & Observability", items: ["OpenTelemetry", "LangSmith", "MLflow", "Evals", "Prompt versioning", "Quality gates"] },
  { name: "Engineering Delivery", items: ["Requirements discovery", "Technical scoping", "Architecture decisions", "Mentoring"] },
];

export default function Expertise() {
  return (
    <section className="section section-alt" id="expertise">
      <div className="container">
        <Reveal className="section-header reveal">
          <span className="section-label">Core expertise</span>
          <h2>
            Software engineering, <span className="h-soft">with AI as the specialty.</span>
          </h2>
          <p>Four areas of practice, grounded in statistics, probability and machine learning — and where each one shows up in the work.</p>
        </Reveal>

        <Reveal className="practice stagger-up">
          {PILLARS.map(({ title, text, seen }, i) => (
            <article key={title} className="practice-row reveal-child">
              <span className="practice-num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="practice-title">{title}</h3>
              <p className="practice-text">{text}</p>
              <p className="practice-seen">
                <span>Seen in</span>
                {seen.map(([label, href]) => (
                  <a key={href} href={href}>
                    {label}
                  </a>
                ))}
              </p>
            </article>
          ))}
        </Reveal>

        <Reveal className="toolkit reveal">
          <h3 className="toolkit-head">Toolkit, by domain</h3>
          <dl className="toolkit-list">
            {DOMAINS.map(({ name, items }) => (
              <div key={name} className="toolkit-row">
                <dt>{name}</dt>
                <dd>{items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
