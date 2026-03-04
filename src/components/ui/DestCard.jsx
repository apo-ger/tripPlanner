// ABOUTME: Expandable card for a trip destination with header, status, and collapsible sections.
// ABOUTME: Completion bar tracks research progress based on non-TBD items.

import { useState, useMemo } from 'react'
import { statusLabels } from '../../data/config'
import Section from './Section'
import { useFadeIn } from '../../hooks/useScrollTrigger'

export default function DestCard({ dest }) {
  const [expanded, setExpanded] = useState(dest.status === 'researched')
  const st = statusLabels[dest.status]
  const grad = `linear-gradient(135deg, ${dest.accentFrom}, ${dest.accentTo})`

  // Completion percentage
  const completion = useMemo(() => {
    const allItems = dest.sections.flatMap((s) => s.items)
    if (allItems.length === 0) return 0
    const done = allItems.filter((i) => i.p !== 'tbd').length
    return Math.round((done / allItems.length) * 100)
  }, [dest])

  const ref = useFadeIn({ y: 40, duration: 0.8 })

  return (
    <div
      ref={ref}
      className={`dest-card${expanded ? ' expanded' : ''}`}
      data-dest-id={dest.id}
      style={{
        '--card-accent': `${dest.accentFrom}20`,
        '--card-glow': `${dest.accentFrom}08`,
      }}
    >
      <div className="dest-card-strip" style={{ background: grad }} />
      <button className="dest-card-header" onClick={() => setExpanded(!expanded)}>
        <div
          className="dest-card-icon"
          style={{ background: grad, boxShadow: `0 4px 12px ${dest.accentFrom}25` }}
        >
          {dest.emoji}
        </div>
        <div className="dest-card-info">
          <div className="dest-card-title-row">
            <span className="dest-card-title">{dest.name}</span>
            <span className="dest-card-status" style={{ color: st.color }}>
              <span className="dest-card-status-dot" style={{ background: st.color }} />
              {st.label}
            </span>
          </div>
          <div className="dest-card-sub">
            {dest.sub} · {dest.dates}
            {dest.nights > 0 ? ` · ${dest.nights}n` : ''}
          </div>
        </div>
        <div className="dest-card-right">
          <div className="dest-card-completion">
            <div
              className="dest-card-completion-fill"
              style={{
                width: `${completion}%`,
                background: completion === 100
                  ? `var(--status-done)`
                  : `linear-gradient(90deg, ${dest.accentFrom}, ${dest.accentFrom}80)`,
              }}
            />
          </div>
          <span className={`dest-card-chevron${expanded ? '' : ' collapsed'}`}>▾</span>
        </div>
      </button>
      {expanded && (
        <div className="dest-card-body" style={{ '--card-accent': dest.accentFrom }}>
          {dest.sections.map((s, i) => (
            <Section key={i} section={s} accent={dest.accentFrom} />
          ))}
        </div>
      )}
    </div>
  )
}
