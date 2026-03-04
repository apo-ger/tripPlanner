import { colors } from './config'

const { accent } = colors

export const destinations = [
  {
    id: 'kutaisi',
    name: 'Kutaisi',
    sub: 'Ancient Colchis · Imeretian Culture',
    dates: 'Mar 5',
    nights: 1,
    emoji: '🏛️',
    accentFrom: accent.kutaisi.from,
    accentTo: accent.kutaisi.to,
    status: 'researched',
    sections: [
      {
        title: 'Culture & Sights', icon: '🗿', items: [
          { n: 'Colchis Fountain & Central Square', d: 'Tribute to ancient Colchian civilization. Popular local meeting point — start here.', p: 'must' },
          { n: 'Green Bazaar', d: 'Covered market: produce, spices, cheese, churchkhela, honey. Tastings offered. Try Laghidze Water (tarragon or chocolate) — invented here in 1887.', p: 'must' },
          { n: 'Bagrati Cathedral', d: '11th-century on Ukimerioni Hill. Panoramic views. Free, open daily.', p: 'must' },
          { n: 'White Bridge & Soviet Cable Car', d: 'Bridge over Rioni with glass floor. Cable car retains Soviet feel — 3 GEL cash.', p: 'rec' },
          { n: 'Gelati Monastery (UNESCO)', d: '⚠️ Sunday-only as of summer 2025 (renovations). Mar 5 = Thursday — check status!', p: 'check' },
          { n: 'Historical Museum', d: '19th-c bank building. Prehistory to WWII, Colchian gold. ~3 GEL.', p: 'rec' },
          { n: 'Drama Theatre', d: "One of Georgia's top theatres. 10–30 GEL. Check schedule.", p: 'opt' },
        ],
      },
      {
        title: 'Food & Drink', icon: '🍷', items: [
          { n: 'Imeretian Cuisine Tips', d: 'Less red meat, more veg & herbs than east. Must-try: pkhali, Imeretian khachapuri, clay-pot mushrooms, lobiani.', p: 'info' },
          { n: 'Magnolia', d: 'On the Rioni. Buffalo khinkali, cheesy lobiani. Enclosed balcony with river views.', p: 'must' },
          { n: 'Sisters', d: 'Pink building, vintage décor. Folk music evenings — great for a supra feast.', p: 'rec' },
          { n: 'Baraqa', d: 'Central, near fountain. Good khinkali, excellent eggplant w/ walnuts.', p: 'rec' },
          { n: 'Hacker-Pschorr', d: 'German-themed, Georgian food. Locals rate the khinkali. Open 24hrs.', p: 'opt' },
        ],
      },
      {
        title: 'Parks & Nature', icon: '🌿', items: [
          { n: 'Botanical Garden', d: 'Right bank of Rioni, 1km from center. 700+ species, subtropical. Highlight: chapel inside 400-year-old oak tree (fits 3 people). 5 GEL entry. Charming, not fancy.', p: 'rec' },
          { n: 'Central City Park', d: "Old 'Boulevard' in center. Morning walk spot, not a destination in itself.", p: 'opt' },
        ],
      },
      {
        title: 'Gear & Shopping', icon: '🛍️', items: [
          { n: 'Ecolo (Second-hand)', d: '⭐ 5.0 · 123 reviews. Old villa + bar in yard. Boots ~90 GEL, jackets ~40 GEL. Likely ski pants. Closed Mon, opens noon.', p: 'must' },
          { n: 'Megahand', d: '⭐ 4.9 · 254 reviews. Big, organized. Huge selection, very cheap on sale days. 9am–9pm daily.', p: 'rec' },
          { n: 'Humana', d: 'Chain, smaller. Maps pin may be off — reportedly next to OnePrice, ~100m from shown.', p: 'opt' },
        ],
      },
      {
        title: 'Practical', icon: '💡', items: [
          { n: 'ATMs', d: 'BasisBank = no fees, 2000 GEL max. Avoid Liberty (20 GEL!) & BoG (3 GEL). Decline DCC → choose GEL.', p: 'must' },
          { n: 'Revolut', d: 'Works fine. Free within plan limits (Std: £200/mo or 5 withdrawals). Cards widely accepted.', p: 'info' },
          { n: 'Transport', d: 'Download Bolt. Center is walkable.', p: 'info' },
          { n: 'Weather', d: 'Early March = cold. Layer up.', p: 'info' },
        ],
      },
    ],
  },
  {
    id: 'route-day',
    name: 'The Drive',
    sub: 'Kutaisi → Gudauri · Georgian Military Highway',
    dates: 'Mar 6',
    nights: 0,
    emoji: '🚗',
    accentFrom: accent.drive.from,
    accentTo: accent.drive.to,
    status: 'researched',
    sections: [
      {
        title: 'Recommended Stops', icon: '📍', items: [
          { n: 'Uplistsikhe Cave City', d: '3000-year-old rock-hewn town. ~15km detour off main road near Gori. At peak: 20,000 inhabitants, theatre, pharmacy, pagan temples carved into rock above Mtkvari River. Budget 1–1.5 hours. Entry ~7 GEL.', p: 'must' },
          { n: 'Gori', d: "Stalin's birthplace. Museum with personal items + his train carriage. Gori Fortress on hilltop with views. Interest-dependent — skip if not your thing.", p: 'opt' },
          { n: 'Mtskheta — Jvari Monastery', d: "6th-century on cliff edge. Panoramic views over confluence of Mtkvari and Aragvi rivers. One of the earliest cross-in-square churches in Georgia. Free, 20min.", p: 'must' },
          { n: 'Mtskheta — Svetitskhoveli Cathedral', d: "11th-century, spiritual heart of Georgia. Where kings were crowned and buried. Christ's robe allegedly buried beneath. UNESCO. Free, 20min.", p: 'must' },
          { n: 'Ananuri Fortress', d: 'Directly on Georgian Military Highway — no detour needed. 17th-century fortress with two churches overlooking turquoise Zhinvali Reservoir. Stunning photo stop. 20-30min.', p: 'must' },
          { n: 'Zhinvali Reservoir viewpoints', d: 'Multiple pulloffs along Military Highway. Turquoise water against mountains. Free, just stop the car.', p: 'rec' },
        ],
      },
      {
        title: 'Route Info', icon: 'ℹ️', items: [
          { n: 'Total distance', d: '~292km / 4hrs direct. With stops: plan 7-8 hours.', p: 'info' },
          { n: 'Road condition', d: 'Main highway is good. Georgian Military Highway section is mountain road — scenic but windy. In March, may have snow/ice on higher sections near Gudauri.', p: 'info' },
          { n: 'Suggested order', d: 'Kutaisi → Uplistsikhe → lunch in Gori → Mtskheta (Jvari + Svetitskhoveli) → Ananuri → Gudauri.', p: 'info' },
          { n: 'Transport options', d: 'GoTrip.ge for flexible private driver (~$35-65 per car). Georgian Bus runs Kutaisi Airport → Gudauri in winter (60 GEL one-way, ~6hrs). Marshrutka via Tbilisi Didube (~16 GEL, 6.5hrs, no stops).', p: 'info' },
        ],
      },
    ],
  },
  {
    id: 'gudauri',
    name: 'Gudauri',
    sub: 'Ski Resort · Greater Caucasus',
    dates: 'Mar 6–12',
    nights: 7,
    emoji: '⛷️',
    accentFrom: accent.gudauri.from,
    accentTo: accent.gudauri.to,
    status: 'not-started',
    sections: [
      {
        title: 'To Research', icon: '📋', items: [
          { n: 'Ski passes & pricing', d: '', p: 'tbd' },
          { n: 'Equipment rental', d: '', p: 'tbd' },
          { n: 'Accommodation', d: '', p: 'tbd' },
          { n: 'Restaurants & après-ski', d: '', p: 'tbd' },
          { n: 'Transport from Kutaisi', d: '', p: 'tbd' },
          { n: 'Off-piste / freeride options', d: '', p: 'tbd' },
        ],
      },
    ],
  },
  {
    id: 'tbilisi',
    name: 'Tbilisi',
    sub: 'Capital · Sulphur Baths · Nightlife',
    dates: 'Mar 12–15',
    nights: 3,
    emoji: '🌆',
    accentFrom: accent.tbilisi.from,
    accentTo: accent.tbilisi.to,
    status: 'not-started',
    sections: [
      {
        title: 'Climbing & Gear', icon: '🧗', items: [
          { n: 'S.K.Lucky Gym', d: 'Biggest in Caucasus. Boulder/top-rope/lead + Kilter board. 40 GEL/day, 230 GEL/mo. 9–23h. Shoes included but worn — bring own.', p: 'rec' },
          { n: 'Vake Climbing Gym', d: 'Chavchavadze Ave 49. Speed & sport. Cheaper. Harnesses provided, BYO shoes. Boulder section removed.', p: 'opt' },
          { n: 'OUTDOORS.GE', d: '⭐ 4.8 · 275 reviews. Kazbegi Ave. Amazing staff, good brands, fair prices. Top pick for climbing shoes.', p: 'must' },
          { n: 'MPlus', d: '⭐ 4.7 · 180 reviews. Vaja Pshavela 25. Salewa brand. Premium but quality. Also rents gear.', p: 'rec' },
          { n: 'DV Sport', d: 'La Sportiva dealer. Check for specific models.', p: 'opt' },
          { n: 'Magelani', d: 'Has gear but reported inflated prices (up to 3× EU retail). Compare first.', p: 'check' },
          { n: '@tbilisiclimbingshop', d: 'Instagram — DM about stock & prices.', p: 'info' },
        ],
      },
      {
        title: 'Ski Gear (Budget)', icon: '🎿', items: [
          { n: 'Freestyler', d: 'Cheap used skis, rentals, helmets.', p: 'rec' },
          { n: 'Xtreme', d: 'Biggest shop, basic gear, cheap. Boot molding available.', p: 'rec' },
          { n: 'Dinamo Stadium area', d: "Search 'Snowy Mountains' on Maps. Multiple affordable shops clustered.", p: 'rec' },
          { n: 'Facebook groups', d: 'Used gear from individuals. Gems possible, watch for fraud.', p: 'opt' },
        ],
      },
      {
        title: 'Parks & Nature', icon: '🌿', items: [
          { n: 'National Botanical Garden', d: 'Historic center, base of Narikala Fortress. 3500+ species, waterfalls, bridges, trails. Walk down to Sulfur Baths. ~4 GEL. Connects into Old Town loop.', p: 'must' },
          { n: 'Mtatsminda Park', d: 'Highest point in Tbilisi (770m). Restored 1905 funicular ride up. Panoramic views, amusement park, Ferris wheel. National Pantheon midway.', p: 'rec' },
          { n: 'Mziuri Park', d: 'Vake district. Multi-layered with quirky Georgian literary character sculptures, duck lake, skate park, amphitheater. Great locals\' hangout.', p: 'rec' },
          { n: 'Dedaena Park', d: 'Near Dry Bridge flea market. Fountains, skate park, live music evenings, food markets. Good vibes.', p: 'opt' },
          { n: 'Turtle Lake', d: 'Above Vake Park. Small lake with cafes. Can walk from here to Mtatsminda Park — great views whole way.', p: 'opt' },
          { n: 'Leghvtakhevi Waterfall', d: 'Hidden waterfall in Old Town near sulfur baths. Short walk through a gorge in the city center.', p: 'rec' },
        ],
      },
      {
        title: 'To Research', icon: '📋', items: [
          { n: 'Neighborhoods', d: '', p: 'tbd' },
          { n: 'Food & restaurants', d: '', p: 'tbd' },
          { n: 'Nightlife & bars', d: '', p: 'tbd' },
          { n: 'Day trips', d: '', p: 'tbd' },
          { n: 'Cultural sites', d: '', p: 'tbd' },
          { n: 'Transport from Gudauri', d: '', p: 'tbd' },
        ],
      },
    ],
  },
]
