export type GirlId = 'maya' | 'riley' | 'jade'

export type Affection = Record<GirlId, number>

export type Flags = {
  kissedMaya: boolean
  kissedRiley: boolean
  kissedJade: boolean
  bathroomMaya: boolean
  couchRiley: boolean
  closetJade: boolean
  caughtAlmost: boolean
  threesomeUnlocked: boolean
  sharedSecret: boolean
  playerName: string
}

export type GameState = {
  sceneId: string
  affection: Affection
  flags: Flags
  history: string[]
}

export type Effect = {
  affection?: Partial<Affection>
  flags?: Partial<Flags>
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
  ending?: 'solo' | 'messy' | 'threesome' | 'reject' | 'caught'
  choices?: Choice[]
  autoNext?: string
}

export const INITIAL_FLAGS: Flags = {
  kissedMaya: false,
  kissedRiley: false,
  kissedJade: false,
  bathroomMaya: false,
  couchRiley: false,
  closetJade: false,
  caughtAlmost: false,
  threesomeUnlocked: false,
  sharedSecret: false,
  playerName: 'You',
}

export const INITIAL_AFFECTION: Affection = {
  maya: 0,
  riley: 0,
  jade: 0,
}
