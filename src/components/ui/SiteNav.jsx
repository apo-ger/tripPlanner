// ABOUTME: Sticky top navigation bar with route selector tabs and destination jump links.
// ABOUTME: Route tabs switch the active driving route; destination links scroll to card sections.

import { useState, useEffect } from 'react'
import { routes } from '../../data/routes'
import { destinations } from '../../data/destinations'
import { useScrollStore } from '../../stores/useScrollStore'

export default function SiteNav() {
  const activeRouteId = useScrollStore((s) => s.activeRouteId)
  const setActiveRoute = useScrollStore((s) => s.setActiveRoute)
  const [activeDestId, setActiveDestId] = useState(null)

  useEffect(() => {
    const observers = []
    destinations.forEach((d) => {
      const el = document.querySelector(`[data-dest-id="${d.id}"]`)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveDestId(d.id)
        },
        { threshold: 0.3, rootMargin: '-20% 0px -50% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  const scrollToDest = (id) => {
    const el = document.querySelector(`[data-dest-id="${id}"]`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <nav className="site-nav">
      <div className="site-nav-routes">
        {routes.map((r) => (
          <button
            key={r.id}
            className={`site-nav-route-tab${activeRouteId === r.id ? ' active' : ''}`}
            onClick={() => setActiveRoute(r.id)}
          >
            {r.name}
          </button>
        ))}
      </div>

      <div className="site-nav-destinations">
        {destinations.map((d) => (
          <button
            key={d.id}
            className={`site-nav-dest-link${activeDestId === d.id ? ' active' : ''}`}
            onClick={() => scrollToDest(d.id)}
          >
            <span
              className="site-nav-dest-dot"
              style={{ background: d.accentFrom }}
            />
            {d.name}
          </button>
        ))}
      </div>
    </nav>
  )
}
