import { destinations } from '../../data/destinations'

export default function ProgressIndicator() {
  const researched = destinations.filter((d) => d.status === 'researched').length
  const pct = (researched / destinations.length) * 100
  return (
    <div className="progress-pill">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="progress-text">
        {researched}/{destinations.length}
      </span>
    </div>
  )
}
