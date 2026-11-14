import type { SceneArtId } from '../game/types'
import { SCENE_ART } from '../game/endings'

export function EndingArt({ art }: { art: SceneArtId }) {
  const src = SCENE_ART[art]
  return (
    <figure className="ending-art">
      <img src={src} alt="" />
    </figure>
  )
}
