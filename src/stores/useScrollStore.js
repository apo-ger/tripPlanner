// ABOUTME: Zustand store for scroll state, mouse position, and active driving route.
// ABOUTME: Consumed by grain overlay, navigation, and dashboard components.

import { create } from 'zustand'

export const useScrollStore = create((set) => ({
  scrollProgress: 0,
  scrollVelocity: 0,
  activeSection: 'hero',
  mouseX: 0,
  mouseY: 0,
  activeRouteId: 'historical',
  setScroll: (progress, velocity) => set({ scrollProgress: progress, scrollVelocity: velocity }),
  setActiveSection: (section) => set({ activeSection: section }),
  setMouse: (x, y) => set({ mouseX: x, mouseY: y }),
  setActiveRoute: (routeId) => set({ activeRouteId: routeId }),
}))
