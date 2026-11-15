import type { Scene } from './types'

/**
 * Narrative bridges that fold skill / extreme / harem content back into
 * the same party-night story instead of feeling like separate menus.
 */
export const STORY_BRIDGE_SCENES: Record<string, Scene> = {
  party_floor: {
    id: 'party_floor',
    speaker: 'narrator',
    text: 'You hang back from choosing a roommate and let the house pull you. Maya owns a dance circle in the living room. Lola haunted a sticky poker table. Riley is drowning in hallway gossip. Someone is daring people to plank while getting whispered filth. This is still the same party — just the veins under the skin.',
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
        text: 'Take a seat at Lola’s poker table',
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
    speaker: 'maya',
    text: 'Maya finds you between songs with Lola trailing behind, eyes low. “Cute treason is finished. If you want the house for real — contracts, collars, timers, public use, orgy, rope, CNC — say so.” Lola adds, almost inaudible, “Please pick something that uses me.” Riley looks terrified and interested.',
    focus: 'all',
    chapter: 'Act II · Escalation',
    choices: [
      {
        text: 'Ask what “for real” means',
        next: 'extreme_hub',
        effect: { affection: { jade: 1, maya: 1 } },
      },
      {
        text: 'Skip straight to tying Lola [DOM 5]',
        next: 'xt_bdsm',
        need: { dominance: 5, insight: 3 },
        softLock: true,
        require: (s) => !s.flags.bdsmSession,
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
    text: 'Maya catches your belt loop after the laundry heat. “We can still do soft balcony shit… or I can put Tyler on Facetime while you ruin me, or we play the breeding dare, or you can put a hand on my throat and mean it. Your call, disaster.”',
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
        text: 'Hand on her throat [DOM 5]',
        next: 'xt_choke_maya',
        need: { dominance: 5 },
        softLock: true,
        require: (s) => !s.flags.chokingPlay,
      },
      {
        text: 'Spank her until she begs [DOM 4]',
        next: 'xt_impact_maya',
        need: { dominance: 4, nerve: 3 },
        softLock: true,
        require: (s) => !s.flags.impactPlay,
      },
      {
        text: 'Ambush Maya in the laundry — CNC [DOM 6]',
        next: 'kink_maya_cnc',
        need: { dominance: 6, nerve: 5 },
        softLock: true,
        require: (s) => !s.flags.mayaCnc,
      },
      {
        text: 'Open Maya’s kink menu (5 kinks)',
        next: 'kink_maya_hub',
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
    text: 'Riley’s voice is soft and wrecked. “I can bake and pretend I’m fine… or you can finish corrupting me on purpose… or put me over your lap… or tie my wrists so I stop running from how much I want this.”',
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
        text: 'Over-the-lap spanking [DOM 4]',
        next: 'xt_impact_riley',
        need: { dominance: 4, nerve: 3 },
        softLock: true,
        require: (s) => !s.flags.impactPlay,
      },
      {
        text: 'Ask Lola for rope on Riley [DOM 5]',
        next: 'xt_bdsm_riley',
        need: { dominance: 5, insight: 3 },
        softLock: true,
        require: (s) => !s.flags.bdsmSession,
      },
      {
        text: 'Ambush Riley in the hallway — CNC [DOM 5]',
        next: 'kink_riley_cnc',
        need: { dominance: 5, charm: 3 },
        softLock: true,
        require: (s) => !s.flags.rileyCnc,
      },
      {
        text: 'Open Riley’s kink menu (5 kinks)',
        next: 'kink_riley_hub',
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
    text: 'Lola twists her fingers in her skirt, eyes low. “You can keep playing roommate roulette… or you can use me properly. Collar. Rope. Free-use. Orgy. CNC if you negotiate it. I am not offering to be in charge. I am offering to obey.”',
    focus: 'jade',
    chapter: 'Act II · Fallout',
    choices: [
      {
        text: 'Take her somewhere private',
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
        text: 'Collar her [DOM 4]',
        next: 'xt_collar',
        need: { dominance: 4 },
        softLock: true,
        require: (s) => !s.flags.collarClaim,
      },
      {
        text: 'Ask about the blackmail timer [INS 3]',
        next: 'xt_blackmail_timer',
        need: { insight: 3, dominance: 2 },
        softLock: true,
        require: (s) => !s.flags.blackmailTimer && (s.flags.blackmailJade || s.flags.phoneLeak || s.flags.closetJade),
      },
      {
        text: 'Tie her up [DOM 5 · INS 3]',
        next: 'xt_bdsm',
        need: { dominance: 5, insight: 3 },
        softLock: true,
        require: (s) => !s.flags.bdsmSession,
      },
      {
        text: 'Put her in a locked-door orgy [NRV 5]',
        next: 'xt_orgy',
        need: { nerve: 5, stamina: 4 },
        softLock: true,
        require: (s) => !s.flags.orgyNight,
      },
      {
        text: 'Take Lola in a CNC scene [DOM 6]',
        next: 'kink_jade_cnc',
        need: { dominance: 6, nerve: 5 },
        softLock: true,
        require: (s) => !s.flags.jadeCnc,
      },
      {
        text: 'Open Lola’s submissive kink menu (5 kinks)',
        next: 'kink_jade_hub',
      },
      {
        text: 'Slide back into the party',
        next: 'mid_hub',
        effect: { flags: { phase: 'mid' } },
      },
    ],
  },
}
