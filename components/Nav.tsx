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
  { href: "#projects", label: "Projects" },
  { href: "#speaking", label: "Speaking" },
  { href: "#contact", label: "Contact" },
];

/* Nav — scroll state + mobile hamburger sheet */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav id="nav" className={scrolled ? "scrolled" : undefined}>
        <a href="#hero" className="nav-logo">
          Victor<span>Amarante</span>
        </a>
        <ul className="nav-links">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <ThemeToggle />
          <div className="nav-cta">
            <CvMenu label="Résumé" buttonClass="btn-nav btn-nav-ghost" />
            <a href="#contact" className="btn-nav btn-nav-solid">
              Let&apos;s talk
            </a>
          </div>
          <button
            className={`nav-hamburger${menuOpen ? " open" : ""}`}
            id="hamburger"
            aria-label="Menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
      <div className={`nav-mobile${menuOpen ? " open" : ""}`} id="navMobile">
        <ul>
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={closeMenu}>
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
              className={`btn-nav ${i === 0 ? "btn-nav-solid" : "btn-nav-ghost"}`}
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
