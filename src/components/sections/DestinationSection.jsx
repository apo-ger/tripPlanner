// ABOUTME: Renders trip chapters (Kutaisi, Gudauri, Tbilisi) that scroll below the sticky map.
// ABOUTME: IntersectionObserver detects the active chapter and updates the store.

import { useEffect } from 'react'
import { chapters } from '../../data/destinations'
import { useScrollStore } from '../../stores/useScrollStore'
import DestCard from '../ui/DestCard'

export default function DestinationSection() {
  const setActiveChapter = useScrollStore((s) => s.setActiveChapter)

  useEffect(() => {
    const observers = []
    chapters.forEach((ch) => {
      const el = document.querySelector(`[data-chapter-id="${ch.id}"]`)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          // Skip during nav-triggered scrolls to avoid fighting with flyTo
          if (useScrollStore.getState().navScrolling) return
          if (entry.isIntersecting) setActiveChapter(ch.id)
        },
        { threshold: 0.3, rootMargin: '-20% 0px -50% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((obs) => obs.disconnect())
  }, [setActiveChapter])

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
