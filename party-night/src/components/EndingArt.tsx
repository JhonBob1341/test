import type { EndingId } from '../game/types'
import { ENDING_ART } from '../game/endings'

export function EndingArt({ ending }: { ending: EndingId }) {
  const src = ENDING_ART[ending]
  return (
    <figure className="ending-art">
      <img src={src} alt="" />
    </figure>
  )
}
