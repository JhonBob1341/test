import type { Scene } from './types'

/**
 * Narrative bridges that fold skill / extreme / harem content back into
 * the same party-night story instead of feeling like separate menus.
 */
export const STORY_BRIDGE_SCENES: Record<string, Scene> = {
  party_floor: {
    id: 'party_floor',
    speaker: 'narrator',
    text: 'You hang back from choosing a roommate and let the house pull you. Maya owns a dance circle in the living room. Jade haunted a sticky poker table. Riley is drowning in hallway gossip. Someone is daring people to plank while getting whispered filth. This is still the same party — just the veins under the skin.',
    focus: 'all',
    chapter: 'Act I · The Party',
    choices: [
      {
        text: 'Step into Maya’s dance circle',
        next: 'skill_dance',
        require: (s) => !s.flags.danceOff,
        effect: { flags: { phase: 'mid' } },
      },
      {
        text: 'Take a seat at Jade’s poker table',
        next: 'skill_poker',
        require: (s) => !s.flags.pokerNight,
        effect: { flags: { phase: 'mid' } },
      },
      {
        text: 'Fish Riley out of the rumor knot',
        next: 'skill_rumor',
        require: (s) => !s.flags.rumorMill,
        effect: { flags: { phase: 'mid' } },
      },
      {
        text: 'Accept the hallway plank dare',
        next: 'skill_endurance',
        require: (s) => !s.flags.enduranceTest,
        effect: { flags: { phase: 'mid' } },
      },
      {
        text: 'Scout the house for leverage [INS 3]',
        next: 'skill_scout',
        need: { insight: 3 },
        softLock: true,
        effect: { flags: { phase: 'mid' } },
      },
      {
        text: 'Enough circling — go back to the roommates',
        next: 'pact_threat',
        effect: { flags: { skillTour: true } },
      },
    ],
  },

  fallout_continue: {
    id: 'fallout_continue',
    speaker: 'narrator',
    text: 'The bass keeps lying that nothing changed. Cups refill. Someone laughs too loud. But the three of them keep finding your eyes across the room like the night has a second act and they already cast you.',
    focus: 'all',
    chapter: 'Act II · Fallout',
    choices: [
      {
        text: 'Stay in the thick of it',
        next: 'mid_hub',
        effect: { flags: { phase: 'mid', skillTour: true } },
      },
    ],
  },

  escalate_offer: {
    id: 'escalate_offer',
    speaker: 'jade',
    text: 'Jade finds you between songs, voice low. “Cute treason is finished. If you want the house for real — contracts, collars, timers, public use — say so. If you want soft endings, walk away now.” Maya is already grinning behind her. Riley looks terrified and interested.',
    focus: 'jade',
    chapter: 'Act II · Escalation',
    choices: [
      {
        text: 'Ask what “for real” means',
        next: 'extreme_hub',
        effect: { affection: { jade: 1 } },
      },
      {
        text: 'Tell them you want all three claimed',
        next: 'harem_pitch',
        effect: { affection: { maya: 1, riley: 1, jade: 1 }, flags: { haremRoute: true } },
      },
      {
        text: 'Not yet — keep working the party',
        next: 'mid_hub',
      },
    ],
  },

  maya_escalate: {
    id: 'maya_escalate',
    speaker: 'maya',
    text: 'Maya catches your belt loop after the laundry heat. “We can still do soft balcony shit… or I can put Tyler on Facetime while you ruin me, or we play the breeding dare I only say drunk. Your call, disaster.”',
    focus: 'maya',
    chapter: 'Act II · Fallout',
    choices: [
      {
        text: 'Keep it to the balcony',
        next: 'maya_balcony',
        require: (s) => !s.flags.balconyMaya,
      },
      {
        text: 'Put Tyler on Facetime [NRV 5]',
        next: 'xt_cuck_tyler',
        need: { nerve: 5 },
        softLock: true,
        require: (s) => !s.flags.cuckoldLive,
        effect: { flags: { exBetrayal: true } },
      },
      {
        text: 'Take the breeding dare [NRV 4 · STM 3]',
        next: 'xt_breed',
        need: { nerve: 4, stamina: 3 },
        softLock: true,
        require: (s) => !s.flags.breedingDare,
      },
      {
        text: 'Play truth-or-slut instead',
        next: 'skill_maya_truth',
        need: { nerve: 2 },
        softLock: true,
      },
      {
        text: 'Slide back into the party',
        next: 'mid_hub',
        effect: { flags: { phase: 'mid' } },
      },
    ],
  },

  riley_escalate: {
    id: 'riley_escalate',
    speaker: 'riley',
    text: 'Riley’s voice is soft and wrecked. “I can bake and pretend I’m fine… or you can finish corrupting me on purpose. Jade already knows something. I can feel it in my teeth.”',
    focus: 'riley',
    chapter: 'Act II · Fallout',
    choices: [
      {
        text: 'Help her bake and talk',
        next: 'skill_riley_bake',
        need: { charm: 2 },
        softLock: true,
      },
      {
        text: 'Find her in the kitchen for more',
        next: 'riley_kitchen',
        require: (s) => !s.flags.kitchenRiley,
      },
      {
        text: 'Corrupt her on purpose [CHM 3 · DOM 3]',
        next: 'xt_corrupt_riley',
        need: { charm: 3, dominance: 3 },
        softLock: true,
        require: (s) => !s.flags.corruptRiley,
      },
      {
        text: 'Slide back into the party',
        next: 'mid_hub',
        effect: { flags: { phase: 'mid' } },
      },
    ],
  },

  jade_escalate: {
    id: 'jade_escalate',
    speaker: 'jade',
    text: 'Jade adjusts her skirt like a sentence. “You can keep playing roommate roulette… or we escalate: collar, folder timer, free-use paperwork. I do not offer twice.”',
    focus: 'jade',
    chapter: 'Act II · Fallout',
    choices: [
      {
        text: 'Take her private “lesson”',
        next: 'skill_private_lesson',
        need: { dominance: 2 },
        softLock: true,
      },
      {
        text: 'Find her on the stairs',
        next: 'jade_stairs',
        require: (s) => !s.flags.stairsJade,
      },
      {
        text: 'Ask about the collar [DOM 4]',
        next: 'xt_collar',
        need: { dominance: 4 },
        softLock: true,
        require: (s) => !s.flags.collarClaim,
      },
      {
        text: 'Ask what the timer is [INS 3]',
        next: 'xt_blackmail_timer',
        need: { insight: 3, dominance: 2 },
        softLock: true,
        require: (s) => !s.flags.blackmailTimer && (s.flags.blackmailJade || s.flags.phoneLeak || s.flags.closetJade),
      },
      {
        text: 'Slide back into the party',
        next: 'mid_hub',
        effect: { flags: { phase: 'mid' } },
      },
    ],
  },
}
