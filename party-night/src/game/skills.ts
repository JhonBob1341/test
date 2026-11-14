export type SkillId = 'charm' | 'dominance' | 'nerve' | 'discretion' | 'stamina' | 'insight'

export type Skills = Record<SkillId, number>

export const SKILL_ORDER: SkillId[] = [
  'charm',
  'dominance',
  'nerve',
  'discretion',
  'stamina',
  'insight',
]

export const SKILL_META: Record<
  SkillId,
  { label: string; short: string; blurb: string; color: string }
> = {
  charm: {
    label: 'Charm',
    short: 'CHM',
    blurb: 'Soft talk, sweet lies, Riley-coded.',
    color: '#5ec8ff',
  },
  dominance: {
    label: 'Dominance',
    short: 'DOM',
    blurb: 'Orders, posture, Jade-coded.',
    color: '#c6ff4a',
  },
  nerve: {
    label: 'Nerve',
    short: 'NRV',
    blurb: 'Public risk, shameless heat, Maya-coded.',
    color: '#ff6b4a',
  },
  discretion: {
    label: 'Discretion',
    short: 'DSC',
    blurb: 'Keep secrets, dodge cameras, clean exits.',
    color: '#d4b483',
  },
  stamina: {
    label: 'Stamina',
    short: 'STM',
    blurb: 'Last longer, survive multi-girl nights.',
    color: '#ff4d6d',
  },
  insight: {
    label: 'Insight',
    short: 'INS',
    blurb: 'Read rooms, spot leverage, open hidden paths.',
    color: '#f4a261',
  },
}

export const INITIAL_SKILLS: Skills = {
  charm: 1,
  dominance: 1,
  nerve: 1,
  discretion: 1,
  stamina: 1,
  insight: 1,
}

export type Archetype = {
  id: string
  name: string
  tag: string
  skills: Partial<Skills>
}

export const ARCHETYPES: Archetype[] = [
  {
    id: 'smooth',
    name: 'Smooth Talker',
    tag: 'Charm + Insight',
    skills: { charm: 3, insight: 2 },
  },
  {
    id: 'devil',
    name: 'Party Devil',
    tag: 'Nerve + Stamina',
    skills: { nerve: 3, stamina: 2 },
  },
  {
    id: 'handler',
    name: 'Handler',
    tag: 'Dominance + Discretion',
    skills: { dominance: 3, discretion: 2 },
  },
  {
    id: 'ghost',
    name: 'Quiet Ghost',
    tag: 'Discretion + Insight',
    skills: { discretion: 3, insight: 2 },
  },
  {
    id: 'athlete',
    name: 'All-Nighter',
    tag: 'Stamina + Dominance',
    skills: { stamina: 3, dominance: 2 },
  },
]

export function clampSkill(n: number): number {
  return Math.max(0, Math.min(10, n))
}

export function applySkillDelta(skills: Skills, delta?: Partial<Skills>): Skills {
  if (!delta) return skills
  const next = { ...skills }
  for (const [k, v] of Object.entries(delta)) {
    const key = k as SkillId
    next[key] = clampSkill(next[key] + (v ?? 0))
  }
  return next
}

export function hasSkills(skills: Skills, need?: Partial<Skills>): boolean {
  if (!need) return true
  return Object.entries(need).every(([k, v]) => skills[k as SkillId] >= (v ?? 0))
}

export function skillReqLabel(need?: Partial<Skills>): string {
  if (!need) return ''
  return Object.entries(need)
    .map(([k, v]) => `${SKILL_META[k as SkillId].short} ${v}`)
    .join(' · ')
}
