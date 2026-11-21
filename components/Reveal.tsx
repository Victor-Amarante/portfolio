"use client";

import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react";

/* ─────────────────────────────────────────────────────────
   Scroll reveal — a <div> that gains `.active` the first time
   it scrolls into view. Pair it with one of the CSS reveal
   classes: reveal, reveal-left, reveal-right, stagger-up.
   ───────────────────────────────────────────────────────── */
export default function Reveal({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -50px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref} className={active ? `${className} active` : className} {...rest} />;
}
