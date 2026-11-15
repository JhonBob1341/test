import { useEffect, useId, useRef, useState, type CSSProperties } from 'react'
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
  const panelId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const c = CHARACTERS[girl]
  const available = choices.filter((choice) => !(choice.need && !hasSkills(skills, choice.need) && !choice.softLock))
  const countLabel = `${available.length} action${available.length === 1 ? '' : 's'}`

  useEffect(() => {
    if (!open) return
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (!choices.length) {
    return (
      <div className="choice-select is-empty" style={{ '--girl': c.color } as CSSProperties}>
        <span className="choice-select-label">{c.name}</span>
        <div className="choice-dropdown-trigger is-empty" aria-disabled>
          No actions
        </div>
      </div>
    )
  }

  return (
    <div
      className={`choice-select ${open ? 'is-open' : ''}`}
      style={{ '--girl': c.color } as CSSProperties}
      ref={rootRef}
    >
      <span className="choice-select-label" id={`${panelId}-label`}>
        {c.name}
      </span>
      <button
        type="button"
        className="choice-dropdown-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        aria-labelledby={`${panelId}-label`}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="choice-dropdown-trigger-text">{open ? 'Hide actions' : 'Choose an action'}</span>
        <span className="choice-dropdown-trigger-meta">{countLabel}</span>
        <span className="choice-dropdown-caret" aria-hidden />
      </button>

      {open && (
        <div className="choice-dropdown-panel" id={panelId} role="listbox" aria-label={`${c.name} actions`}>
          {choices.map((choice) => {
            const locked = Boolean(choice.need && !hasSkills(skills, choice.need))
            const req = skillReqLabel(choice.need)
            return (
              <button
                key={`${choice.next}-${choice.text}`}
                type="button"
                role="option"
                aria-selected={false}
                className={`choice-dropdown-option ${locked ? 'locked' : ''}`}
                disabled={locked}
                onClick={() => {
                  if (locked) return
                  setOpen(false)
                  onPick(choice)
                }}
              >
                <span className="choice-dropdown-option-text">{choice.text}</span>
                {req && (
                  <span className="choice-dropdown-option-req">{locked ? `Need ${req}` : req}</span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
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
