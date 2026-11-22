import type { ReactNode } from "react";
import { GraduationCap, Microscope, Rocket } from "lucide-react";

// Employment timeline, newest first. Titles are the ones on the employment
// record (the CV), not the public positioning title used in the hero.
// `now` adds the highlighted "present" date chip.
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
    role: "Senior AI/ML Engineer",
    company: "Getronics · Remote · Embedded at Banco do Brasil",
    date: "May 2026 — Present",
    now: true,
    desc: (
      <>
        Technical delivery for a card-services AI assistant{" "}
        <strong>designed for millions of users</strong> — from requirements discovery and solution
        architecture to implementation, enterprise integration and production monitoring.
      </>
    ),
    points: [
      <>
        Architected a multi-agent system: an orchestrator and specialist services deployed as
        independent microservices, working with the bank&apos;s architects and engineers.
      </>,
      <>
        Integrated banking capabilities through REST APIs, <strong>MCP</strong> (Model Context
        Protocol) and <strong>A2A</strong> (agent-to-agent communication).
      </>,
      <>
        Turned business, security and regulatory constraints into production safeguards: input/output
        filtering, PII handling and data privacy.
      </>,
      <>
        Diagnose failures across agent and service boundaries with <strong>OpenTelemetry</strong>{" "}
        distributed tracing; tune prompts and token consumption to cut latency and inference cost.
      </>,
    ],
    tags: ["Multi-Agent", "Microservices", "A2A", "MCP", "Kubernetes", "OpenTelemetry"],
  },
  {
    role: "AI/ML Engineer",
    company: "Amigo Tech · Recife, Brazil",
    date: "Sep 2025 — May 2026",
    desc: (
      <>
        Led engineering of <strong>Amigo Flow</strong>, a production multi-agent RAG system in
        healthcare supporting tens of thousands of monthly appointments.
      </>
    ),
    points: [
      <>
        Automated scheduling increased <strong>7.5×</strong> and confirmations by{" "}
        <strong>more than 200%</strong>.
      </>,
      <>
        Redesigned the core AI application architecture, improving response quality and accuracy by
        approximately <strong>90%</strong>; established version-controlled prompts, iterative
        evaluation and token-consumption analysis.
      </>,
      <>
        Built an end-to-end dental X-ray pipeline — data annotation, YOLO training and structured
        reports from a vision-language model (VLM).
      </>,
      <>Implemented LangSmith tracing and monitoring for the production agent workflows.</>,
      <>
        Worked with Product, Quality and engineering on requirements, priorities, dependencies,
        delivery and post-release improvements.
      </>,
    ],
    tags: ["Multi-Agent", "RAG", "LangSmith", "YOLO", "VLM"],
  },
  {
    role: "Data Scientist",
    company: "C.E.S.A.R · Recife, Brazil",
    date: "Jul 2024 — Sep 2025",
    desc: <>Backend services and retrieval architectures that brought generative AI into client systems.</>,
    points: [
      <>
        Backend development with Django, Django REST Framework and FastAPI, applying hexagonal
        architecture, DDD, SOLID and clean code.
      </>,
      <>
        Designed enterprise retrieval on <strong>PostgreSQL/pgvector</strong> for semantic search and
        contextual generation, and <strong>GraphRAG on Neo4j</strong> for previously siloed logistics
        data.
      </>,
      <>
        Engineered an LLM-enriched transportation data-ingestion platform on AWS S3, with assisted
        knowledge-graph construction and containerized pipelines across AWS and GCP.
      </>,
      <>
        Worked directly with clients to turn business and data requirements into technical
        implementation plans; delivered 20+ hours of data-analysis training for SEBRAE analysts.
      </>,
    ],
    tags: ["Django", "FastAPI", "pgvector", "GraphRAG", "Neo4j", "Bedrock", "Vertex AI"],
  },
  {
    role: "Data Scientist",
    company: "Queiroz Cavalcanti Advocacia · Recife",
    date: "Nov 2022 — Jun 2024",
    desc: <>Software, data and ML applied to legal operations — where building software became part of the daily work.</>,
    points: [
      <>
        Led discovery, technical planning and adoption for <strong>50+</strong> automation, analytics
        and machine-learning initiatives in Legal Controlling.
      </>,
      <>
        Forecasting, classification and process-automation pipelines with <strong>90%+</strong>{" "}
        efficiency gains in selected workflows — typically 3–4 hours saved per optimized process, up
        to 90 hours a month in one initiative.
      </>,
      <>
        Statistical pipelines and Power BI dashboards for KPI monitoring; led an automation and data
        training adopted by 80%+ of 40+ professionals.
      </>,
      <>
        Early generative-AI prototypes in late 2023 and early 2024: meeting summarization and
        intelligent email prioritization, built in Python/Streamlit on OpenAI APIs.
      </>,
    ],
    tags: ["Automation", "Forecasting", "Scikit-learn", "Power BI"],
  },
  {
    role: "Data Scientist",
    company: "Fisher Consultoria Estatística · Recife",
    date: "Jul 2021 — Jul 2023",
    desc: <>Where it started: statistical consulting, from formulating the problem to explaining the result.</>,
    points: [
      <>
        Delivered <strong>10+ end-to-end statistical consulting projects</strong> for healthcare
        clients.
      </>,
      <>Problem formulation, sampling design, statistical modeling, hypothesis testing and formal reporting.</>,
      <>Translated quantitative analysis into visualizations and recommendations for non-technical stakeholders.</>,
    ],
    tags: ["Statistics", "R", "EDA", "Sampling", "Hypothesis Testing"],
  },
];

// Research, ventures and community, shown under the timeline. `wide` spans the row.
export const VENTURES = [
  {
    Icon: Microscope,
    role: "AI Researcher",
    org: "CIn/UFPE · Applied research with Zup Innovation",
    meta: "Mar 2026 — Present",
    wide: true,
    text: (
      <>
        Architected <strong>Zup SDD Agents</strong>, a LangGraph system that takes user stories
        through specification, supervised planning, specialist execution, verification and business
        review, with human-in-the-loop checkpoints. Ongoing research on role-specialized small language
        models (up to 10B parameters): task quality, latency, inference cost and on-premises
        feasibility.
      </>
    ),
  },
  {
    Icon: Rocket,
    role: "Co-Founder & ML Engineer",
    org: "Redduo.AI",
    meta: "Nov 2023 — Jul 2024",
    text: (
      <>
        LLM-powered feedback on ENEM essays. <strong>1st place</strong> at UFPE&apos;s PoloTec
        Pre-Incubation &amp; DemoDay 2024.
      </>
    ),
  },
  {
    Icon: GraduationCap,
    role: "Co-Founder & Director of Education",
    org: "LIGIA — UFPE Academic AI League",
    meta: "Dec 2024 — Mar 2026",
    text: <>Created ML, NLP and computer-vision learning tracks for 30–40 active members; mentored student leaders.</>,
  },
];
