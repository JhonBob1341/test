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
  | 'corrupt'

export type SexArtId =
  | 'sex_maya_laundry'
  | 'sex_maya_bathroom'
  | 'sex_maya_balcony'
  | 'sex_maya_outside'
  | 'sex_maya_after'
  | 'sex_maya_risk'
  | 'sex_maya_write'
  | 'sex_maya_knees'
  | 'sex_maya_hard'
  | 'sex_maya_edge'
  | 'sex_maya_phone'
  | 'sex_maya_collar'
  | 'sex_maya_public'
  | 'sex_maya_riley'
  | 'sex_riley_couch'
  | 'sex_riley_bed'
  | 'sex_riley_kitchen'
  | 'sex_riley_bathroom'
  | 'sex_riley_ride'
  | 'sex_riley_control'
  | 'sex_riley_record'
  | 'sex_riley_stomach'
  | 'sex_riley_collar'
  | 'sex_jade_closet'
  | 'sex_jade_stairs'
  | 'sex_jade_bed'
  | 'sex_jade_kneel'
  | 'sex_jade_pin'
  | 'sex_jade_film'
  | 'sex_jade_collar'
  | 'sex_jade_banister'
  | 'sex_jade_watch'
  | 'sex_group_couch'
  | 'sex_group_hallway'
  | 'sex_group_living'
  | 'sex_group_kitchen'
  | 'sex_dare_maya'
  | 'sex_dare_riley'
  | 'sex_orgy'
  | 'sex_choke'
  | 'sex_impact'
  | 'sex_bdsm'
  | 'sex_cnc'
  | 'sex_maya_cnc_rough'
  | 'sex_riley_cnc_rough'
  | 'sex_jade_cnc_rough'
  | 'sex_cnc_house_rough'

export type SceneArtId = EndingId | 'harem_pact' | 'harem_morning' | SexArtId

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
  freeUse: boolean
  collarClaim: boolean
  breedingDare: boolean
  corruptRiley: boolean
  blackmailTimer: boolean
  cuckoldLive: boolean
  publicUse: boolean
  friendshipBroken: boolean
  orgyNight: boolean
  chokingPlay: boolean
  impactPlay: boolean
  bdsmSession: boolean
  cncPlay: boolean
  mayaExhibit: boolean
  mayaFacesit: boolean
  mayaSpit: boolean
  mayaMirror: boolean
  mayaCnc: boolean
  mayaCncRough: boolean
  rileyPraise: boolean
  rileyPet: boolean
  rileyOverstim: boolean
  rileyDegrade: boolean
  rileyCnc: boolean
  rileyCncRough: boolean
  jadeFemdom: boolean
  jadeService: boolean
  jadeSensory: boolean
  jadeDenial: boolean
  jadeCnc: boolean
  jadeCncRough: boolean
  deepNight: boolean
  truthCircle: boolean
  jealousyNight: boolean
  secondRoundMaya: boolean
  secondRoundRiley: boolean
  secondRoundJade: boolean
  neighborScare: boolean
  bottleGame: boolean
  almostDawn: boolean
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
  /** Force this choice into a character dropdown or the shared house row */
  for?: GirlId | 'house'
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
  freeUse: false,
  collarClaim: false,
  breedingDare: false,
  corruptRiley: false,
  blackmailTimer: false,
  cuckoldLive: false,
  publicUse: false,
  friendshipBroken: false,
  orgyNight: false,
  chokingPlay: false,
  impactPlay: false,
  bdsmSession: false,
  cncPlay: false,
  mayaExhibit: false,
  mayaFacesit: false,
  mayaSpit: false,
  mayaMirror: false,
  mayaCnc: false,
  mayaCncRough: false,
  rileyPraise: false,
  rileyPet: false,
  rileyOverstim: false,
  rileyDegrade: false,
  rileyCnc: false,
  rileyCncRough: false,
  jadeFemdom: false,
  jadeService: false,
  jadeSensory: false,
  jadeDenial: false,
  jadeCnc: false,
  jadeCncRough: false,
  deepNight: false,
  truthCircle: false,
  jealousyNight: false,
  secondRoundMaya: false,
  secondRoundRiley: false,
  secondRoundJade: false,
  neighborScare: false,
  bottleGame: false,
  almostDawn: false,
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
