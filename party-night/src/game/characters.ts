import type { GirlId } from './types'

export type Character = {
  id: GirlId
  name: string
  age: number
  tag: string
  vibe: string
  look: string
  color: string
  accent: string
}

export const CHARACTERS: Record<GirlId, Character> = {
  maya: {
    id: 'maya',
    name: 'Maya',
    age: 21,
    tag: 'Pact breaker',
    vibe: 'Loud laugh, short skirt, zero shame. She treats sacred rules like invitations.',
    look: 'Honey-blonde waves, glitter on her collarbones, cropped party top.',
    color: '#ff6b4a',
    accent: '#ffd1c2',
  },
  riley: {
    id: 'riley',
    name: 'Riley',
    age: 22,
    tag: 'Sweet traitor',
    vibe: 'Looks soft until she leans in and ruins a friendship with a smile.',
    look: 'Dark curls, glossy lips, oversized jersey slipping off one shoulder.',
    color: '#5ec8ff',
    accent: '#d6f0ff',
  },
  jade: {
    id: 'jade',
    name: 'Jade',
    age: 21,
    tag: 'Owns the ending',
    vibe: 'Quiet until she wants you. Then she collects interest — and witnesses.',
    look: 'Black bob, sharp eyeliner, leather mini, slow predatory smile.',
    color: '#c6ff4a',
    accent: '#eaffb8',
  },
}

export const GIRL_ORDER: GirlId[] = ['maya', 'riley', 'jade']
