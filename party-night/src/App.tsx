import { useMemo, useState } from 'react'
import { PartyCast } from './components/Portrait'
import { Meters } from './components/Meters'
import { CHARACTERS } from './game/characters'
import { resolveEndingScene, SCENES } from './game/story'
import {
  INITIAL_AFFECTION,
  INITIAL_FLAGS,
  type Affection,
  type Choice,
  type Flags,
  type GameState,
} from './game/types'
import './App.css'

function applyChoice(state: GameState, choice: Choice): GameState {
  const affection: Affection = { ...state.affection }
  const flags: Flags = { ...state.flags }
  if (choice.effect?.affection) {
    for (const [k, v] of Object.entries(choice.effect.affection)) {
      const key = k as keyof Affection
      affection[key] = Math.max(0, affection[key] + (v ?? 0))
    }
  }
  if (choice.effect?.flags) Object.assign(flags, choice.effect.flags)
  return {
    ...state,
    affection,
    flags,
    sceneId: choice.next,
    history: [...state.history, state.sceneId],
  }
}

function freshState(name = 'You'): GameState {
  return {
    sceneId: 'title',
    affection: { ...INITIAL_AFFECTION },
    flags: { ...INITIAL_FLAGS, playerName: name },
    history: [],
  }
}

export default function App() {
  const [state, setState] = useState<GameState>(() => freshState())
  const [nameDraft, setNameDraft] = useState('Alex')
  const [entered, setEntered] = useState(false)

  const scene = SCENES[state.sceneId] ?? SCENES.title

  const visibleChoices = useMemo(() => {
    const choices = scene.choices ?? []
    return choices.filter((c) => !c.require || c.require(state))
  }, [scene, state])

  function go(choice: Choice) {
    let next = applyChoice(state, choice)

    if (choice.next === 'arrive') {
      next = {
        ...next,
        flags: { ...next.flags, playerName: nameDraft.trim() || 'You' },
      }
    }

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

  return (
    <div className={`app ${entered ? 'in-game' : 'at-title'} ${scene.nsfw ? 'nsfw' : ''}`}>
      <div className="atmosphere" aria-hidden>
        <div className="blob blob-a" />
        <div className="blob blob-b" />
        <div className="blob blob-c" />
        <div className="grain" />
        <div className="light-sweep" />
      </div>

      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">AFTER HOURS</span>
          <span className="brand-sub">a taboo party dating game · 21+</span>
        </div>
        {entered && scene.id !== 'title' && scene.id !== 'agegate' && scene.id !== 'name' && (
          <Meters affection={state.affection} />
        )}
      </header>

      <main className="stage">
        {scene.id === 'title' ? (
          <section className="title-hero">
            <p className="eyebrow">Single-player · NSFW · Choice-driven</p>
            <h1>After Hours</h1>
            <p className="lede">
              Three slutty best friends. One first-of-the-year college house party. Your job is to survive the night —
              or ruin the friend group deliciously.
            </p>
            <div className="title-cast">
              <PartyCast focus="all" />
            </div>
          </section>
        ) : (
          <section className="scene-panel">
            <PartyCast focus={scene.focus ?? 'none'} />
            <article className={`dialogue ${scene.nsfw ? 'is-nsfw' : ''}`}>
              <div className="speaker" style={speakerColor ? { color: speakerColor } : undefined}>
                {speakerLabel}
                {scene.nsfw && <span className="nsfw-tag">NSFW</span>}
                {scene.ending && <span className="ending-tag">{scene.ending}</span>}
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

          {visibleChoices.map((choice) => (
            <button key={choice.text + choice.next} type="button" className="choice" onClick={() => go(choice)}>
              {choice.text}
            </button>
          ))}
        </section>
      </main>

      <footer className="fineprint">
        All characters are consenting adults (21+). Fiction only.
      </footer>
    </div>
  )
}
