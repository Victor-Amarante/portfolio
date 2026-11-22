/* ─────────────────────────────────────────────────────────
   THEME — light (default) / dark (opt-in)
   The CSS side is driven entirely by [data-theme="dark"] on
   <html>; absent = light, the design system's default
   direction. Dark only applies once a visitor picks it from the
   nav toggle (persisted in localStorage) — the OS preference is
   deliberately not followed.
   The two canvases can't read CSS tokens, so they subscribe
   to the `themechange` event and re-read isLight().
   THEME_INIT_SCRIPT is inlined in <head> by app/layout.tsx so
   there's no flash of the wrong theme before React hydrates; it
   also tags <html> with `js`, which gates the entry animations.
   ───────────────────────────────────────────────────────── */

export type ThemeName = "light" | "dark";
export type ThemeChangeEvent = CustomEvent<{ light: boolean }>;

const KEY = "va-theme";

export const THEME_INIT_SCRIPT = `(function () {
  var root = document.documentElement;
  root.classList.add("js");
  try {
    if (localStorage.getItem("${KEY}") === "dark") root.setAttribute("data-theme", "dark");
  } catch (e) {}
})();`;

export const isLight = () =>
  document.documentElement.getAttribute("data-theme") !== "dark";

export function applyTheme(name: ThemeName) {
  const root = document.documentElement;
  if (name === "dark") root.setAttribute("data-theme", "dark");
  else root.removeAttribute("data-theme");
  try { localStorage.setItem(KEY, name); } catch { /* private mode */ }
  window.dispatchEvent(
    new CustomEvent("themechange", { detail: { light: name === "light" } })
  );
}

/** Subscribe to theme flips; returns the unsubscribe function. */
export function onThemeChange(cb: (light: boolean) => void) {
  const handler = (e: Event) => cb((e as ThemeChangeEvent).detail.light);
  window.addEventListener("themechange", handler);
  return () => window.removeEventListener("themechange", handler);
}

/** True when the visitor asked for reduced motion. */
export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
