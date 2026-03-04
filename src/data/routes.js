// ABOUTME: Single driving route from Kutaisi to Gudauri via the direct path.
// ABOUTME: Includes Surami Pass and key stops along the Georgian Military Highway.

export const route = {
  tagline: 'Kutaisi → Gudauri via Georgian Military Highway',
  duration: '5–6 hrs with stops',
  distance: '~290 km',
  stops: [
    {
      name: 'Kutaisi',
      lat: 42.2679,
      lng: 42.6946,
      type: 'destination',
      duration: 'Overnight',
      description: 'Ancient Colchis — Imeretian culture, Green Bazaar, Bagrati Cathedral.',
      links: [
        { label: 'Wikitravel', url: 'https://wikitravel.org/en/Kutaisi' },
      ],
    },
    {
      name: 'Surami Pass',
      lat: 42.0117,
      lng: 43.5531,
      type: 'stop',
      duration: 'Drive-through',
      description: 'Historic mountain pass dividing eastern and western Georgia. Elevation ~949m. Marks the transition between Colchis lowlands and the eastern plateau.',
      links: [],
    },
    {
      name: 'Khashuri',
      lat: 41.9843,
      lng: 43.5987,
      type: 'stop',
      duration: '15 min fuel stop',
      description: 'Junction town on the E60 highway. Good place to refuel and grab a coffee.',
      links: [],
    },
    {
      name: 'Tbilisi Bypass',
      lat: 41.7800,
      lng: 44.6500,
      type: 'stop',
      duration: 'Drive-through',
      description: 'Skirt south of the capital via the ring road. Saves 30+ min vs city center.',
      links: [],
    },
    {
      name: 'Ananuri Fortress',
      lat: 42.1647,
      lng: 44.7022,
      type: 'stop',
      duration: '20–30 min',
      description: '17th-century fortress with two churches overlooking turquoise Zhinvali Reservoir. Directly on Military Highway.',
      links: [
        { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Ananuri' },
      ],
    },
    {
      name: 'Gudauri',
      lat: 42.4571,
      lng: 44.4736,
      type: 'destination',
      duration: '7 nights',
      description: 'Ski resort in the Greater Caucasus at 2,200m.',
      links: [
        { label: 'Gudauri.info', url: 'https://gudauri.info/' },
      ],
    },
    {
      name: 'Tbilisi',
      lat: 41.7151,
      lng: 44.8271,
      type: 'destination',
      duration: '3 nights',
      description: 'Capital city — sulphur baths, climbing gyms, nightlife.',
      links: [
        { label: 'Wikitravel', url: 'https://wikitravel.org/en/Tbilisi' },
      ],
    },
  ],
}
