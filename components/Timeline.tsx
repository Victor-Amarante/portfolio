"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { EXPERIENCE } from "@/data/experience";

/* ─────────────────────────────────────────────────────────
   TIMELINE — scroll-driven glowing progress line
   (adapted from the Omi pipeline stroke-dashoffset reveal)
   The fill height is written straight to the DOM every frame;
   markers light up as the fill passes their centre.
   ───────────────────────────────────────────────────────── */
const RAIL_TOP = 8, RAIL_PAD = 16; // top + (top+bottom) insets

export default function Timeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lit, setLit] = useState<boolean[]>(() => EXPERIENCE.map(() => false));

  useEffect(() => {
    const timeline = timelineRef.current;
    const fill = fillRef.current;
    if (!timeline || !fill) return;

    let ticking = false;
    let raf = 0;
    const update = () => {
      ticking = false;
      const rect = timeline.getBoundingClientRect();
      const vh = window.innerHeight;
      const railHeight = timeline.offsetHeight - RAIL_PAD;

      const start = rect.top - vh * 0.6;
      const end = rect.bottom - vh * 0.5;
      const total = end - start || 1;
      const progress = Math.max(0, Math.min(1, -start / total));

      const h = railHeight * progress;
      fill.style.height = h + "px";

      const threshold = RAIL_TOP + h;
      const next = markerRefs.current.map((m) => {
        if (!m) return false;
        const item = m.closest<HTMLElement>(".tl-item")!;
        const cy = item.offsetTop + m.offsetTop + m.offsetHeight / 2;
        return cy <= threshold;
      });
      setLit((prev) => (prev.every((v, i) => v === next[i]) ? prev : next));
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; raf = requestAnimationFrame(update); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="timeline" id="timeline" ref={timelineRef}>
      <div className="tl-progress" id="tlProgress" ref={fillRef}></div>
      {EXPERIENCE.map((job, i) => (
        <Reveal key={job.role + job.company} className="tl-item reveal">
          <div
            className={lit[i] ? "tl-marker lit" : "tl-marker"}
            ref={(el) => { markerRefs.current[i] = el; }}
          ></div>
          <div className="tl-card">
            <div className="tl-top">
              <div>
                <h3 className="tl-role">{job.role}</h3>
                <span className="tl-company">{job.company}</span>
              </div>
              <span className={job.now ? "tl-date tl-now" : "tl-date"}>{job.date}</span>
            </div>
            <p className="tl-desc">{job.desc}</p>
            <ul className="tl-points">
              {job.points.map((point, j) => (
                <li key={j}>{point}</li>
              ))}
            </ul>
            <div className="tl-tags">
              {job.tags.map((tag) => (
                <span key={tag} className="int-badge">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
