// ABOUTME: Sticky top navigation bar with destination jump links.
// ABOUTME: Destination links scroll to corresponding card sections.

import { useState, useEffect } from 'react'
import { destinations } from '../../data/destinations'

export default function SiteNav() {
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
