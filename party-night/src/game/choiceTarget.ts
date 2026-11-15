import type { Choice, GirlId, Scene } from './types'

export type ChoiceBucket = GirlId | 'house'

const HOUSE_NEXT =
  /^(title|agegate|name|archetype|street|mid_hub|deep_hub|late_hub|fallout_continue|extreme_hub|harem_pitch|ending_route|ending_resolve|leave_attempt)$/

const HOUSE_TEXT =
  /\b(back (to|into)|slide back|return to|step back|party|house menu|escalation menu|play again)\b/i

function nextMentions(next: string, girl: GirlId): boolean {
  if (girl === 'jade') {
    return /(^|_)(jade|lola)(_|$)/i.test(next) || next.includes('private_lesson')
  }
  return new RegExp(`(^|_)${girl}(_|$)`).test(next)
}

function textMentions(text: string, girl: GirlId): boolean {
  if (girl === 'maya') return /\bMaya\b/i.test(text)
  if (girl === 'riley') return /\bRiley\b/i.test(text)
  return /\b(Lola|Jade)\b/i.test(text)
}

function affectionOnly(choice: Choice): GirlId | null {
  const aff = choice.effect?.affection
  if (!aff) return null
  const hits = (['maya', 'riley', 'jade'] as GirlId[]).filter((id) => (aff[id] ?? 0) !== 0)
  return hits.length === 1 ? hits[0] : null
}

/** Route a choice into a per-character dropdown or the shared house row. */
export function choiceBucket(choice: Choice, scene: Scene): ChoiceBucket {
  if (choice.for === 'house') return 'house'
  if (choice.for === 'maya' || choice.for === 'riley' || choice.for === 'jade') return choice.for

  if (HOUSE_NEXT.test(choice.next) || HOUSE_TEXT.test(choice.text)) return 'house'

  for (const id of ['maya', 'riley', 'jade'] as GirlId[]) {
    if (nextMentions(choice.next, id) || textMentions(choice.text, id)) return id
  }

  const only = affectionOnly(choice)
  if (only) return only

  if (scene.focus === 'maya' || scene.focus === 'riley' || scene.focus === 'jade') {
    return scene.focus
  }

  return 'house'
}

export function groupChoices(choices: Choice[], scene: Scene): Record<ChoiceBucket, Choice[]> {
  const groups: Record<ChoiceBucket, Choice[]> = {
    maya: [],
    riley: [],
    jade: [],
    house: [],
  }
  for (const choice of choices) {
    groups[choiceBucket(choice, scene)].push(choice)
  }
  return groups
}

export function shouldUseCastDropdowns(scene: Scene, choices: Choice[]): boolean {
  if (!choices.length) return false
  if (
    scene.id === 'title' ||
    scene.id === 'agegate' ||
    scene.id === 'agegate_skip' ||
    scene.id === 'name' ||
    scene.id === 'archetype' ||
    scene.id === 'skip_intro'
  ) {
    return false
  }
  const groups = groupChoices(choices, scene)
  const girlsWithChoices = (['maya', 'riley', 'jade'] as GirlId[]).filter((id) => groups[id].length > 0)
  // Dropdowns only when multiple roommates each have actions to pick from
  return girlsWithChoices.length >= 2
}
