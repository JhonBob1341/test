import type { CSSProperties } from 'react'
import { SKILL_META, SKILL_ORDER, type Skills } from '../game/skills'

export function SkillsPanel({ skills }: { skills: Skills }) {
  return (
    <div className="skills" aria-label="Skills">
      {SKILL_ORDER.map((id) => {
        const meta = SKILL_META[id]
        const value = skills[id]
        return (
          <div key={id} className="skill" style={{ '--skill': meta.color } as CSSProperties} title={meta.blurb}>
            <div className="skill-label">
              <span>{meta.short}</span>
              <span>{value}</span>
            </div>
            <div className="skill-track">
              <div className="skill-fill" style={{ width: `${value * 10}%` }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
