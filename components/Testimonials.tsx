"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Languages } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";

/* Stacked testimonial carousel — auto-advances every 5.5s; any
   manual move restarts the clock. Content: data/testimonials.ts */
const AUTOPLAY_MS = 5500;
const AV_GRADS = [
  "linear-gradient(135deg,#2DD4BF,#14B8A6)",
  "linear-gradient(135deg,#14B8A6,#0D9488)",
  "linear-gradient(135deg,#5EEAD4,#2DD4BF)",
  "linear-gradient(135deg,#0D9488,#0F766E)",
];
const initials = (n: string) =>
  n.trim().split(/\s+/).slice(0, 2).map((w) => w[0] || "").join("").toUpperCase();

export default function Testimonials() {
  const n = TESTIMONIALS.length;
  const [active, setActive] = useState(0);
  // bumping this re-arms the autoplay interval
  const [clock, setClock] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((a) => (a + 1) % n), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [n, clock]);

  const go = (i: number) => {
    setActive((i + n) % n);
    setClock((c) => c + 1);
  };

  const position = (i: number) => {
    const rel = (i - active + n) % n;
    if (rel === 0) return "is-front";
    if (rel === 1) return "is-right";
    if (rel === n - 1) return "is-left";
    return "is-hidden";
  };

  if (!n) return null;

  return (
    <>
      <div className="tstack" id="tstack">
        {TESTIMONIALS.map((t, i) => (
          <article key={t.name} className={`tcard ${position(i)}`}>
            <div className="tcard-inner">
              <div className="tcard-grid"></div>
              {t.translated && (
                <span className="tcard-trans">
                  <Languages />
                  Translated from Portuguese
                </span>
              )}
              <div className="tcard-quote-mark">&ldquo;</div>
              <p className="tcard-text">{t.text}</p>
              <div className="tcard-author">
                <div className="tcard-avatar" style={{ background: AV_GRADS[i % AV_GRADS.length] }}>
                  {initials(t.name)}
                </div>
                <div>
                  <div className="tcard-name">{t.name}</div>
                  <div className="tcard-relation">{t.relation}</div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="tstack-nav">
        <button className="tstack-arrow" id="tPrev" aria-label="Previous" onClick={() => go(active - 1)}>
          <ArrowLeft />
        </button>
        <div className="tstack-dots" id="tDots">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              className={i === active ? "tdot active" : "tdot"}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => go(i)}
            ></button>
          ))}
        </div>
        <button className="tstack-arrow" id="tNext" aria-label="Next" onClick={() => go(active + 1)}>
          <ArrowRight />
        </button>
      </div>
    </>
  );
}
