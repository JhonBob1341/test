import type { Flags, GirlId } from './types'

export type GirlKink = {
  id: string
  label: string
  flag: keyof Flags
}

export const GIRL_KINKS: Record<GirlId, GirlKink[]> = {
  maya: [
    { id: 'exhibit', label: 'exhibit', flag: 'mayaExhibit' },
    { id: 'facesit', label: 'facesit', flag: 'mayaFacesit' },
    { id: 'spit', label: 'spit', flag: 'mayaSpit' },
    { id: 'mirror', label: 'mirror', flag: 'mayaMirror' },
  ],
  riley: [
    { id: 'praise', label: 'praise', flag: 'rileyPraise' },
    { id: 'pet', label: 'pet', flag: 'rileyPet' },
    { id: 'overstim', label: 'overstim', flag: 'rileyOverstim' },
    { id: 'degrade', label: 'degrade', flag: 'rileyDegrade' },
  ],
  jade: [
    { id: 'kneel', label: 'kneel', flag: 'jadeFemdom' },
    { id: 'beg', label: 'beg', flag: 'jadeService' },
    { id: 'blind', label: 'blind', flag: 'jadeSensory' },
    { id: 'edged', label: 'edged', flag: 'jadeDenial' },
  ],
}

export function kinkUnlocked(flags: Flags, flag: keyof Flags): boolean {
  return Boolean(flags[flag])
}
