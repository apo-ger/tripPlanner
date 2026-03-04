import { useState, useEffect } from 'react'
import { destinations } from '../../data/destinations'

export default function DayNav() {
  const [visible, setVisible] = useState(false)
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8)
    }

    const observers = []
    // Observe each destination card
    destinations.forEach((d) => {
      const el = document.querySelector(`[data-dest-id="${d.id}"]`)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(d.id)
        },
        { threshold: 0.3, rootMargin: '-20% 0px -50% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      observers.forEach((obs) => obs.disconnect())
    }
  }, [])

  const scrollTo = (id) => {
    const el = document.querySelector(`[data-dest-id="${id}"]`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <nav className={`day-nav${visible ? ' visible' : ''}`}>
      <div className="day-nav-inner">
        {destinations.map((d) => (
          <button
            key={d.id}
            className={`day-nav-tab${activeId === d.id ? ' active' : ''}`}
            onClick={() => scrollTo(d.id)}
            style={{ '--tab-color': d.accentFrom }}
          >
            <span className="day-nav-tab-dot" style={{ background: d.accentFrom }} />
            <span className="day-nav-tab-emoji">{d.emoji}</span>
            <span className="day-nav-tab-label">{d.name}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
