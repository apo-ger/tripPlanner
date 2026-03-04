# Georgia Trip Fixture — Test Data & Acceptance Criteria

*This is the specific trip content used to test and validate the trip planner app. Paper designs against this data. Playwright tests assert against it.*

---

## Trip Config

```js
{
  name: 'Georgia 2026',
  country: 'Georgia',
  dates: 'Mar 5–15, 2026',
  localCurrency: 'GEL',
  localCurrencySymbol: '₾',
  homeCurrency: 'EUR',
  homeCurrencySymbol: '€',
  exchangeRate: 0.34,  // 1 GEL = 0.34 EUR
}
```

---

## Destinations

### Kutaisi · Mar 5 · 1 night · `researched`

**Culture & Sights**
| Priority | Item | Description |
|----------|------|-------------|
| must | Colchis Fountain & Central Square | Ancient Colchian tribute. Start here. |
| must | Green Bazaar | Tastings, spices, cheese, churchkhela. Try Laghidze Water (tarragon/chocolate, invented here 1887). |
| must | Bagrati Cathedral | 11th-c, panoramic city views, free. |
| rec | White Bridge & Soviet Cable Car | Glass-floor bridge over Rioni, 3 GEL cash. |
| check | Gelati Monastery (UNESCO) | Sunday-only as of summer 2025 (Mar 5 = Thursday). Verify current status before planning. |
| rec | Historical Museum | Colchian gold, ~3 GEL. |
| opt | Drama Theatre | 10–30 GEL, check March schedule in advance. |

**Parks & Nature**
| Priority | Item | Description |
|----------|------|-------------|
| rec | Botanical Garden | 5 GEL, 700+ subtropical species, chapel inside 400yo oak tree (fits 3 people). 1km from center. |
| opt | Central City Park | Morning walk, not a destination. |

**Food & Drink**
| Priority | Item | Description |
|----------|------|-------------|
| info | Imeretian cuisine | Differs from eastern Georgia: pkhali, Imeretian khachapuri (round/flat), clay-pot mushrooms, lobiani. |
| must | Magnolia | On the Rioni, buffalo khinkali, cheesy lobiani, enclosed river-view balcony. |
| rec | Sisters | Pink building, folk music most evenings, supra vibe. |
| rec | Baraqa | Near Colchis Fountain, excellent eggplant with walnuts. |
| opt | Hacker-Pschorr | German-themed, Georgian food, 24hrs, locals rate the khinkali. |

**Gear & Shopping**
| Priority | Item | Description |
|----------|------|-------------|
| must | Ecolo (second-hand) | 5.0/123 reviews. Old villa + bar in yard. Boots ~90 GEL, jackets ~40 GEL. Closed Mon, opens noon. |
| rec | Megahand | 4.9/254 reviews. Big, organized. Very cheap on sale days. 9am–9pm daily. |
| opt | Humana | Smaller chain. Maps pin may be off (~100m from shown). |

**Practical**
| Priority | Item | Description |
|----------|------|-------------|
| must | ATMs | BasisBank = no fees, 2000 GEL limit. Avoid Liberty (20 GEL!), BoG (3 GEL). Always choose GEL. |
| info | Revolut | Works fine within plan limits. Cards widely accepted. |
| info | Transport | Download Bolt before arrival. City center is walkable. |
| info | Weather | March = cold (0–8°C). Layer up. |

---

### The Drive · Mar 6 · 0 nights · `researched`

**Recommended Stops**
| Priority | Item | Description |
|----------|------|-------------|
| must | Uplistsikhe Cave City | 3000yo rock-hewn town, ~15km detour near Gori. Budget 1–1.5hrs. ~7 GEL. |
| opt | Gori | Stalin Museum + train carriage + hilltop fortress. Skip if not interested. |
| must | Mtskheta — Jvari Monastery | 6th-century cliff-edge church. Views over river confluence. Free, 20min. |
| must | Mtskheta — Svetitskhoveli Cathedral | UNESCO. Kings crowned and buried here. Free, 20min. |
| must | Ananuri Fortress | Right on Military Highway, no detour. Turquoise Zhinvali Reservoir views. 20–30min. |
| rec | Zhinvali Reservoir viewpoints | Free pulloffs along the highway. |

**Route Info**
| Priority | Item | Description |
|----------|------|-------------|
| info | Distance | ~292km / 4hrs direct. With stops: 7–8hrs. Leave Kutaisi by 8am. |
| info | Road conditions | March: snow/ice possible near Gudauri. Military Highway is windy and steep. |
| info | Suggested order | Kutaisi → Uplistsikhe → Gori (lunch) → Mtskheta → Ananuri → Gudauri. |
| info | Transport options | GoTrip.ge ~$35–65/car. Georgian Bus 60 GEL. Marshrutka ~16 GEL via Didube. |
| check | Church dress code | Cover shoulders (women) + head scarf at Jvari/Svetitskhoveli. |

---

### Gudauri · Mar 6–12 · 7 nights · `not-started`

**To Research**
| Priority | Item | Description |
|----------|------|-------------|
| tbd | Ski passes & pricing | Gudauri uses points-based system, not day passes. |
| tbd | Equipment rental | Skis, boots, helmets. On-piste vs off-piste options. |
| tbd | Accommodation | Ski-in/ski-out vs village options. |
| tbd | Restaurants & après-ski | |
| tbd | Off-piste / freeride | Zones and guide options. |
| tbd | Snow conditions | Early-mid March historically good but variable. |
| tbd | Kazbegi day trip | ~30min from Gudauri, Gergeti Trinity Church. |
| tbd | Transport to Tbilisi | Gudauri → Tbilisi on Mar 12. |

---

### Tbilisi · Mar 12–15 · 3 nights · `not-started`

**Climbing & Gear**
| Priority | Item | Description |
|----------|------|-------------|
| must | OUTDOORS.GE | 4.8/275 reviews. Kazbegi Ave. Top pick for climbing shoes. |
| rec | MPlus | 4.7/180 reviews. Salewa brand. Premium but quality. |
| opt | DV Sport | La Sportiva dealer. |
| opt | Vake Climbing Gym | Speed/sport focus. Cheaper. BYO shoes. |
| check | Magelani | Has gear but reported 3x EU retail pricing. |
| info | @tbilisiclimbingshop | Instagram. DM about stock. |
| rec | S.K.Lucky Gym | Biggest climbing gym in Caucasus. 40 GEL/day. 9–23h. |

**Ski Gear (Budget)**
| Priority | Item | Description |
|----------|------|-------------|
| rec | Freestyler | Cheap used slope skis, rentals, helmets. |
| rec | Xtreme | Biggest shop, boot molding system. |
| rec | Dinamo Stadium area | Search "Snowy Mountains" on Maps. |
| opt | Facebook groups | Used gear from individuals. Watch for fraud. |

**Parks & Nature**
| Priority | Item | Description |
|----------|------|-------------|
| must | National Botanical Garden | 4 GEL. Narikala Fortress base. Waterfalls, trails. 9am–6:30pm. |
| rec | Mtatsminda Park | 770m. Funicular, panoramic views, amusement park. |
| rec | Mziuri Park | Vake district. Literary character sculptures, duck lake. |
| rec | Leghvtakhevi Waterfall | Hidden gorge waterfall in Old Town near sulfur baths. |
| opt | Dedaena Park | Near Dry Bridge flea market. Evening vibes. |
| opt | Turtle Lake | 686m. Small lake with cafes. Walk to Mtatsminda. |

**To Research**
| Priority | Item | Description |
|----------|------|-------------|
| tbd | Neighborhoods | Marjanishvili, Vera, Saburtalo, Old Town. |
| tbd | Food & restaurants | |
| tbd | Nightlife & bars | |
| tbd | Day trips | Mtskheta, Kakheti wine region, David Gareja. |
| tbd | Cultural sites | Narikala, Metekhi, Sioni Cathedral, National Museum. |
| tbd | Transport from Gudauri | Marshrutka or GoTrip. |

---

## Routes

Three driving routes from Kutaisi to Gudauri (and onward to Tbilisi). See `src/data/routes.js` for full stop coordinates and link data.

| Route | Tagline | Distance | Duration |
|-------|---------|----------|----------|
| Historical | Cave cities, fortresses & UNESCO churches | ~292 km | 7–8 hrs with stops |
| Direct | Fastest path via Tbilisi bypass | ~280 km | 4.5–5 hrs |
| Scenic | Mountain passes & alpine valleys | ~330 km | 9–10 hrs with stops |

---

## Budget Presets

Pre-loaded as `estimated: true` entries:

| Destination | Category | Label | Amount (GEL) |
|-------------|----------|-------|-------------|
| drive | activities | Uplistsikhe entry | 7 |
| kutaisi | activities | Botanical Garden entry | 5 |
| kutaisi | activities | Historical Museum entry | 3 |
| kutaisi | transport | Soviet cable car | 3 |
| drive | transport | Georgian Bus (KUT→GUD) | 60 |
| tbilisi | activities | Botanical Garden entry | 4 |
| tbilisi | activities | SK Lucky gym day pass | 40 |

---

## Field Notes

Practical knowledge that surfaces as `info` and `check` items throughout the data.

### Tipping
- Restaurants: 10% service charge often pre-added (goes to kitchen). Tip additional 10% cash to waiter.
- Never toast with beer at a Georgian gathering — genuine insult. Wine and chacha only.
- Bolt/taxi: no tip needed (price fixed). Street taxis: round up.

### Dining
- Khinkali: hold from spiral top, bite small hole, sip broth first, eat everything except top knot.
- Supra rules: Tamada controls toasts. Drain full glass each time. Don't talk during toasts.
- Don't fully clean your plate at a private supra — you'll get refilled three times.

### Transit
- Marshrutkas: leave when full, cash GEL only, signs in Georgian script only.
- Key stations: Kutaisi Central (west), Tbilisi Didube (north/west), Samgori (east).
- Military Highway in March: snow/ice possible near Gudauri. Don't drive after dark.

### Common Mistakes
- DCC at ATMs: always choose GEL, never home currency (5–8% worse rate).
- Church dress: women cover shoulders + head. Men remove hats. No shorts.
- Bar scam in Tbilisi: stranger invites you to a bar → inflated bill. Stick to places you found yourself.

---

## Acceptance Criteria

### Visual (Paper validates)
- [ ] All 4 destination cards render with correct content
- [ ] Route dashboard shows 7+ stops on the map simultaneously
- [ ] Priority badges are legible at their rendered size
- [ ] Cards don't exceed 680px width at any breakpoint
- [ ] Item rows fit name + badge + description on one line at 1280px

### Functional (Playwright validates)
- [ ] Route switching redraws map markers and polyline
- [ ] Stop click in list pans map to that stop
- [ ] Destination card expand/collapse works
- [ ] Checklist state persists across reload (Phase 2)
- [ ] Budget entries persist across reload (Phase 3)
- [ ] Deep link to `/destination/kutaisi` scrolls and expands correct card (Phase 2)
