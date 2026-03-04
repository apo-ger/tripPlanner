# Trip Planner — App Spec

*Generic application features and architecture. Trip-agnostic — any trip data that fits the schema should work.*

---

## 1. Overview

A production-grade, mobile-responsive trip planner SPA. No backend, no auth, no real-time sync. Each user has independent local state (checklist progress, budget entries). Hosted on Netlify as a static site with a public read-only URL.

**Users:**
- **Primary (trip organizer):** Curates content, uses as personal HQ during trip
- **Companions:** Read the plan, track their own items locally

---

## 2. Data Model

### Types

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
  sub: string         // subtitle / tagline
  dates: string
  nights: number
  emoji: string
  accent: string      // CSS color
  accentDeep: string  // darker variant
  status: Status
  sections: Section[]
}

interface RouteStop {
  name: string
  lat: number
  lng: number
  type: 'destination' | 'stop'
  duration: string
  description: string
  links: { label: string, url: string }[]
}

interface Route {
  id: string
  name: string
  tagline: string
  duration: string
  distance: string
  stops: RouteStop[]
}

interface BudgetEntry {
  id: string
  destinationId: string
  category: Category
  label: string
  amountLocal: number    // in trip's local currency
  date?: string          // ISO
  note?: string
  estimated?: boolean    // pre-loaded known costs, greyed out until confirmed
}

interface TripConfig {
  name: string
  country: string
  dates: string
  localCurrency: string
  localCurrencySymbol: string
  homeCurrency: string
  homeCurrencySymbol: string
  exchangeRate: number   // 1 local = X home
}
```

### Data files
- `src/data/config.js` — design tokens, priority badge config, status labels, trip config
- `src/data/destinations.js` — all destination content
- `src/data/routes.js` — driving routes with stops
- `src/data/budgetPresets.js` — pre-loaded estimated costs (future)

---

## 3. Features

### 3.1 Plan View (MVP)

The core view. Shows all destinations as expandable cards.

- Destination cards with: name, dates, nights, status, section preview, completion bar
- Expandable sections with items
- Priority badges on items
- Overall trip progress visible without scrolling (desktop)

### 3.2 Route Dashboard (MVP)

Split-view showing the driving route.

- Map panel with markers and polyline
- Stop list panel with expandable details and external links
- Multiple route options, switchable via tabs
- Desktop: sticky map + scrolling stop list side by side
- Mobile: stacked (map above, list below)

### 3.3 Checklist (Phase 2)

Per-item checkboxes with localStorage persistence.

- Storage key: `{tripId}_checklist` → `{ [itemId]: boolean }`
- Checkbox per item, saves immediately on change
- Section-level progress bar (checked/total)
- Overall progress in nav or hero
- State is local — each browser/user tracks independently
- "Reset all" accessible only via long-press on progress bar (not in main UI)

### 3.4 Map View (Phase 2)

Full-screen interactive map.

- Light tile layer (CartoDB Positron)
- Destination markers (larger) and stop markers (smaller)
- Hover/active: scale + shadow
- Route polyline (dashed)
- Popup on click with name + description
- All stops visible simultaneously without zooming

### 3.5 Budget Tracker (Phase 3)

Per-trip budget tracking with localStorage persistence.

- Storage key: `{tripId}_budget` → JSON array of BudgetEntry
- Local currency primary, home currency secondary (constant exchange rate)
- Views: summary header → category breakdown → per-destination entries
- Add entry via bottom drawer (mobile) or side drawer (desktop)
- Estimated entries: reduced opacity, "Confirm" button to mark as actual
- Category config with icons and colors

### 3.6 Category Config

```js
export const CATEGORIES = {
  accommodation: { label: 'Accommodation', icon: '🏠', color: '#4580C8' },
  food:          { label: 'Food',          icon: '🍷', color: '#B84A18' },
  transport:     { label: 'Transport',     icon: '🚗', color: '#C8922A' },
  activities:    { label: 'Activities',    icon: '🎿', color: '#6EBF8B' },
  gear:          { label: 'Gear',          icon: '🛍️', color: '#C44536' },
  other:         { label: 'Other',         icon: '💸', color: '#4A3828' },
}
```

---

## 4. Architecture

### Current stack
```
Framework:    React 19 + Vite 7
3D/Shaders:   Three.js + R3F 9 + drei 10 + vite-plugin-glsl
Animation:    GSAP 3.14 (ScrollTrigger) + Lenis (smooth scroll)
Map:          Leaflet 1.9 (CDN) + CartoDB Positron tiles
State:        Zustand 5
Styling:      CSS custom properties — tokens in index.css
```

### To be added
```
Routing:      React Router v6
Icons:        lucide-react
Charts:       Recharts (budget donut)
Layout:       Tailwind CSS v3 (utility classes for spacing/layout)
Testing:      Playwright (E2E)
```

### State management
- `useScrollStore` (Zustand) — scroll progress, velocity, active route, mouse position
- Checklist and budget contexts to be added in Phase 2/3
- All persistent state via localStorage, no backend

### Routing (Phase 2)
```
/                  → PlanPage   (destination cards)
/map               → MapPage    (full-screen interactive map)
/budget            → BudgetPage (tracker + add entry)
/destination/:id   → deep-link  (scrolls PlanPage to card, auto-expands)
```

---

## 5. Persistence

All user state is browser-local. No sync between devices.

- Checklist: `{tripId}_checklist` → `{ [itemId]: boolean }`
- Budget: `{tripId}_budget` → `BudgetEntry[]`
- All access through a `useLocalStorage` hook — never direct `localStorage` calls in components

---

## 6. Deployment

```
Host:     Netlify (static)
Build:    npm run build → dist/
Redirect: /* → /index.html (SPA)
```

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

---

## 7. Testing (Phase 2+)

Playwright E2E only. No unit tests unless for pure utility functions.

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

### Test journeys (generic)
1. **Checklist persistence** — check item → reload → assert still checked
2. **Map renders all stops** — assert correct marker count, click marker → popup
3. **Budget add and persist** — add entry → assert row visible → reload → assert still present
4. **Route switching** — switch route tab → assert map redraws with correct stops
5. **Deep link** — navigate to `/destination/:id` → assert card scrolled into view and expanded
