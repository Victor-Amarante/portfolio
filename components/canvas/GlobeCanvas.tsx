"use client";

import { useEffect, useRef } from "react";
import { isLight, onThemeChange, prefersReducedMotion } from "@/lib/theme";

/* ─────────────────────────────────────────────────────────
   GLOBE — Canvas 2D fibonacci-sphere network
   (adapted from the Omi hero globe, in the brand blues)
   Renders only while onscreen and the tab is visible; under
   reduced motion it draws a single still frame instead.
   ───────────────────────────────────────────────────────── */

// canvas can't read CSS tokens, so each theme carries its own palette
const PALETTES = {
  dark: {
    NODE: "rgba(125,180,255,0.85)", HL: "#6DD9FF", ARC: "109,217,255",
    RING: "rgba(125,180,255,0.24)", LINE: "rgba(125,180,255,0.12)",
    HALO: "rgba(52,136,255,0.16)", HALO_MID: "rgba(52,136,255,0.05)",
    GLOW: "rgba(109,217,255,0.4)", SOFT: "rgba(77,151,255,0.3)",
  },
  light: {
    NODE: "rgba(52,136,255,0.82)", HL: "#005FCC", ARC: "52,136,255",
    RING: "rgba(52,136,255,0.3)", LINE: "rgba(0,95,204,0.13)",
    HALO: "rgba(52,136,255,0.12)", HALO_MID: "rgba(109,217,255,0.05)",
    GLOW: "rgba(109,217,255,0.45)", SOFT: "rgba(52,136,255,0.25)",
  },
};

export default function GlobeCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let width = 0, height = 0;

    const still = prefersReducedMotion();
    let P = PALETTES[isLight() ? "light" : "dark"];
    const unsubscribe = onThemeChange((light) => {
      P = PALETTES[light ? "light" : "dark"];
      if (still) renderGlobe();
    });

    const globeNodes: { x: number; y: number; z: number; baseRadius: number; hl: boolean }[] = [];
    const arcs: { n1: number; n2: number; progress: number; speed: number }[] = [];
    const numNodes = 780;
    let globeRadius = 210;
    const phi = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < numNodes; i++) {
      const y = 1 - (i / (numNodes - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radius, z = Math.sin(theta) * radius;
      const isHighlight = Math.random() > 0.92;
      const d = 1 + (Math.random() * 0.06 - 0.03);
      globeNodes.push({ x: x * d, y: y * d, z: z * d, baseRadius: isHighlight ? 2 : 1, hl: isHighlight });
    }
    for (let i = 0; i < 18; i++) {
      arcs.push({ n1: (Math.random() * numNodes) | 0, n2: (Math.random() * numNodes) | 0, progress: Math.random(), speed: 0.002 + Math.random() * 0.005 });
    }
    const orbitalRings = [
      { radius: 1.3, tiltX: 0.2, tiltZ: 0.5, speed: 0.001, angle: 0 },
      { radius: 1.45, tiltX: -0.4, tiltZ: 0.2, speed: -0.0015, angle: Math.PI / 3 },
      { radius: 1.2, tiltX: 0.5, tiltZ: -0.3, speed: 0.002, angle: Math.PI / 1.5 },
    ];

    const resizeCanvas = () => {
      const parent = canvas.parentElement!;
      width = parent.clientWidth; height = parent.clientHeight;
      globeRadius = Math.max(150, Math.min(230, width * 0.36));
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr; canvas.height = height * dpr;
      canvas.style.width = width + "px"; canvas.style.height = height + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.scale(dpr, dpr);
      if (still) renderGlobe();
    };

    let angleY = 0; const angleX = 0.2;
    let raf = 0;
    let running = false;
    const renderGlobe = () => {
      ctx.clearRect(0, 0, width, height);
      angleY += 0.002;
      const cx = width / 2, cy = height / 2, fov = 800;

      const g = ctx.createRadialGradient(cx, cy, globeRadius * 0.4, cx, cy, globeRadius * 1.6);
      g.addColorStop(0, P.HALO);
      g.addColorStop(0.5, P.HALO_MID);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g; ctx.fillRect(0, 0, width, height);

      const sinY = Math.sin(angleY), cosY = Math.cos(angleY);
      const sinX = Math.sin(angleX), cosX = Math.cos(angleX);

      ctx.lineWidth = 1; ctx.strokeStyle = P.LINE; ctx.setLineDash([2, 4]);
      for (let lat = -4; lat <= 4; lat++) {
        const y = lat * 0.22, r = Math.sqrt(1 - y * y) * globeRadius;
        ctx.beginPath();
        for (let lon = 0; lon <= Math.PI * 2.01; lon += 0.1) {
          const x = Math.cos(lon) * r, z = Math.sin(lon) * r;
          const x1 = x * cosY - z * sinY, z1 = x * sinY + z * cosY;
          const y1 = (y * globeRadius) * cosX - z1 * sinX, z2 = (y * globeRadius) * sinX + z1 * cosX;
          const s = fov / (fov + z2), px = cx + x1 * s, py = cy + y1 * s;
          if (lon === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
      for (let lon = 0; lon < Math.PI; lon += Math.PI / 6) {
        ctx.beginPath();
        for (let lat = -Math.PI / 2; lat <= Math.PI / 2 + 0.01; lat += 0.1) {
          const y = Math.sin(lat) * globeRadius, r = Math.cos(lat) * globeRadius;
          const x = Math.cos(lon) * r, z = Math.sin(lon) * r;
          const x1 = x * cosY - z * sinY, z1 = x * sinY + z * cosY;
          const y1 = y * cosX - z1 * sinX, z2 = y * sinX + z1 * cosX;
          const s = fov / (fov + z2), px = cx + x1 * s, py = cy + y1 * s;
          if (lat === -Math.PI / 2) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
      ctx.setLineDash([]);

      const proj: { px: number; py: number; z: number; scale: number; hl: boolean; r: number }[] = [];
      for (let i = 0; i < numNodes; i++) {
        const n = globeNodes[i];
        const x1 = n.x * cosY - n.z * sinY, z1 = n.x * sinY + n.z * cosY;
        const y1 = n.y * cosX - z1 * sinX, z2 = n.y * sinX + z1 * cosX;
        const s = fov / (fov + z2 * globeRadius);
        proj.push({ px: cx + x1 * globeRadius * s, py: cy + y1 * globeRadius * s, z: z2, scale: s, hl: n.hl, r: n.baseRadius });
      }

      orbitalRings.forEach((ring) => {
        ring.angle += ring.speed;
        ctx.beginPath(); ctx.strokeStyle = P.RING; ctx.lineWidth = 1;
        for (let i = 0; i <= Math.PI * 2.01; i += 0.05) {
          const x = Math.cos(i) * globeRadius * ring.radius, z = Math.sin(i) * globeRadius * ring.radius;
          const ty = x * ring.tiltX + z * ring.tiltZ;
          const x1 = x * Math.cos(ring.angle) - z * Math.sin(ring.angle), z1 = x * Math.sin(ring.angle) + z * Math.cos(ring.angle);
          const pxr = x1 * cosY - z1 * sinY, pzr = x1 * sinY + z1 * cosY;
          const pyr = ty * cosX - pzr * sinX, fz = ty * sinX + pzr * cosX;
          const s = fov / (fov + fz), px = cx + pxr * s, py = cy + pyr * s;
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.stroke();

        const dx = globeRadius * ring.radius, dz = 0;
        const dty = dx * ring.tiltX + dz * ring.tiltZ;
        const dx1 = dx * Math.cos(ring.angle), dz1 = dx * Math.sin(ring.angle);
        const pxrd = dx1 * cosY - dz1 * sinY, pzrd = dx1 * sinY + dz1 * cosY;
        const pyrd = dty * cosX - pzrd * sinX, fzd = dty * sinX + pzrd * cosX;
        if (fzd > -globeRadius * 1.5) {
          const s = fov / (fov + fzd), pX = cx + pxrd * s, pY = cy + pyrd * s;
          ctx.beginPath(); ctx.arc(pX, pY, 2 * s, 0, Math.PI * 2); ctx.fillStyle = P.HL; ctx.fill();
          ctx.beginPath(); ctx.arc(pX, pY, 6 * s, 0, Math.PI * 2); ctx.fillStyle = P.GLOW; ctx.fill();
        }
      });

      ctx.lineWidth = 1.5;
      arcs.forEach((arc) => {
        arc.progress += arc.speed; if (arc.progress > 1) arc.progress = 0;
        const a = proj[arc.n1], b = proj[arc.n2];
        if (a.z > -0.5 && b.z > -0.5) {
          ctx.beginPath(); ctx.moveTo(a.px, a.py);
          const mx = (a.px + b.px) / 2, my = (a.py + b.py) / 2 - 20 * a.scale;
          ctx.quadraticCurveTo(mx, my, b.px, b.py);
          const grad = ctx.createLinearGradient(a.px, a.py, b.px, b.py);
          grad.addColorStop(0, `rgba(${P.ARC},0)`);
          grad.addColorStop(arc.progress, `rgba(${P.ARC},0.85)`);
          grad.addColorStop(Math.min(1, arc.progress + 0.1), `rgba(${P.ARC},0)`);
          ctx.strokeStyle = grad; ctx.stroke();
        }
      });

      proj.sort((a, b) => b.z - a.z);
      for (let i = 0; i < proj.length; i++) {
        const p = proj[i];
        const alpha = Math.min(1, Math.max(0.1, p.z + 1.2));
        const d = Math.hypot(p.px - cx, p.py - cy);
        const edge = Math.min(1, d / (globeRadius * 0.8));
        ctx.globalAlpha = Math.min(1, alpha * (0.5 + edge * 0.5));
        ctx.beginPath(); ctx.arc(p.px, p.py, p.r * p.scale, 0, Math.PI * 2); ctx.fillStyle = p.hl ? P.HL : P.NODE; ctx.fill();
        if (p.r > 1.5 && ctx.globalAlpha > 0.4) {
          ctx.beginPath(); ctx.arc(p.px, p.py, p.r * 2.5 * p.scale, 0, Math.PI * 2); ctx.fillStyle = P.SOFT; ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      if (running) raf = requestAnimationFrame(renderGlobe);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // animate only while it can be seen
    let onscreen = false;
    const sync = () => {
      const should = !still && onscreen && !document.hidden;
      if (should && !running) { running = true; raf = requestAnimationFrame(renderGlobe); }
      else if (!should && running) { running = false; cancelAnimationFrame(raf); }
    };
    const io = new IntersectionObserver(([entry]) => { onscreen = entry.isIntersecting; sync(); });
    io.observe(canvas);
    document.addEventListener("visibilitychange", sync);
    if (still) renderGlobe();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("resize", resizeCanvas);
      unsubscribe();
    };
  }, []);

  return <canvas ref={ref} id="hero-globe" width={640} height={600} />;
}
