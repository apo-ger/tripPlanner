# Georgia Trip Planner — Project Spec

## Project Overview

An interactive single-page React app for planning a 10-day Georgia trip (March 5–15, 2026).  
Route: **Kutaisi** (1n) → **Gudauri** (7n) → **Tbilisi** (3n).

The app is currently a working React artifact built in Claude.ai. This spec captures all accumulated research, the current codebase, design direction, and new features to implement.

---

## Current State

### Tech Stack
- Single-file React component (`.jsx`)
- Inline styles (no CSS files)
- Tailwind utility classes available but not currently used
- Google Fonts loaded via `<link>` in render: Playfair Display, DM Sans, Space Mono
- Available libraries: React, lucide-react, recharts, d3, Three.js r128, lodash, Plotly, Chart.js, Tone, shadcn/ui
- No localStorage (not supported in artifact env) — use React state only

### Current Features
- Waving Georgian flag (Canvas 2D slice-based animation with lighting)
- Hero section with Georgian script (საქართველო)
- Route visualization bar (emoji stops connected by gradient lines)
- Research progress tracker
- Expandable destination cards (Kutaisi, Gudauri, Tbilisi)
- Expandable sub-sections per destination
- Item cards with priority badges (Must Do, Rec'd, Optional, Check, Info, TBD)
- Dark theme with warm stone tones

### Current Code

The full current implementation is in the attached `georgia-trip-planner.jsx` file. Key architecture:

```
App (export default)
├── WavingFlag (Canvas 2D animation)
├── RouteBar (route visualization)
└── DestCard[] (one per destination)
    └── Section[] (collapsible)
        └── Item[] (with Badge)
```

Data is a `const destinations` array with this shape:
```js
{
  id: string, name: string, sub: string,
  dates: string, nights: number, emoji: string,
  accent: string, light: string, grad: string,
  status: "researched" | "not-started",
  sections: [{
    title: string, icon: string,
    items: [{ n: string, d: string, p: "must"|"rec"|"opt"|"check"|"info"|"tbd" }]
  }]
}
```

---

## New Features to Implement

### 1. Upgrade Flag to WebGL/Three.js Shader

**Replace** the current Canvas 2D slice-based flag with a proper WebGL waving flag using Three.js r128.

Requirements:
- Use `THREE.PlaneGeometry` with sufficient segments (e.g., 50×30) for smooth wave
- Apply the Georgian flag as a texture (draw it to an offscreen canvas, then use as `THREE.CanvasTexture`)
- Vertex shader or JS-based vertex manipulation to create a sine-wave displacement:
  - Wave should increase in amplitude from left (flagpole side) to right
  - Multiple sine waves layered for organic feel
  - Time-based animation via `requestAnimationFrame`
- Apply shading: use `MeshStandardMaterial` or `MeshPhongMaterial` with a directional light so wave crests are brighter and troughs are darker
- Camera: orthographic or perspective with narrow FOV, positioned to show flag from slightly angled front view
- Background: transparent (renderer `alpha: true`)
- Size: ~200×130px display, retina-ready
- **IMPORTANT**: Three.js r128 does NOT have `THREE.CapsuleGeometry` — don't use it. `PlaneGeometry` is correct for this.
- Import: `import * as THREE from 'three'`
- OrbitControls and other add-ons are NOT available — don't import them

Georgian flag design (draw to offscreen canvas):
- White background
- Large red cross: vertical bar centered horizontally (~15% width), horizontal bar centered vertically (~22.5% height)
- Four Bolnisi crosses: one in each quadrant. Each is a small red cross with slightly flared ends

Reference vertex displacement approach:
```js
// In animation loop, for each vertex:
const x = vertex.x;  // ranges across flag width
const t = time;
// Amplitude increases from left (0) to right (1)
const normalizedX = (x - minX) / (maxX - minX);
vertex.z = normalizedX * amplitude * Math.sin(x * frequency + t * speed);
// Add secondary wave for organic feel
vertex.z += normalizedX * amplitude2 * Math.cos(x * freq2 + t * speed2);
```

Note: In Three.js r128, access vertices via `geometry.attributes.position.array` (BufferGeometry), NOT `geometry.vertices` (deprecated).

### 2. Interactive Route Map

Integrate a map showing the driving route from Kutaisi → Gudauri with all recommended stops.

**Option A (Preferred): Embedded map component**
- Use Leaflet.js with OpenStreetMap tiles (free, no API key needed)
- CDN: `https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js` and corresponding CSS
- Plot markers for each stop with custom colored markers matching destination accents
- Draw polyline connecting the stops in order
- Popup on each marker with stop name and brief note
- Map should be dark-themed (use CartoDB dark tiles: `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png`)
- Map centered to show full route (roughly center of Georgia: lat 42.0, lng 43.5, zoom ~7)

**Option B (Fallback): SVG route diagram**
- If Leaflet proves too complex in single-file, create a stylized SVG showing Georgia's outline with route stops as nodes and curved paths between them

Route stops with coordinates:
```js
const routeStops = [
  // KUTAISI
  { name: "Kutaisi", lat: 42.2679, lng: 42.6946, type: "destination", color: "#C44536" },
  
  // EN ROUTE (Kutaisi → Gudauri, Mar 6)
  { name: "Uplistsikhe Cave City", lat: 41.9671, lng: 44.2094, type: "stop", color: "#F59E0B",
    note: "3000-year-old rock-hewn town. 20,000 people at peak. Theatre, pharmacy, pagan temples. Budget 1-1.5hrs." },
  { name: "Gori (Stalin Museum + Fortress)", lat: 41.9867, lng: 44.1135, type: "stop", color: "#F59E0B",
    note: "Stalin's birthplace. Museum + hilltop fortress with views. Optional — skip if not interested." },
  { name: "Mtskheta (Jvari + Svetitskhoveli)", lat: 41.8427, lng: 44.7206, type: "stop", color: "#F59E0B",
    note: "UNESCO. Where Christianity became state religion in 337 AD. Two churches, river confluence views. 45min." },
  { name: "Ananuri Fortress", lat: 42.1647, lng: 44.7022, type: "stop", color: "#F59E0B",
    note: "Directly on Military Highway. Two churches overlooking turquoise Zhinvali Reservoir. 20-30min." },
  
  // GUDAURI
  { name: "Gudauri", lat: 42.4571, lng: 44.4736, type: "destination", color: "#2563EB" },
  
  // TBILISI
  { name: "Tbilisi", lat: 41.7151, lng: 44.8271, type: "destination", color: "#7C3AED" },
];
```

Map UI requirements:
- Collapsible/expandable panel within the app
- Or a dedicated tab/section between the hero and destination cards
- Markers should be color-coded: red for main destinations, amber/gold for route stops
- Clicking a marker shows a tooltip/popup with the stop name and note
- Route line should follow the approximate road path (straight lines between points are fine for v1)

### 3. Add Parks Data to Each Destination

Add a new "Parks & Nature" section to Kutaisi and Tbilisi destination cards.

#### Kutaisi Parks:
```js
{ title: "Parks & Nature", icon: "🌿", items: [
  { n: "Botanical Garden", d: "Right bank of Rioni, 1km from center. 700+ species, subtropical. Highlight: chapel inside 400-year-old oak tree (fits 3 people). 5 GEL entry. Charming, not fancy.", p: "rec" },
  { n: "Central City Park", d: "Old 'Boulevard' in center. Morning walk spot, not a destination in itself.", p: "opt" },
]}
```

#### Tbilisi Parks:
```js
{ title: "Parks & Nature", icon: "🌿", items: [
  { n: "National Botanical Garden", d: "Historic center, base of Narikala Fortress. 3500+ species, waterfalls, bridges, trails. Walk down to Sulfur Baths. ~4 GEL. Connects into Old Town loop.", p: "must" },
  { n: "Mtatsminda Park", d: "Highest point in Tbilisi (770m). Restored 1905 funicular ride up. Panoramic views, amusement park, Ferris wheel. National Pantheon midway.", p: "rec" },
  { n: "Mziuri Park", d: "Vake district. Multi-layered with quirky Georgian literary character sculptures, duck lake, skate park, amphitheater. Great locals' hangout.", p: "rec" },
  { n: "Dedaena Park", d: "Near Dry Bridge flea market. Fountains, skate park, live music evenings, food markets. Good vibes.", p: "opt" },
  { n: "Turtle Lake", d: "Above Vake Park. Small lake with cafes. Can walk from here to Mtatsminda Park — great views whole way.", p: "opt" },
  { n: "Leghvtakhevi Waterfall", d: "Hidden waterfall in Old Town near sulfur baths. Short walk through a gorge in the city center.", p: "rec" },
]}
```

### 4. Add Route Stops Section

Add a new top-level section (between hero and destination cards, or as a dedicated "Day 2: The Drive" card) for the Kutaisi → Gudauri route.

This should be a separate destination-style card:
```js
{
  id: "route-day",
  name: "The Drive",
  sub: "Kutaisi → Gudauri · Georgian Military Highway",
  dates: "Mar 6",
  nights: 0,
  emoji: "🚗",
  accent: "#D97706",
  light: "#FFFBEB",
  grad: "linear-gradient(135deg,#D97706,#B45309)",
  status: "researched",
  sections: [
    { title: "Recommended Stops", icon: "📍", items: [
      { n: "Uplistsikhe Cave City", d: "3000-year-old rock-hewn town. ~15km detour off main road near Gori. At peak: 20,000 inhabitants, theatre, pharmacy, pagan temples carved into rock above Mtkvari River. Budget 1–1.5 hours. Entry ~7 GEL.", p: "must" },
      { n: "Gori", d: "Stalin's birthplace. Museum with personal items + his train carriage. Gori Fortress on hilltop with views. Interest-dependent — skip if not your thing.", p: "opt" },
      { n: "Mtskheta — Jvari Monastery", d: "6th-century on cliff edge. Panoramic views over confluence of Mtkvari and Aragvi rivers. One of the earliest cross-in-square churches in Georgia. Free, 20min.", p: "must" },
      { n: "Mtskheta — Svetitskhoveli Cathedral", d: "11th-century, spiritual heart of Georgia. Where kings were crowned and buried. Christ's robe allegedly buried beneath. UNESCO. Free, 20min.", p: "must" },
      { n: "Ananuri Fortress", d: "Directly on Georgian Military Highway — no detour needed. 17th-century fortress with two churches overlooking turquoise Zhinvali Reservoir. Stunning photo stop. 20-30min.", p: "must" },
      { n: "Zhinvali Reservoir viewpoints", d: "Multiple pulloffs along Military Highway. Turquoise water against mountains. Free, just stop the car.", p: "rec" },
    ]},
    { title: "Route Info", icon: "ℹ️", items: [
      { n: "Total distance", d: "~292km / 4hrs direct. With stops: plan 7-8 hours.", p: "info" },
      { n: "Road condition", d: "Main highway is good. Georgian Military Highway section is mountain road — scenic but windy. In March, may have snow/ice on higher sections near Gudauri.", p: "info" },
      { n: "Suggested order", d: "Kutaisi → Uplistsikhe → lunch in Gori → Mtskheta (Jvari + Svetitskhoveli) → Ananuri → Gudauri.", p: "info" },
      { n: "Transport options", d: "GoTrip.ge for flexible private driver (~$35-65 per car). Georgian Bus runs Kutaisi Airport → Gudauri in winter (60 GEL one-way, ~6hrs). Marshrutka via Tbilisi Didube (~16 GEL, 6.5hrs, no stops).", p: "info" },
    ]},
  ],
}
```

Insert this between Kutaisi and Gudauri in the destinations array.

---

## Complete Research Data

### KUTAISI (March 5, 1 night)

**Culture & Sights:**
- Colchis Fountain & Central Square: Ancient Colchian civilization tribute with enlarged artifact replicas. Popular local meeting point — perfect starting point.
- Green Bazaar (MUST): Covered market. Produce, spices, cheese, churchkhela, honey. Sellers offer tastings. Try Laghidze Water (tarragon or chocolate flavors) — invented in Kutaisi in 1887.
- Bagrati Cathedral: 11th-century cathedral on Ukimerioni Hill. Panoramic city views. Free entry, open daily.
- White Bridge & Soviet Cable Car: Glass-floor bridge over Rioni River. Cable car retains Soviet aesthetic — 3 GEL cash each way.
- Gelati Monastery (UNESCO): ⚠️ Was Sunday-only as of summer 2025 due to renovations. March 5 is Thursday — check current status before planning.
- Kutaisi Historical Museum: 19th-century bank building. Prehistory to WWII artifacts, Colchian golden jewelry. ~3 GEL entry.
- Lado Meskhishvili Drama Theatre: One of Georgia's top theatres. Tickets 10–30 GEL. Check March 5 schedule.
- Kutaisi Botanical Garden: Right bank of Rioni, ~1km from center. 700+ subtropical species. Chapel inside 400-year-old oak tree (fits 3 people). 5 GEL entry. Charming, not fancy.

**Food (Imeretian cuisine — distinct from eastern Georgia):**
- Regional character: Less red meat, more vegetables and herbs
- Must-try dishes: pkhali (walnut-veggie paste, originated here), Imeretian khachapuri (round, cheese-filled), clay-pot mushrooms, lobiani (bean bread)
- Magnolia Restaurant (MUST): Right on Rioni River. Buffalo meat khinkali (Mingrelian specialty), cheesy lobiani. Enclosed balcony with river views.
- Sisters (REC): Historic pink building, vintage décor. Folk music most evenings — great for a Georgian supra (feast) experience.
- Baraqa (REC): Central location near Colchis Fountain. Good khinkali, excellent eggplant with walnuts, Adjarian khachapuri.
- Hacker-Pschorr (OPT): German-themed but Georgian food. Locals rate the khinkali as best in Kutaisi. Many varieties. Open 24 hours.

**Second-Hand Gear Shopping:**
- Ecolo (MUST): ⭐ 5.0, 123 reviews. Old villa with bar in yard. Hiking boots ~90 GEL, jackets ~40 GEL. Likely to have ski pants. Closed Mondays, opens at noon.
- Megahand (REC): ⭐ 4.9, 254 reviews. Big, well-organized. Huge selection, very cheap especially on sale days. Open 9am–9pm daily.
- Humana (OPT): Second-hand chain, smaller. Google Maps pin may be off — reportedly next to OnePrice, ~100m from shown location.
- General second-hand shops: Look for "სეკონდ ჰენდი" signs.

**Practical:**
- BasisBank ATMs: NO FEES, 2000 GEL limit (best option)
- Avoid: Liberty Bank (20 GEL fee!), Bank of Georgia (3 GEL fee)
- Always decline currency conversion (DCC) at ATMs — choose GEL
- Revolut: Works fine. Free withdrawals within plan limits (Standard: £200/month or 5 withdrawals)
- Cards widely accepted but carry cash for markets and small spots
- Download Bolt app for cheap taxis. City center is walkable.
- Weather: Early March is cold. Layer up.

### KUTAISI → GUDAURI DRIVE (March 6)

~292km / 4hrs direct. With recommended stops: 7–8 hours.

**Stop 1: Uplistsikhe Cave City** (~15km detour near Gori)
- Ancient rock-hewn town, one of the oldest urban settlements in Georgia
- Dating from Early Iron Age through Late Middle Ages
- At peak: 20,000 inhabitants, theatre, pharmacy, pagan temples
- Carved into rocky ridge above Mtkvari River
- On UNESCO Tentative List since 2007
- Budget 1–1.5 hours. Entry ~7 GEL.

**Stop 2: Gori** (on the main route)
- Stalin's birthplace. Museum with personal items + his actual train carriage.
- Gori Fortress: hilltop citadel with city views
- Interest-dependent: compelling for history buffs, skip if not your thing

**Stop 3: Mtskheta** (on the route, ~20min from Tbilisi bypass)
- Ancient capital. UNESCO World Heritage.
- Jvari Monastery: 6th-century, cliff edge. Views over river confluence. One of earliest cross-in-square churches.
- Svetitskhoveli Cathedral: 11th-century, spiritual heart of Georgia. Kings crowned and buried here. Christ's robe allegedly buried beneath.
- Even 45 minutes here is worth it. Free entry to both.

**Stop 4: Ananuri Fortress** (directly on Georgian Military Highway)
- 17th-century fortress with two churches
- Overlooks turquoise Zhinvali Reservoir
- No detour needed — right on the road
- 20–30 min stop. Major photo spot.

**Additional viewpoints along Military Highway:**
- Zhinvali Reservoir pulloffs (multiple)
- Road becomes increasingly scenic through Greater Caucasus
- In March: possible snow/ice on higher sections approaching Gudauri

**Transport options for the drive:**
- GoTrip.ge: Flexible private driver. Build custom itinerary with stops. ~$35–65 per car.
- Georgian Bus: Winter shuttle Kutaisi Airport → Gudauri, 60 GEL one-way (~6hrs). Bus swaps to smaller vehicle before Tbilisi.
- Marshrutka: Kutaisi Bus Station → Tbilisi Didube → Gudauri. ~16 GEL, ~6.5hrs. No sightseeing stops.
- Private transfer services: Budget Georgia, Dzmao Travel ($108 from Kutaisi Airport to Gudauri).

### GUDAURI (March 6–12, 7 nights)

**Status: NOT YET RESEARCHED**

Pending research:
- Ski passes & pricing
- Equipment rental (skis, boots, helmets)
- Accommodation options
- Restaurants & après-ski
- Off-piste / freeride options
- Weather/snow conditions typical for early-mid March
- Kazbegi/Stepantsminda day trip possibility

### TBILISI (March 12–15, 3 nights)

**Climbing Shoes (New):**
- OUTDOORS.GE (MUST): ⭐ 4.8, 275 reviews. Kazbegi Ave. Amazing staff, good brands, fair prices. Top pick.
- MPlus (REC): ⭐ 4.7, 180 reviews. Vaja Pshavela St. #25. Salewa brand. Premium pricing but good quality and service. Also rents gear.
- DV Sport (OPT): La Sportiva dealer. Check for specific models.
- Magelani (CHECK): Has climbing gear but some reviewers report inflated prices (up to 3× European retail). Compare before buying.
- @tbilisiclimbingshop (INFO): Instagram. DM for stock and prices.
- Second-hand climbing shoes: Not found in shops. Check Facebook groups or local climbing community boards.

**Climbing Gyms:**
- S.K.Lucky (main gym): Biggest in Caucasian region. Bouldering, top-rope, lead climbing, Kilter board. 40 GEL day pass / 230 GEL monthly. Open 9:00–23:00 daily. Equipment rental included in entry. Mixed reviews — worn-out rental shoes, unmarked routes. Better with own shoes. Good for lead/top-rope; bouldering section weaker.
- Vake Gym: Chavchavadze Ave. 49. Best for speed/sport climbing. Harnesses/quickdraws provided, bring own shoes. Smaller, cheaper than S.K.Lucky. Boulder section reportedly removed.
- Pro Climbers (Vera Park): Bouldering gym, central Tbilisi. One source says under construction — check current status.

**Ski/Outdoor Gear (Budget):**
- Freestyler: Cheap used slope skis, rentals, cheap helmets (on-piste only)
- Xtreme: Biggest shop, basic equipment, relatively cheap. Boot molding system.
- Shops near Dinamo Stadium: Search "Snowy Mountains" on Google Maps. Several affordable shops clustered together.
- Outdoor Outlet: European goods, make appointment via Facebook.
- Facebook groups: Buy from individual sellers (fraud risk exists).

**Parks & Nature:**
- National Botanical Garden (MUST): Historic center, base of Narikala Fortress. 3500+ plant species. Multiple waterfalls, bridges, hiking/biking trails. Walk through to reach Sulfur Baths area. ~4 GEL entry. Open 9am–6:30pm daily. Can combine with cable car, Narikala, and Old Town in one walking loop.
- Mtatsminda Park (REC): Highest point in Tbilisi at 770m. Access via restored 1905 funicular (3 stations). Panoramic city views. Has amusement park, Ferris wheel, restaurants. National Pantheon at middle station. Can hike from here to Narikala Fortress.
- Mziuri Park (REC): Vake district. Multi-layered park with colorful staircases, sculptures of Georgian literary characters (Nodar Dumbadze's), duck lake, skate park, amphitheater (events/festivals), climbing wall. Good locals' hangout. Mziuri Cafe inside park.
- Dedaena Park (OPT): Near Dry Bridge flea market. Fountains, skate park, occasional live music and food markets. Good evening vibes.
- Turtle Lake (OPT): Small lake above Vake Park (686m elevation). Cafes, pebble beaches, catamarans. Can walk from here to Mtatsminda Park with great views the whole way. Open Air Museum of Ethnography nearby.
- Leghvtakhevi Waterfall (REC): Hidden natural waterfall right in Old Town, near sulfur baths. Walk through a gorge with cliffs and bamboo. Connects Botanical Garden area to Abanotubani (bath district).

**Still to research:**
- Neighborhoods to explore
- Food & restaurants
- Nightlife & bars
- Day trips
- Cultural sites
- Transport from Gudauri

---

## Design System

### Color Palette

**Background:** Dark warm stone
- Primary bg: `#0C0A09` → `#1C1917` → `#171412` (gradient)
- Card bg: `rgba(255,255,255,0.02)` to `rgba(255,255,255,0.04)` expanded
- Item bg: `rgba(255,255,255,0.03)`

**Destination Accents:**
- Kutaisi: `#C44536` (warm red) — grad: `#C44536` → `#9B2C1F`
- Route Day: `#D97706` (amber) — grad: `#D97706` → `#B45309`
- Gudauri: `#2563EB` (blue) — grad: `#2563EB` → `#1E40AF`
- Tbilisi: `#7C3AED` (purple) — grad: `#7C3AED` → `#5B21B6`

**Text:**
- Primary: `#FAFAF9`
- Secondary: `#A8A29E`
- Muted: `#78716C`
- Subtle: `#57534E`
- Ghost: `#3F3F46`

**Priority Badges:**
- Must Do: `bg:#DC2626 text:#fff`
- Rec'd: `bg:#EA580C text:#fff`
- Optional: `bg:#52525B text:#D4D4D8`
- ⚠ Check: `bg:#991B1B text:#FCA5A5`
- Info: `bg:#0369A1 text:#BAE6FD`
- TBD: `bg:#3F3F46 text:#71717A`

**Status Dots:**
- Researched: `#4ADE80`
- Not Started: `#71717A`

### Typography
- Headings: `Playfair Display` 700–900
- Body: `DM Sans` 400–800
- Labels/Mono: `Space Mono` 400–700
- Georgian script: `საქართველო` (the font handles it)

### UI Patterns
- Cards: rounded 14px, thin accent strip top (2px gradient), subtle border
- Sections: collapsible with ▾ chevron rotation
- Items: left border accent (3px) for "must" priority
- Ambient glow: radial gradient behind hero, fixed position
- Transitions: 0.2–0.25s on interactions

---

## Architecture Notes

### Single-File Constraint
Everything must be in ONE `.jsx` file. No separate CSS, no separate data files. This is a constraint of the Claude.ai artifact environment.

### Available Imports
```js
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import * as THREE from "three";  // r128
import * as d3 from "d3";  // if needed for map
import _ from "lodash";
// Leaflet would need to be loaded via CDN script tag, not import
```

### Performance Considerations
- Three.js flag: dispose of geometry, material, renderer on unmount
- Leaflet map: destroy on unmount
- Use `useMemo` for static data arrays
- RequestAnimationFrame cleanup in all animation loops

### No Browser Storage
`localStorage` and `sessionStorage` are NOT available. All state must be React state.

---

## Implementation Priority

1. **Add all new data** (parks, route stops) to the destinations array
2. **Route map** (Leaflet with dark tiles, or SVG fallback)
3. **WebGL flag upgrade** (Three.js PlaneGeometry + vertex displacement)
4. **Polish** (animations, transitions, responsive)

---

## File Structure (for single-file)

```
// Imports
// Constants (colors, data)
// Georgian Flag WebGL Component
// Map Component
// UI Components (Badge, Item, Section, DestCard, RouteBar)
// Main App (export default)
```

---

## Notes & Gotchas

- Three.js r128: No CapsuleGeometry, no OrbitControls import. Use BufferGeometry vertex manipulation.
- Leaflet in React: Load via CDN `<script>` and `<link>` tags injected in useEffect, then access via `window.L`. Cannot `import` directly.
- Georgian flag: White bg, large red cross, 4 small Bolnisi crosses in quadrants. Each Bolnisi cross has slightly flared/widened ends.
- The app should work on mobile (responsive). Current max-width is 580px.
- Trip is March 5–15, 2026. Weather will be cold (0–10°C range). This affects gear recommendations.
- Batumi is NOT on the route — all Batumi references have been excluded.
- Gelati Monastery was Sunday-only as of summer 2025 — flag this as needing status check.
- No climbing gyms exist in Kutaisi or Gudauri — only Tbilisi.
