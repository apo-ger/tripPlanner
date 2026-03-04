import Badge from './Badge'

export default function Item({ item }) {
  const cls = `item${item.p === 'must' ? ' priority-must' : item.p === 'check' ? ' priority-check' : ''}`
  return (
    <div className={cls}>
      <div className="item-header">
        <span className="item-name">{item.n}</span>
        <Badge p={item.p} />
      </div>
      {item.d && <p className="item-desc">{item.d}</p>}
    </div>
  )
}
