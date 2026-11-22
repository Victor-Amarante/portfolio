"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

const TOOLKIT = [
  "Python", "NumPy", "Pandas", "SciPy", "Statsmodels",
  "Scikit-learn", "MLflow", "PyTorch", "TensorFlow", "spaCy",
  "NLTK", "YOLO", "Power BI", "SQL", "FAISS",
  "ChromaDB", "Neo4j", "pgvector", "RAG", "GraphRAG",
  "LangChain", "LangGraph", "LlamaIndex", "CrewAI", "Agno",
  "Claude", "GPT", "Gemini", "Bedrock", "Vertex AI",
  "SageMaker", "FastAPI", "Docker", "Kubernetes", "LangSmith", "OpenTelemetry", "MCP", "A2A", "LoRA",
];

/* Toolkit marquee — pauses on hover/focus, offscreen, and from
   its own toggle (moving content > 5s needs a pause control).
   Under reduced motion CSS turns it into a static wrapped list. */
export default function Trust() {
  const ref = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  const [offscreen, setOffscreen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOffscreen(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="trust" ref={ref} aria-labelledby="trust-label">
      <div className="container trust-head">
        <p className="trust-label" id="trust-label">
          From statistics and classical ML to deep learning and agentic systems — the full toolkit
          I&apos;ve shipped with
        </p>
        <button
          type="button"
          className="marquee-toggle"
          aria-label={paused ? "Play toolkit animation" : "Pause toolkit animation"}
          aria-pressed={paused}
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? <Play /> : <Pause />}
        </button>
      </div>
      <div className="logo-bar-wrap">
        <div className={paused || offscreen ? "logo-track paused" : "logo-track"} id="logoTrack">
          {/* rendered twice so the marquee loops seamlessly; the copy is hidden from assistive tech */}
          {[...TOOLKIT, ...TOOLKIT].map((name, i) => (
            <span key={i} className="logo-item" aria-hidden={i >= TOOLKIT.length ? true : undefined}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
