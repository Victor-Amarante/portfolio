"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight, Languages, Pause, Play } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";
import { prefersReducedMotion } from "@/lib/theme";

/* Stacked testimonial carousel — auto-advances every 5.5s, pausing
   while hovered or focused and from its own pause toggle; any manual
   move restarts the clock. No autoplay under reduced motion, nor on
   phones, where the stack follows each card's height and an automatic
   change would shift the page under the reader.
   Content: data/testimonials.ts */
const AUTOPLAY_MS = 5500;
const NARROW = "(max-width: 640px)"; // keep in sync with the .tstack media query
const initials = (n: string) =>
  n.trim().split(/\s+/).slice(0, 2).map((w) => w[0] || "").join("").toUpperCase();

export default function Testimonials() {
  const n = TESTIMONIALS.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false); // the visitor's explicit choice
  const [held, setHeld] = useState(false); // hover / keyboard focus inside
  // bumping this re-arms the autoplay interval
  const [clock, setClock] = useState(0);
  // wide screens: the stack holds the tallest card's height so nothing below
  // shifts as cards rotate; phones: it follows the front card (see CSS).
  // Either way the cards behind are clipped to the front card's height.
  const [sizes, setSizes] = useState<{ front: number; tallest: number } | null>(null);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const els = innerRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const measure = () =>
      setSizes({
        front: innerRefs.current[active]?.offsetHeight ?? 0,
        // scrollHeight still reports the full content of a clipped card
        tallest: Math.max(...els.map((el) => el.scrollHeight)),
      });
    const ro = new ResizeObserver(measure);
    els.forEach((el) => ro.observe(el));
    return () => ro.disconnect();
  }, [active]);

  useEffect(() => {
    if (paused || held || prefersReducedMotion() || window.matchMedia(NARROW).matches) return;
    const timer = setInterval(() => setActive((a) => (a + 1) % n), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [n, clock, paused, held]);

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
    <div
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setHeld(false);
      }}
    >
      <div
        className="tstack"
        id="tstack"
        aria-live={paused ? "polite" : "off"}
        style={
          sizes
            ? ({ "--front-h": `${sizes.front}px`, "--stack-h": `${sizes.tallest}px` } as CSSProperties)
            : undefined
        }
      >
        {TESTIMONIALS.map((t, i) => (
          <article
            key={t.name}
            className={`tcard ${position(i)}`}
            aria-hidden={i !== active ? true : undefined}
          >
            <div className="tcard-inner" ref={(el) => { innerRefs.current[i] = el; }}>
              {t.translated && (
                <span className="tcard-trans">
                  <Languages />
                  Translated from Portuguese
                </span>
              )}
              <div className="tcard-quote-mark" aria-hidden="true">&ldquo;</div>
              <p className="tcard-text">{t.text}</p>
              <div className="tcard-author">
                <div className="tcard-avatar" aria-hidden="true">{initials(t.name)}</div>
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
        <button className="tstack-arrow" id="tPrev" aria-label="Previous testimonial" onClick={() => go(active - 1)}>
          <ArrowLeft />
        </button>
        <div className="tstack-dots" id="tDots">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              className={i === active ? "tdot active" : "tdot"}
              aria-label={`Go to testimonial ${i + 1} of ${n}`}
              aria-current={i === active ? "true" : undefined}
              onClick={() => go(i)}
            ></button>
          ))}
        </div>
        <button className="tstack-arrow" id="tNext" aria-label="Next testimonial" onClick={() => go(active + 1)}>
          <ArrowRight />
        </button>
        <button
          className="tstack-arrow"
          aria-label={paused ? "Resume testimonials" : "Pause testimonials"}
          aria-pressed={paused}
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? <Play /> : <Pause />}
        </button>
      </div>
    </div>
  );
}
