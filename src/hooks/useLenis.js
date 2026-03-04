// ABOUTME: Initializes Lenis smooth scrolling and syncs it with GSAP's ticker.
// ABOUTME: Pipes scroll progress and velocity into the Zustand scroll store.

import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { useScrollStore } from '../stores/useScrollStore'

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis()

    const setScroll = useScrollStore.getState().setScroll

    lenis.on('scroll', ({ progress, velocity }) => {
      setScroll(progress, velocity)
    })

    function raf(time) {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])
}
