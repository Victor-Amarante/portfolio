"use client";

import { useEffect, useRef, useState } from "react";
import {
  Activity, Bot, Cloud, Code, Database, Network, Search, Workflow,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────
   HERO VISUAL — decorative spatial scene (styles: "hero visual"
   in globals.css). Three frosted computational layers stacked
   isometrically — data, services, agents — with beams rising
   between them, an orbit in the stack's plane and floating
   glass chips. Pure CSS 3D; it illustrates the kind of work,
   it is NOT a diagram of any real system.
   Ambient loops pause while it's offscreen or the tab is hidden;
   prefers-reduced-motion freezes it entirely (CSS).
   ───────────────────────────────────────────────────────── */
export default function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let onscreen = true;
    const sync = () => setPaused(!onscreen || document.hidden);
    const io = new IntersectionObserver(([entry]) => {
      onscreen = entry.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <div ref={ref} className="hero-visual" aria-hidden="true" data-paused={paused ? "" : undefined}>
      <div className="hv-glow"></div>
      <div className="hv-scene">
        <div className="hv-stack">
          {/* data layer */}
          <div className="hv-layer hv-layer-1">
            <span className="hv-tile hv-tile-accent"><Database /></span>
            <span className="hv-tile hv-tile-dot"></span>
            <span className="hv-tile"><Database /></span>
            <span className="hv-tile hv-tile-dot"></span>
            <span className="hv-tile"><Cloud /></span>
            <span className="hv-tile hv-tile-dot"></span>
            <span className="hv-tile"><Database /></span>
            <span className="hv-tile hv-tile-dot"></span>
            <span className="hv-tile hv-tile-accent"><Database /></span>
          </div>
          {/* services / retrieval layer */}
          <div className="hv-layer hv-layer-2">
            <span className="hv-tile hv-tile-accent"><Search /></span>
            <span className="hv-tile"><Code /></span>
            <span className="hv-tile"><Workflow /></span>
            <span className="hv-tile hv-tile-accent"><Network /></span>
          </div>
          {/* agents layer: orchestrator + specialists */}
          <div className="hv-layer hv-layer-3">
            <svg className="hv-links" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="50" y1="50" x2="15.5" y2="15.5" />
              <line x1="50" y1="50" x2="84.5" y2="15.5" />
              <line x1="50" y1="50" x2="15.5" y2="84.5" />
              <line x1="50" y1="50" x2="84.5" y2="84.5" />
            </svg>
            <span className="hv-node hv-node-1"></span>
            <span className="hv-node hv-node-2"></span>
            <span className="hv-node hv-node-3"></span>
            <span className="hv-node hv-node-4"></span>
            <span className="hv-core"><Bot /></span>
          </div>
          <span className="hv-beam hv-beam-1"></span>
          <span className="hv-beam hv-beam-2"></span>
          <span className="hv-beam hv-beam-3"></span>
          <span className="hv-beam hv-beam-4"></span>
          <div className="hv-orbit"></div>
          <div className="hv-orbit hv-orbit-2"></div>
        </div>
      </div>
      <div className="hv-chip hv-chip-1">
        <span className="hv-chip-icon"><Bot /></span>Multi-agent orchestration
      </div>
      <div className="hv-chip hv-chip-2">
        <span className="hv-chip-icon"><Network /></span>RAG · GraphRAG
      </div>
      <div className="hv-chip hv-chip-3">
        <span className="hv-chip-icon"><Activity /></span>Evals &amp; observability
      </div>
    </div>
  );
}
