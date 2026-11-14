import { INITIAL_SKILLS, type Skills } from './skills'

export type GirlId = 'maya' | 'riley' | 'jade'

export type Affection = Record<GirlId, number>

export type EndingId =
  | 'solo_maya'
  | 'solo_riley'
  | 'solo_jade'
  | 'threesome'
  | 'harem'
  | 'messy'
  | 'caught'

export type SceneArtId = EndingId | 'harem_pact' | 'harem_morning'

export type Flags = {
  playerName: string
  archetype: string
  kissedMaya: boolean
  kissedRiley: boolean
  kissedJade: boolean
  bathroomMaya: boolean
  couchRiley: boolean
  closetJade: boolean
  balconyMaya: boolean
  kitchenRiley: boolean
  stairsJade: boolean
  laundryMaya: boolean
  dormRiley: boolean
  blackmailJade: boolean
  exBetrayal: boolean
  bodyWriting: boolean
  girlOnGirl: boolean
  oathPayment: boolean
  roommateRule: boolean
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
  deepMaya: boolean
  deepRiley: boolean
  deepJade: boolean
  haremRoute: boolean
  claimedMaya: boolean
  claimedRiley: boolean
  claimedJade: boolean
  haremRules: boolean
  ceremonyDone: boolean
  skillTour: boolean
  danceOff: boolean
  pokerNight: boolean
  rumorMill: boolean
  enduranceTest: boolean
  phase: 'early' | 'mid' | 'late' | 'harem'
}

export type GameState = {
  sceneId: string
  affection: Affection
  skills: Skills
  flags: Flags
  history: string[]
}

export type Effect = {
  affection?: Partial<Affection>
  skills?: Partial<Skills>
  flags?: Partial<Omit<Flags, 'playerName'> & { playerName?: string }>
}

export type Choice = {
  text: string
  next: string
  effect?: Effect
  /** Minimum skills required to see/use this choice */
  need?: Partial<Skills>
  /** Soft gate: show locked button with requirement */
  softLock?: boolean
  require?: (state: GameState) => boolean
}

export type Speaker = GirlId | 'narrator' | 'you' | 'all'

export type Scene = {
  id: string
  speaker: Speaker
  text: string
  focus?: GirlId | 'all' | 'none'
  nsfw?: boolean
  ending?: EndingId | 'reject'
  art?: SceneArtId
  chapter?: string
  choices?: Choice[]
}

export const INITIAL_FLAGS: Flags = {
  playerName: 'You',
  archetype: '',
  kissedMaya: false,
  kissedRiley: false,
  kissedJade: false,
  bathroomMaya: false,
  couchRiley: false,
  closetJade: false,
  balconyMaya: false,
  kitchenRiley: false,
  stairsJade: false,
  laundryMaya: false,
  dormRiley: false,
  blackmailJade: false,
  exBetrayal: false,
  bodyWriting: false,
  girlOnGirl: false,
  oathPayment: false,
  roommateRule: false,
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
  deepMaya: false,
  deepRiley: false,
  deepJade: false,
  haremRoute: false,
  claimedMaya: false,
  claimedRiley: false,
  claimedJade: false,
  haremRules: false,
  ceremonyDone: false,
  skillTour: false,
  danceOff: false,
  pokerNight: false,
  rumorMill: false,
  enduranceTest: false,
  phase: 'early',
}

export const INITIAL_AFFECTION: Affection = {
  maya: 0,
  riley: 0,
  jade: 0,
}

export { INITIAL_SKILLS }

export function hookedCount(flags: Flags): number {
  return [flags.bathroomMaya, flags.couchRiley, flags.closetJade].filter(Boolean).length
}

export function deepCount(flags: Flags): number {
  return [flags.deepMaya, flags.deepRiley, flags.deepJade].filter(Boolean).length
}

export function claimedCount(flags: Flags): number {
  return [flags.claimedMaya, flags.claimedRiley, flags.claimedJade].filter(Boolean).length
}
