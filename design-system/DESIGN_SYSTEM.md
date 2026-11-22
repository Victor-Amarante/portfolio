# Design System — Victor Amarante

> **Visual direction:** Premium Minimalist Technology · Spatial Computing · Soft Glassmorphism · Enterprise AI Aesthetic
>
> **Scope:** Personal website and professional portfolio. This document defines the visual language, design tokens, component standards, responsive behavior, accessibility and implementation guidelines.

## 1. Brand identity

The website should feel like a premium technology product: light, precise, sophisticated, modern and understated. The visual direction is inspired by the clarity, typography, subtle materials and attention to detail associated with Apple's product interfaces, without reproducing its brand assets or layouts.

The identity represents a **Senior Software Engineer specializing in Artificial Intelligence and Machine Learning**, with expertise in AI systems architecture, backend engineering, distributed systems and agentic AI.

### Design principles

- **Clarity first:** content and navigation take precedence over decoration.
- **Precision:** consistent alignment, spacing, typography and component behavior.
- **Restraint:** use color, blur, gradients and shadows selectively.
- **Lightness:** pearl-white surfaces, cool neutral tones and generous negative space.
- **Technical sophistication:** communicate engineering excellence through structure and information hierarchy rather than visual clichés.
- **Consistency:** reuse semantic tokens and components across every page.
- **Performance and accessibility:** visual quality must not compromise usability or loading speed.

### Visual expression and creative scope

The complete visual language of the LinkedIn banner is available to the website. The core interface remains clean and highly legible, while selected expressive sections may use spatial, dimensional and animated visuals.

The following techniques are explicitly permitted, but never mandatory:

- 3D illustrations, isometric objects and dimensional technology imagery.
- Floating computational layers, translucent panels, rendered infrastructure and connected system nodes.
- Orbital animations, particles, ambient floating motion and parallax, including more expressive sequences in dedicated visual showcases.
- WebGL, real-time 3D and decorative rendering where appropriate.
- AI-themed imagery, including generic AI imagery when it complements the composition; favor custom, architecture-oriented visuals when possible.
- Neon accents, luminous edges, strong glassmorphism and layered transparency in selected visual treatments.

Use these effects deliberately. More expressive treatments belong in the hero, visual showcases or dedicated experiences rather than every reading surface. Their intensity may increase locally without changing the light, premium identity of the entire site. No technique is required merely because it appears in this specification.

## 2. Color system

The palette is a proposed adaptation of the LinkedIn banner's light blue and pearl-white aesthetic, not an exact color extraction. The neutral palette carries the interface; blue provides emphasis.

### Brand palette

| Token | Value | Purpose |
| --- | --- | --- |
| Pearl White | `#F7F9FE` | Main page background |
| Pure White | `#FFFFFF` | Cards and elevated surfaces |
| Ice Blue | `#EAF0FA` | Secondary section backgrounds |
| Frost Blue | `#D5E2F5` | Decorative borders and subtle accents |
| Soft Azure | `#AAC7ED` | Quiet decorative highlights |
| Electric Blue | `#3488FF` | Brand accent, decorative highlights |
| Ice Cyan | `#6DD9FF` | Rare atmospheric accents |
| Deep Navy | `#182235` | Primary text |
| Slate | `#526077` | Secondary text |
| Muted Slate | `#637087` | Supporting text and metadata |

### Semantic colors

| Token | Value | Purpose |
| --- | --- | --- |
| `background` | `#F7F9FE` | Page canvas |
| `background-secondary` | `#EAF0FA` | Alternate section background |
| `surface` | `#FFFFFF` | Standard card and menu surface |
| `surface-glass` | `rgba(255,255,255,0.72)` | Optional translucent navigation |
| `text-primary` | `#182235` | Headings and main content |
| `text-secondary` | `#526077` | Body descriptions |
| `text-muted` | `#637087` | Metadata and captions |
| `accent` | `#3488FF` | Non-text brand highlights |
| `action` | `#005FCC` | Primary buttons, links and focus indicators |
| `action-hover` | `#004DA8` | Hover / pressed state |
| `action-subtle` | `#EAF2FF` | Selected or subtle interactive backgrounds |
| `border` | `#D5E2F5` | Decorative surface boundaries |
| `border-control` | `#7C91AD` | Functional control boundaries when required |
| `success` | `#18794E` | Success text and icons |
| `warning` | `#925A00` | Warning text and icons |
| `danger` | `#B42318` | Error text and icons |

Use the darker `action` blue for white-on-blue buttons and blue text on light surfaces. Do not assume the brighter brand accent is suitable for small text or filled buttons with white labels. Validate contrast against the actual rendered background, especially when using transparency.

### Color distribution

As a visual guideline, keep approximately 80–90% of the composition neutral, 10–15% cool secondary surfaces, and a small proportion of saturated blue. These are design heuristics, not mandatory pixel ratios.

- Avoid large saturated-blue sections.
- Use cyan sparingly; it is not a second primary action color.
- Avoid using color alone to communicate status or selection.
- Light mode is the default design direction. Dark mode is not required by this specification.

## 3. Typography

### Font family

Use **Inter** as the primary typeface. A system sans-serif stack is the fallback. Manrope is an optional alternative if adopted consistently across the site. Avoid mixing multiple display fonts unnecessarily.

Use a monospace font only for code, commands and technical identifiers; prefer the native system monospace stack.

### Type scale

| Role | Desktop | Mobile | Weight | Line height | Tracking |
| --- | --- | --- | --- | --- | --- |
| Display / hero | 64px | 40px | 600 | 1.08 | -0.045em |
| H1 | 48px | 36px | 600 | 1.15 | -0.035em |
| H2 | 36–40px | 28–32px | 600 | 1.2 | -0.025em |
| H3 | 24px | 22px | 600 | 1.3 | -0.015em |
| H4 | 18–20px | 18px | 600 | 1.4 | -0.01em |
| Body large | 18px | 17px | 400 | 1.6 | normal |
| Body | 16px | 16px | 400 | 1.65 | normal |
| Small / metadata | 14px | 14px | 400–500 | 1.5 | normal |
| Eyebrow / label | 12–13px | 12–13px | 500–600 | 1.4 | 0.06em |

### Typographic guidelines

- Use sentence case for headings, buttons and labels whenever possible.
- Prefer medium and semibold weights for hierarchy rather than excessive boldness.
- Use uppercase only for short, occasional eyebrow labels.
- Keep long paragraphs within roughly 60–75 characters per line.
- Use fluid display sizes with `clamp()` to avoid oversized typography on smaller screens.
- Do not embed text in background images.
- Use deep navy instead of pure black for the main text.

## 4. Layout and spacing

### Grid

- Maximum content width: `1280px` including container padding (website-wide wrapper).
- Desktop: conceptual 12-column grid, 24px gutters.
- Tablet: 8-column grid, 20–24px gutters.
- Mobile: 4-column grid, 16px gutters; collapse content into one column where appropriate.
- Horizontal padding: 64–80px on wide desktop, 32–40px on tablet, 20–24px on mobile.
- Align content consistently to the same container edges.

### Spacing scale

Use an 8px base with 4px increments for smaller component details.

| Token | Value |
| --- | --- |
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-5` | 24px |
| `space-6` | 32px |
| `space-7` | 48px |
| `space-8` | 64px |
| `space-9` | 96px |
| `space-10` | 128px |

Sections should generally have 96–128px of vertical breathing room on desktop and 64–80px on mobile. Card padding should be 24–32px on desktop and 20–24px on mobile. Use 16–32px gaps between related components.

### Responsive breakpoints

| Name | Minimum width |
| --- | --- |
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

Breakpoints are recommendations; allow layout changes at the width where content actually requires them. Do not force a fixed-height hero or horizontal scrolling on mobile.

## 5. Surfaces, borders and elevation

Use nearly flat surfaces for standard content cards, with subtle separation. Feature cards and illustrative panels may use layered depth, glass materials and a floating-object aesthetic when it strengthens the composition.

### Corner radius

| Token | Value | Usage |
| --- | --- | --- |
| `radius-sm` | 8px | Small controls, code blocks |
| `radius-md` | 12px | Buttons, inputs |
| `radius-lg` | 16px | Compact cards |
| `radius-xl` | 24px | Project cards and larger panels |
| `radius-2xl` | 32px | Occasional feature sections |
| `radius-full` | 9999px | Pills, tags, compact status labels |

### Elevation

- **Level 0:** no shadow; normal content and page sections.
- **Level 1:** `0 2px 8px rgba(24,34,53,0.04)` for subtle differentiation.
- **Level 2:** `0 12px 40px rgba(46,87,150,0.07)` for selected cards and overlays.
- **Level 3:** `0 24px 64px rgba(46,87,150,0.12)` for temporary elevated UI such as menus or dialogs; use sparingly.

Use thin 1px borders and avoid combining prominent borders with strong shadows. Prefer flat content for text-heavy sections.

## 6. Translucency, gradients and lighting

Soft glassmorphism is a signature material of the visual identity. Use subtle treatments for functional UI and allow stronger, layered glass effects in selected hero and showcase compositions.

- Use translucency in sticky navigation, menus, selected cards, floating panels and expressive spatial compositions.
- Use a semi-transparent white surface with `backdrop-filter: blur(16–24px)` where it adds value; stronger blur and layered acrylic effects are permitted for expressive showcases.
- Provide an opaque white fallback where blur is unsupported.
- Keep text and controls readable over the underlying content.
- Use soft, low-opacity radial blue gradients only as optional background atmosphere, never as dominant content.
- Use animated glows, polished reflections, subtle bevels, illuminated glass edges and extruded or layered objects in expressive visual scenes. Neon or higher-intensity cyan highlights may be used locally as a focal accent; prevent glare or reduced text contrast.

Example background treatment:

```css
background:
  radial-gradient(ellipse at 85% 5%, rgba(52, 136, 255, 0.09), transparent 55%),
  #f7f9fe;
```

A plain pearl-white background is the default for reading sections. Hero and feature sections may use richer atmospheric gradients, diffuse bloom and localized luminous accents.

## 7. Icons and visual assets

- Use a consistent two-dimensional outline icon library, such as Lucide.
- Standard icon sizes: 16px for compact labels, 20px for controls, 24px for feature headings.
- Use a consistent 1.5–2px stroke, rounded caps and joins.
- Icons should communicate meaning, not act as decorative filler.
- Use text labels alongside unfamiliar icons; provide accessible names for icon-only controls.
- Project assets may include authentic screenshots, code excerpts, tables, technical diagrams and custom 3D architecture illustrations when they help explain the work.
- Technical diagrams may use simple 2D nodes or spatial/isometric representations, labelled connectors and semantic colors. Decorative AI architecture diagrams are permitted in the hero.
- Reuse the banner's visual motifs where appropriate, but reconstruct the layout responsively and keep website text as HTML rather than baking it into images.

### Spatial and 3D visual language

Use the banner's visual vocabulary as a reference for optional 3D assets:

- Stacked translucent computational layers, frosted glass tiles, polished acrylic and ceramic-white surfaces.
- Distributed services, database cylinders, backend infrastructure, API gateways, agent orchestration and cloud computing nodes.
- Floating translucent panels with minimalist outline icons for code, AI, networks, databases and cloud services.
- Thin curved connections, orbital paths, small luminous nodes and particles that suggest information flow.
- Isometric or softly perspective-based compositions, diffuse ambient lighting, cool-blue reflections, luminous cyan edges and gentle shadows.
- AI-related imagery, including abstract neural networks and more generic AI motifs, may be used if it meets the same visual quality and palette. Prefer original or relevant imagery over stock clichés.

Maintain clear silhouettes, generous negative space and a coherent light source. Use a restrained composition for standard sections and allow richer visual effects for deliberately immersive experiences. Decorative scenes must not be presented as factual system architecture diagrams unless they accurately represent the system.

### Rendering and asset strategy

Choose the simplest rendering method that meets the intended experience: SVG for crisp diagrams, WebP/AVIF for prerendered 3D scenes, CSS for lightweight depth and motion, or WebGL for interactive spatial experiences. Three.js or React Three Fiber may be considered if compatible with the existing stack; neither is mandatory.

For WebGL and decorative rendering, lazy-load the scene, cap device pixel ratio and particle/object counts as needed, pause rendering when offscreen or the tab is hidden, and provide a static fallback for unsupported devices or reduced-motion users. Keep canvas decorations separate from semantic HTML content and prevent them from intercepting navigation or scrolling. Avoid exposing sensitive production architecture in illustrative assets.

## 8. Component standards

### Navigation

- Minimal horizontal navigation, aligned with the content container.
- Suggested links: About, Expertise, Experience, Projects, Research, Contact.
- Desktop height: approximately 64–72px.
- Optional sticky behavior with a subtle translucent surface and bottom border.
- Active links should use text emphasis and/or an underline, not color alone.
- Mobile navigation should use an accessible menu with keyboard support and clear open/close states.

### Buttons and links

| Variant | Treatment |
| --- | --- |
| Primary | Solid action blue, white text, 12px radius, 44–48px minimum height |
| Secondary | White/light surface, navy text, thin border |
| Tertiary | Text link or ghost button, action-blue text, no heavy decoration |
| Icon button | 44px recommended hit area, clear accessible name |

Use 14–16px medium-weight labels, 16–24px horizontal padding and restrained hover transitions. Do not apply gradients to primary buttons. Every interactive component must have default, hover, active, focus-visible and disabled states as applicable.

### Cards

- Standard surface: white or subtle cool neutral.
- Radius: 16–24px; padding: 24–32px.
- Thin decorative border; shadow optional.
- Clear hierarchy: title, supporting content, metadata and action if applicable.
- A clickable card must use a genuine link or control with keyboard access. Avoid nesting conflicting interactive elements.
- Noninteractive cards should not use hover animations that imply clickability.

### Expertise and technical tags

Use concise labels, simple outline icons if helpful, and a restrained light-blue or neutral surface. Tags are supporting information, not the main visual feature. Do not style every skill as a large card or badge. Group related technologies by domain.

### Project showcases

Present real engineering work with a consistent structure:

1. Project name and short context.
2. Problem, scope and constraints.
3. Engineering approach and architecture decisions.
4. Technologies and trade-offs.
5. Outcomes or measurable impact, where available.

Prefer editorial layouts, clean typography and authentic supporting evidence. Custom 3D thumbnails, spatial diagrams and AI-themed artwork may complement project case studies. Do not expose confidential enterprise implementation details.

### Experience and timeline

Use a clean vertical timeline or structured list. Include company, role, period, scope and selected achievements. Dates and metadata should be visually secondary. Avoid crowded card grids for chronological experience.

### Forms and contact

- Use persistent labels; placeholders are supplementary only.
- Inputs should be at least 44px high with clear borders and focus states.
- Validation must provide readable error text and associate it with the relevant field.
- Keep the contact section simple; a form is optional when direct professional links suffice.

### Dividers

Use whitespace as the primary separator. Use subtle 1px horizontal rules only where content grouping benefits from them.

## 9. Motion and interaction

Motion should be precise, quiet and purposeful.

| Token | Duration | Use |
| --- | --- | --- |
| `motion-fast` | 180ms | Hover, focus, color changes |
| `motion-normal` | 280ms | Menus, small interface transitions |
| `motion-slow` | 400ms | Optional section entry |
| `motion-ambient` | 6–12s | Floating layers, orbital paths and gentle lighting |

Preferred easing: `cubic-bezier(0.22, 1, 0.36, 1)`.

- Use subtle color, border and opacity transitions.
- Optional page-entry animations may fade and translate content by 4–8px; content must remain visible if JavaScript fails.
- Floating objects, orbital motion, particles, animated glows and parallax are allowed in hero or showcase environments. Start with slow ambient loops (6–12s), subtle translations (4–12px) and limited depth shifts.
- More pronounced parallax, denser particles or immersive motion may be used in dedicated experiences when intentional; keep reading and navigation stable, avoid scroll hijacking and never require animation to access information.
- For automatically moving content lasting more than five seconds, provide pause/stop/hide controls where applicable. Avoid rapid flashing and abrupt motion. Pause offscreen loops and offer static alternatives.
- Respect `prefers-reduced-motion`; disable nonessential animations and smooth scrolling when requested.

## 10. Suggested website information architecture

This is a suggested content structure, not a requirement to redesign existing navigation or add sections unnecessarily.

### Hero

A typographic-first composition introducing the professional identity, optionally paired with a refined 3D illustration or interactive spatial centerpiece inspired by the LinkedIn banner.

Example hierarchy:

- Eyebrow: Software Engineering · Artificial Intelligence
- Main heading: **Victor Amarante** or **Engineering intelligent systems.**
- Professional title: Senior Software Engineer, AI
- Supporting text: concise statement about designing reliable production AI systems, software architecture, backend engineering and distributed systems.
- Primary action: Explore my work
- Secondary action: Get in touch

The hero may be left-aligned or centered depending on the existing layout. A two-column desktop composition can pair the text with interconnected glass computing layers, floating icons and subtle orbital motion. On mobile, place content first and simplify, scale or replace the visual with a static version. A text-only hero is also valid.

### About

Describe the progression from statistics, probability, machine learning and intelligent automation to software engineering and production AI architecture. Keep paragraphs readable and avoid unnecessary repetitions of technical keywords.

### Expertise

Organize expertise around AI Systems Architecture, Backend Engineering, Distributed Systems and Agentic AI, supported by Machine Learning and quantitative foundations.

### Experience

Present the professional timeline and measurable engineering outcomes. Keep role titles accurate to the represented experience.

### Selected projects

Highlight engineering problems, architectural decisions, constraints, technology choices and outcomes. Case studies should demonstrate depth rather than merely list frameworks.

### Research and innovation

Present applied AI research, agentic software engineering and specialized language models as a complementary dimension of the professional profile.

### Contact and footer

Use a concise invitation to connect, professional links and minimal footer navigation. Avoid unnecessary visual complexity.

## 11. Responsive behavior

- Desktop: spacious composition, consistent grids, controlled line lengths and selective multi-column layouts.
- Tablet: reduce horizontal padding and collapse complex grids when necessary.
- Mobile: prioritize reading order, single-column layouts, accessible navigation and comfortably sized controls.
- Use fluid widths and responsive type. Avoid fixed dimensions for content-bearing components.
- Ensure functionality at 320 CSS pixels and under browser zoom; prevent unintended horizontal overflow.
- Do not hide important content merely to simplify the mobile layout.
- Adapt 3D scenes, particles, glows and parallax to available screen space and device capabilities. Reduce visual complexity on smaller or slower devices without removing meaningful content.

## 12. Accessibility and performance

Target WCAG 2.2 AA as an implementation goal; compliance requires testing the actual website rather than relying on design tokens alone.

- Normal text contrast: at least 4.5:1; large text: at least 3:1.
- Meaningful non-text UI boundaries and graphical indicators: 3:1 where applicable.
- Ensure visible focus states, keyboard navigation, semantic HTML and a logical heading order.
- Avoid color-only indicators. Use accessible labels and appropriate alternative text for informative imagery.
- Respect reduced-motion settings. Provide touch targets of approximately 44px where feasible.
- Support text zoom and responsive reflow.
- Use optimized SVG icons and responsive image formats such as WebP/AVIF for actual project imagery.
- Rich effects and continuous rendering are permitted when justified by the design. Measure their impact, lazy-load noncritical visuals, suspend offscreen rendering and provide lightweight fallbacks; avoid redundant dependencies.
- Prefer a system font fallback and load only the font weights in use; avoid layout shifts.
- Validate with real-device testing, keyboard-only interaction, contrast checks and automated accessibility tools.

## 13. CSS design tokens

The following framework-independent tokens are a starting point for implementation. Map them to the existing CSS, Tailwind or component-library conventions instead of maintaining duplicate palettes.

```css
:root {
  color-scheme: light;

  /* Brand and semantic colors */
  --background: #f7f9fe;
  --background-secondary: #eaf0fa;
  --surface: #ffffff;
  --surface-glass: rgba(255, 255, 255, 0.72);
  --frost-blue: #d5e2f5;
  --soft-azure: #aac7ed;
  --accent: #3488ff;
  --accent-cyan: #6dd9ff;
  --action: #005fcc;
  --action-hover: #004da8;
  --action-subtle: #eaf2ff;
  --text-primary: #182235;
  --text-secondary: #526077;
  --text-muted: #637087;
  --border: #d5e2f5;
  --border-control: #7c91ad;
  --success: #18794e;
  --warning: #925a00;
  --danger: #b42318;

  /* Typography */
  --font-sans: Inter, -apple-system, BlinkMacSystemFont,
    'Segoe UI', sans-serif;
  --font-mono: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  --font-display: clamp(2.5rem, 5vw, 4rem);
  --font-h1: clamp(2.25rem, 4vw, 3rem);
  --font-h2: clamp(1.75rem, 3vw, 2.5rem);
  --font-h3: clamp(1.375rem, 2vw, 1.5rem);
  --font-body-large: 1.125rem;
  --font-body: 1rem;
  --font-small: 0.875rem;
  --font-label: 0.75rem;
  --leading-heading: 1.15;
  --leading-body: 1.65;

  /* Spacing and layout */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;
  --space-10: 128px;
  --container-width: 1280px;
  --container-gutter: clamp(20px, 5vw, 80px);
  --section-spacing: clamp(64px, 8vw, 128px);

  /* Radius and elevation */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-2xl: 32px;
  --radius-full: 9999px;
  --shadow-sm: 0 2px 8px rgba(24, 34, 53, 0.04);
  --shadow-md: 0 12px 40px rgba(46, 87, 150, 0.07);
  --shadow-lg: 0 24px 64px rgba(46, 87, 150, 0.12);
  --glass-blur: 20px;
  --glass-blur-strong: 32px;
  --glass-surface-light: rgba(255, 255, 255, 0.60);
  --glass-edge: rgba(255, 255, 255, 0.85);
  --glow-blue: 0 0 40px rgba(52, 136, 255, 0.25);
  --glow-cyan: 0 0 28px rgba(109, 217, 255, 0.32);
  --gradient-atmosphere: radial-gradient(ellipse at 85% 15%,
    rgba(52, 136, 255, 0.12), transparent 60%);

  /* Motion */
  --motion-fast: 180ms;
  --motion-normal: 280ms;
  --motion-slow: 400ms;
  --motion-ambient: 8s;
  --ease-premium: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--background);
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: var(--font-body);
  line-height: var(--leading-body);
}

.container {
  width: 100%;
  max-width: var(--container-width);
  margin-inline: auto;
  padding-inline: var(--container-gutter);
}

.section {
  padding-block: var(--section-spacing);
}

.prose {
  max-width: 68ch;
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: clamp(20px, 3vw, 32px);
}

.glass-nav {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}

@supports (backdrop-filter: blur(20px)) {
  .glass-nav {
    background: var(--surface-glass);
    backdrop-filter: blur(var(--glass-blur));
  }
}

/* Optional expressive feature surface */
.spatial-panel {
  position: relative;
  isolation: isolate;
  border: 1px solid var(--glass-edge);
  border-radius: var(--radius-2xl);
  background: var(--gradient-atmosphere), var(--surface);
  box-shadow: var(--shadow-md);
}

@supports (backdrop-filter: blur(20px)) {
  .spatial-panel {
    background: var(--gradient-atmosphere), var(--glass-surface-light);
    backdrop-filter: blur(var(--glass-blur-strong));
  }
}

@keyframes ambient-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* Apply only to decorative elements; pause when offscreen or requested. */
.ambient-float {
  animation: ambient-float var(--motion-ambient) ease-in-out infinite;
}

.button-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: 44px;
  padding: 10px 20px;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  background: var(--action);
  color: #ffffff;
  font: inherit;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: background-color var(--motion-fast) var(--ease-premium);
}

.button-primary:hover:not(:disabled) {
  background: var(--action-hover);
}

.button-primary:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

:focus-visible {
  outline: 2px solid var(--action);
  outline-offset: 4px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
```

## 14. Implementation guidelines for an existing website

When applying this design system to an existing portfolio:

1. Inspect the current project structure, styling architecture and reusable components.
2. Preserve functional behavior, routes, content, integrations and existing features unless explicitly instructed otherwise.
3. Introduce semantic design tokens in the existing styling system and replace inconsistent hardcoded values progressively.
4. Apply typography, spacing, surface and component standards globally before refining individual pages.
5. Reuse existing components where practical; avoid unnecessary framework migrations or dependencies.
6. Selectively introduce 3D illustrations, isometric assets, glass panels, orbital motion, particles, parallax, neon highlights or WebGL experiences as appropriate. Maintain a typography-first layout and provide accessible, performant fallbacks.
7. Verify responsiveness, accessibility, keyboard behavior and loading performance.
8. Keep the final implementation cohesive, maintainable and consistent across all pages.

### Acceptance checklist

- [ ] The site feels light, modern, elegant and technically sophisticated.
- [ ] Pearl-white and cool neutral backgrounds dominate the interface.
- [ ] Blue accents are restrained and functional text has sufficient contrast.
- [ ] Typography and spacing follow a consistent hierarchy.
- [ ] Components share semantic colors, radii and elevation tokens.
- [ ] Any 3D, isometric or AI imagery, neon, strong glassmorphism, particles, parallax and WebGL effects are consistent with the visual identity and do not obstruct reading or navigation.
- [ ] The hero prioritizes professional identity and remains usable without decorative imagery or rendering.
- [ ] Rich visual experiences have appropriate motion controls, responsive/static fallbacks and performance checks.
- [ ] Existing functionality and professional content are preserved.
- [ ] Mobile layouts and keyboard interactions are usable.
- [ ] Reduced-motion preferences are respected.
- [ ] Real project evidence and technical content remain the focus.

## 15. Final design direction

**Minimal · Architectural · Intelligent · Precise · Elegant · Light · Spatial · Reliable**

The interface should look like a thoughtfully engineered technology product rather than a generic developer template or an AI marketing landing page. Its premium quality should come from typography, alignment, whitespace, material quality, consistency and attention to interaction details. Spatial illustrations, glass materials, lighting and sophisticated motion may provide a distinctive expressive layer, while the core interface remains clear and functional.
