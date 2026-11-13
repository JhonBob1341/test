export type GirlId = 'maya' | 'riley' | 'jade'

export type Affection = Record<GirlId, number>

export type Flags = {
  playerName: string
  kissedMaya: boolean
  kissedRiley: boolean
  kissedJade: boolean
  bathroomMaya: boolean
  couchRiley: boolean
  closetJade: boolean
  balconyMaya: boolean
  kitchenRiley: boolean
  stairsJade: boolean
  pactBroken: boolean
  toldOnFriend: boolean
  watchedSecret: boolean
  phoneLeak: boolean
  jealousyTrap: boolean
  dareSpiral: boolean
  caughtAlmost: boolean
  threesomeUnlocked: boolean
  sharedSecret: boolean
  markedByJade: boolean
  rileyConfessed: boolean
  mayaBet: boolean
  phase: 'early' | 'mid' | 'late'
}

export type GameState = {
  sceneId: string
  affection: Affection
  flags: Flags
  history: string[]
}

export type Effect = {
  affection?: Partial<Affection>
  flags?: Partial<Omit<Flags, 'playerName'> & { playerName?: string }>
}

export type Choice = {
  text: string
  next: string
  effect?: Effect
  require?: (state: GameState) => boolean
}

export type Speaker = GirlId | 'narrator' | 'you' | 'all'

export type Scene = {
  id: string
  speaker: Speaker
  text: string
  focus?: GirlId | 'all' | 'none'
  nsfw?: boolean
  ending?: 'solo' | 'messy' | 'threesome' | 'reject' | 'caught' | 'harem'
  choices?: Choice[]
}

export const INITIAL_FLAGS: Flags = {
  playerName: 'You',
  kissedMaya: false,
  kissedRiley: false,
  kissedJade: false,
  bathroomMaya: false,
  couchRiley: false,
  closetJade: false,
  balconyMaya: false,
  kitchenRiley: false,
  stairsJade: false,
  pactBroken: false,
  toldOnFriend: false,
  watchedSecret: false,
  phoneLeak: false,
  jealousyTrap: false,
  dareSpiral: false,
  caughtAlmost: false,
  threesomeUnlocked: false,
  sharedSecret: false,
  markedByJade: false,
  rileyConfessed: false,
  mayaBet: false,
  phase: 'early',
}

export const INITIAL_AFFECTION: Affection = {
  maya: 0,
  riley: 0,
  jade: 0,
}

export function hookedCount(flags: Flags): number {
  return [flags.bathroomMaya, flags.couchRiley, flags.closetJade].filter(Boolean).length
}
