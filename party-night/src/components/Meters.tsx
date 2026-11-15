import type { CSSProperties } from 'react'
import { CHARACTERS, GIRL_ORDER } from '../game/characters'
import { GIRL_KINKS, kinkUnlocked } from '../game/kinks'
import type { Affection, Flags } from '../game/types'

export function Meters({ affection, flags }: { affection: Affection; flags: Flags }) {
  return (
    <div className="meters" aria-label="Affection meters">
      {GIRL_ORDER.map((id) => {
        const c = CHARACTERS[id]
        const value = Math.min(10, Math.max(0, affection[id]))
        const kinks = GIRL_KINKS[id]
        return (
          <div key={id} className="meter" style={{ '--girl': c.color } as CSSProperties}>
            <div className="meter-label">
              <span>{c.name}</span>
              <span>{value}</span>
            </div>
            <div className="meter-track">
              <div className="meter-fill" style={{ width: `${value * 10}%` }} />
            </div>
            <div className="meter-kinks" aria-label={`${c.name} kinks`}>
              {kinks.map((kink) => {
                const on = kinkUnlocked(flags, kink.flag)
                return (
                  <span
                    key={kink.id}
                    className={`meter-kink ${on ? 'is-on' : 'is-off'}`}
                    title={on ? `${kink.label} unlocked` : `${kink.label} locked`}
                  >
                    {kink.label}
                  </span>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
