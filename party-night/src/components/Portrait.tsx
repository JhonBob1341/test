import type { CSSProperties } from 'react'
import type { GirlId } from '../game/types'
import { CHARACTERS } from '../game/characters'
import mayaImg from '../assets/portraits/maya.jpg'
import rileyImg from '../assets/portraits/riley.jpg'
import jadeImg from '../assets/portraits/jade.jpg'

const PORTRAITS: Record<GirlId, string> = {
  maya: mayaImg,
  riley: rileyImg,
  jade: jadeImg,
}

type Props = {
  id: GirlId
  active?: boolean
  compact?: boolean
}

export function Portrait({ id, active = false, compact = false }: Props) {
  const c = CHARACTERS[id]
  return (
    <div
      className={`portrait ${id} ${active ? 'active' : ''} ${compact ? 'compact' : ''}`}
      style={{ '--girl': c.color, '--girl-soft': c.accent } as CSSProperties}
    >
      <div className="portrait-glow" />
      <div className="portrait-frame">
        <img src={PORTRAITS[id]} alt={`${c.name}, ${c.age}`} className="portrait-photo" />
      </div>
      <div className="portrait-meta">
        <strong>{c.name}</strong>
        <span>
          {c.age} · {c.tag}
        </span>
      </div>
    </div>
  )
}

export function PartyCast({ focus }: { focus?: GirlId | 'all' | 'none' }) {
  if (focus === 'none') return null
  return (
    <div className="cast">
      {(['maya', 'riley', 'jade'] as GirlId[]).map((id) => (
        <Portrait
          key={id}
          id={id}
          active={focus === 'all' || focus === id}
          compact={focus !== 'all' && focus !== id}
        />
      ))}
    </div>
  )
}
