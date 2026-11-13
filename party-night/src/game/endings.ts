import type { EndingId, SceneArtId } from './types'
import endingMaya from '../assets/endings/ending-maya.jpg'
import endingRiley from '../assets/endings/ending-riley.jpg'
import endingJade from '../assets/endings/ending-jade.jpg'
import endingThreesome from '../assets/endings/ending-threesome.jpg'
import endingHarem from '../assets/endings/ending-harem.jpg'
import endingHaremPact from '../assets/endings/ending-harem-pact.jpg'
import endingHaremMorning from '../assets/endings/ending-harem-morning.jpg'
import endingMessy from '../assets/endings/ending-messy.jpg'
import endingCaught from '../assets/endings/ending-caught.jpg'

export const SCENE_ART: Record<SceneArtId, string> = {
  solo_maya: endingMaya,
  solo_riley: endingRiley,
  solo_jade: endingJade,
  threesome: endingThreesome,
  harem: endingHaremMorning,
  harem_pact: endingHaremPact,
  harem_morning: endingHaremMorning,
  messy: endingMessy,
  caught: endingCaught,
}

/** Keep old name for EndingArt */
export const ENDING_ART: Record<EndingId, string> = {
  solo_maya: endingMaya,
  solo_riley: endingRiley,
  solo_jade: endingJade,
  threesome: endingThreesome,
  harem: endingHarem,
  messy: endingMessy,
  caught: endingCaught,
}
