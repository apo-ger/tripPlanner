# Trip Planner — Design System Spec

*This document is the input for Paper MCP design explorations. It defines constraints and intent — Paper resolves the specifics.*

---

## 1. Design Philosophy

The app is a personal trip planner — used at a desk during planning and on a phone in the field. It should feel like a **beautifully typeset field notebook**: dense enough to show real information, spacious enough that nothing feels anxious.

**The feel:** Private, authoritative, warm. Like something you'd buy at a good stationery shop — not something a startup would ship.

**Anti-patterns to avoid:**
- SaaS dashboard aesthetics (hero images, gradients-on-white, card soup)
- Generic system fonts (Inter, Roboto, SF Pro)
- Excessive whitespace with no information density
- Component-library-default look (Mantine/shadcn/MUI out of the box)
- Decorative elements that aren't also functional

---

## 2. Color Direction

**Light theme only.** Warm, not clinical.

### Constraints
- No pure white (`#FFFFFF`) as a page background — use an off-white with warmth
- No pure black (`#000000`) for text — use a warm near-black
- Body text must never be gray enough to strain readability
- One strong accent color maximum as a global accent. Destination-specific colors exist but are confined to their own context (card strip, icon bg)
- Borders and dividers should be barely visible — structure through spacing, not lines
- The palette should feel complete with just neutrals. The accent is a deliberate punctuation mark, not a crutch

### What Paper should explore
- Warm off-white range for backgrounds (parchment, cream, stone)
- Near-black range for text (ink, espresso, charcoal-brown)
- 2–3 neutral mid-tones for secondary text, borders, muted UI
- One accent color with purpose (progress bars, active states, interactive affordances)
- Destination colors that work against a light background (the current set was tuned for dark)

---

## 3. Typography

Three fonts, all available on Google Fonts:

```
Display:  Fraunces (variable, optical size axis)
Body:     Source Serif 4 (variable)
Labels:   JetBrains Mono (variable)

Google Fonts import:
  Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900
  Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900
  JetBrains+Mono:ital,wght@0,100..800;1,100..800
```

### Roles
| Role | Font | Guidance |
|------|------|----------|
| Destination names, hero title, section headings | Fraunces 700–900 | Use optical size axis. At large sizes (32px+) it has beautiful organic irregularity. Consider italic for destination names. |
| Body text, descriptions, nav labels | Source Serif 4 400/600 | Warm, readable. Don't go below 14px for body. 600 weight for emphasis, not bold. |
| Badges, dates, stats, progress numbers, metadata | JetBrains Mono 400/700 | Good at small sizes (9–11px). Use for anything that benefits from fixed-width alignment. |

### Hierarchy constraints
- Maximum contrast between display and body sizes — pair heavy display type with regular-weight body
- Tighter tracking on large type (Fraunces at 48px+ should breathe less)
- Open tracking on small-caps labels (JetBrains Mono at 9–10px in uppercase)
- Line height: generous for body (1.5–1.7), tight for display (0.95–1.1)

### What Paper should explore
- Exact size scale (what sizes feel right at each level of hierarchy)
- Weight pairings (how heavy should headings be vs body)
- Whether Fraunces italic works for destination names or feels forced
- How JetBrains Mono reads at 8–9px for tiny labels (badge text, timestamps)

---

## 4. Spacing & Density

### Intent
Planning mode (desktop) should feel information-dense — the user is scanning, comparing, deciding. Field mode (mobile) should feel scannable — the user needs one answer fast.

### Constraints
- Cards must not exceed 680px width on any viewport (readability)
- Item rows on desktop (1280px) must fit: name + badge + description in one line
- No section should require more than one scroll-length to scan its contents
- Group related items tightly, separate unrelated groups generously — don't use uniform spacing

### What Paper should explore
- Card padding (internal spacing)
- Gap between cards in a stack
- Section gap within a card
- Item row density (how tight can items be before it feels cramped)
- Breakpoint behavior: how density changes at 375px / 768px / 1280px / 1440px

---

## 5. Component Patterns

*Describe intent and constraints. Paper resolves layout and visual treatment.*

### Navigation
- All top-level views reachable in one tap from anywhere
- Active destination always visually indicated
- Mobile: bottom tab bar, 4 items max, labels visible (not icon-only)
- Desktop: layout TBD by Paper

### Destination Card
- Must show without expanding: name, dates, nights, status, section preview
- Expandable to show full section content
- Accent color confined to a small indicator (strip, dot, icon bg) — not the whole card
- Completion progress visible at a glance

### Item Row
- Name + priority badge + description
- Priority indicated by badge color and optionally a left border accent
- Checkbox for checklist functionality (future phase)
- Must not wrap to multiple lines on desktop at 1280px

### Priority Badges
Six levels: MUST DO, REC'D, OPTIONAL, CHECK, INFO, TBD. Each has a distinct bg/text color pair. Rendered in mono at small size (7–9px). Must be legible against the card background.

### Map
- Desktop: large enough to show a full multi-stop route without zooming
- Mobile: full-screen, no competing UI while map is active
- Light tiles (CartoDB Positron or similar)
- Markers: filled circles, destination markers larger than stop markers

### Budget (future)
- Total always above the fold
- Add entry via drawer/sheet, never navigates away
- Category breakdown visible at a glance

---

## 6. Motion

Minimal and intentional. No animations on page load. No scroll-triggered reveals in the main content (the grain overlay is the one exception — it's a texture, not a reveal).

```
Section collapse:   max-height 200ms ease-out
Card expand:        border-color + box-shadow 200ms ease
Checkbox:           instant — no transition
Drawer open:        translateY 250ms cubic-bezier(0.32, 0.72, 0, 1)
Page transitions:   none — SPA nav should feel instant
```

The grain overlay and flag shader are preserved from v1 and operate independently of UI motion.

---

## 7. Responsive Breakpoints

| Breakpoint | Target |
|------------|--------|
| 375px | iPhone SE — minimum supported |
| 768px | Tablet portrait |
| 1280px | Laptop / small desktop |
| 1440px | Desktop |

### What Paper should explore
- Does a persistent sidebar add value on desktop or waste width?
- Where does the dashboard split-view collapse to stacked? (currently 900px)
- How does card density change across breakpoints?
- Mobile navigation pattern (bottom tabs vs top bar)

---

## 8. Paper Session Brief

Use this to kick off layout explorations:

```
Design three layout explorations for a trip planner app (desktop, 1440px).
Use real trip data (4 destinations, nested sections with items, a driving
route with 7 stops, a map). Light theme, warm neutrals.

Fonts: Fraunces (display), Source Serif 4 (body), JetBrains Mono (labels).

Each exploration should have a distinct spatial approach — different answers
to: sidebar vs no sidebar, map placement, card density, navigation pattern.

The app serves two modes: planning (at a desk, dense, comparative) and
field use (on a phone, scannable, one-answer-fast). Optimize for both.
```
