# Georgia Trip Planner — Progress Doc

**Last updated:** 2026-03-04
**Branch:** master (all work uncommitted — needs commit!)

---

## What This Is

Route-first trip planner SPA for Georgia (country), Mar 5–15 2026.
Light editorial theme with sticky nav, split-view dashboard (Leaflet map + stop list), and editorial destination cards below. R3F grain overlay and animated Georgian flag shader preserved from v1.

## Stack

| Dep | Version |
|-----|---------|
| React | 19.2.4 |
| Three.js | 0.183.2 |
| R3F | 9.5.0 |
| drei | 10.7.7 |
| GSAP | 3.14.2 |
| Lenis | 1.3.17 |
| Zustand | 5.0.11 |
| Vite | 7.3.1 |
| vite-plugin-glsl | 1.5.5 |
| Leaflet | 1.9.4 (CDN) |
| Node | 24 (via `nvm use 24`) |

## Dev Server

```bash
nvm use 24
npm run dev
# → http://localhost:5173/tripPlanner/
```

## Architecture

```
Z-Stack (back → front):
────────────────────────
Layer 0: R3F Canvas (position: fixed) — GrainOverlay only
Layer 1: HTML Content (position: relative, z-index: 1) — Lenis smooth scroll
Layer 2: Grain overlay (pointer-events: none)
```

The Georgian flag uses an **inline Canvas** inside HeroSection (not the fixed canvas). This was a deliberate restructure because positioning a 3D element in the fixed canvas to align with flowing HTML content was unreliable.

Particles and ambient geometry were **removed by user request** — don't re-add them.

## Page Layout

```
┌────────────────────────────────┐
│  SiteNav (sticky, z:50)        │  Route tabs + destination jump links
├────────────────────────────────┤
│  HeroSection (compact ~280px)  │  Editorial masthead: flag left, text right
├────────────────────────────────┤
│  DashboardSection              │  DESKTOP: sticky map left + scrollable stops right
│  ┌──────────┬─────────────┐   │  MOBILE (<900px): stacked vertically
│  │  Map     │  Stop List  │   │
│  │ (sticky) │ (scrolls)   │   │
│  └──────────┴─────────────┘   │
├────────────────────────────────┤
│  DestinationSection            │  Editorial destination deep-dives
│  (expandable cards)            │  GSAP scroll-triggered fade-in
├────────────────────────────────┤
│  FooterSection                 │
└────────────────────────────────┘
```

## Color Palette — "Georgian Editorial" (light theme)

- **Backgrounds:** `#FAFAF8` (deep), `#F5F4F1` (mid), `#FFFFFF` (surface)
- **Text:** `#1A1612` (primary), `#5C554D` (secondary), `#8A847C` (muted)
- **Kutaisi:** `#B85A2B` clay/terracotta
- **The Drive:** `#A88428` autumn gold
- **Gudauri:** `#2E6E8A` glacier blue
- **Tbilisi:** `#7A5B8C` dusk purple
- **Cards:** White with `rgba(0,0,0,0.07)` borders, soft shadows — no glassmorphism
- **Map tiles:** CartoDB Positron (light)
- **Fonts:** Playfair Display (headings), DM Sans (body), Space Mono (labels)

## File Structure

```
src/
├── App.jsx                          # Root: SmoothScroll + SceneCanvas + HTMLOverlay
├── main.jsx
├── index.css                        # All design tokens, light theme, responsive
├── data/
│   ├── config.js                    # Light palette, priority badges, design tokens
│   ├── destinations.js              # All trip content (4 destinations)
│   ├── routes.js                    # 3 driving routes (Historical, Direct, Scenic)
│   └── routeStops.js                # Legacy map coordinates (kept, not referenced)
├── stores/
│   └── useScrollStore.js            # Zustand: scrollProgress, velocity, activeRouteId
├── hooks/
│   ├── useLenis.js                  # Lenis + GSAP ticker sync
│   ├── useScrollTrigger.js          # useFadeIn, useStaggerIn wrappers
│   └── useMousePosition.js          # Mouse → Zustand store
├── components/
│   ├── layout/
│   │   ├── SmoothScroll.jsx         # Lenis wrapper
│   │   ├── SceneCanvas.jsx          # Fixed R3F canvas (grain only)
│   │   └── HTMLOverlay.jsx          # SiteNav + Hero + Dashboard + Destinations + Footer
│   ├── sections/
│   │   ├── HeroSection.jsx          # Compact masthead: flag + title + meta
│   │   ├── DashboardSection.jsx     # Split-view: Leaflet map + stop list
│   │   ├── DestinationSection.jsx   # Editorial heading + destination cards
│   │   ├── RouteMapSection.jsx      # Legacy dark map (kept, not rendered)
│   │   └── FooterSection.jsx
│   ├── ui/
│   │   ├── SiteNav.jsx              # Sticky nav: route tabs + dest jump links
│   │   ├── DestCard.jsx             # White card + completion bar
│   │   ├── Badge.jsx, Item.jsx, Section.jsx
│   │   ├── DayNav.jsx               # Legacy sticky nav (kept, not rendered)
│   │   ├── RouteBar.jsx             # Legacy route viz (kept, not rendered)
│   │   └── ProgressIndicator.jsx    # Legacy progress pill (kept, not rendered)
│   └── three/
│       ├── GeorgianFlag.jsx         # Inline Canvas, GLSL vertex waves
│       └── GrainOverlay.jsx         # Film grain, intensity 0.15 base
├── shaders/
│   ├── flag.vert.glsl               # Sine-wave vertex displacement
│   ├── flag.frag.glsl               # Dynamic shading from wave slope
│   └── grain.frag.glsl              # Film grain noise
└── utils/
    ├── flagTexture.js               # Georgian flag → CanvasTexture
    └── math.js                      # lerp, clamp, mapRange
```

## Redesign Status (v2 — Light Editorial Theme)

### ✅ Step 1: Data + State Foundation
- `useScrollStore.js` — added `activeRouteId` + `setActiveRoute`
- `routes.js` — 3 routes (Historical, Direct, Scenic) with stops, coords, links
- `config.js` — full palette swap to light theme

### ✅ Step 2: CSS Theme Overhaul
- All `:root` tokens rewritten dark → light
- Dashboard split-view layout rules added
- Clean white card styles (no glassmorphism)
- Leaflet light tooltip/popup overrides
- Breakpoints: 900px (dashboard collapse), 640px, 390px

### ✅ Step 3: Three.js Adjustments
- GrainOverlay base intensity 0.3 → 0.15
- GeorgianFlag shadow adjusted for light background

### ✅ Step 4: SiteNav
- Sticky top bar with route selector tabs + destination jump links
- IntersectionObserver for active destination tracking

### ✅ Step 5: DashboardSection
- Split-view: sticky Leaflet map (CartoDB Positron) + scrollable stop list
- Route switching redraws map markers and polyline
- Click stop → expanded detail with description + external links
- `data-lenis-prevent` on content panel

### ✅ Step 6: Hero Redesign
- Compact horizontal layout (flag left, text right)
- Removed RouteBar, hero-glow, scroll-hint, ProgressIndicator
- GSAP entrance timeline preserved

### ✅ Step 7: HTMLOverlay Rewiring
- SiteNav replaces DayNav
- DashboardSection added
- RouteMapSection removed from render

### ✅ Step 8: Content Component Restyling
- DestinationSection has editorial heading
- DestCard icon shadow adjusted for light bg
- Badge/Item colors driven by updated config.js

### ✅ Step 9: CSS Audit
- All dark-theme references confined to legacy components (not rendered)
- Build compiles clean

## Needs Visual Verification

1. **Full page flow** — run `npm run dev` and check hero → dashboard → destinations
2. **Route switching** — click tabs in SiteNav, map should redraw
3. **Stop interaction** — click stops in list, map should pan
4. **Mobile layout** — 900px breakpoint collapses dashboard to stacked
5. **Lenis + dashboard scroll** — `data-lenis-prevent` on content panel

## Legacy Components (kept in tree, not rendered)

- `DayNav.jsx` — replaced by SiteNav
- `RouteBar.jsx` — removed from hero
- `RouteMapSection.jsx` — replaced by DashboardSection
- `ProgressIndicator.jsx` — removed from hero
- `routeStops.js` — superseded by routes.js

## Design Decisions Made

- **No particles** — User explicitly removed them. Don't re-add.
- **Inline flag canvas** — Flag lives in HeroSection's own Canvas, not the fixed viewport canvas.
- **Netlify deployment** — User switched from GitHub Pages to Netlify.
- **Light theme** — "Georgian Editorial" palette replacing "Caucasus at Dusk" dark theme.
- **Route-first layout** — Map drives navigation via dashboard split-view.
- **Clean white cards** — Subtle borders and soft shadows, no glassmorphism.
- **3 driving routes** — Historical, Direct, Scenic — selectable via SiteNav tabs.

## Quick Resume Checklist

When starting a new session:
1. `cd /home/apoger/web-app-projects/tripPlanner`
2. `nvm use 24`
3. `npm run dev`
4. Read this file and `CLAUDE.md`
5. Check `git status` — commit if needed
6. Visual verification of the light theme redesign
