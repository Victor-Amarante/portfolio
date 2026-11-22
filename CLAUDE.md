# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Victor Amarante's personal portfolio site — a single-page site (English) presenting him as a **Senior Software Engineer, AI**. Built with **Next.js 16 (App Router) + React 19 + TypeScript**, exported as fully static HTML (`output: "export"`). No CSS framework: one global stylesheet driven by design tokens.

**The visual language is specified in `DESIGN_SYSTEM.md`** (premium minimalist, pearl-white + blue, soft glassmorphism, spatial accents). Read it before any visual change; `app/globals.css` implements its tokens.

**The content and positioning are specified in `context-system/PROFESSIONAL_POSITIONING.md`**, and the employment facts (titles, dates, metrics) come from the latest résumé, `public/assets/curriculum/CV_VictorAmarante_EN.pdf`. Rules that are easy to break when editing copy:
- "Senior Software Engineer, AI" is the public title (hero, metadata, footer). The job titles in `data/experience.tsx` are set by Victor — don't change them without asking, and keep the `role` lines in `Projects.tsx` consistent with them.
- Keep scope qualifiers: the banking assistant is *designed for* millions of users (not serving them); Amigo Flow supports *tens of thousands of monthly appointments*; percentages are increases, not percentage points; the 90%+ efficiency gains are *in selected workflows*.
- Statistics was undergraduate study (internal transfer), not a completed degree; the Information Systems B.Sc. is expected Dec 2026. The SLM research is ongoing — no fine-tuning or distillation results.
- Enterprise work stays at a non-confidential level; collaborative decisions aren't presented as sole ownership. No "visionary", "frontier", "staff-level" or similar inflation.

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
app/layout.tsx        <html>/<head>: metadata, next/font (Inter 400/500/600), anti-flash theme script
app/page.tsx          composes the sections in order
app/globals.css       the whole stylesheet (design tokens in :root)
components/sections/  one file per page section
components/canvas/    GlobeCanvas (canvas 2D), SiteWave (Three.js)
components/           shared client pieces: HeroVisual, Reveal, Nav, ThemeToggle, CvMenu,
                      Timeline, TalksGallery, Lightbox, Testimonials, Year, BrandIcons
data/                 content that's rendered from lists (see below)
lib/theme.ts          theme state helpers + the inline init script
lib/asset.ts          prefixes /public paths with the basePath
public/assets/        images (img/, img/talks/) and résumé PDFs (curriculum/)
```

Order in `app/page.tsx`: skip link → Nav → `<main>` [Hero → Trust marquee → About → Expertise (four pillars + "toolkit by domain" panel, `section-alt`) → Engineering-philosophy panel with the globe → Impact metrics grid → Experience (career-journey path + timeline + "Research, ventures & community", anchor `#research`) → Projects (`section-alt`) → Certifications → Speaking (photo gallery) → Consensus (testimonials, `section-alt`) → Contact (with the dot-wave backdrop)] → Footer. The lightbox is portalled to `<body>` by `Lightbox.tsx`.

Sections are server components; anything with state, effects or event handlers is a `"use client"` component nested inside them. Every effect cleans up after itself (listeners, rAF loops, the Three.js renderer) — React StrictMode double-mounts in dev, so a missing cleanup shows up as duplicated canvases/listeners.

Interactive pieces:
- `HeroVisual` — the hero's decorative spatial scene: an isometric stack of frosted layers (data → services → agents), rising beams, orbits and floating glass chips, all **pure CSS 3D** (no canvas). Depth uses `cqi` units because `translateZ()` rejects percentages. It's illustrative, not a real architecture diagram. Ambient loops pause via `data-paused` when offscreen or the tab is hidden. Nothing on the site tracks the pointer.
- `canvas/GlobeCanvas` — fibonacci-sphere globe in the globe showcase panel. Renders only while onscreen and the tab is visible; under reduced motion it draws one still frame.
- `canvas/SiteWave` — Three.js dot-wave, now only behind the Contact section (reading sections stay plain pearl). `three` is loaded with a dynamic `import()`, so it's code-split; skipped under reduced motion; paused offscreen/hidden. It sets `THREE.ColorManagement.enabled = false` so the raw hex colours reach the custom shader unconverted.
- `Nav` — glass surface once scrolled, scroll-spy `aria-current` underline on the active section, accessible mobile sheet (`aria-expanded`, `inert` when closed, Escape closes).
- `sections/Trust` — toolkit marquee with a pause/play toggle (spec: moving content > 5s needs a control); also pauses on hover/focus and offscreen. Reduced motion turns it into a static wrapped list.
- `Reveal` — a `<div>` that gains `.active` when it first intersects; use it wherever an element needs `.reveal`, `.reveal-left`, `.reveal-right` or `.stagger-up`. The hidden starting state only applies under `html.js` (set by the head script), so content stays visible without JavaScript; motion is an 8px fade/translate.
- `Timeline` — scroll-driven progress fill (`#tlProgress`, height written directly via ref) and `.lit` markers.
- `Testimonials` — stacked carousel, auto-advances every 5.5s (pause toggle, pauses on hover/focus, manual navigation restarts the timer). It measures its cards: on wide screens the stack reserves the tallest card's height so nothing shifts; on phones (≤640px, no autoplay) it follows the front card. Cards behind are blank sheets clipped to the front card's height.
- `CvMenu` — résumé language dropdown (EN/PT-BR), used in the nav and in Contact; closes on outside click, Escape, or selection.
- `TalksGallery` + `Lightbox` — justified gallery; lightbox has arrows/Escape/Tab-trap, focus restore, preloads neighbours.
- `Year` — build year in the HTML, corrected to the current year on load.

## Content — where to edit

- **Testimonials:** `data/testimonials.ts` (see the `EDIT HERE` comment).
- **Experience timeline + parallel ventures:** `data/experience.tsx` (descriptions are JSX so they can hold `<strong>`/`<em>`).
- **Speaking photos & captions:** `data/talks.ts` (the lightbox reads from the same data).
- **Résumé PDFs:** `data/resumes.ts` — the single list behind both `.cv-menu` dropdowns and the mobile-nav pair. Files live in `public/assets/curriculum/`.
- **Email/LinkedIn/GitHub/phone:** `data/contact.ts` (Contact section + footer).
- Smaller lists (hero specialization line + metrics, toolkit marquee, expertise pillars + toolkit domains, career journey, philosophy points, impact metrics, projects, certifications, About facts) are constants at the top of their section component. Prose lives directly in the section JSX.
- Impact metrics carry a `ctx` (where the number comes from) and projects a `role` (Victor's part in it) — keep both when adding entries.
- Page title, description and Open Graph live in `app/layout.tsx`; the schema.org `Person` JSON-LD is in `app/page.tsx` (public title + verified links only; the site URL is `CONTACT.site`).
- Any URL to a file in `public/` must go through `asset()` from `lib/asset.ts`, otherwise it misses the `/portfolio` basePath.

## Theming (light default + optional dark)

The active theme is the `data-theme` attribute on `<html>`: absent = **light** (the design system's default direction), `"dark"` = the deep-navy variant. Dark is opt-in only: the OS preference is deliberately not followed; the visitor picks it from the nav toggle and it's persisted in `localStorage['va-theme']`. Three pieces keep in sync:

1. **CSS** — `:root` holds the light tokens from `DESIGN_SYSTEM.md` §13 (`--background`, `--background-secondary`, `--surface`, `--surface-glass`, `--text-primary/-secondary/-muted`, `--accent`, `--accent-cyan`, `--action*`, `--border`, spacing `--space-*`, `--radius-*`, `--shadow-*`, glass tokens, `--motion-*`, `--ease-premium`); `:root[data-theme="dark"]` overrides the same names. **Adding a colour means adding a token in both blocks, never a literal in a component rule.** Two tokens beyond the spec: `--action-fill`/`--on-action` (filled buttons need a deeper blue than blue *text* in dark mode) and `--scrim` (photo caption overlay, theme-independent). `--text-muted` is `#5F6C83`, one step darker than the spec's `#637087`, which measured 4.37:1 on `--background-secondary`.
2. **Anti-flash** — `THEME_INIT_SCRIPT` in `lib/theme.ts` is inlined into `<head>` by `app/layout.tsx`. It adds `class="js"` and applies `data-theme="dark"` only if stored. `<html>` has `suppressHydrationWarning` because of it.
3. **Canvases** — the two canvases can't read CSS tokens, so each carries its own light/dark palette and subscribes via `onThemeChange()` (a `themechange` window event fired by `applyTheme()`): the globe swaps its `PALETTES` object, the dot-wave updates its material uniforms.

`isLight()` gives the current state; `applyTheme('light'|'dark')` sets and persists it; `prefersReducedMotion()` is the shared reduced-motion check.

Icons come from `lucide-react` and render as `<svg class="lucide lucide-<name> …">` with any `className` you pass. CSS icon rules target `svg` (or a class passed to the icon) — never a bare `.foo i`. LinkedIn/GitHub marks aren't in Lucide; they're in `components/BrandIcons.tsx`.

## Design-system rules applied in the CSS

- Buttons: `.btn` + `.btn-primary` (solid `--action-fill`, no gradient) / `.btn-secondary` (surface + border), `.btn-sm` in the nav; 44–48px tall. Icon-only controls share one 44px style (`.theme-toggle`, `.tstack-arrow`, `.marquee-toggle`, `.lbox-btn`, `.fsocial`).
- Only interactive things react to hover: static cards (expertise pillars, timeline, certs, static projects) don't lift; linked project cards (`a.project-card`) do.
- `.section-alt` puts a section on `--background-secondary` for rhythm; whitespace is the separator (no gradient rules between sections).
- Global `:focus-visible` ring (2px `--action`, 4px offset); skip link to `#main`; `scroll-padding-top` clears the fixed nav.
- `prefers-reduced-motion` disables all animations/transitions and smooth scroll.
- **Lightning CSS gotcha:** write only the unprefixed `backdrop-filter`. If you also write `-webkit-backdrop-filter` with the same value, Next's minifier keeps only the prefixed one and Chrome loses the blur. The build adds the Safari prefix itself.

## Conventions worth knowing

- Inter is the only typeface (self-hosted via `next/font/google`, weights 400/500/600), exposed as `--font-inter` on `<html>` and consumed by `--font-sans`. Type sizes come from the `--font-display`/`--font-h1…h4`/`--font-body*` tokens; `--font-display` is capped at 58px so the hero headline's first line fits its column.
- Images use plain `<img>`/`<picture>` (static export, hand-made responsive variants), not `next/image`.
- **Speaking gallery photos** live in `public/assets/img/talks/` as `<slug>-sm` (700px) and `<slug>-lg` (1600px) in both `.jpg` and `.webp` — generated from the originals with `sips` + `cwebp`. The layout is a justified gallery: each `<figure class="talk">` gets its source aspect ratio as the `--ar` custom property (from `ar` in `data/talks.ts`), and CSS both flex-grows it by that number and applies it as `aspect-ratio`, so every tile in a row lands at the same height with no cropping. Adding a photo = add an entry to a row in `data/talks.ts` with the right `ar`, plus `wide: true` if it's landscape. Row height is `(row width − gaps) / Σar`, so Σ is the size dial: the current rows sum to 3.58 and 3.00, giving ~305px and ~360px tiles. Keep new rows in that Σ3.0–3.6 band — a row of two portraits (Σ1.5) resolves absurdly tall. Below 1024px the rows dissolve (`display: contents`) into one dense 2-column grid where `talk-wide` spans both columns, so array order still decides what comes first.
- Colours: pearl `#F7F9FE` / ice `#EAF0FA` / white surfaces, Electric Blue `#3488FF` accent, `#005FCC` action blue, Ice Cyan `#6DD9FF` used rarely. Besides the CSS tokens they're hardcoded in the canvas palettes (`components/canvas/*`) and the hero/section atmosphere gradients in `globals.css`, so a rebrand touches both.
- `AGENTS.md` is generated by `next dev` (Next.js agent rules) — commit it rather than deleting it.
