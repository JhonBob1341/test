import { deepCount, hookedCount, type Scene } from './types'

/**
 * Act II · Deep Night — stretches the party with a second-wave hub
 * and multi-beat arcs before dawn / late_hub unlocks.
 */
export const DEEP_NIGHT_SCENES: Record<string, Scene> = {
  deep_hub: {
    id: 'deep_hub',
    speaker: 'narrator',
    text: 'Two a.m. The playlist loops into something slower and worse. Solo cups look sticky with intent. Maya has a second cigarette. Riley has a second confession. Lola has a second folder. The night is not done with you — it is just changing keys.',
    focus: 'all',
    chapter: 'Act II · Deep Night',
    choices: [
      {
        text: 'Join the living-room truth circle',
        next: 'deep_truth_circle',
        require: (s) => !s.flags.truthCircle,
        for: 'house',
      },
      {
        text: 'Get pulled into a jealousy trap',
        next: 'deep_jealousy',
        require: (s) => !s.flags.jealousyNight && hookedCount(s.flags) >= 1,
        for: 'house',
      },
      {
        text: 'Follow Maya for round two in the laundry',
        next: 'deep_maya_round',
        require: (s) => !s.flags.secondRoundMaya && (s.flags.bathroomMaya || s.flags.laundryMaya || s.affection.maya >= 3),
        for: 'maya',
      },
      {
        text: 'Find Riley baking guilt into cinnamon rolls',
        next: 'deep_riley_round',
        require: (s) => !s.flags.secondRoundRiley && (s.flags.couchRiley || s.flags.kitchenRiley || s.affection.riley >= 3),
        for: 'riley',
      },
      {
        text: 'Let Lola enforce a midnight clause',
        next: 'deep_jade_round',
        require: (s) => !s.flags.secondRoundJade && (s.flags.closetJade || s.flags.markedByJade || s.affection.jade >= 3),
        for: 'jade',
      },
      {
        text: 'Hide when the neighbor knocks',
        next: 'deep_neighbor',
        require: (s) => !s.flags.neighborScare,
        for: 'house',
      },
      {
        text: 'Play bottle-kiss roulette with all three',
        next: 'deep_bottle',
        require: (s) => !s.flags.bottleGame && hookedCount(s.flags) >= 1,
        for: 'house',
      },
      {
        text: 'Take the almost-dawn porch smoke break',
        next: 'deep_false_dawn',
        require: (s) => !s.flags.almostDawn && (s.flags.truthCircle || s.flags.bottleGame || deepCount(s.flags) >= 1),
        for: 'house',
      },
      {
        text: 'Open Maya’s kink menu again',
        next: 'kink_maya_hub',
        require: (s) => s.affection.maya >= 2,
        for: 'maya',
      },
      {
        text: 'Open Riley’s kink menu again',
        next: 'kink_riley_hub',
        require: (s) => s.affection.riley >= 2,
        for: 'riley',
      },
      {
        text: 'Open Lola’s kink menu again',
        next: 'kink_jade_hub',
        require: (s) => s.affection.jade >= 2,
        for: 'jade',
      },
      {
        text: 'Ask for the extreme menu again',
        next: 'extreme_hub',
        require: (s) => s.flags.pactBroken || hookedCount(s.flags) >= 1,
        for: 'house',
      },
      {
        text: 'Drift back to the midnight hub',
        next: 'mid_hub',
        for: 'house',
      },
      {
        text: 'Carry the night upstairs for real',
        next: 'late_hub',
        require: (s) =>
          Boolean(
            s.flags.deepNight ||
              ((s.flags.truthCircle || s.flags.bottleGame || s.flags.almostDawn) &&
                (s.flags.secondRoundMaya || s.flags.secondRoundRiley || s.flags.secondRoundJade || deepCount(s.flags) >= 2)),
          ),
        for: 'house',
        effect: { flags: { phase: 'late', deepNight: true } },
      },
    ],
  },

  deep_truth_circle: {
    id: 'deep_truth_circle',
    speaker: 'narrator',
    text: 'Someone dims the lights and invents rules. Truth only. No phones. Maya goes first and confesses she already broke the pact twice tonight. Riley admits she liked being the second choice. Lola says she has screenshots of both and is bored of mercy. The bottle points at you.',
    focus: 'all',
    chapter: 'Act II · Deep Night',
    choices: [
      {
        text: 'Confess you want all three on record',
        next: 'deep_truth_share',
        for: 'house',
        effect: { affection: { maya: 1, riley: 1, jade: 1 }, flags: { truthCircle: true, threesomeUnlocked: true } },
      },
      {
        text: 'Confess Maya ruined you first',
        next: 'deep_truth_maya',
        for: 'maya',
        effect: { affection: { maya: 2 }, flags: { truthCircle: true, jealousyNight: true } },
      },
      {
        text: 'Confess Riley is the soft knife',
        next: 'deep_truth_riley',
        for: 'riley',
        effect: { affection: { riley: 2 }, flags: { truthCircle: true, sharedSecret: true } },
      },
      {
        text: 'Confess Lola owns the night',
        next: 'deep_truth_jade',
        for: 'jade',
        effect: { affection: { jade: 2 }, flags: { truthCircle: true, markedByJade: true } },
      },
    ],
  },

  deep_truth_share: {
    id: 'deep_truth_share',
    speaker: 'maya',
    text: 'Maya laughs like a dare accepted. “Okay. Democracy of sin.” Riley covers her face. Lola types something into Notes titled SHARED ASSET. The circle breaks into touching — hands, mouths, too public for the living room — until a hallway door creaks and you all scatter laughing.',
    focus: 'all',
    nsfw: true,
    art: 'sex_group_living',
    choices: [
      {
        text: 'Reform in the deep night',
        next: 'deep_hub',
        for: 'house',
        effect: { affection: { maya: 1, riley: 1, jade: 1 }, flags: { girlOnGirl: true, deepNight: true } },
      },
    ],
  },

  deep_truth_maya: {
    id: 'deep_truth_maya',
    speaker: 'maya',
    text: 'Maya’s smile goes sharp. “Good. Say it louder.” She pulls you into the hallway for a victory lap — mouth, teeth, hands under her skirt — while Riley pretends not to watch and Lola definitely watches. Maya finishes you with a whisper: “Now they know who started the fire.”',
    focus: 'maya',
    nsfw: true,
    art: 'sex_maya_phone',
    choices: [{ text: 'Back into deep night', next: 'deep_hub', for: 'house', effect: { affection: { maya: 2 }, flags: { deepMaya: true } } }],
  },

  deep_truth_riley: {
    id: 'deep_truth_riley',
    speaker: 'riley',
    text: 'Riley’s eyes go wet and hungry. “I did not want to be the soft option. I wanted to be the one you break the night for.” She kisses you in front of them — sweet, then filthy — and Maya throws a pillow. Lola files it under leverage.',
    focus: 'riley',
    nsfw: true,
    art: 'sex_riley_couch',
    choices: [
      {
        text: 'Back into deep night',
        next: 'deep_hub',
        for: 'house',
        effect: { affection: { riley: 2 }, flags: { deepRiley: true, rileyConfessed: true } },
      },
    ],
  },

  deep_truth_jade: {
    id: 'deep_truth_jade',
    speaker: 'jade',
    text: 'Lola does not smile. She stands, points at the floor, and you kneel because the circle just became her courtroom. She uses your mouth while Maya and Riley watch in silence, then says, soft as a sentence, “Good. The night has a manager.”',
    focus: 'jade',
    nsfw: true,
    art: 'sex_jade_kneel',
    choices: [
      {
        text: 'Back into deep night',
        next: 'deep_hub',
        for: 'house',
        effect: { affection: { jade: 2 }, flags: { deepJade: true, markedByJade: true } },
      },
    ],
  },

  deep_jealousy: {
    id: 'deep_jealousy',
    speaker: 'narrator',
    text: 'Jealousy arrives dressed as a game. Maya “accidentally” shows Riley a photo. Riley “accidentally” tells Lola what Maya whispered. Lola “accidentally” puts a 10-minute timer on the fridge: pick one of us in public or all three collect.',
    focus: 'all',
    chapter: 'Act II · Deep Night',
    choices: [
      {
        text: 'Kiss Maya in front of them',
        next: 'deep_jealousy_maya',
        for: 'maya',
      },
      {
        text: 'Kiss Riley in front of them',
        next: 'deep_jealousy_riley',
        for: 'riley',
      },
      {
        text: 'Kneel for Lola in front of them',
        next: 'deep_jealousy_jade',
        for: 'jade',
      },
      {
        text: 'Refuse the timer — offer all three',
        next: 'deep_jealousy_all',
        for: 'house',
      },
    ],
  },

  deep_jealousy_maya: {
    id: 'deep_jealousy_maya',
    speaker: 'maya',
    text: 'You kiss Maya like a broadcast. She moans into it on purpose. Riley looks stabbed. Lola looks paid. Maya pulls you into the laundry for a victory fuck against the machines — loud enough to be evidence — then sends you back out glossy.',
    focus: 'maya',
    nsfw: true,
    art: 'sex_maya_laundry',
    choices: [
      {
        text: 'Return to deep night',
        next: 'deep_hub',
        for: 'house',
        effect: {
          affection: { maya: 3, riley: -1 },
          flags: { jealousyNight: true, jealousyTrap: true, laundryMaya: true, deepMaya: true, pactBroken: true },
        },
      },
    ],
  },

  deep_jealousy_riley: {
    id: 'deep_jealousy_riley',
    speaker: 'riley',
    text: 'You choose Riley in public. She cries while she kisses you, which somehow makes it filthier. Maya rolls her eyes and still watches. Lola starts a note titled SOFT WEAPON. Riley takes you to the kitchen counter and lets you ruin her quiet.',
    focus: 'riley',
    nsfw: true,
    art: 'sex_riley_kitchen',
    choices: [
      {
        text: 'Return to deep night',
        next: 'deep_hub',
        for: 'house',
        effect: {
          affection: { riley: 3, maya: -1 },
          flags: { jealousyNight: true, jealousyTrap: true, kitchenRiley: true, deepRiley: true, pactBroken: true },
        },
      },
    ],
  },

  deep_jealousy_jade: {
    id: 'deep_jealousy_jade',
    speaker: 'jade',
    text: 'You kneel. Lola’s fingers in your hair are gentle and absolute. Maya swears. Riley looks hungry and scared. Lola uses the audience — makes you praise her while you serve — then dismisses the room with a soft “Out.” She keeps you.',
    focus: 'jade',
    nsfw: true,
    art: 'sex_jade_collar',
    choices: [
      {
        text: 'Return to deep night',
        next: 'deep_hub',
        for: 'house',
        effect: {
          affection: { jade: 3 },
          flags: { jealousyNight: true, jealousyTrap: true, markedByJade: true, deepJade: true, collarClaim: true },
        },
      },
    ],
  },

  deep_jealousy_all: {
    id: 'deep_jealousy_all',
    speaker: 'narrator',
    text: 'You refuse the timer and say the quiet part: all three. The jealousy does not die — it mutates. Hands everywhere. Mouths competing. Someone’s phone falls face-down and stays there. When it ends you are marked by three different shades of lipstick and the fridge timer is still beeping like applause.',
    focus: 'all',
    nsfw: true,
    art: 'sex_group_kitchen',
    choices: [
      {
        text: 'Return to deep night',
        next: 'deep_hub',
        for: 'house',
        effect: {
          affection: { maya: 2, riley: 2, jade: 2 },
          flags: {
            jealousyNight: true,
            threesomeUnlocked: true,
            haremRoute: true,
            deepNight: true,
            pactBroken: true,
          },
        },
      },
    ],
  },

  deep_maya_round: {
    id: 'deep_maya_round',
    speaker: 'maya',
    text: 'Maya catches your belt again after midnight. “Round one was cute. Round two is mean.” She wants the balcony door cracked, your hand on her throat, and a dare: finish her before the next chorus ends. If you fail, she texts Tyler a blurred photo. If you win, she deletes his number live.',
    focus: 'maya',
    chapter: 'Act II · Deep Night',
    choices: [
      {
        text: 'Take the timed balcony dare',
        next: 'deep_maya_nsfw',
        for: 'maya',
        need: { stamina: 3, nerve: 3 },
        softLock: true,
      },
      {
        text: 'Drag her inside and do it louder instead',
        next: 'deep_maya_nsfw',
        for: 'maya',
        effect: { skills: { nerve: 1 } },
      },
    ],
  },

  deep_maya_nsfw: {
    id: 'deep_maya_nsfw',
    speaker: 'maya',
    text: 'Maya rides the dare like a threat. Curtains breathe. Bass shakes the railing. She comes with her teeth in your shoulder and her phone unlocked in her hand — then, laughing, deletes Tyler while still clenched around you. “Round two secured. Don’t get soft before dawn.”',
    focus: 'maya',
    nsfw: true,
    art: 'sex_maya_balcony',
    choices: [
      {
        text: 'Back to deep night',
        next: 'deep_hub',
        for: 'house',
        effect: {
          affection: { maya: 3 },
          flags: {
            secondRoundMaya: true,
            balconyMaya: true,
            deepMaya: true,
            exBetrayal: true,
            caughtAlmost: true,
            pactBroken: true,
          },
          skills: { stamina: 1, nerve: 1 },
        },
      },
    ],
  },

  deep_riley_round: {
    id: 'deep_riley_round',
    speaker: 'riley',
    text: 'Riley’s kitchen smells like cinnamon and collapse. “I keep baking so I do not beg. It is not working.” She wants round two softer in voice and filthier in action — on the counter, jersey gone, door unlocked on purpose. “If they walk in… that is part of it.”',
    focus: 'riley',
    chapter: 'Act II · Deep Night',
    choices: [
      {
        text: 'Take her on the counter with the door open',
        next: 'deep_riley_nsfw',
        for: 'riley',
      },
      {
        text: 'Carry her to her room and lock it',
        next: 'deep_riley_nsfw',
        for: 'riley',
        effect: { affection: { riley: 1 } },
      },
    ],
  },

  deep_riley_nsfw: {
    id: 'deep_riley_nsfw',
    speaker: 'riley',
    text: 'Riley comes apart whispering apologies that sound like porn. Flour on her thighs. Soft voice begging hard things. When she finishes she holds your face and says, “Stay in the night with me. Do not rush dawn. I am not done being bad.”',
    focus: 'riley',
    nsfw: true,
    art: 'sex_riley_kitchen',
    choices: [
      {
        text: 'Back to deep night',
        next: 'deep_hub',
        for: 'house',
        effect: {
          affection: { riley: 3 },
          flags: {
            secondRoundRiley: true,
            kitchenRiley: true,
            deepRiley: true,
            corruptRiley: true,
            pactBroken: true,
          },
          skills: { charm: 1, stamina: 1 },
        },
      },
    ],
  },

  deep_jade_round: {
    id: 'deep_jade_round',
    speaker: 'jade',
    text: 'Lola opens her laptop to a document titled MIDNIGHT CLAUSE v2. “Round two is enforcement. You will follow. You will not improvise unless I tell you to improvise.” She wants the stairs again — public enough to terrify, controlled enough to please her.',
    focus: 'jade',
    chapter: 'Act II · Deep Night',
    choices: [
      {
        text: 'Obey the stairs clause',
        next: 'deep_jade_nsfw',
        for: 'jade',
        need: { dominance: 2 },
        softLock: true,
      },
      {
        text: 'Ask her to rewrite the clause with your hands',
        next: 'deep_jade_nsfw',
        for: 'jade',
        effect: { affection: { jade: 1 }, skills: { insight: 1 } },
      },
    ],
  },

  deep_jade_nsfw: {
    id: 'deep_jade_nsfw',
    speaker: 'jade',
    text: 'On the stairs Lola stays quiet on purpose so every wet sound is evidence. She comes with her forehead on your shoulder and her fingers counting your pulse. “Clause satisfied. Extension available until dawn.” She buttons nothing. She wants them to see the mess.',
    focus: 'jade',
    nsfw: true,
    art: 'sex_jade_stairs',
    choices: [
      {
        text: 'Back to deep night',
        next: 'deep_hub',
        for: 'house',
        effect: {
          affection: { jade: 3 },
          flags: {
            secondRoundJade: true,
            stairsJade: true,
            deepJade: true,
            markedByJade: true,
            blackmailJade: true,
            pactBroken: true,
          },
          skills: { dominance: 1, insight: 1 },
        },
      },
    ],
  },

  deep_neighbor: {
    id: 'deep_neighbor',
    speaker: 'narrator',
    text: 'A knock. Not guest-knock — neighbor-knock. Everyone freezes mid-sin. Maya mouths fuck. Riley hides a bra under a cookbook. Lola opens the door with landlord calm while you and the other two are stuffed into the hall closet breathing the same perfume.',
    focus: 'all',
    chapter: 'Act II · Deep Night',
    choices: [
      {
        text: 'Stay silent in the closet',
        next: 'deep_neighbor_closet',
        for: 'house',
      },
      {
        text: 'Make it worse — touch them in the dark',
        next: 'deep_neighbor_closet',
        for: 'house',
        need: { nerve: 3 },
        softLock: true,
        effect: { skills: { nerve: 1 } },
      },
    ],
  },

  deep_neighbor_closet: {
    id: 'deep_neighbor_closet',
    speaker: 'narrator',
    text: 'The closet is a crime in three temperatures. Maya bites your shoulder to stay quiet. Riley shakes with laughter and want. Lola’s voice drifts through the door, polite, deadly. When the neighbor leaves, nobody exits clean — hands finish what fear started, frantic and silent, until the three of you spill back into the hall wrecked.',
    focus: 'all',
    nsfw: true,
    art: 'sex_jade_closet',
    choices: [
      {
        text: 'Spill back into deep night',
        next: 'deep_hub',
        for: 'house',
        effect: {
          affection: { maya: 2, riley: 2, jade: 2 },
          flags: {
            neighborScare: true,
            caughtAlmost: true,
            threesomeUnlocked: true,
            deepNight: true,
            pactBroken: true,
          },
          skills: { discretion: 1, nerve: 1 },
        },
      },
    ],
  },

  deep_bottle: {
    id: 'deep_bottle',
    speaker: 'maya',
    text: 'Maya spins an empty bottle on the coffee table. “Kiss roulette. Then escalate whatever it lands on. House rules: no chicken-outs unless lease.” The bottle is already sticky with bad ideas.',
    focus: 'all',
    chapter: 'Act II · Deep Night',
    choices: [
      {
        text: 'Let it land on Maya',
        next: 'deep_bottle_maya',
        for: 'maya',
      },
      {
        text: 'Let it land on Riley',
        next: 'deep_bottle_riley',
        for: 'riley',
      },
      {
        text: 'Let it land on Lola',
        next: 'deep_bottle_jade',
        for: 'jade',
      },
      {
        text: 'Nudge it so it somehow implicates all three',
        next: 'deep_bottle_all',
        for: 'house',
        need: { nerve: 3, charm: 2 },
        softLock: true,
      },
    ],
  },

  deep_bottle_maya: {
    id: 'deep_bottle_maya',
    speaker: 'maya',
    text: 'Maya kisses like a dare with teeth, then escalates on the couch in front of everyone until the bottle game becomes a show. She finishes loud on purpose. “Next spin better be jealous.”',
    focus: 'maya',
    nsfw: true,
    art: 'sex_maya_edge',
    choices: [
      {
        text: 'Back to deep night',
        next: 'deep_hub',
        for: 'house',
        effect: { affection: { maya: 2 }, flags: { bottleGame: true, deepMaya: true, pactBroken: true } },
      },
    ],
  },

  deep_bottle_riley: {
    id: 'deep_bottle_riley',
    speaker: 'riley',
    text: 'Riley kisses soft, then ruins soft by climbing into your lap while Maya counts and Lola records nothing (she says). Riley comes quiet and shaking and still somehow owns the room.',
    focus: 'riley',
    nsfw: true,
    art: 'sex_riley_ride',
    choices: [
      {
        text: 'Back to deep night',
        next: 'deep_hub',
        for: 'house',
        effect: { affection: { riley: 2 }, flags: { bottleGame: true, deepRiley: true, pactBroken: true } },
      },
    ],
  },

  deep_bottle_jade: {
    id: 'deep_bottle_jade',
    speaker: 'jade',
    text: 'Lola does not kiss first. She points. You kneel. The bottle game becomes obedience theater — mouth, praise, her hand in your hair — until Maya swears and Riley looks converted.',
    focus: 'jade',
    nsfw: true,
    art: 'sex_jade_kneel',
    choices: [
      {
        text: 'Back to deep night',
        next: 'deep_hub',
        for: 'house',
        effect: { affection: { jade: 2 }, flags: { bottleGame: true, deepJade: true, markedByJade: true } },
      },
    ],
  },

  deep_bottle_all: {
    id: 'deep_bottle_all',
    speaker: 'narrator',
    text: 'The bottle refuses to pick one. Perfect. What follows is messy democracy: three mouths, two laughs, one quiet command from Lola that somehow runs the chaos. When it ends the coffee table is sacred and sticky and nobody pretends the pact still breathes.',
    focus: 'all',
    nsfw: true,
    art: 'sex_group_couch',
    choices: [
      {
        text: 'Back to deep night',
        next: 'deep_hub',
        for: 'house',
        effect: {
          affection: { maya: 2, riley: 2, jade: 2 },
          flags: { bottleGame: true, threesomeUnlocked: true, deepNight: true, pactBroken: true },
        },
      },
    ],
  },

  deep_false_dawn: {
    id: 'deep_false_dawn',
    speaker: 'narrator',
    text: 'The sky pretends it might become morning. On the porch, the three of them share your hoodie and a cigarette they pass like a treaty. Maya: “We could end it here.” Riley: “Please don’t.” Lola: “Ending is a document. We have not signed.” The night pulls you back inside.',
    focus: 'all',
    chapter: 'Act II · Deep Night',
    choices: [
      {
        text: 'Go back in — the night continues',
        next: 'deep_hub',
        for: 'house',
        effect: {
          affection: { maya: 1, riley: 1, jade: 1 },
          flags: { almostDawn: true, deepNight: true },
        },
      },
      {
        text: 'Ask them upstairs anyway',
        next: 'late_hub',
        for: 'house',
        effect: {
          affection: { maya: 1, riley: 1, jade: 1 },
          flags: { almostDawn: true, deepNight: true, phase: 'late' },
        },
      },
    ],
  },

  leave_attempt: {
    id: 'leave_attempt',
    speaker: 'narrator',
    text: 'You reach for the door like a person with daylight plans. Maya blocks it with a hip. Riley holds your sleeve. Lola holds up her phone: a draft post, unsent, titled HE TRIED TO LEAVE EARLY. “The night is unfinished,” Lola says. “Come earn an exit.”',
    focus: 'all',
    chapter: 'Act II · Deep Night',
    choices: [
      {
        text: 'Stay and enter deep night',
        next: 'deep_hub',
        for: 'house',
        effect: { affection: { maya: 1, riley: 1, jade: 1 } },
      },
      {
        text: 'Negotiate one more hour, then upstairs',
        next: 'deep_hub',
        for: 'house',
        effect: { flags: { skillTour: true } },
      },
      {
        text: 'Force the ending anyway [NRV 5]',
        next: 'ending_route',
        for: 'house',
        need: { nerve: 5 },
        softLock: true,
        require: (s) => hookedCount(s.flags) >= 2 || deepCount(s.flags) >= 2 || s.flags.deepNight,
      },
    ],
  },
}
