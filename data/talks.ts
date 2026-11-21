import { asset } from "@/lib/asset";

/* ─────────────────────────────────────────────────────────
   SPEAKING GALLERY — the photos and their captions.
   Files live in public/assets/img/talks/ as <slug>-sm / <slug>-lg
   in both .jpg and .webp. Each row is a justified flex row:
   tiles grow by `ar` (source aspect ratio), so Σar of a row is
   its size dial — keep rows in the Σ3.0–3.6 band.
     ar     → width / height of the source photo
     wide   → landscape; spans both columns of the <1024px grid
     widths → the [sm, lg] pixel widths, for srcset
     size   → [width, height] of the lg file (reserves layout)
     sizes  → the <img sizes> hint for this tile
   The lightbox reads kicker/title/desc from here too.
   ───────────────────────────────────────────────────────── */
export type Talk = {
  slug: string;
  ar: number;
  wide?: boolean;
  widths: [number, number];
  size: [number, number];
  sizes: string;
  alt: string;
  kicker: string;
  title: string;
  desc: string;
};

const PORTRAIT_SIZES = "(max-width: 520px) 92vw, (max-width: 1024px) 46vw, 19vw";

export const TALK_ROWS: Talk[][] = [
  [
    {
      slug: "ai-timeline",
      ar: 0.75,
      widths: [525, 1200],
      size: [1200, 1600],
      sizes: "(max-width: 520px) 92vw, (max-width: 1024px) 46vw, 17vw",
      alt: "Victor pointing at a projected AI Timeline slide while teaching a class",
      kicker: "Lecture",
      title: "Sixty years in one slide",
      desc: "Walking a class down the timeline — perceptrons, the neural winters, the transformer — because none of what we build today makes sense without the arc that got us here.",
    },
    {
      slug: "llm-lecture",
      ar: 1.501,
      wide: true,
      widths: [700, 1600],
      size: [1600, 1066],
      sizes: "(max-width: 1024px) 92vw, 33vw",
      alt: "Victor presenting a slide on LLMs to a full auditorium",
      kicker: "Guest lecture",
      title: "LLMs, end to end",
      desc: "Walking an auditorium through the transformer stack — from tokenization to attention to why the context window is the constraint everything else is designed around.",
    },
    {
      slug: "ligia-ufpe",
      ar: 1.333,
      wide: true,
      widths: [700, 1600],
      size: [1600, 1200],
      sizes: "(max-width: 1024px) 92vw, 29vw",
      alt: "A full room of students at a LIGIA session at UFPE",
      kicker: "Jun 2025 · LIGIA @ UFPE",
      title: "Where the tracks start",
      desc: "A session of the AI academic league I co-founded — the ML, NLP and Computer Vision learning tracks begin in this room.",
    },
  ],
  [
    {
      slug: "ai-governance",
      ar: 0.75,
      widths: [700, 1200],
      size: [1200, 1600],
      sizes: PORTRAIT_SIZES,
      alt: "Slide reading Legislação — LGPD, EU AI Act during a talk on AI regulation",
      kicker: "Talk",
      title: "AI under the law",
      desc: "LGPD and the EU AI Act — what regulation actually asks of the people shipping models, not the version in the headlines.",
    },
    {
      slug: "fine-tuning-workshop",
      ar: 0.75,
      widths: [700, 1200],
      size: [1200, 1600],
      sizes: PORTRAIT_SIZES,
      alt: "Victor teaching a small class in front of a slide about model training",
      kicker: "Jul 2025 · Workshop",
      title: "Fine-tuning, in practice",
      desc: "When to fine-tune, when to prompt, and when the honest answer is to go build better retrieval instead.",
    },
    {
      slug: "hands-on-lab",
      ar: 0.75,
      widths: [700, 1200],
      size: [1200, 1600],
      sizes: PORTRAIT_SIZES,
      alt: "Victor pointing at a projected screen showing clustering notes beside a running FastAPI server",
      kicker: "Jul 2025 · Hands-on lab",
      title: "Theory on one screen, the API on the other",
      desc: "Clustering definitions on the left, a live FastAPI backend answering requests on the right — the moment it stops being abstract.",
    },
    {
      slug: "google-cloud",
      ar: 0.75,
      widths: [700, 1200],
      size: [1200, 1600],
      sizes: PORTRAIT_SIZES,
      alt: "Victor standing beside a Google Cloud logo sculpture at an event",
      kicker: "Nov 2025 · Event",
      title: "Keeping up with the platform",
      desc: "A Google Cloud event — the other half of the job is staying current with the infrastructure these systems run on.",
    },
  ],
];

export const talkSrc = (slug: string, size: "sm" | "lg", ext: "jpg" | "webp") =>
  asset(`assets/img/talks/${slug}-${size}.${ext}`);
