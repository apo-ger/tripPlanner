// ABOUTME: Renders trip chapters (Kutaisi, Gudauri, Tbilisi) below the sticky map.
// ABOUTME: Map updates are driven by nav bar clicks and card expansion, not scroll.

import { chapters } from '../../data/destinations'
import DestCard from '../ui/DestCard'

export default function DestinationSection() {
  return (
    <div className="trip-chapters">
      {chapters.map((ch) => (
        <div key={ch.id} className="chapter-wrapper" data-chapter-id={ch.id}>
          <DestCard dest={ch} />
        </div>
      ))}
    </div>
  )
}
