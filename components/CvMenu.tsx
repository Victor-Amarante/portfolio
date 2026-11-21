"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Download } from "lucide-react";
import { RESUMES } from "@/data/resumes";

/* ─────────────────────────────────────────────────────────
   Résumé language menu (EN / PT-BR) — used in the nav and in
   Contact. Closes on any click outside its button (which also
   closes it after a download link is picked, and closes the
   other menu when this one opens) and on Escape.
   ───────────────────────────────────────────────────────── */
export default function CvMenu({
  label,
  large = false,
  buttonClass,
}: {
  label: string;
  large?: boolean;
  buttonClass: string;
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!btnRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className={`cv-menu${large ? " cv-menu-lg" : ""}${open ? " open" : ""}`}>
      <button
        ref={btnRef}
        type="button"
        className={`${buttonClass} cv-menu-btn`}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <Download />
        {label}
        <ChevronDown className="cv-caret" />
      </button>
      <div className="cv-menu-panel">
        {RESUMES.map((r) => (
          <a key={r.code} href={r.href} download>
            <span className="cv-lang">{r.code}</span>
            {r.language}
          </a>
        ))}
      </div>
    </div>
  );
}
