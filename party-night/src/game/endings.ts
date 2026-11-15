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
import sexMayaLaundry from '../assets/scenes/sex-maya-laundry.jpg'
import sexMayaBathroom from '../assets/scenes/sex-maya-bathroom.jpg'
import sexMayaBalcony from '../assets/scenes/sex-maya-balcony.jpg'
import sexMayaOutside from '../assets/scenes/sex-maya-outside.jpg'
import sexMayaAfter from '../assets/scenes/sex-maya-after.jpg'
import sexRileyCouch from '../assets/scenes/sex-riley-couch.jpg'
import sexRileyBed from '../assets/scenes/sex-riley-bed.jpg'
import sexRileyKitchen from '../assets/scenes/sex-riley-kitchen.jpg'
import sexRileyBathroom from '../assets/scenes/sex-riley-bathroom.jpg'
import sexJadeCloset from '../assets/scenes/sex-jade-closet.jpg'
import sexJadeStairs from '../assets/scenes/sex-jade-stairs.jpg'
import sexJadeBed from '../assets/scenes/sex-jade-bed.jpg'
import sexGroupCouch from '../assets/scenes/sex-group-couch.jpg'
import sexGroupHallway from '../assets/scenes/sex-group-hallway.jpg'

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
  corrupt: endingCaught,
  sex_maya_laundry: sexMayaLaundry,
  sex_maya_bathroom: sexMayaBathroom,
  sex_maya_balcony: sexMayaBalcony,
  sex_maya_outside: sexMayaOutside,
  sex_maya_after: sexMayaAfter,
  sex_riley_couch: sexRileyCouch,
  sex_riley_bed: sexRileyBed,
  sex_riley_kitchen: sexRileyKitchen,
  sex_riley_bathroom: sexRileyBathroom,
  sex_jade_closet: sexJadeCloset,
  sex_jade_stairs: sexJadeStairs,
  sex_jade_bed: sexJadeBed,
  sex_group_couch: sexGroupCouch,
  sex_group_hallway: sexGroupHallway,
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
  corrupt: endingCaught,
}
