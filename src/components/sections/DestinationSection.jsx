// ABOUTME: Renders all destination deep-dive cards below the dashboard.
// ABOUTME: Editorial layout with heading and GSAP scroll animations on each card.

import { destinations } from '../../data/destinations'
import DestCard from '../ui/DestCard'

export default function DestinationSection() {
  return (
    <section className="section-container" data-section="destinations">
      <div className="destinations-stack">
        <div>
          <h2 className="destinations-heading">Destinations</h2>
          <p className="destinations-subheading">
            Deep-dive into each stop — sights, food, gear, and practical tips.
          </p>
        </div>
        {destinations.map((d) => (
          <DestCard key={d.id} dest={d} />
        ))}
      </div>
    </section>
  )
}
