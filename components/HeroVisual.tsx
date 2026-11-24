"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { prefersReducedMotion } from "@/lib/theme";

/* ─────────────────────────────────────────────────────────
   HERO VISUAL — an illustrative request trace (styles: "hero
   visual" in globals.css). One user message travels through
   guardrails, routing, retrieval, a specialist agent and a tool
   call, drawn as an OpenTelemetry-style span waterfall that
   fills in span by span, holds, and starts over.
   It shows the kind of system and the way I look at one — it is
   NOT a trace from any real system, and says so on screen.
   The loop pauses offscreen / in a hidden tab; under reduced
   motion the finished trace is shown still.
   ───────────────────────────────────────────────────────── */
type Span = { name: string; note: string; start: number; dur: number; depth: number; kind: string };

const TOTAL = 1840; // ms, the root span
const SPANS: Span[] = [
  { name: "POST /chat", note: "", start: 0, dur: TOTAL, depth: 0, kind: "root" },
  { name: "guardrails.input", note: "PII masked", start: 12, dur: 46, depth: 1, kind: "guard" },
  { name: "orchestrator.route", note: "→ scheduling", start: 66, dur: 138, depth: 1, kind: "agent" },
  { name: "retrieval.search", note: "k=8", start: 214, dur: 226, depth: 2, kind: "data" },
  { name: "agent.scheduling", note: "2 tool calls", start: 452, dur: 1108, depth: 2, kind: "agent" },
  { name: "tool.find_slots", note: "", start: 640, dur: 304, depth: 3, kind: "data" },
  { name: "guardrails.output", note: "pass", start: 1574, dur: 58, depth: 1, kind: "guard" },
  { name: "eval.groundedness", note: "async", start: 1646, dur: 170, depth: 1, kind: "eval" },
];

const STEP_MS = 420; // one span appears per step
const HOLD_MS = 4200; // finished trace stays up this long
const DONE = SPANS.length + 1; // step at which the response line shows

const ms = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(2)} s` : `${n} ms`);

export default function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(DONE); // server render and no-JS: the finished trace
  const [running, setRunning] = useState(false);

  // only animate while visible
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let onscreen = true;
    const sync = () => setRunning(onscreen && !document.hidden);
    const io = new IntersectionObserver(([entry]) => {
      onscreen = entry.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    setStep(0);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  useEffect(() => {
    if (!running) return;
    const delay = step === 0 ? 600 : step >= DONE ? HOLD_MS : STEP_MS;
    const t = window.setTimeout(() => setStep((s) => (s >= DONE ? 0 : s + 1)), delay);
    return () => window.clearTimeout(t);
  }, [running, step]);

  return (
    <div ref={ref} className="hero-visual" aria-hidden="true">
      <div className="trace">
        <div className="trace-head">
          <span className="trace-id">trace 7f3a·c21e</span>
          <span className={step >= DONE ? "trace-total on" : "trace-total"}>{ms(TOTAL)}</span>
        </div>
        <p className="trace-msg trace-msg-in">Can I move my appointment to Friday morning?</p>
        <ol className="trace-spans">
          {SPANS.map((s, i) => (
            <li
              key={s.name}
              className={`trace-span trace-${s.kind}${step > i ? " on" : ""}`}
              style={
                {
                  "--depth": s.depth,
                  "--x": `${(s.start / TOTAL) * 100}%`,
                  "--w": `${(s.dur / TOTAL) * 100}%`,
                } as CSSProperties
              }
            >
              <span className="trace-name">
                {s.name}
                {s.note && <em>{s.note}</em>}
              </span>
              <span className="trace-lane">
                <span className="trace-bar"></span>
              </span>
              <span className="trace-dur">{ms(s.dur)}</span>
            </li>
          ))}
        </ol>
        <p className={step >= DONE ? "trace-msg trace-msg-out on" : "trace-msg trace-msg-out"}>
          Done — Friday, 9:30. You&apos;ll get a confirmation shortly.
        </p>
        <div className="trace-foot">
          <span>tokens 2,431 in · 318 out</span>
          <span>illustrative, not a real system</span>
        </div>
      </div>
    </div>
  );
}
