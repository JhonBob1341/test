import type { EndingId } from './types'
import endingMaya from '../assets/endings/ending-maya.jpg'
import endingRiley from '../assets/endings/ending-riley.jpg'
import endingJade from '../assets/endings/ending-jade.jpg'
import endingThreesome from '../assets/endings/ending-threesome.jpg'
import endingHarem from '../assets/endings/ending-harem.jpg'
import endingMessy from '../assets/endings/ending-messy.jpg'
import endingCaught from '../assets/endings/ending-caught.jpg'

export const ENDING_ART: Record<EndingId, string> = {
  solo_maya: endingMaya,
  solo_riley: endingRiley,
  solo_jade: endingJade,
  threesome: endingThreesome,
  harem: endingHarem,
  messy: endingMessy,
  caught: endingCaught,
}

export const ENDING_SCENE_TO_ART: Record<string, EndingId> = {
  ending_solo_maya: 'solo_maya',
  ending_solo_riley: 'solo_riley',
  ending_solo_jade: 'solo_jade',
  ending_threesome: 'threesome',
  ending_harem: 'harem',
  ending_messy: 'messy',
  ending_caught: 'caught',
}
