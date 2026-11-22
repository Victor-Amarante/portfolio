"use client";

import { Moon, Sun } from "lucide-react";
import { applyTheme, isLight } from "@/lib/theme";

export default function ThemeToggle() {
  return (
    <button
      type="button"
      className="theme-toggle"
      id="themeToggle"
      aria-label="Switch colour theme"
      title="Switch colour theme"
      onClick={() => applyTheme(isLight() ? "dark" : "light")}
    >
      {/* both icons always render; CSS shows the one for the theme you'd switch to */}
      <Moon className="th-moon" />
      <Sun className="th-sun" />
    </button>
  );
}
