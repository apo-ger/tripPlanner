// ABOUTME: GSAP ScrollTrigger wrappers for scroll-driven entrance animations.
// ABOUTME: Provides useFadeIn for fade-and-slide-up reveals on scroll.

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useFadeIn({ y = 40, duration = 0.8 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    gsap.set(el, { opacity: 0, y })

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(el, { opacity: 1, y: 0, duration, ease: 'power2.out' })
      },
    })

    return () => trigger.kill()
  }, [y, duration])

  return ref
}
