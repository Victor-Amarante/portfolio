/* ─────────────────────────────────────────────────────────
   THEME — dark (default) / light
   The CSS side is driven entirely by [data-theme] on <html>.
   The three canvases can't read CSS tokens, so they subscribe
   to the `themechange` event and re-read isLight().
   The initial value is applied by THEME_INIT_SCRIPT, inlined in
   <head> by app/layout.tsx, so there's no flash of the wrong
   theme before React hydrates.
   ───────────────────────────────────────────────────────── */

export type ThemeName = "light" | "dark";
export type ThemeChangeEvent = CustomEvent<{ light: boolean }>;

const KEY = "va-theme";

export const THEME_INIT_SCRIPT = `(function () {
  try {
    var stored = localStorage.getItem("${KEY}");
    var light =
      stored === "light" ||
      (!stored && window.matchMedia("(prefers-color-scheme: light)").matches);
    if (light) document.documentElement.setAttribute("data-theme", "light");
  } catch (e) {}
})();`;

export const isLight = () =>
  document.documentElement.getAttribute("data-theme") === "light";

export function applyTheme(name: ThemeName, persist: boolean) {
  const root = document.documentElement;
  if (name === "light") root.setAttribute("data-theme", "light");
  else root.removeAttribute("data-theme");
  if (persist) {
    try { localStorage.setItem(KEY, name); } catch { /* private mode */ }
  }
  window.dispatchEvent(
    new CustomEvent("themechange", { detail: { light: name === "light" } })
  );
}

export function getStoredTheme(): string | null {
  try { return localStorage.getItem(KEY); } catch { return null; }
}

/** Subscribe to theme flips; returns the unsubscribe function. */
export function onThemeChange(cb: (light: boolean) => void) {
  const handler = (e: Event) => cb((e as ThemeChangeEvent).detail.light);
  window.addEventListener("themechange", handler);
  return () => window.removeEventListener("themechange", handler);
}
