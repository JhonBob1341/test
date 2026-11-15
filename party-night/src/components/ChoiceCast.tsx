import { useId, useState, type CSSProperties } from 'react'
import { CHARACTERS, GIRL_ORDER } from '../game/characters'
import { hasSkills, skillReqLabel, type Skills } from '../game/skills'
import type { Choice, GirlId } from '../game/types'
import { Portrait } from './Portrait'

type Props = {
  focus?: GirlId | 'all' | 'none'
  groups: Record<GirlId, Choice[]>
  house: Choice[]
  skills: Skills
  onPick: (choice: Choice) => void
  /** When scene art replaces the cast, still show compact portraits above dropdowns */
  compact?: boolean
}

function ChoiceSelect({
  girl,
  choices,
  skills,
  onPick,
}: {
  girl: GirlId
  choices: Choice[]
  skills: Skills
  onPick: (choice: Choice) => void
}) {
  const id = useId()
  const [value, setValue] = useState('')
  const c = CHARACTERS[girl]

  if (!choices.length) {
    return (
      <div className="choice-select is-empty" style={{ '--girl': c.color } as CSSProperties}>
        <span className="choice-select-label">No moves</span>
      </div>
    )
  }

  return (
    <label className="choice-select" style={{ '--girl': c.color } as CSSProperties} htmlFor={id}>
      <span className="choice-select-label">{c.name}</span>
      <select
        id={id}
        className="choice-dropdown"
        value={value}
        onChange={(e) => {
          const idx = Number(e.target.value)
          setValue('')
          const choice = choices[idx]
          if (!choice) return
          if (choice.need && !hasSkills(skills, choice.need)) return
          onPick(choice)
        }}
      >
        <option value="">Choose an action…</option>
        {choices.map((choice, idx) => {
          const locked = Boolean(choice.need && !hasSkills(skills, choice.need))
          const req = skillReqLabel(choice.need)
          const label = locked && req ? `${choice.text} · need ${req}` : req ? `${choice.text} · ${req}` : choice.text
          return (
            <option key={`${choice.next}-${choice.text}`} value={String(idx)} disabled={locked}>
              {label}
            </option>
          )
        })}
      </select>
    </label>
  )
}

export function ChoiceCast({ focus = 'all', groups, house, skills, onPick, compact = false }: Props) {
  const showPortraits = focus !== 'none'
  const visibleGirls = GIRL_ORDER.filter((id) => {
    if (groups[id].length > 0) return true
    if (focus === 'all') return true
    if (focus === id) return true
    return false
  })
  const colClass =
    visibleGirls.length === 1 ? 'cols-1' : visibleGirls.length === 2 ? 'cols-2' : 'cols-3'

  return (
    <div className={`choice-cast ${compact ? 'is-compact' : ''}`}>
      {visibleGirls.length > 0 && (
        <div className={`cast choice-cast-grid ${colClass} ${showPortraits ? '' : 'choice-cast-grid-only'}`}>
          {visibleGirls.map((id) => (
            <div key={id} className="choice-cast-col">
              {showPortraits && (
                <Portrait
                  id={id}
                  active={focus === 'all' || focus === id}
                  compact={focus !== 'all' && focus !== id}
                />
              )}
              <ChoiceSelect girl={id} choices={groups[id]} skills={skills} onPick={onPick} />
            </div>
          ))}
        </div>
      )}

      {house.length > 0 && (
        <div className="choice-house">
          {house.map((choice) => {
            const locked = Boolean(choice.need && !hasSkills(skills, choice.need))
            const req = skillReqLabel(choice.need)
            return (
              <button
                key={choice.text + choice.next}
                type="button"
                className={`choice ${locked ? 'locked' : ''}`}
                disabled={locked}
                onClick={() => onPick(choice)}
              >
                <span>{choice.text}</span>
                {req && <span className="choice-req">{locked ? `Need ${req}` : req}</span>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
