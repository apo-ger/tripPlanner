// ABOUTME: Zustand store for scroll state, mouse position, and active trip chapter.
// ABOUTME: Consumed by grain overlay, navigation, map, and chapter components.

import { create } from 'zustand'

export const useScrollStore = create((set) => ({
  scrollProgress: 0,
  scrollVelocity: 0,
  activeSection: 'hero',
  mouseX: 0,
  mouseY: 0,
  activeChapter: 'kutaisi',
  activeStopName: null,
  navScrolling: false,
  setScroll: (progress, velocity) => set({ scrollProgress: progress, scrollVelocity: velocity }),
  setActiveSection: (section) => set({ activeSection: section }),
  setMouse: (x, y) => set({ mouseX: x, mouseY: y }),
  setActiveChapter: (chapterId) => set({ activeChapter: chapterId }),
  setActiveStop: (stopName) => set({ activeStopName: stopName }),
  setNavScrolling: (v) => set({ navScrolling: v }),
}))
