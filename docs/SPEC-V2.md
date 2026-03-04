# Georgia Trip Planner — Production Spec v3
### Mar 5–15, 2026 · Kutaisi → Gudauri → Tbilisi

---

## 0. How to Read This Spec

This document has two kinds of decisions:

- **Locked** — data, content, tech stack, CSS tokens, test plans. Claude Code implements these directly.
- **Open** — layout, spatial composition, component density, visual hierarchy. These are resolved in Paper first. The spec defines intent and constraints only; the canvas is the design authority.

**The workflow:**
```
SPEC.md (this file)
  ↓
Paper Desktop — MCP connected to repo
  Layout explorations → pick one → components designed
  Claude Code reads canvas → implements
  Claude Code pushes component HTML back to canvas → you iterate
  ↓
Playwright — screenshot every route, assert visual + functional
  Failure / drift → Paper canvas → Claude Code → repeat
```

Never lock a layout decision in a prompt to Claude Code before it exists in Paper.

---

## 1. Project Overview

A production-grade, mobile-responsive trip planner SPA. Hosted on Netlify. Public read-only URL shared with travel companions. Each user has independent local state (checklist progress, budget entries). No backend, no auth, no real-time sync.

**Users:**
- **Primary (Oxgen):** Curates content, uses as personal HQ during trip
- **Friends:** Read the plan, track their own items locally

---

## 2. Paper-First Workflow

### Setup

Paper Desktop must be installed and a project file opened before any Claude Code design work begins. Opening the file auto-starts the MCP server.

**Connect Paper MCP to Claude Code** — add `.mcp.json` to project root (commit this):
```json
{
  "mcpServers": {
    "paper": {
      "command": "paper-mcp",
      "transport": "stdio"
    }
  }
}
```

Claude Code will prompt for approval on first use. Approve and keep it project-scoped.

### What Paper Owns

Paper is the single source of truth for every visual decision:

- Layout structure (sidebar vs. no sidebar, panel splits, nav placement)
- Spacing scale (what `--card-pad`, `--section-gap` etc. actually feel like at scale)
- Typography hierarchy (font size, weight, and line-height at real rendered size)
- Component density (how much fits on screen without feeling cramped or sparse)
- Color token validation (do the CSS vars read correctly at actual rendered quality)
- Responsive behavior at 375px, 768px, 1280px, 1440px breakpoints

**Rule:** No layout or visual property gets hardcoded in Claude Code until it has existed on the Paper canvas first.

### What Claude Code Owns

- Project scaffold, build config, deploy config
- Data layer (`destinations.js`, `routeStops.js`, `budgetPresets.js`)
- React component logic, state, context, hooks
- Routing, localStorage persistence
- Playwright tests

### The Feedback Loop

```
1. Claude Code scaffolds component shell (no styling)
2. Claude Code pushes component HTML to Paper canvas via MCP
3. You design it in Paper — spacing, tokens, hierarchy
4. Claude Code reads canvas via MCP, syncs back to repo
5. Playwright takes screenshot, asserts visual regressions
6. If drift detected → back to Paper canvas → repeat from 4
```

### Paper Session 0 — Layout Explorations (Do This First)

Before any components are built, run a Paper session with three layout explorations. Use the real trip data as content — no lorem ipsum. Evaluate each against the layout constraints in §3.

Prompt to start Paper Session 0:
```
Using the trip data from destinations.js, design three layout 
explorations for the Georgia trip planner desktop view. Use the 
Kartvelian Codex design tokens. Each exploration should have a 
distinct spatial approach. I'll pick one and we'll use it as the 
layout ground truth going forward.
```

---

## 3. Layout Intent & Constraints

### Intent

The app is used in two modes: **planning mode** (at a desk, before the trip — adding items, reviewing research) and **field mode** (on a phone in Georgia — checking things off, looking up info quickly). The layout must serve both without compromise.

It should feel like a well-designed personal tool, not a public product. Dense enough to show real information density, spacious enough that nothing feels anxious. The best reference is **how a thoughtful person would lay out a physical field notebook**: sections are clearly delineated, hierarchy is obvious, nothing is decorative unless it's also functional.

### Constraints (non-negotiable regardless of layout chosen)

**Navigation:**
- All top-level views (Plan, Map, Budget) must be reachable in one tap/click from anywhere
- The active destination must always be visually indicated — the user should never wonder "where am I in the trip?"
- On mobile: bottom tab bar, 4 items max, labels visible (not icon-only)
- On desktop: the layout pattern is to be decided in Paper, but it must not require more than one click to switch between destinations

**Information density:**
- A destination card must show: name, dates, nights, status, and at least one section preview — without expanding
- The overall trip progress (X items checked) must be visible without scrolling on desktop
- Section item rows must fit name + badge + description in one row on desktop at 1280px

**Map:**
- On desktop: map must be large enough to show the full Kutaisi→Tbilisi route without zooming (all 7 markers visible simultaneously)
- On mobile: full-screen, no competing UI elements while the map is active

**Budget:**
- The total (GEL + EUR) must be above the fold on every budget view
- Adding an entry must never navigate away from the current view — drawer/sheet only

**Responsive:**
- No horizontal scroll at any breakpoint
- Minimum supported width: 375px (iPhone SE)
- Cards must not exceed 680px width on any viewport (readability constraint)

### Layout Questions for Paper Session 0

These are the spatial questions Paper should resolve — not this document:

1. Does a persistent sidebar add enough value on desktop to justify the reduced main panel width?
2. Should the map live in a separate route or be embeddable in the plan view?
3. On mobile, does the destination list need its own screen or is the scrollable card stack sufficient?
4. What is the correct information hierarchy when a destination is "not-started" vs "researched"?

---

## 4. Design System — "Kartvelian Codex"

### Concept

The design should feel like a private field journal that's been beautifully typeset — somewhere between an illuminated manuscript and a luxury expedition logbook. Dense, warm, intentional. Built for a country with an untranslatable script, 8000 years of winemaking, and medieval fortresses on mountain roads.

**The aesthetic antithesis of:** hero images, gradients on white, Inter/Roboto, excessive whitespace, SaaS dashboard patterns.

### CSS Custom Properties (locked — implement exactly as written)

```css
:root {
  /* Surfaces */
  --ink:            #0A0806;
  --ink-soft:       #1A1410;
  --ink-mid:        #2A1F18;
  --border:         rgba(232,221,208,0.07);
  --border-active:  rgba(232,221,208,0.13);

  /* Text */
  --text-primary:   #E8DDD0;   /* aged parchment — NOT pure white */
  --text-secondary: #A89880;
  --text-muted:     #705A48;
  --text-ghost:     #4A3828;

  /* Accents — amber is the ONLY global accent */
  --amber:          #C8922A;
  --amber-dim:      #8A6018;
  --terracotta:     #B5512C;

  /* Destination colors — contextual only, never global */
  --kutaisi:        #C44536;
  --drive:          #C8922A;
  --gudauri:        #4580C8;
  --tbilisi:        #8B5CF6;

  /* Priority badges */
  --p-must-bg:      #C41C1C;   --p-must-fg:   #E8DDD0;
  --p-rec-bg:       #B84A18;   --p-rec-fg:    #E8DDD0;
  --p-opt-bg:       #3A2C22;   --p-opt-fg:    #A89880;
  --p-check-bg:     #7A1010;   --p-check-fg:  #F0A0A0;
  --p-info-bg:      #0A3050;   --p-info-fg:   #90C8F0;
  --p-tbd-bg:       #2A1F18;   --p-tbd-fg:    #4A3828;

  /* Status */
  --status-done:    #6EBF8B;
  --status-partial: #C8922A;
  --status-pending: #4A3828;

  /* Spacing — starting values, Paper may override */
  --card-pad:       14px;
  --item-pad:       8px 10px;
  --section-gap:    10px;
  --card-radius:    10px;
}
```

**Rules:**
- `--amber` is the only accent used globally (progress bars, active states, checkboxes, amber overlines on active nav)
- Destination colors are confined to their own card's accent strip, emoji bg, and section title
- `#fff` appears nowhere in the codebase
- `--ink` is the page background — never a gradient on the background itself

### Typography (locked)

```
Display:   Cormorant Garamond 700 italic  → destination names, hero title
Body:      Spectral 400/600               → descriptions, nav labels
Labels:    Space Mono 400/700             → badges, dates, stats, progress numbers
Georgian:  საქართველო                    → Cormorant Garamond italic, --amber color

Google Fonts:
  Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700
  Spectral:ital,wght@0,400;0,600;0,800;1,400
  Space+Mono:wght@400;700
```

**Why Cormorant over Playfair:** Playfair is overused in dark-premium aesthetics. Cormorant has genuine manuscript DNA — the contrast between hairline strokes and thick stems at large sizes is extraordinary, especially in italic.

### Priority Badge System (locked)

| Priority | Label    | BG        | Text      | Use                        |
|----------|----------|-----------|-----------|----------------------------|
| `must`   | MUST DO  | `#C41C1C` | `#E8DDD0` | Non-negotiable             |
| `rec`    | REC'D    | `#B84A18` | `#E8DDD0` | Strongly recommended       |
| `opt`    | OPTIONAL | `#3A2C22` | `#A89880` | Nice if time allows        |
| `check`  | ⚠ CHECK  | `#7A1010` | `#F0A0A0` | Verify before trip         |
| `info`   | INFO     | `#0A3050` | `#90C8F0` | Reference / context        |
| `tbd`    | TBD      | `#2A1F18` | `#4A3828` | Not yet researched         |

### Motion (locked — minimal and intentional)

```
Section collapse:   max-height 200ms ease-out
Card expand:        border-color + box-shadow 200ms ease
Checkbox:           instant — no transition, the action is the feedback
Drawer open:        translateY 250ms cubic-bezier(0.32, 0.72, 0, 1)
Page transitions:   none — SPA nav should feel instant
```

No animations on page load. No skeleton screens. No scroll-triggered reveals.

---

## 5. Tech Stack (locked — updated to reflect actual implementation)

```
Framework:    React 19 + Vite 7
3D/Shaders:   Three.js + React Three Fiber 9 + drei 10 + vite-plugin-glsl
Animation:    GSAP 3.14 (ScrollTrigger) + Lenis (smooth scroll)
Map:          Leaflet 1.9 (CDN, no React wrapper) + CartoDB Positron tiles
State:        Zustand 5
Styling:      CSS custom properties (all tokens) — no Tailwind, no CSS-in-JS
Persistence:  localStorage (checklist + budget, per-user, no backend)
Deploy:       Netlify static + SPA redirect
Design:       Paper Desktop (MCP) — layout authority
```

**Not yet installed (spec'd for future phases):**
- React Router v6 — currently single-page, no routing
- Tailwind CSS v3 — layout/spacing utility classes
- Recharts — budget donut chart
- lucide-react — icons
- Playwright — E2E tests

**Dropped from spec:** Mantine — we build UI components from scratch.

### Dependency versions (actual, from package.json)
```json
{
  "react": "^19.2.4",
  "react-dom": "^19.2.4",
  "@react-three/fiber": "^9.5.0",
  "@react-three/drei": "^10.7.7",
  "three": "^0.183.2",
  "gsap": "^3.14.2",
  "lenis": "^1.3.17",
  "zustand": "^5.0.11",
  "vite": "^7.3.1",
  "@vitejs/plugin-react": "^5.1.4",
  "vite-plugin-glsl": "^1.5.5"
}
```

Leaflet 1.9.4 is loaded via CDN at runtime (not in package.json).
```

---

## 6. Routes (locked)

```
/                  → PlanPage   (all destination cards)
/map               → MapPage    (full-screen interactive route map)
/budget            → BudgetPage (tracker + add entry)
/destination/:id   → deep-link  (scrolls PlanPage to card, auto-expands)
```

IDs: `kutaisi` · `drive` · `gudauri` · `tbilisi`

---

## 7. Data Layer (locked)

### 7.1 Type Definitions

```ts
type Priority = 'must' | 'rec' | 'opt' | 'check' | 'info' | 'tbd'
type Status   = 'researched' | 'partial' | 'not-started'
type Category = 'accommodation' | 'food' | 'transport' | 'activities' | 'gear' | 'other'

interface Item {
  id: string          // stable, unique — used as localStorage key
  n: string           // name
  d: string           // description
  p: Priority
}

interface Section {
  title: string
  icon: string
  items: Item[]
}

interface Destination {
  id: string
  name: string
  sub: string
  dates: string
  nights: number
  emoji: string
  accent: string      // CSS color
  grad: string        // CSS gradient
  status: Status
  sections: Section[]
}

interface RouteStop {
  id: string
  name: string
  lat: number
  lng: number
  type: 'destination' | 'stop'
  color: string
  nights?: number
  note: string
}

interface BudgetEntry {
  id: string
  destinationId: string
  category: Category
  label: string
  amountGEL: number
  date?: string       // ISO
  note?: string
  estimated?: boolean // pre-loaded known costs, greyed out until confirmed
}
```

### 7.2 Route Stops (`src/data/routeStops.js`)

```js
export const ROUTE_STOPS = [
  { id:'kutaisi',     name:'Kutaisi',                           lat:42.2679, lng:42.6946,
    type:'destination', color:'#C44536', nights:1,
    note:'Ancient Colchis · 1 night · Mar 5' },
  { id:'uplistsikhe', name:'Uplistsikhe Cave City',             lat:41.9671, lng:44.2094,
    type:'stop', color:'#C8922A',
    note:'3000-year-old rock-hewn town. 1–1.5hrs. ~7 GEL.' },
  { id:'gori',        name:'Gori — Stalin Museum & Fortress',   lat:41.9867, lng:44.1135,
    type:'stop', color:'#C8922A',
    note:"Stalin's birthplace + hilltop fortress. Optional." },
  { id:'mtskheta',    name:'Mtskheta — Jvari + Svetitskhoveli', lat:41.8427, lng:44.7206,
    type:'stop', color:'#C8922A',
    note:"UNESCO. Georgia's spiritual heart. Both free. 45min." },
  { id:'ananuri',     name:'Ananuri Fortress',                  lat:42.1647, lng:44.7022,
    type:'stop', color:'#C8922A',
    note:'Right on Military Highway. Zhinvali Reservoir views. 20–30min.' },
  { id:'gudauri',     name:'Gudauri',                           lat:42.4571, lng:44.4736,
    type:'destination', color:'#4580C8', nights:7,
    note:'Ski resort · Greater Caucasus · 7 nights · Mar 6–12' },
  { id:'tbilisi',     name:'Tbilisi',                           lat:41.7151, lng:44.8271,
    type:'destination', color:'#8B5CF6', nights:3,
    note:'Capital · Sulfur Baths · Nightlife · 3 nights · Mar 12–15' },
]
```

### 7.3 Budget Presets (`src/data/budgetPresets.js`)

Pre-loaded as `estimated: true` — greyed out, user confirms them as actual:

```js
export const BUDGET_PRESETS = [
  { destinationId:'drive',    category:'activities', label:'Uplistsikhe entry',        amountGEL:7  },
  { destinationId:'kutaisi',  category:'activities', label:'Botanical Garden entry',   amountGEL:5  },
  { destinationId:'kutaisi',  category:'activities', label:'Historical Museum entry',  amountGEL:3  },
  { destinationId:'kutaisi',  category:'transport',  label:'Soviet cable car',         amountGEL:3  },
  { destinationId:'drive',    category:'transport',  label:'Georgian Bus (KUT→GUD)',    amountGEL:60 },
  { destinationId:'tbilisi',  category:'activities', label:'Botanical Garden entry',   amountGEL:4  },
  { destinationId:'tbilisi',  category:'activities', label:'SK Lucky gym day pass',    amountGEL:40 },
]
```

### 7.4 Category Config

```js
export const CATEGORIES = {
  accommodation: { label:'Accommodation', icon:'🏠', color:'#4580C8' },
  food:          { label:'Food',          icon:'🍷', color:'#B84A18' },
  transport:     { label:'Transport',     icon:'🚗', color:'#C8922A' },
  activities:    { label:'Activities',    icon:'🎿', color:'#6EBF8B' },
  gear:          { label:'Gear',          icon:'🛍️', color:'#C44536' },
  other:         { label:'Other',         icon:'💸', color:'#4A3828' },
}
```

---

## 8. Feature Specifications

### 8.1 Checklist

- Context: `ChecklistContext` · Storage: `georgia_checklist` → `{ [itemId]: boolean }`
- Checkbox per item, saves to localStorage immediately on change
- Section-level progress bar: checked/total, 2px height, flat ends, `--amber` fill
- Overall progress in hero: total checked across all destinations
- State is local — each user has independent tracking
- Custom checkbox: 12×12px square, `--amber` fill when checked, `--ink-mid` border unchecked
- "Reset all" accessible only via long-press on the overall progress bar (not in main UI)

### 8.2 Map (`/map`)

```
Tiles:  https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png
        Attribution: © OpenStreetMap contributors © CARTO
Center: [42.0, 43.8] · Zoom: 7 · minZoom: 6 · maxZoom: 14
```

- Destination markers: filled circle 18px, destination color, 2px white border
- En-route stops: 10px circle, `--amber`, no border
- Hover/active: scale 1.3 + drop shadow, 150ms transition
- Route polyline: 2px dashed, `rgba(232,221,208,0.2)`
- Popup on click: Mantine dark card — name (Spectral 600 13px) + note (Spectral 400 11px `--text-muted`)
- Leaflet default icon fix (required — Vite breaks it):
```js
import L from 'leaflet'
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})
```

### 8.3 Budget (`/budget`)

- Context: `BudgetContext` · Storage: `georgia_budget` (JSON array)
- Currency: GEL primary, EUR secondary (`1 GEL = 0.34 EUR`, constant)
- Views: summary header → category donut (Recharts PieChart) → destination accordion → entry list
- Add entry: Mantine Drawer (bottom on mobile, right on desktop)
  - Destination: SegmentedControl (4 options)
  - Category: icon grid (6 options, 2×3)
  - Amount: NumberInput (GEL, 2 decimal places)
  - Label: TextInput
  - Note: TextInput (optional)
- Estimated entries: `opacity: 0.5`, italic label, "Confirm" button to mark as actual
- EUR shown inline on every entry row: `≈ X.XX €` in `--text-ghost` Space Mono

---

## 9. Component Tree

*Spatial layout (sidebar vs no sidebar, panel splits) is Paper's decision — not listed here. This tree defines logical ownership only.*

```
App
├── MantineProvider (dark theme, CSS vars override)
├── ChecklistContext.Provider
├── BudgetContext.Provider
└── Router
    ├── Layout
    │   ├── Nav (TopNav desktop / BottomNav mobile — layout TBD in Paper)
    │   └── <Outlet />
    ├── /       → PlanPage
    │   ├── Hero
    │   │   ├── WavingFlag (Canvas 2D — keep existing implementation)
    │   │   ├── TripTitle ("Georgia" Cormorant + "საქართველო" amber italic)
    │   │   ├── RouteBar (destination emoji stops + connector lines)
    │   │   └── OverallProgress (total checked / total, amber progress bar)
    │   └── DestCard[] × 4
    │       ├── CardHeader (accent strip · emoji · name · status · dates)
    │       ├── SectionProgress (per-section, 2px bar)
    │       └── CardSection[] (collapsible)
    │           └── CheckItem[] (checkbox · badge · name · description)
    ├── /map    → MapPage
    │   ├── MapLegend
    │   ├── LeafletMap
    │   │   ├── TileLayer
    │   │   ├── Polyline
    │   │   └── StopMarker[] + Popup[]
    │   └── StopList (sidebar desktop / bottom sheet mobile — layout TBD)
    └── /budget → BudgetPage
        ├── SummaryHeader (total GEL + EUR)
        ├── CategoryDonut (Recharts)
        ├── DestAccordion[]
        │   └── EntryRow[] (label · category icon · GEL · EUR · confirm/delete)
        └── FAB (+) → AddEntryDrawer (Mantine)
```

---

## 10. File Structure

```
georgia-trip/
├── .mcp.json                    ← Paper MCP config, commit this
├── public/
│   ├── favicon.svg              ← Georgian cross SVG
│   └── manifest.json
├── src/
│   ├── data/
│   │   ├── destinations.js      ← all trip content
│   │   ├── routeStops.js
│   │   ├── budgetPresets.js
│   │   └── phrases.js           ← Georgian phrases (Info section)
│   ├── contexts/
│   │   ├── ChecklistContext.jsx
│   │   └── BudgetContext.jsx
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   ├── useChecklist.js
│   │   └── useBudget.js
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Badge.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   └── CheckItem.jsx
│   │   ├── layout/
│   │   │   ├── Nav.jsx          ← renders TopNav or BottomNav based on breakpoint
│   │   │   └── Layout.jsx
│   │   ├── plan/
│   │   │   ├── Hero.jsx
│   │   │   ├── RouteBar.jsx
│   │   │   ├── DestCard.jsx
│   │   │   ├── CardSection.jsx
│   │   │   └── WavingFlag.jsx
│   │   ├── map/
│   │   │   ├── RouteMap.jsx
│   │   │   ├── StopMarker.jsx
│   │   │   └── StopList.jsx
│   │   └── budget/
│   │       ├── SummaryHeader.jsx
│   │       ├── CategoryDonut.jsx
│   │       ├── DestAccordion.jsx
│   │       ├── EntryRow.jsx
│   │       └── AddEntryDrawer.jsx
│   ├── pages/
│   │   ├── PlanPage.jsx
│   │   ├── MapPage.jsx
│   │   └── BudgetPage.jsx
│   ├── styles/
│   │   └── index.css            ← Tailwind directives + Leaflet CSS + CSS vars
│   ├── App.jsx
│   └── main.jsx
├── tests/
│   ├── checklist.spec.js
│   ├── map.spec.js
│   └── budget.spec.js
├── CLAUDE.md                    ← Claude Code instructions (see §11)
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── netlify.toml
├── playwright.config.js
└── package.json
```

---

## 11. CLAUDE.md (commit this to repo root)

This file is read automatically by Claude Code on every session. Keep it updated.

```markdown
# Georgia Trip Planner

## Stack
React 18 + Vite + React Router v6 + Mantine v7 + React Leaflet + Recharts + Playwright

## Design authority
Paper Desktop (MCP) is the layout authority. Do not hardcode layout decisions
(sidebar width, panel splits, spacing values) that haven't been confirmed in Paper.
CSS custom properties in src/styles/index.css are locked — do not change token values.

## Key rules
- No `#fff` anywhere — use `--text-primary` (#E8DDD0)
- No `localStorage` in components directly — use `useLocalStorage` hook
- No inline styles for colors — use CSS custom properties
- Mantine v7 API only (not v6) — check docs before using any Mantine component
- Leaflet default icon fix must run before MapContainer renders (see src/components/map/RouteMap.jsx)
- All item IDs must be stable strings — they're used as localStorage keys

## Paper MCP
Paper MCP server starts automatically when Paper Desktop is open.
To push a component to canvas: ask Claude Code to "push [ComponentName] to Paper"
To sync canvas back to code: ask Claude Code to "sync Paper canvas to [ComponentName]"

## Test
npm run dev       → http://localhost:5173
npm run build     → dist/
npm run preview   → http://localhost:4173 (used by Playwright)
npx playwright test → runs all E2E tests

## Deploy
Push to main → Netlify auto-deploys from dist/
```

---

## 12. Playwright Test Plan

### playwright.config.js
```js
export default {
  testDir: './tests',
  use: { baseURL: 'http://localhost:4173' },
  webServer: {
    command: 'npm run preview',
    port: 4173,
    reuseExistingServer: true,
  },
}
```

### Journey 1 — Checklist persistence
```
1. Navigate to /
2. Expand Kutaisi card
3. Check "Green Bazaar" item
4. Reload page
5. Assert: checkbox is still checked
6. Assert: section progress bar has incremented
7. Assert: overall progress in hero has incremented
```

### Journey 2 — Map renders all stops
```
1. Navigate to /map
2. Wait for .leaflet-container to be visible
3. Assert: 7 markers present in DOM
4. Click "Ananuri Fortress" marker
5. Assert: popup visible and contains text "Zhinvali"
6. Screenshot: map-with-popup.png
```

### Journey 3 — Budget add and persist
```
1. Navigate to /budget
2. Assert: total header visible (shows GEL amount)
3. Click FAB (+)
4. Assert: drawer opens
5. Select destination: Kutaisi
6. Select category: food
7. Enter amount: 45
8. Enter label: Magnolia dinner
9. Submit
10. Assert: entry row visible with "45 GEL"
11. Assert: EUR conversion visible "≈ 15.30 €"
12. Assert: Kutaisi total has increased
13. Reload page
14. Assert: entry still present
```

### Visual regression baseline
After first clean build, run:
```bash
npx playwright test --update-snapshots
```
Commit the snapshots. CI will diff against them on every subsequent run.

---

## 13. Deployment

### netlify.toml
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### PWA manifest (`public/manifest.json`)
```json
{
  "name": "Georgia Trip 2026",
  "short_name": "Georgia 🇬🇪",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0A0806",
  "theme_color": "#C8922A"
}
```

---

## 14. Practical Local Knowledge (trip content)

*Multi-source research. Implemented as `info` and `check` items in the data layer. Also surfaced as a dedicated "Field Notes" section in the app — details in §15.*

### Tipping
- **Restaurants:** 10% service charge often pre-added — goes to kitchen, not server. Tip an additional 10% in cash, handed directly to the waiter.
- **Never toast with beer** at any Georgian social gathering — genuine insult. Wine and chacha only.
- **Bolt/taxi:** No tip needed on Bolt (price fixed). Street taxis: round up or let them keep change.
- **Hotels:** Not expected at mid-range. Upscale: 2–5 GEL/day housekeeping, 1–2 GEL/bag bellhop.
- **Guides/drivers:** 10–15% guides, 5% drivers. Group tours pool tips.

### Dining etiquette
- Georgians habitually over-order — don't feel obligated to finish in restaurants (different in private homes — clean your plate there)
- **Khinkali:** hold from the spiral top, bite small hole, sip broth first, eat everything except the top knot. The knot is a handle — eating it marks you as a tourist immediately.
- **Supra rules (if invited):** Tamada controls everything. Don't drink until they propose toast and signal. Drain your full glass each time. Talking during a toast is rude. Eating is fine. If the tamada says "alaverdi" to you, you must expand on their toast. If a horn (khantsi) is brought out for you, drain it fully. Bringing more food as a gift implies the host can't provide enough — bring wine, flowers, or sweets instead.
- Don't fully clean your plate at a private supra — you'll get refilled immediately three times.

### Transit
- **Marshrutkas (intercity vans):** No schedule — leave when full. Cash GEL only. Fixed fares, no tourist price. Signs in Georgian script only — have destination written in Georgian on your phone. To stop mid-route: say "ga-a-che-ret." Minimal legroom and luggage space.
- **Key stations:** Kutaisi Central for western Georgia. Tbilisi Didube (Didube metro, walk through the bazaar) for Gudauri/Mtskheta/Kazbegi/western Georgia. Samgori/Ortachala for eastern Georgia (Kakheti) — NOT Didube.
- **Bolt:** Uber doesn't operate in Georgia. Bolt does. Download before landing. Price fixed at booking.
- **Street taxis:** No meters. Agree price before getting in. Know the approximate fare from your accommodation first.
- **GoTrip.ge:** Best option for Kutaisi→Gudauri drive with stops. Pre-book, especially ski season. ~$35–65/car full route. Drivers know the road conditions.
- **Military Highway in March:** Snow/ice possible near Gudauri. Do not drive after dark. Google Maps routing is unreliable here for road quality — ask your driver.

### Common mistakes
- **DCC at ATMs:** Always choose GEL, never your home currency. DCC rate is 5–8% worse.
- **ATMs:** BasisBank = no fees. Liberty Bank = 20 GEL fee per withdrawal. Bank of Georgia = 3 GEL.
- **Church dress:** Underdressed = turned away. Women cover shoulders and head. Men remove hats. No shorts. Keep a scarf in your daypack every day.
- **Bar scam in Tbilisi:** Stranger invites you into a bar → inflated bill + intimidating staff. Stick to places you found yourself.
- **Over-trusting Google Maps routing:** Georgia's mountain roads aren't mapped for quality. Ask locals or your driver before any unfamiliar route.
- **Georgia ≠ Georgia:** Don't confuse it with the US state. Locals are tired of it.
- **Stalin opinions:** Divisive. Don't offer strong takes unless a local raises it.
- **Comparing Georgian food** to neighboring cuisines (Turkish, Armenian, Iranian) is considered offensive to many locals. Celebrate what you're served.
- **Water:** Tap water quality varies in cities. Bottled water is cheap and ubiquitous.
- **Caucasian sheepdogs:** Working dogs, not pets — bred to be aggressive. Give wide berth on mountain trails. Carry a stick above Gudauri if hiking.
- **Roads:** Georgian driving is fast and aggressive. 20% rise in road fatalities H1 2025. Seatbelt every time. Don't rush your driver on mountain roads.

### Useful phrases
```
Hello:              გამარჯობა  gamarjoba
Thank you:          მადლობა    madloba
Please:             გთხოვთ     gtkhov't
Yes / No:           დიახ / არა diakh / ara
How much?           რა ღირს?   ra ghirs?
Stop here:          გააჩერეთ   ga-a-che-ret
Cheers:             გაუმარჯოს  gaumarzos
I don't drink:      არ ვსვამ   ar vsvam
Where is...?        სად არის?  sad aris?
```

---

## 15. Complete Trip Content

*(Implement verbatim as `destinations.js`)*

### Kutaisi · Mar 5 · 1 night · `#C44536` · `researched`

**Culture & Sights**
```
must   Colchis Fountain & Central Square — ancient Colchian tribute. Start here.
must   Green Bazaar — tastings, spices, cheese, churchkhela. Try Laghidze Water (tarragon/chocolate, invented here 1887).
must   Bagrati Cathedral — 11th-c, panoramic city views, free
rec    White Bridge & Soviet Cable Car — glass-floor bridge over Rioni, 3 GEL cash
check  Gelati Monastery (UNESCO) — Sunday-only as of summer 2025 (Mar 5 = Thursday). Verify current status before planning.
rec    Historical Museum — Colchian gold, ~3 GEL
opt    Drama Theatre — 10–30 GEL, check March schedule in advance
```

**Parks & Nature**
```
rec    Botanical Garden — 5 GEL, 700+ subtropical species, chapel inside 400yo oak tree (fits 3 people). 1km from center.
opt    Central City Park — morning walk, not a destination
```

**Food & Drink**
```
info   Imeretian cuisine differs from eastern Georgia: pkhali (walnut-veggie), Imeretian khachapuri (round/flat, not boat), clay-pot mushrooms, lobiani (bean bread)
must   Magnolia — on the Rioni, buffalo khinkali, cheesy lobiani, enclosed river-view balcony
rec    Sisters — pink building, folk music most evenings, supra vibe
rec    Baraqa — near Colchis Fountain, excellent eggplant with walnuts
opt    Hacker-Pschorr — German-themed, Georgian food, 24hrs, locals rate the khinkali
```

**Gear & Shopping**
```
must   Ecolo (second-hand) — ⭐5.0 / 123 reviews. Old villa + bar in yard. Boots ~90 GEL, jackets ~40 GEL. Likely ski pants. Closed Mon, opens noon.
rec    Megahand — ⭐4.9 / 254 reviews. Big, well-organized. Very cheap on sale days. 9am–9pm daily.
opt    Humana — smaller chain. Maps pin may be off (~100m from shown, reportedly next to OnePrice).
```

**Practical**
```
must   ATMs: BasisBank = no fees, 2000 GEL limit. Avoid Liberty (20 GEL!), BoG (3 GEL). Always choose GEL not home currency.
info   Revolut works fine within plan limits. Cards widely accepted — carry GEL cash for markets and marshrutkas.
info   Download Bolt before arrival. City center is walkable.
info   March = cold (0–8°C). Layer up. Light rain possible.
```

---

### The Drive · Mar 6 · 0 nights · `#C8922A` · `researched`

**Recommended Stops**
```
must   Uplistsikhe Cave City — 3000yo rock-hewn town, ~15km detour near Gori. 20,000 residents at peak. Budget 1–1.5hrs. ~7 GEL.
opt    Gori — Stalin Museum + train carriage + hilltop fortress. Skip if not interested.
must   Mtskheta — Jvari Monastery — 6th-century cliff-edge church. Views over river confluence. Free, 20min.
must   Mtskheta — Svetitskhoveli Cathedral — UNESCO. Kings crowned and buried here. Christ's robe allegedly buried beneath. Free, 20min.
must   Ananuri Fortress — right on Military Highway, no detour. Turquoise Zhinvali Reservoir views. 20–30min.
rec    Zhinvali Reservoir viewpoints — free pulloffs along the highway. Turquoise water against mountains.
```

**Route Info**
```
info   ~292km / 4hrs direct. With stops: 7–8hrs. Leave Kutaisi by 8am.
info   March: snow/ice possible near Gudauri. Military Highway section is windy and steep after Ananuri. Do not drive after dark.
info   Suggested order: Kutaisi → Uplistsikhe → Gori (lunch) → Mtskheta → Ananuri → Gudauri
info   GoTrip.ge ~$35–65/car, custom stops, pre-book in ski season. Georgian Bus 60 GEL (~6hrs winter, no stops). Marshrutka ~16 GEL via Didube (no sightseeing stops).
check  Church dress: cover shoulders (women) + head scarf at Jvari/Svetitskhoveli. Keep in your daypack — you'll be turned away otherwise.
```

---

### Gudauri · Mar 6–12 · 7 nights · `#4580C8` · `not-started`

**To Research**
```
tbd   Ski passes & pricing (Gudauri has a points-based system, not day passes — research this)
tbd   Equipment rental — skis, boots, helmets. On-piste vs off-piste rental options.
tbd   Accommodation — ski-in/ski-out vs village options
tbd   Restaurants & après-ski
tbd   Off-piste / freeride zones and guide options
tbd   Snow conditions in early-mid March (historically good but variable)
tbd   Kazbegi/Stepantsminda day trip — ~30min from Gudauri, Gergeti Trinity Church
tbd   Transport: Gudauri → Tbilisi on Mar 12
```

---

### Tbilisi · Mar 12–15 · 3 nights · `#8B5CF6` · `partial`

**Climbing & Gear**
```
must   OUTDOORS.GE — ⭐4.8 / 275 reviews. Kazbegi Ave. Top pick for climbing shoes. Best staff + fair prices.
rec    MPlus — ⭐4.7 / 180 reviews. Vaja Pshavela 25. Salewa brand. Premium but quality. Also rents gear.
opt    DV Sport — La Sportiva dealer. Check for specific models.
opt    Vake Climbing Gym — Chavchavadze 49. Speed/sport focus. Cheaper. Harnesses provided, BYO shoes.
check  Magelani — has gear but reported 3× EU retail pricing. Compare before buying.
info   @tbilisiclimbingshop — Instagram. DM about stock and prices.
rec    S.K.Lucky Gym — biggest climbing gym in Caucasus. Bouldering/top-rope/lead + Kilter board. 40 GEL/day. 9–23h daily.
```

**Ski Gear (Budget)**
```
rec    Freestyler — cheap used slope skis, rentals, helmets (on-piste only)
rec    Xtreme — biggest shop, basic equipment, boot molding system
rec    Dinamo Stadium area — search "Snowy Mountains" on Maps, several affordable shops clustered
opt    Facebook groups — used gear from individuals. Gems possible but watch for fraud.
```

**Parks & Nature**
```
must   National Botanical Garden — 4 GEL. Narikala Fortress base. 3500+ species, waterfalls, hiking trails. Connects into Old Town loop. 9am–6:30pm.
rec    Mtatsminda Park — 770m, funicular (reopened Oct 2024 after 34-year closure!), panoramic views, amusement park
rec    Mziuri Park — Vake district. Literary character sculptures, duck lake, skate park. Good locals' spot.
rec    Leghvtakhevi Waterfall — hidden gorge waterfall in Old Town near sulfur baths. Short walk from Abanotubani.
opt    Dedaena Park — near Dry Bridge flea market. Evening vibes, occasional live music.
opt    Turtle Lake — 686m, small lake with cafes, walk to Mtatsminda with views the whole way.
```

**To Research**
```
tbd   Neighborhoods to explore (Marjanishvili, Vera, Saburtalo, Old Town)
tbd   Food & restaurants
tbd   Nightlife & bars
tbd   Day trips (Mtskheta, Kakheti wine region, David Gareja)
tbd   Cultural sites (Narikala, Metekhi, Sioni Cathedral, National Museum)
tbd   Transport from Gudauri (marshrutka or GoTrip)
```

---

## 16. Decisions & Rationale

| Decision | Chosen | Rejected | Reason |
|---|---|---|---|
| Layout authority | Paper Desktop | Spec / prompt | Spatial decisions need to be seen, not described |
| Design direction | Kartvelian Codex (amber/ink) | Generic dark + Playfair | Tied to place and purpose |
| Display font | Cormorant Garamond | Playfair Display | Playfair is ubiquitous; Cormorant has genuine manuscript character |
| State sync | localStorage only | Supabase real-time | Travelers are together; overkill for v1 |
| Map | React Leaflet + CartoDB Dark | Google Maps | Free, no API key |
| UI lib | Mantine v7 | shadcn, Radix | Drawer + form components ship ready-to-use |
| Charts | Recharts | Chart.js | React-native, simple PieChart API |
| Flag | Canvas 2D (keep existing) | Three.js WebGL | Aesthetic upgrade, zero functional value |
| Testing | Playwright E2E | Vitest unit | E2E covers localStorage + Leaflet rendering |
| Paper role | Core — design first | Spot use | Paper-first is the whole point of the workflow |

---

*Living spec — update as Gudauri + Tbilisi research completes. Layout section updates after Paper Session 0.*