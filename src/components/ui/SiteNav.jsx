// ABOUTME: Sticky top navigation bar with chapter jump links.
// ABOUTME: Highlights the active chapter based on scroll position.

import { chapters } from '../../data/destinations'
import { useScrollStore } from '../../stores/useScrollStore'

export default function SiteNav() {
  const activeChapter = useScrollStore((s) => s.activeChapter)
  const setActiveChapter = useScrollStore((s) => s.setActiveChapter)
  const setNavScrolling = useScrollStore((s) => s.setNavScrolling)

  const scrollToChapter = (id) => {
    setActiveChapter(id)
    setNavScrolling(true)
    const el = document.querySelector(`[data-chapter-id="${id}"]`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    // Re-enable observer after scroll settles
    setTimeout(() => setNavScrolling(false), 1200)
  }

  return (
    <nav className="site-nav">
      <div className="site-nav-chapters">
        {chapters.map((ch) => (
          <button
            key={ch.id}
            className={`site-nav-chapter-link${activeChapter === ch.id ? ' active' : ''}`}
            onClick={() => scrollToChapter(ch.id)}
          >
            <span
              className="site-nav-chapter-dot"
              style={{ background: ch.accentFrom }}
            />
            {ch.name}
          </button>
        ))}
      </div>
    </nav>
  )
}
