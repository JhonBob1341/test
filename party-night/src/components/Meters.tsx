import type { CSSProperties } from 'react'
import { CHARACTERS, GIRL_ORDER } from '../game/characters'
import type { Affection } from '../game/types'

export function Meters({ affection }: { affection: Affection }) {
  return (
    <div className="meters" aria-label="Affection meters">
      {GIRL_ORDER.map((id) => {
        const c = CHARACTERS[id]
        const value = Math.min(10, Math.max(0, affection[id]))
        return (
          <div key={id} className="meter" style={{ '--girl': c.color } as CSSProperties}>
            <div className="meter-label">
              <span>{c.name}</span>
              <span>{value}</span>
            </div>
            <div className="meter-track">
              <div className="meter-fill" style={{ width: `${value * 10}%` }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
