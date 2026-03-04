import { destinations } from '../../data/destinations'

export default function RouteBar() {
  const scrollTo = (id) => {
    const el = document.querySelector(`[data-dest-id="${id}"]`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <div className="route-bar">
      {destinations.map((d, i) => (
        <div
          key={d.id}
          className="route-stop"
          style={{ flex: i < destinations.length - 1 ? 1 : 'none' }}
        >
          <div
            className="route-stop-node"
            onClick={() => scrollTo(d.id)}
            style={{ '--glow-color': `${d.accentFrom}35` }}
          >
            <div
              className="route-stop-icon"
              style={{
                background: `linear-gradient(135deg, ${d.accentFrom}, ${d.accentTo})`,
                boxShadow: `0 3px 12px ${d.accentFrom}20`,
              }}
            >
              {d.emoji}
            </div>
            <span className="route-stop-nights" style={{ color: d.accentFrom }}>
              {d.nights > 0 ? `${d.nights}n` : 'day'}
            </span>
          </div>
          {i < destinations.length - 1 && (
            <div
              className="route-connector"
              style={{
                background: `linear-gradient(90deg, ${d.accentFrom}40, ${destinations[i + 1].accentFrom}40)`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
