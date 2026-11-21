"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { talkSrc, type Talk } from "@/data/talks";

/* ─────────────────────────────────────────────────────────
   Speaking gallery lightbox — arrows / Escape / Tab-trap,
   preloads neighbours. Portalled to <body> because the gallery
   sits inside a transformed .reveal, which would otherwise
   become the containing block of this position:fixed dialog.
   ───────────────────────────────────────────────────────── */
export default function Lightbox({
  talks,
  current,
  isOpen,
  onStep,
  onClose,
}: {
  talks: Talk[];
  current: number;
  isOpen: boolean;
  onStep: (delta: number) => void;
  onClose: () => void;
}) {
  const [portal, setPortal] = useState<HTMLElement | null>(null);
  const [hidden, setHidden] = useState(true);
  const [visible, setVisible] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const stageRef = useRef<HTMLElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => setPortal(document.body), []);

  const finishClose = () => {
    clearTimeout(closeTimer.current);
    setHidden(true);
  };

  // open: unhide, then fade in a frame later; the cleanup is the close
  useEffect(() => {
    if (!isOpen) return;
    clearTimeout(closeTimer.current);
    lastFocus.current = document.activeElement as HTMLElement | null;
    setHidden(false);
    document.body.classList.add("lbox-open");
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => {
      cancelAnimationFrame(raf);
      setVisible(false);
      document.body.classList.remove("lbox-open");
      lastFocus.current?.focus();
      // wait out the fade, but don't hang if transitions are off
      closeTimer.current = setTimeout(finishClose, 340);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && !hidden) closeRef.current?.focus();
  }, [isOpen, hidden]);

  // preload the neighbours so arrowing through doesn't flash
  useEffect(() => {
    if (!isOpen) return;
    [current + 1, current - 1].forEach((n) => {
      new Image().src = talkSrc(talks[(n + talks.length) % talks.length].slug, "lg", "jpg");
    });
  }, [isOpen, current, talks]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onStep(1);
      else if (e.key === "ArrowLeft") onStep(-1);
      else if (e.key === "Tab") {
        // keep tabbing inside the dialog while it's open
        const first = closeRef.current;
        const last = nextRef.current;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onStep, onClose]);

  if (!portal) return null;
  const talk = talks[current];

  return createPortal(
    <div
      className={visible ? "lbox open" : "lbox"}
      id="lbox"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      hidden={hidden}
      // a click that lands on the padding around the image closes too
      onClick={(e) => {
        if (e.target === e.currentTarget || e.target === stageRef.current) onClose();
      }}
      onTransitionEnd={() => {
        if (!isOpen) finishClose();
      }}
    >
      <div className="lbox-backdrop" onClick={onClose}></div>
      <button ref={closeRef} className="lbox-btn lbox-close" aria-label="Close" onClick={onClose}>
        <X />
      </button>
      <button className="lbox-btn lbox-prev" aria-label="Previous photo" onClick={() => onStep(-1)}>
        <ArrowLeft />
      </button>
      <button ref={nextRef} className="lbox-btn lbox-next" aria-label="Next photo" onClick={() => onStep(1)}>
        <ArrowRight />
      </button>
      <figure className="lbox-stage" ref={stageRef}>
        <img id="lboxImg" src={hidden ? undefined : talkSrc(talk.slug, "lg", "jpg")} alt={hidden ? "" : talk.alt} />
        <figcaption className="lbox-cap">
          <span className="talk-kicker">{talk.kicker}</span>
          <strong>{talk.title}</strong>
          <p>{talk.desc}</p>
          <span className="lbox-count">
            <span>{current + 1}</span> / <span>{talks.length}</span>
          </span>
        </figcaption>
      </figure>
    </div>,
    portal
  );
}
