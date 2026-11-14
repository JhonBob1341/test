import { useMemo, useState } from 'react'
import { EndingArt } from './components/EndingArt'
import { PartyCast } from './components/Portrait'
import { Meters } from './components/Meters'
import { SkillsPanel } from './components/SkillsPanel'
import { CHARACTERS } from './game/characters'
import { applySkillDelta, hasSkills, skillReqLabel, SKILL_ORDER, type Skills } from './game/skills'
import { resolveEndingScene, SCENES } from './game/story'
import {
  INITIAL_AFFECTION,
  INITIAL_FLAGS,
  INITIAL_SKILLS,
  type Affection,
  type Choice,
  type Flags,
  type GameState,
  type SceneArtId,
} from './game/types'
import './App.css'

function applyChoice(state: GameState, choice: Choice): GameState {
  const affection: Affection = { ...state.affection }
  const flags: Flags = { ...state.flags }
  let skills = { ...state.skills }

  if (choice.effect?.affection) {
    for (const [k, v] of Object.entries(choice.effect.affection)) {
      const key = k as keyof Affection
      affection[key] = Math.max(0, affection[key] + (v ?? 0))
    }
  }
  if (choice.effect?.flags) Object.assign(flags, choice.effect.flags)
  if (choice.effect?.skills) skills = applySkillDelta(skills, choice.effect.skills)

  return {
    ...state,
    affection,
    flags,
    skills,
    sceneId: choice.next,
    history: [...state.history, state.sceneId],
  }
}

function freshState(name = 'You'): GameState {
  return {
    sceneId: 'title',
    affection: { ...INITIAL_AFFECTION },
    skills: { ...INITIAL_SKILLS },
    flags: { ...INITIAL_FLAGS, playerName: name },
    history: [],
  }
}

function chapterFor(state: GameState, fallback?: string): string {
  if (fallback) return fallback
  if (state.flags.phase === 'harem' || state.flags.haremRoute) return 'Harem Arc'
  if (state.flags.phase === 'late') return 'Act III · After Hours'
  if (state.flags.phase === 'mid') return 'Act II · Fallout'
  return 'Act I · The Pact'
}

export default function App() {
  const [state, setState] = useState<GameState>(() => freshState())
  const [nameDraft, setNameDraft] = useState('Alex')
  const [entered, setEntered] = useState(false)

  const scene = SCENES[state.sceneId] ?? SCENES.title

  const visibleChoices = useMemo(() => {
    const choices = scene.choices ?? []
    return choices.filter((c) => {
      if (c.require && !c.require(state)) return false
      if (c.need && !hasSkills(state.skills, c.need) && !c.softLock) return false
      return true
    })
  }, [scene, state])

  function go(choice: Choice) {
    if (choice.need && !hasSkills(state.skills, choice.need)) return

    let next = applyChoice(state, choice)

    if (choice.next === 'archetype' || choice.next === 'street') {
      next = {
        ...next,
        flags: { ...next.flags, playerName: nameDraft.trim() || 'You' },
      }
    }

    // Archetype choices add to base 1s already in INITIAL; values in effect are bonuses.
    // Already applied via applySkillDelta.

    if (choice.next === 'ending_resolve' || next.sceneId === 'ending_resolve') {
      const endingId = resolveEndingScene(next)
      next = { ...next, sceneId: endingId }
    }

    if (choice.next === 'title') {
      setEntered(false)
      setState(freshState(nameDraft))
      return
    }

    setState(next)
    if (scene.id === 'title' || scene.id === 'agegate') setEntered(true)
  }

  const text = scene.text.replace(/\bYou\b/g, state.flags.playerName === 'You' ? 'You' : state.flags.playerName)
  const speakerLabel =
    scene.speaker === 'narrator'
      ? 'Night'
      : scene.speaker === 'you'
        ? state.flags.playerName
        : scene.speaker === 'all'
          ? 'Maya · Riley · Jade'
          : CHARACTERS[scene.speaker].name

  const speakerColor =
    scene.speaker === 'maya' || scene.speaker === 'riley' || scene.speaker === 'jade'
      ? CHARACTERS[scene.speaker].color
      : undefined

  const artKey: SceneArtId | null =
    scene.art ??
    (scene.ending && scene.ending !== 'reject' ? (scene.ending as SceneArtId) : null)

  const showArt = Boolean(artKey)
  const chapter = chapterFor(state, scene.chapter)
  const showHud =
    entered && scene.id !== 'title' && scene.id !== 'agegate' && scene.id !== 'name' && scene.id !== 'archetype'

  function maxStats() {
    const skills = Object.fromEntries(SKILL_ORDER.map((id) => [id, 10])) as Skills
    setState((prev) => ({
      ...prev,
      skills,
      affection: { maya: 10, riley: 10, jade: 10 },
    }))
  }

  function restartGame() {
    setEntered(false)
    setState(freshState(nameDraft.trim() || 'You'))
  }

  return (
    <div
      className={`app ${entered ? 'in-game' : 'at-title'} ${scene.nsfw ? 'nsfw' : ''} ${state.flags.haremRoute ? 'harem-mode' : ''}`}
    >
      <div className="atmosphere" aria-hidden>
        <div className="blob blob-a" />
        <div className="blob blob-b" />
        <div className="blob blob-c" />
        <div className="grain" />
        <div className="light-sweep" />
      </div>

      {entered && scene.id !== 'title' && (
        <div className="top-actions">
          <button type="button" className="cheat-btn restart-btn" onClick={restartGame} title="Restart from title">
            Restart
          </button>
          <button type="button" className="cheat-btn" onClick={maxStats} title="Max skills and affection">
            Cheat · Max Stats
          </button>
        </div>
      )}

      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">AFTER HOURS</span>
          <span className="brand-sub">skills · taboo roommates · harem · 21+</span>
        </div>
        {showHud && (
          <div className="hud">
            <Meters affection={state.affection} />
            <SkillsPanel skills={state.skills} />
          </div>
        )}
      </header>

      <main className="stage">
        {scene.id === 'title' ? (
          <section className="title-hero">
            <p className="eyebrow">Single-player · NSFW · Skills · Longform · Harem</p>
            <h1>After Hours</h1>
            <p className="lede">
              Pick an archetype, train your skills, then push past soft betrayal into free-use contracts, collars,
              breeding dares, blackmail timers, and a full harem rewrite of the lease.
            </p>
            <div className="title-cast">
              <PartyCast focus="all" />
            </div>
          </section>
        ) : (
          <section className={`scene-panel ${showArt ? 'has-ending' : ''}`}>
            {entered && scene.id !== 'agegate' && scene.id !== 'name' && (
              <div className="chapter-pill">{chapter}</div>
            )}
            {showArt && artKey ? <EndingArt art={artKey} /> : <PartyCast focus={scene.focus ?? 'none'} />}
            <article className={`dialogue ${scene.nsfw ? 'is-nsfw' : ''}`}>
              <div className="speaker" style={speakerColor ? { color: speakerColor } : undefined}>
                {speakerLabel}
                {scene.nsfw && <span className="nsfw-tag">NSFW</span>}
                {scene.ending && scene.ending !== 'reject' && (
                  <span className="ending-tag">{scene.ending.replace('_', ' ')}</span>
                )}
                {state.flags.haremRoute && !scene.ending && <span className="ending-tag">harem</span>}
              </div>
              <p>{text}</p>
            </article>
          </section>
        )}

        <section className="choices">
          {scene.id === 'name' && (
            <label className="name-field">
              <span>Your name</span>
              <input
                value={nameDraft}
                onChange={(e) => setNameDraft(e.target.value.slice(0, 18))}
                maxLength={18}
                placeholder="Alex"
                autoFocus
              />
            </label>
          )}

          {visibleChoices.map((choice) => {
            const locked = Boolean(choice.need && !hasSkills(state.skills, choice.need))
            const req = skillReqLabel(choice.need)
            return (
              <button
                key={choice.text + choice.next}
                type="button"
                className={`choice ${locked ? 'locked' : ''}`}
                disabled={locked}
                onClick={() => go(choice)}
              >
                <span>{choice.text}</span>
                {req && <span className="choice-req">{locked ? `Need ${req}` : req}</span>}
              </button>
            )
          })}
        </section>
      </main>

      <footer className="fineprint">
        All characters are consenting adults (21+). Fiction only.
      </footer>
    </div>
  )
}
