"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import CvMenu from "./CvMenu";
import ThemeToggle from "./ThemeToggle";
import { RESUMES } from "@/data/resumes";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#expertise", label: "Expertise" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Work" },
  { href: "#speaking", label: "Speaking" },
  { href: "#contact", label: "Contact" },
];

/* Nav — glass surface once scrolled, active-section underline
   (scroll spy) and an accessible mobile sheet (Escape closes). */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // a section counts as current while it crosses a band just below the nav
  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector<HTMLElement>(l.href)).filter(
      (s): s is HTMLElement => s !== null
    );
    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        });
        const current = LINKS.find((l) => visible.has(l.href.slice(1)));
        setActive(current ? current.href : null);
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav id="nav" className={scrolled || menuOpen ? "scrolled" : undefined} aria-label="Primary">
        <a href="#hero" className="nav-logo">
          Victor<span>Amarante</span>
        </a>
        <ul className="nav-links">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} aria-current={active === l.href ? "true" : undefined}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <ThemeToggle />
          <div className="nav-cta">
            <CvMenu label="Résumé" buttonClass="btn btn-secondary btn-sm" />
            <a href="#contact" className="btn btn-primary btn-sm">
              Let&apos;s talk
            </a>
          </div>
          <button
            className={`nav-hamburger${menuOpen ? " open" : ""}`}
            id="hamburger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="navMobile"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
      <div
        className={`nav-mobile${menuOpen ? " open" : ""}`}
        id="navMobile"
        // keeps the closed sheet out of the tab order and the accessibility tree
        inert={!menuOpen}
      >
        <ul>
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={closeMenu} aria-current={active === l.href ? "true" : undefined}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-mobile-cv">
          {RESUMES.map((r, i) => (
            <a
              key={r.code}
              href={r.href}
              download
              className={`btn ${i === 0 ? "btn-primary" : "btn-secondary"}`}
              onClick={closeMenu}
            >
              <Download />
              {r.mobileLabel}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
