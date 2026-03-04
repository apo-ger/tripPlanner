import { priorityConfig } from '../../data/config'

export default function Badge({ p }) {
  const cfg = priorityConfig[p]
  if (!cfg) return null
  return (
    <span className="badge" style={{ background: cfg.bg, color: cfg.color }}>
      {cfg.label}
    </span>
  )
}
