import { useState } from 'react'
import Item from './Item'

export default function Section({ section, accent }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="card-section">
      <button className="card-section-header" onClick={() => setOpen(!open)}>
        <span className="card-section-icon">{section.icon}</span>
        <span className="card-section-title" style={{ color: accent }}>
          {section.title}
        </span>
        <span className="card-section-count">{section.items.length}</span>
        <span className={`card-section-chevron${open ? '' : ' collapsed'}`}>▾</span>
      </button>
      {open && (
        <div className="card-section-items">
          {section.items.map((it, i) => (
            <Item key={i} item={it} />
          ))}
        </div>
      )}
    </div>
  )
}
