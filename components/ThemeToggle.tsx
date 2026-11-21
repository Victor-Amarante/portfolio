"use client";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { applyTheme, getStoredTheme, isLight } from "@/lib/theme";

export default function ThemeToggle() {
  // follow the OS only while the visitor hasn't picked a side
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (e: MediaQueryListEvent) => {
      if (!getStoredTheme()) applyTheme(e.matches ? "light" : "dark", false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <button
      type="button"
      className="theme-toggle"
      id="themeToggle"
      aria-label="Switch colour theme"
      title="Switch colour theme"
      onClick={() => applyTheme(isLight() ? "dark" : "light", true)}
    >
      {/* both icons always render; CSS shows the one matching [data-theme] */}
      <Sun className="th-sun" />
      <Moon className="th-moon" />
    </button>
  );
}
