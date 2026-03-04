// ABOUTME: Compact editorial masthead with Georgian flag, title, and trip metadata.
// ABOUTME: Horizontal layout on desktop (flag left, text right), stacked on mobile.

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import GeorgianFlag from '../three/GeorgianFlag'

export default function HeroSection() {
  const sectionRef = useRef(null)
  const flagRef = useRef(null)
  const labelRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const metaRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(flagRef.current, { opacity: 0, scale: 0.9, duration: 0.8 }, 0.1)
        .from(labelRef.current, { opacity: 0, y: 15, duration: 0.7 }, 0.3)
        .from(titleRef.current, { opacity: 0, y: 30, duration: 0.9 }, 0.5)
        .from(subtitleRef.current, { opacity: 0, y: 15, duration: 0.7 }, 0.7)
        .from(metaRef.current, { opacity: 0, y: 15, duration: 0.7 }, 0.9)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="hero-section" data-section="hero">
      <div ref={flagRef} className="hero-flag-wrap">
        <GeorgianFlag />
      </div>

      <div className="hero-text">
        <div ref={labelRef} className="hero-label">
          Trip Planner
        </div>

        <h1 ref={titleRef} className="hero-title">
          Georgia
        </h1>

        <p ref={subtitleRef} className="hero-subtitle">
          საქართველო
        </p>

        <p ref={metaRef} className="hero-meta">
          Mar 5–15, 2026 · 10 nights · 4 stops
        </p>
      </div>
    </section>
  )
}
