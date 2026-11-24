import type { CSSProperties } from "react";
import { EDUCATION, EXPERIENCE, VENTURES } from "@/data/experience";

/* ─────────────────────────────────────────────────────────
   CAREER CHART — study, work and side projects on one time
   axis, so the overlaps a CV hides are visible. Every bar is
   derived from the date strings in data/experience.tsx
   ("Jul 2021 — Jul 2023", "… — Present"), so editing a date
   there moves the bar here. "Present" is the build date.
   Server component: no state, plain CSS positioning.
   ───────────────────────────────────────────────────────── */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const AXIS_FROM = 2020;
const AXIS_TO = 2027;

const built = new Date();
const NOW = built.getFullYear() + built.getMonth() / 12;

// "Jul 2021" → 2021.5
const point = (s: string) => {
  const [mon, year] = s.trim().split(" ");
  return Number(year) + MONTHS.indexOf(mon) / 12;
};
const range = (date: string) => {
  const [from, to] = date.split("—").map((t) => t.trim());
  return { from: point(from), to: to === "Present" ? NOW : point(to), current: to === "Present" };
};
const pct = (y: number) => ((y - AXIS_FROM) / (AXIS_TO - AXIS_FROM)) * 100;
const shortYear = (from: number, to: number, current: boolean) => {
  const a = Math.floor(from);
  if (current) return `${a}–now`;
  const b = Math.floor(to);
  return a === b ? `${a}` : `${a}–${String(b).slice(2)}`;
};

type Row = { label: string; title: string; from: number; to: number; current: boolean; expected?: boolean };

const GROUPS: { name: string; kind: string; rows: Row[] }[] = [
  {
    name: "Study",
    kind: "study",
    rows: EDUCATION.map((e) => ({ label: e.short, title: e.title, expected: e.expected, ...range(e.date) })),
  },
  {
    name: "Work",
    kind: "work",
    rows: [...EXPERIENCE].reverse().map((j) => ({
      label: j.short,
      title: j.role,
      ...range(j.date),
    })),
  },
  {
    name: "Research & ventures",
    kind: "side",
    rows: [...VENTURES]
      .map((v) => ({ label: v.short, title: v.role, ...range(v.meta) }))
      .sort((a, b) => a.from - b.from),
  },
];

const YEARS = Array.from({ length: AXIS_TO - AXIS_FROM }, (_, i) => AXIS_FROM + i);

export default function CareerChart() {
  return (
    <figure className="career" style={{ "--now": `${pct(NOW)}%` } as CSSProperties}>
      <div className="career-axis" aria-hidden="true">
        {YEARS.map((y) => (
          <span key={y} style={{ left: `${pct(y)}%` }}>
            {y}
          </span>
        ))}
        <span className="career-now-label" style={{ left: `${pct(NOW)}%` }}>
          now
        </span>
      </div>
      {GROUPS.map((g) => (
        <div key={g.name} className={`career-group career-${g.kind}`}>
          <p className="career-group-name">{g.name}</p>
          <ol>
            {g.rows.map((r) => {
              // an expected end past today: solid up to now, dashed after
              const solidTo = Math.min(r.to, NOW);
              return (
                <li key={r.label} className="career-row">
                  <span className="career-label">
                    <strong>{r.label}</strong>
                    <span className="career-years">
                      {r.expected ? `${Math.floor(r.from)}–${String(Math.floor(r.to)).slice(2)} exp.` : shortYear(r.from, r.to, r.current)}
                    </span>
                    <span className="sr-only">: {r.title}</span>
                  </span>
                  <span className="career-track" aria-hidden="true">
                    <span
                      className={r.current ? "career-bar is-current" : "career-bar"}
                      style={{ left: `${pct(r.from)}%`, width: `${pct(solidTo) - pct(r.from)}%` }}
                      title={r.title}
                    ></span>
                    {r.to > NOW && (
                      <span
                        className="career-bar is-expected"
                        style={{ left: `${pct(NOW)}%`, width: `${pct(r.to) - pct(NOW)}%` }}
                      ></span>
                    )}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      ))}
      <figcaption>
        <span className="fig-num">Fig. 2</span> Study, work and side projects on one axis. The phases
        overlap — I was still in statistics classes when I started consulting, and still automating
        legal workflows when I co-founded an LLM startup.
      </figcaption>
    </figure>
  );
}
