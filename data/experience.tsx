import type { ReactNode } from "react";
import { FlaskConical, GraduationCap, Microscope, Rocket } from "lucide-react";

// Career timeline, newest first. `now` adds the highlighted "present" date chip.
export type Role = {
  role: string;
  company: string;
  date: string;
  now?: boolean;
  desc: ReactNode;
  points: ReactNode[];
  tags: string[];
};

export const EXPERIENCE: Role[] = [
  {
    role: "Senior Applied AI Engineer",
    company: "Getronics · Amsterdam (Remote)",
    date: "May 2026 — Present",
    now: true,
    desc: (
      <>
        Embedded in a high-seniority squad at one of Brazil&apos;s largest financial institutions,
        owning the full AI model lifecycle for a card-services digital assistant designed to reach{" "}
        <strong>millions of users</strong> at launch.
      </>
    ),
    points: [
      <>
        Architected a multi-agent system — orchestrator + specialist agent as independent
        microservices communicating over the <strong>A2A protocol</strong>.
      </>,
      <>
        Built tool and service integrations through <strong>MCP &amp; A2A</strong>; deployed
        cloud-native on Docker &amp; Kubernetes.
      </>,
      <>Owned AI compliance: input/output filtering, PII handling and Brazilian financial-sector regulation.</>,
      <>
        Instrumented observability and operational reliability with <strong>OpenTelemetry</strong>.
      </>,
    ],
    tags: ["Multi-Agent", "A2A", "MCP", "Kubernetes", "OpenTelemetry"],
  },
  {
    role: "AI Researcher",
    company: "CIn/UFPE · Zup Innovation · Recife, Brazil",
    date: "Mar 2026 — Present",
    now: true,
    desc: (
      <>
        Research on{" "}
        <em>Role-Specialized Small Language Models for End-to-End Spec-Driven Software Development</em>{" "}
        — can SLMs (≤10B params) fine-tuned per agent role match frontier LLMs on a complete
        software-development pipeline?
      </>
    ),
    points: [
      <>
        Fine-tuning small language models via <strong>LoRA</strong>, one specialization per agent
        role, benchmarked against frontier models.
      </>,
      <>
        Built <strong>Zup SDD Agents</strong>: a ~19-node LangGraph state machine that turns a User
        Story into working, committed code.
      </>,
      <>Designed a dual quality gate — technical verification kept separate from business curation.</>,
      <>Human-in-the-loop checkpoints via LangGraph interrupts.</>,
    ],
    tags: ["SLMs", "LoRA", "LangGraph", "Spec-Driven Dev"],
  },
  {
    role: "AI/ML Engineer",
    company: "Amigo Tech · Recife, Brazil",
    date: "Sep 2025 — May 2026",
    desc: <>Led AI development on Amigo Flow, architecting a supervised multi-agent system applied to the patient journey.</>,
    points: [
      <>
        <strong>7.5× increase</strong> in automated scheduling and <strong>200%+ growth</strong> in
        confirmation rate — scaled to tens of thousands of monthly appointments.
      </>,
      <>
        Redesigned core architecture around a multi-agent pattern → <strong>~90%</strong>{" "}
        improvement in production response quality.
      </>,
      <>
        Built a medical-imaging pipeline: YOLO detection on dental X-rays + a VLM generating
        natural-language diagnostic reports.
      </>,
      <>Shipped containerized microservices (FastAPI, Docker) with LangSmith monitoring.</>,
    ],
    tags: ["Multi-Agent", "YOLO", "VLM", "LangSmith"],
  },
  {
    role: "Data Scientist",
    company: "C.E.S.A.R · Recife, Brazil",
    date: "Jul 2024 — Sep 2025",
    desc: <>Built GenAI knowledge-retrieval systems and a production GraphRAG platform for enterprise data.</>,
    points: [
      <>
        Designed a corporate knowledge-retrieval system with GenAI — LangChain/LangGraph,
        PostgreSQL &amp; pgvector.
      </>,
      <>
        Built <strong>GraphRAG on Neo4j</strong> for a logistics platform, combining vector search
        with entity-relationship traversal.
      </>,
      <>
        Deployed pipelines on AWS (S3, SageMaker, Bedrock) &amp; GCP Vertex AI; followed Hexagonal
        Architecture &amp; DDD.
      </>,
      <>Delivered 20+ hours of in-person data training for SEBRAE analysts.</>,
    ],
    tags: ["GraphRAG", "Neo4j", "Bedrock", "Vertex AI"],
  },
  {
    role: "Data Scientist",
    company: "Queiroz Cavalcanti Advocacia · Recife",
    date: "Nov 2022 — Jun 2024",
    desc: <>Predictive ML pipelines for Legal Controlling and the firm&apos;s first generative-AI prototypes.</>,
    points: [
      <>
        Time-series forecasting &amp; classification (Scikit-learn, Pandas, NumPy) with{" "}
        <strong>90%+</strong> efficiency gains across <strong>50+ projects</strong>.
      </>,
      <>
        Averaged <strong>3–4 hours saved per case</strong> — up to <strong>90 hours/month</strong>{" "}
        on a single initiative.
      </>,
      <>Led an internal training program — 80%+ adoption across 40+ professionals.</>,
      <>Prototyped early GenAI use cases: meeting summarization and email prioritization.</>,
    ],
    tags: ["Forecasting", "Power BI", "Scikit-learn"],
  },
  {
    role: "Data Scientist",
    company: "Fisher Consultoria Estatística · Recife",
    date: "Jul 2021 — Jul 2023",
    desc: <>Where the career started — the mathematical foundation applied to real problems, end to end.</>,
    points: [
      <>
        Delivered <strong>10+ complete statistical consulting projects</strong> for healthcare
        clients.
      </>,
      <>Statistical modeling, sampling and EDA — from problem framing with the client to the formal report.</>,
    ],
    tags: ["Statistics", "R", "EDA"],
  },
];

// Parallel ventures shown under the timeline.
export const VENTURES = [
  {
    Icon: GraduationCap,
    role: "Co-Founder & Director of Education",
    org: "LIGIA — AI Academic League @ UFPE",
    meta: "Dec 2024 — Mar 2026",
    text: <>Structured ML, NLP &amp; Computer Vision learning tracks; mentored student leaders toward technical excellence.</>,
  },
  {
    Icon: Rocket,
    role: "Co-Founder & ML Engineer",
    org: "Redduo.AI",
    meta: "Nov 2023 — Jul 2024",
    text: (
      <>
        AI platform for automatic ENEM essay correction. <strong>1st place</strong> at PoloTec
        Pre-Incubation &amp; DemoDay 2024.
      </>
    ),
  },
  {
    Icon: FlaskConical,
    role: "AI Researcher",
    org: "GERAIA — Generative AI Research Group",
    meta: "Jan 2024 — Mar 2026",
    text: <>Applied research on LLMs, multi-agent architectures &amp; RAG for autonomous simulations and distributed intelligence.</>,
  },
  {
    Icon: Microscope,
    role: "Scientific Researcher",
    org: "FACEPE / INES",
    meta: "Jul 2023 — Jan 2024",
    text: <>HCI &amp; accessible mobile applications research for individuals with Autism Spectrum Disorder.</>,
  },
];
