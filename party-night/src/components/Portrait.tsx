import type { CSSProperties } from 'react'
import type { GirlId } from '../game/types'
import { CHARACTERS } from '../game/characters'

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
      <svg viewBox="0 0 120 160" className="portrait-svg" aria-hidden>
        <defs>
          <linearGradient id={`skin-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f3c7a5" />
            <stop offset="100%" stopColor="#d9956c" />
          </linearGradient>
          <linearGradient id={`hair-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={c.color} />
            <stop offset="100%" stopColor="#1a1014" />
          </linearGradient>
        </defs>
        {/* shoulders */}
        <path
          d="M20 150 C30 118 40 108 60 108 C80 108 90 118 100 150 Z"
          fill={id === 'jade' ? '#1c1c1c' : id === 'riley' ? '#2a4a6a' : '#ff8f70'}
        />
        {/* neck */}
        <rect x="52" y="88" width="16" height="24" rx="4" fill={`url(#skin-${id})`} />
        {/* head */}
        <ellipse cx="60" cy="62" rx="28" ry="34" fill={`url(#skin-${id})`} />
        {/* hair styles */}
        {id === 'maya' && (
          <>
            <path d="M28 58 C24 20 40 10 60 12 C84 10 98 24 92 58 C96 40 88 22 60 20 C34 22 26 42 28 58 Z" fill={`url(#hair-${id})`} />
            <path d="M24 70 C18 90 22 120 34 130 C30 100 28 80 32 68 Z" fill={c.color} opacity="0.9" />
            <path d="M96 70 C102 90 98 120 86 130 C90 100 92 80 88 68 Z" fill={c.color} opacity="0.9" />
          </>
        )}
        {id === 'riley' && (
          <>
            <path d="M30 50 C26 18 44 8 60 10 C78 8 96 20 90 52 C98 70 100 110 88 128 C92 90 86 60 82 50 C76 22 46 20 38 50 C34 70 30 100 34 128 C24 108 22 70 30 50 Z" fill="#2b1d18" />
            <circle cx="40" cy="78" r="7" fill="#3a2820" />
            <circle cx="78" cy="82" r="8" fill="#3a2820" />
            <circle cx="52" cy="96" r="6" fill="#2b1d18" />
          </>
        )}
        {id === 'jade' && (
          <>
            <path d="M32 40 C30 16 48 8 60 8 C76 8 92 18 88 42 L88 70 C84 48 74 38 60 36 C46 38 36 48 32 70 Z" fill="#111" />
            <path d="M32 42 L28 78 L36 74 L34 50 Z" fill="#111" />
            <path d="M88 42 L92 78 L84 74 L86 50 Z" fill="#111" />
          </>
        )}
        {/* eyes */}
        <ellipse cx="48" cy="60" rx="4.5" ry="5" fill="#1a1014" />
        <ellipse cx="72" cy="60" rx="4.5" ry="5" fill="#1a1014" />
        <circle cx="49.5" cy="58.5" r="1.3" fill="#fff" />
        <circle cx="73.5" cy="58.5" r="1.3" fill="#fff" />
        {/* brows / makeup */}
        <path d="M42 50 Q48 46 54 50" stroke="#1a1014" strokeWidth="2" fill="none" />
        <path d="M66 50 Q72 46 78 50" stroke="#1a1014" strokeWidth="2" fill="none" />
        {id === 'jade' && (
          <>
            <path d="M42 58 L40 62" stroke="#111" strokeWidth="2" />
            <path d="M78 58 L80 62" stroke="#111" strokeWidth="2" />
          </>
        )}
        {/* lips */}
        <path
          d="M52 76 Q60 84 68 76 Q60 80 52 76"
          fill={id === 'riley' ? '#ff4d6d' : id === 'maya' ? '#d4384a' : '#8b1538'}
        />
        {/* glitter / extras */}
        {id === 'maya' && (
          <>
            <circle cx="44" cy="72" r="1.2" fill="#fff6" />
            <circle cx="70" cy="70" r="1" fill="#fff8" />
          </>
        )}
      </svg>
      <div className="portrait-meta">
        <strong>{c.name}</strong>
        <span>{c.age} · {c.tag}</span>
      </div>
    </div>
  )
}

export function PartyCast({ focus }: { focus?: GirlId | 'all' | 'none' }) {
  if (focus === 'none') return null
  return (
    <div className="cast">
      {(['maya', 'riley', 'jade'] as GirlId[]).map((id) => (
        <Portrait key={id} id={id} active={focus === 'all' || focus === id} compact={focus !== 'all' && focus !== id} />
      ))}
    </div>
  )
}
