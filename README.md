# Anand Jonnadula — 3D Portfolio

A premium personal portfolio for **Anand Jonnadula** (AI Engineer & Full-Stack Developer), built with a real-time 3D neural-network hero scene, a 3D skill galaxy, a grabbable 3D portrait, scroll-driven animations, a dark/light theme toggle and fully data-driven content.

**Interactions:** click-and-hold spins the hero constellation, the skill galaxy and the portrait card (with inertia). Each word in the skill galaxy links to that technology's GitHub page. The theme toggle sits fixed in the top-right corner and persists via `localStorage`. Resume links open the PDF in a new tab so visitors can preview before downloading.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · React Three Fiber / Three.js · Framer Motion

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (fully static)
```

## Editing content

All portfolio content lives in **`src/data/resume.ts`** — name, summary, skills, projects, experience, education, highlights and contact details. Every fact is sourced from `public/Anand-Jonnadula-Resume.pdf`. Edit that one file to update the site; no component changes needed.

To update the downloadable resume, replace `public/Anand-Jonnadula-Resume.pdf`.

## Architecture

```
src/
  data/resume.ts             ← single source of truth for all content
  app/
    layout.tsx               ← fonts, SEO metadata, JSON-LD person schema
    page.tsx                 ← section assembly
    opengraph-image.tsx      ← generated social share card
    icon.svg                 ← favicon
  components/
    three/
      HeroScene.tsx          ← R3F neural constellation (theme-aware, grab-to-spin)
      SkillOrbit.tsx         ← 3D skill galaxy (JS projection; words link to GitHub)
      Portrait3D.tsx         ← grabbable 3D portrait card with depth layers
    sections/                ← Hero, About, Highlights, Skills, Projects,
                               Experience, Education, Contact
    ui/                      ← Navbar, Footer, Loader, Reveal, TiltCard,
                               Magnetic, NumberTicker, SectionHeading, icons
```

### Performance & accessibility notes

- **One WebGL context** — only the hero uses a canvas; the skill galaxy is a JS-projected DOM cloud. Rendering pauses when the hero scrolls out of view, and node/particle counts drop on small screens.
- **Graceful fallback** — if WebGL is unavailable, the hero falls back to its CSS gradient/grid backdrop automatically.
- **Reduced motion** — `prefers-reduced-motion` disables the scene animation, parallax, tilt, magnetic buttons and entrance transitions.
- Semantic landmarks, skip link, keyboard-accessible nav, `aria` labelling on icon links; decorative visuals are `aria-hidden`.

## Deploying to Vercel

1. Push this folder to a GitHub repository.
2. Import the repo at [vercel.com/new](https://vercel.com/new) — the defaults work (Next.js is auto-detected).
3. After the first deploy, set the real domain in `SITE_URL` inside `src/app/layout.tsx` so Open Graph URLs and JSON-LD resolve correctly.
