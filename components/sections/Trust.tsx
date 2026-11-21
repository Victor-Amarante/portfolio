const TOOLKIT = [
  "Python", "NumPy", "Pandas", "SciPy", "Statsmodels",
  "Scikit-learn", "MLflow", "PyTorch", "TensorFlow", "spaCy",
  "NLTK", "YOLO", "Power BI", "SQL", "FAISS",
  "ChromaDB", "Neo4j", "pgvector", "RAG", "GraphRAG",
  "LangChain", "LangGraph", "LlamaIndex", "CrewAI", "Agno",
  "Claude", "GPT", "Gemini", "Bedrock", "Vertex AI",
  "SageMaker", "FastAPI", "Docker", "Kubernetes", "LangSmith", "OpenTelemetry", "MCP", "A2A", "LoRA",
];

export default function Trust() {
  return (
    <section id="trust">
      <p className="trust-label">
        From statistics and classical ML to deep learning and agentic systems — the full toolkit
        I&apos;ve shipped with
      </p>
      <div className="logo-bar-wrap">
        <div className="logo-track" id="logoTrack">
          {/* rendered twice so the marquee loops seamlessly */}
          {[...TOOLKIT, ...TOOLKIT].map((name, i) => (
            <span key={i} className="logo-item">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
