# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Victor Amarante's personal portfolio site — a single-page site (English) presenting him as a Senior Applied AI Engineer. Built with **Next.js 16 (App Router) + React 19 + TypeScript**, exported as fully static HTML (`output: "export"`). No CSS framework: one global stylesheet driven by design tokens.

## Commands

- `npm run dev` — dev server at **http://localhost:3000/portfolio/** (note the basePath).
- `npm run build` — static export into `out/` (also runs the TypeScript check).
- `npm run typecheck` — `tsc --noEmit` only.
- Local preview of the export: `BASE_PATH= npm run build && python3 -m http.server 8000 --directory out`.

## Deploying

- GitHub Pages, deployed by `.github/workflows/deploy.yml` on every push to `main` (builds, uploads `out/`, deploys). The repo's Pages source must be set to **GitHub Actions** (Settings → Pages).
- It is a project site at `https://victor-amarante.github.io/portfolio/`, so `next.config.ts` sets `basePath: "/portfolio"` (override with the `BASE_PATH` env var, e.g. `""` for a custom domain). `public/.nojekyll` is kept so `_next/` survives if the output is ever served through Jekyll.
- **The three `*.aura.build/` folders at repo root are gitignored reference sites** (Cadence, Omi's "ai-social-automation", "ai-intelligence-saas") kept locally as design inspiration. They are NOT part of the site — don't edit them expecting changes, don't add them to git (they're also excluded in `tsconfig.json`).

## Architecture

```
app/layout.tsx        <html>/<head>: metadata, next/font (Inter + Outfit), anti-flash theme script
app/page.tsx          composes the sections in order
app/globals.css       the whole stylesheet (design tokens in :root)
components/sections/  one file per page section
components/canvas/    HeroCanvas (WebGL shader), GlobeCanvas (canvas 2D), SiteWave (Three.js)
components/           shared client pieces: Reveal, Nav, ThemeToggle, CvMenu, Timeline,
                      TalksGallery, Lightbox, Testimonials, Year, BrandIcons
data/                 content that's rendered from lists (see below)
lib/theme.ts          theme state helpers + the inline init script
lib/asset.ts          prefixes /public paths with the basePath
public/assets/        images (img/, img/talks/) and résumé PDFs (curriculum/)
```

Section order in `app/page.tsx`: SiteWave → Nav → Hero → Trust marquee → About → Expertise (bento grid) → Globe/Intelligence layer → Impact metrics → Experience (timeline + ventures) → Projects → Certifications → Speaking (photo gallery) → Consensus (testimonials) → Contact → Footer. The lightbox is portalled to `<body>` by `Lightbox.tsx`.

Sections are server components; anything with state, effects or event handlers is a `"use client"` component nested inside them. Every effect cleans up after itself (listeners, rAF loops, the Three.js renderer) — React StrictMode double-mounts in dev, so a missing cleanup shows up as duplicated canvases/listeners.

Interactive pieces:
- `canvas/HeroCanvas` — WebGL aurora/plasma shader (fbm noise). The plasma is anchored to a fixed focal point (`mp` in the fragment shader) — it deliberately does **not** track the pointer, and nothing else on the site does either.
- `canvas/GlobeCanvas` — fibonacci-sphere globe with orbital rings and animated arcs.
- `canvas/SiteWave` — global Three.js dot-wave backdrop. `three` is an npm dependency loaded with a dynamic `import()`, so it's code-split and only fetched after mount; skipped entirely when `prefers-reduced-motion: reduce`. It sets `THREE.ColorManagement.enabled = false` so the raw hex colours reach the custom shader unconverted (matching the original r128 look).
- `Nav` — scroll state (`.scrolled` past 40px) + mobile hamburger sheet.
- `Reveal` — a `<div>` that gains `.active` when it first intersects; use it wherever an element needs `.reveal`, `.reveal-left`, `.reveal-right` or `.stagger-up`.
- `Timeline` — scroll-driven progress fill (`#tlProgress`, height written directly via ref) and `.lit` markers.
- `Testimonials` — stacked carousel, auto-advances every 5.5s, manual navigation restarts the timer.
- `CvMenu` — résumé language dropdown (EN/PT-BR), used in the nav and in Contact; closes on outside click, Escape, or selection.
- `TalksGallery` + `Lightbox` — justified gallery; lightbox has arrows/Escape/Tab-trap, focus restore, preloads neighbours.
- `Year` — build year in the HTML, corrected to the current year on load.

## Content — where to edit

- **Testimonials:** `data/testimonials.ts` (see the `EDIT HERE` comment).
- **Experience timeline + parallel ventures:** `data/experience.tsx` (descriptions are JSX so they can hold `<strong>`/`<em>`).
- **Speaking photos & captions:** `data/talks.ts` (the lightbox reads from the same data).
- **Résumé PDFs:** `data/resumes.ts` — the single list behind both `.cv-menu` dropdowns and the mobile-nav pair. Files live in `public/assets/curriculum/`.
- **Email/LinkedIn/GitHub/phone:** `data/contact.ts` (Contact section + footer).
- Smaller lists (hero metrics, toolkit marquee, bento cards, impact metrics, projects, certifications, About facts) are constants at the top of their section component. Prose lives directly in the section JSX.
- Any URL to a file in `public/` must go through `asset()` from `lib/asset.ts`, otherwise it misses the `/portfolio` basePath.

## Theming (dark default + light)

The active theme is the `data-theme` attribute on `<html>`: absent = dark, `"light"` = light. Three pieces keep in sync:

1. **CSS** — `:root` holds the dark tokens, `:root[data-theme="light"]` overrides them. Surfaces don't hardcode colours; they resolve through bare `r,g,b` triples so alpha ramps survive a theme flip: `--ink` (text/borders/raised surfaces), `--paper` + `--paper-2` (translucent nav & dropdown panels), `--shadow`. Hence `rgba(var(--ink),0.07)` all over the file. Raised cards share `--surface`; text sitting on teal fills uses `--on-accent`. **Adding a colour means adding a token, not a literal** — a literal `rgba(255,255,255,…)` will look wrong in light mode.
2. **Anti-flash** — `THEME_INIT_SCRIPT` in `lib/theme.ts` is inlined into `<head>` by `app/layout.tsx`. It reads `localStorage['va-theme']` (falling back to `prefers-color-scheme`) and sets the attribute before first paint. `<html>` has `suppressHydrationWarning` because of it.
3. **Canvases** — the three canvases can't read CSS tokens, so each carries its own palette and subscribes via `onThemeChange()` (a `themechange` window event fired by `applyTheme()`): the hero shader takes a `u_light` uniform *and* swaps to normal alpha blending (additive glow only works on a dark page), the globe swaps its `PALETTES` object, the dot-wave updates its material uniforms.

`isLight()` gives the current state; `applyTheme('light'|'dark', persist)` sets it. `ThemeToggle` also follows OS changes while the visitor hasn't picked a theme.

Icons come from `lucide-react` and render as `<svg class="lucide lucide-<name> …">` with any `className` you pass. CSS icon rules target `svg` (or a class passed to the icon) — never a bare `.foo i`. LinkedIn/GitHub marks aren't in Lucide; they're in `components/BrandIcons.tsx`.

## Conventions worth knowing

- Fonts are self-hosted through `next/font/google`; they're exposed as `--font-inter` / `--font-outfit` on `<html>` and consumed by the `--font-body` / `--font-head` tokens.
- Images use plain `<img>`/`<picture>` (static export, hand-made responsive variants), not `next/image`.
- **Speaking gallery photos** live in `public/assets/img/talks/` as `<slug>-sm` (700px) and `<slug>-lg` (1600px) in both `.jpg` and `.webp` — generated from the originals with `sips` + `cwebp`. The layout is a justified gallery: each `<figure class="talk">` gets its source aspect ratio as the `--ar` custom property (from `ar` in `data/talks.ts`), and CSS both flex-grows it by that number and applies it as `aspect-ratio`, so every tile in a row lands at the same height with no cropping. Adding a photo = add an entry to a row in `data/talks.ts` with the right `ar`, plus `wide: true` if it's landscape. Row height is `(row width − gaps) / Σar`, so Σ is the size dial: the current rows sum to 3.58 and 3.00, giving ~305px and ~360px tiles. Keep new rows in that Σ3.0–3.6 band — a row of two portraits (Σ1.5) resolves absurdly tall. Below 1024px the rows dissolve (`display: contents`) into one dense 2-column grid where `talk-wide` spans both columns, so array order still decides what comes first.
- Colors: near-black backgrounds `#060610`/`#0A0A18`, teal accents `#14B8A6` / `#2DD4BF` / `#5EEAD4`. Hardcoded in the shaders and canvas components (and the testimonial avatar gradients) as well as the CSS tokens, so a rebrand touches `globals.css` and `components/canvas/*`.
- `AGENTS.md` is generated by `next dev` (Next.js agent rules) — commit it rather than deleting it.
