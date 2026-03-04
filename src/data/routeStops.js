import { colors } from './config'

const { accent } = colors

export const routeStops = [
  { name: 'Kutaisi', lat: 42.2679, lng: 42.6946, type: 'destination', color: accent.kutaisi.from },
  {
    name: 'Uplistsikhe Cave City', lat: 41.9671, lng: 44.2094, type: 'stop', color: accent.drive.from,
    note: '3000-year-old rock-hewn town. 20,000 people at peak. Theatre, pharmacy, pagan temples. Budget 1-1.5hrs.',
  },
  {
    name: 'Gori (Stalin Museum + Fortress)', lat: 41.9867, lng: 44.1135, type: 'stop', color: accent.drive.from,
    note: "Stalin's birthplace. Museum + hilltop fortress with views. Optional — skip if not interested.",
  },
  {
    name: 'Mtskheta (Jvari + Svetitskhoveli)', lat: 41.8427, lng: 44.7206, type: 'stop', color: accent.drive.from,
    note: 'UNESCO. Where Christianity became state religion in 337 AD. Two churches, river confluence views. 45min.',
  },
  {
    name: 'Ananuri Fortress', lat: 42.1647, lng: 44.7022, type: 'stop', color: accent.drive.from,
    note: 'Directly on Military Highway. Two churches overlooking turquoise Zhinvali Reservoir. 20-30min.',
  },
  { name: 'Gudauri', lat: 42.4571, lng: 44.4736, type: 'destination', color: accent.gudauri.from },
  { name: 'Tbilisi', lat: 41.7151, lng: 44.8271, type: 'destination', color: accent.tbilisi.from },
]
