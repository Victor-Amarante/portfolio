# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Victor Amarante's personal portfolio site — a single-page static site (English) presenting him as a Senior AI/ML Engineer. No framework, no build step, no package.json: hand-written HTML/CSS/vanilla JS deployed as-is.

## Serving & deploying

- **Deployment:** GitHub Pages, source = `main` branch, folder = `/docs`. The `.nojekyll` marker in `docs/` disables Jekyll processing. Any change to files under `docs/` is what actually ships.
- **Local preview:** just open `docs/index.html` in a browser, or `python3 -m http.server 8000 --directory docs` and visit `http://localhost:8000/`. Reload = deploy.
- **The three `*.aura.build/` folders at repo root are gitignored reference sites** (Cadence, Omi's "ai-social-automation", "ai-intelligence-saas") kept locally as design inspiration. They are NOT part of the deployed site — do not edit them expecting changes to appear, and do not add them to git.

## Architecture

Everything user-facing lives in three files:

- `docs/index.html` (~1.7k lines) — every section inline, ordered top-to-bottom: Nav → Hero → Trust marquee → About → Expertise (bento grid) → Globe/Intelligence layer → Impact metrics → Experience (timeline) → Projects → Certifications → Speaking (photo gallery) → Consensus (testimonials) → Contact → Footer, plus the lightbox dialog just before the scripts. Sections are delimited by `<!-- ═══ NAME ═══ -->` banner comments — use these to navigate.
- `docs/assets/css/styles.css` — design tokens in `:root` (`--bg-0`, `--accent`, `--accent-light`, `--font-body`, `--maxw`, etc.) drive the entire teal theme distilled from the aura.build reference sites. Change the look by editing tokens, not individual selectors.
- `docs/assets/js/main.js` — a `Theme` module plus eight numbered IIFEs, each a self-contained interactive piece:
  0. `Theme` — dark/light switch. See "Theming" below.
  1. Hero WebGL aurora/plasma shader (`#heroCanvas`, cursor-reactive fbm noise).
  2. Canvas-2D fibonacci-sphere globe with orbital rings and animated arcs (`#hero-globe`).
  3. Nav scroll state + mobile hamburger.
  4. `IntersectionObserver` scroll-reveal for `.reveal`, `.reveal-left`, `.reveal-right`, `.stagger-up`.
  4b. Timeline scroll-driven progress fill (`#timeline` / `#tlProgress`) — lights `.tl-marker` elements as they pass a scroll-derived threshold.
  5. Testimonials carousel — content is a hardcoded `TESTIMONIALS` array (~line 365) with a header comment explaining the schema; **edit that array to add/remove testimonials**, DOM is generated from it.
  6. Global Three.js dot-wave backdrop (`#site-wave`) — Three r128 is lazy-loaded from cdnjs on first use; skipped entirely when `prefers-reduced-motion: reduce`.
  7. Résumé language dropdown (`.cv-menu`) — click-to-open EN/PT-BR menu, used in the nav and in Contact; closes on outside click, Escape, or selection.
  8. Speaking-gallery lightbox (`#lbox`) — arrows/Escape/Tab-trap, preloads neighbours. It reads each slide's kicker, title and description out of the clicked `.talk`'s own `<figcaption>`, so captions are never duplicated in JS.
  9. Sets the copyright year and calls `lucide.createIcons()`.

Each IIFE early-returns if its anchor element is missing, so sections can be safely removed from `index.html` without JS errors.

## Theming (dark default + light)

The active theme is the `data-theme` attribute on `<html>`: absent = dark, `"light"` = light. Three pieces keep in sync:

1. **CSS** — `:root` holds the dark tokens, `:root[data-theme="light"]` overrides them. Surfaces don't hardcode colours; they resolve through bare `r,g,b` triples so alpha ramps survive a theme flip: `--ink` (text/borders/raised surfaces), `--paper` + `--paper-2` (translucent nav & dropdown panels), `--shadow`. Hence `rgba(var(--ink),0.07)` all over the file. Raised cards share `--surface`; text sitting on teal fills uses `--on-accent`. **Adding a colour means adding a token, not a literal** — a literal `rgba(255,255,255,…)` will look wrong in light mode.
2. **Anti-flash** — an inline script in `<head>` reads `localStorage['va-theme']` (falling back to `prefers-color-scheme`) and sets the attribute before first paint. It must stay inline and before the stylesheet.
3. **Canvases** — the three canvases can't read CSS tokens, so each carries its own palette and subscribes to the `themechange` event: the hero shader takes a `u_light` uniform *and* swaps to normal alpha blending (additive glow only works on a dark page), the globe swaps its `PALETTES` object, the dot-wave updates its material uniforms.

`Theme.isLight()` gives the current state; `Theme.apply('light'|'dark', persist)` sets it.

Note: Lucide **replaces** `<i data-lucide>` with an `<svg>`, so CSS icon rules must target `svg` (or a class on the `<i>`, which Lucide copies over) — a bare `.foo i` selector silently stops applying and the icon renders at its default 24px.

## External runtime dependencies (CDN, no install)

- Google Fonts: Inter (body) + Outfit (display).
- Lucide icons via `unpkg.com/lucide@latest` — icons use `<i data-lucide="name"></i>`.
- Three.js r128 via cdnjs — only fetched by IIFE #6 when the wave backdrop initializes.

## Conventions worth knowing

- Text content lives directly in `index.html`. There is no CMS or data file — copy edits mean editing the HTML.
- Testimonials are the one exception: they live as JS objects in `main.js` (see the `EDIT HERE` comment above the `TESTIMONIALS` array).
- **Speaking gallery photos** live in `docs/assets/img/talks/` as `<slug>-sm` (700px) and `<slug>-lg` (1600px) in both `.jpg` and `.webp` — generated from the originals with `sips` + `cwebp`. The layout is a justified gallery: each `<figure class="talk">` carries its own source aspect ratio inline as `style="--ar: 1.501"`, and CSS both flex-grows it by that number and applies it as `aspect-ratio`, so every tile in a row lands at the same height with no cropping. Adding a photo = drop a `<figure>` into a `.talks-row` with the right `--ar`, plus `talk-wide` if it's landscape; the lightbox picks it up automatically. Row height is `(row width − gaps) / Σ--ar`, so Σ is the size dial: the current rows sum to 3.58 and 3.00, giving ~305px and ~360px tiles. Keep new rows in that Σ3.0–3.6 band — a row of two portraits (Σ1.5) resolves absurdly tall. Below 1024px the rows dissolve (`display: contents`) into one dense 2-column grid where `talk-wide` spans both columns, so document order still decides what comes first.
- Colors: near-black backgrounds `#060610`/`#0A0A18`, teal accents `#14B8A6` / `#2DD4BF` / `#5EEAD4`. Hardcoded in shaders and canvas code (not just the CSS tokens), so a rebrand touches all three files.
- The résumés live in `docs/assets/curriculum/`: `CV_VictorAmarante_EN.pdf` and `CV_VictorAmarante_PTBR.pdf`. Both are exposed through the `.cv-menu` language dropdown (nav + Contact) — if the filenames change, update the two `.cv-menu-panel` blocks and the `.nav-mobile-cv` pair in `index.html`.
