import type { Scene } from './types'

/**
 * Five signature kinks per roommate (all 21+, negotiated, safeword: lease).
 * Maya: exhibition, facesitting, spit/sloppy, mirror-cheating, CNC laundry ambush
 * Riley: praise, pet play, overstim, soft degradation, CNC hallway ambush
 * Lola: kneel, beg, blindfold, edged, CNC “planned to be taken” (submissive)
 */
export const KINK_ROUTE_SCENES: Record<string, Scene> = {
  // —— MAYA KINK HUB ——
  kink_maya_hub: {
    id: 'kink_maya_hub',
    speaker: 'maya',
    text: 'Maya ticks options on her fingers like a drink order. “Five of mine, if you can keep up: exhibition — people almost seeing. Facesitting until you tap. Spit and sloppy. Mirror — make me watch myself cheat. And CNC — laundry ambush script, we negotiate first. Safeword lease. Pick.”',
    focus: 'maya',
    chapter: 'Act II · Kinks',
    choices: [
      {
        text: 'Exhibition — almost caught on purpose',
        next: 'kink_maya_exhibit',
        require: (s) => !s.flags.mayaExhibit,
      },
      {
        text: 'Facesitting until you tap',
        next: 'kink_maya_facesit',
        require: (s) => !s.flags.mayaFacesit,
        need: { stamina: 3 },
        softLock: true,
      },
      {
        text: 'Spit / sloppy / messy',
        next: 'kink_maya_spit',
        require: (s) => !s.flags.mayaSpit,
      },
      {
        text: 'Mirror — watch herself betray',
        next: 'kink_maya_mirror',
        require: (s) => !s.flags.mayaMirror,
        need: { nerve: 3 },
        softLock: true,
      },
      {
        text: 'Ambush Maya in the laundry — CNC [DOM 5]',
        next: 'kink_maya_cnc',
        require: (s) => !s.flags.mayaCnc,
        need: { dominance: 5, nerve: 4 },
        softLock: true,
      },
      { text: 'Back to escalating with Maya', next: 'maya_escalate' },
      { text: 'Back into the party', next: 'mid_hub' },
    ],
  },

  kink_maya_exhibit: {
    id: 'kink_maya_exhibit',
    speaker: 'maya',
    text: 'Maya keeps the balcony door cracked and her voice just loud enough. Curtains breathe. A stranger’s laugh floats up from the yard. She rides you facing the night and flips off the dark when headlights sweep the street. “Almost,” she pants. “Almost is the point.”',
    focus: 'maya',
    nsfw: true,
    art: 'sex_maya_balcony',
    choices: [
      {
        text: 'Pull her back inside before it tips',
        next: 'kink_maya_hub',
        effect: {
          affection: { maya: 3 },
          flags: { mayaExhibit: true, balconyMaya: true, caughtAlmost: true, deepMaya: true },
          skills: { nerve: 1 },
        },
      },
    ],
  },

  kink_maya_facesit: {
    id: 'kink_maya_facesit',
    speaker: 'maya',
    text: 'Maya parks herself on your mouth like she pays rent with it. “Breathe when I let you.” She grinds through two orgasms, laughing when you tap once — then lifts a centimeter. “Lease if you mean it.” You do not say lease. She comes a third time and finally rolls off, thighs shaking, lipstick ruined.',
    focus: 'maya',
    nsfw: true,
    art: 'sex_maya_knees',
    choices: [
      {
        text: 'Gasping aftercare',
        next: 'kink_maya_hub',
        effect: {
          affection: { maya: 3 },
          flags: { mayaFacesit: true, bathroomMaya: true, deepMaya: true },
          skills: { stamina: 1, dominance: 1 },
        },
      },
    ],
  },

  kink_maya_spit: {
    id: 'kink_maya_spit',
    speaker: 'maya',
    text: 'Maya wants it disgusting on purpose — spit on her tongue, spit on her chest, messy throat until mascara runs. She makes you look. “Tyler likes pretty. I like evidence.” When she finishes she wipes her mouth with the back of her hand and grins like a crime scene selfie.',
    focus: 'maya',
    nsfw: true,
    art: 'sex_maya_hard',
    choices: [
      {
        text: 'Clean her up anyway',
        next: 'kink_maya_hub',
        effect: {
          affection: { maya: 2 },
          flags: { mayaSpit: true, deepMaya: true, exBetrayal: true },
          skills: { nerve: 1 },
        },
      },
    ],
  },

  kink_maya_mirror: {
    id: 'kink_maya_mirror',
    speaker: 'maya',
    text: 'Bathroom bathroom. Fogged glass. Maya makes you hold her chin toward her own reflection while you take her. “Say I am cheating. Say it while I watch.” She comes staring at herself — not you — then softens for half a second. “Okay. That one got me.”',
    focus: 'maya',
    nsfw: true,
    art: 'sex_maya_bathroom',
    choices: [
      {
        text: 'Kiss her temple after',
        next: 'kink_maya_hub',
        effect: {
          affection: { maya: 3 },
          flags: { mayaMirror: true, bathroomMaya: true, deepMaya: true, exBetrayal: true },
          skills: { insight: 1, nerve: 1 },
        },
      },
    ],
  },

  kink_maya_cnc: {
    id: 'kink_maya_cnc',
    speaker: 'maya',
    text: 'Maya sits on the dryer and goes deadly clear. “CNC. Caught-in-laundry script. I fight, I swear, I say no. You pin me anyway. Lease ends it instantly — two taps if my mouth is busy. If you freeze when I safeword, we never do this again.” She hops down and walks out. Your cue.',
    focus: 'maya',
    chapter: 'Act II · Kinks',
    choices: [
      {
        text: 'Pin her against the machines',
        next: 'kink_maya_cnc_play',
        effect: { affection: { maya: 1 }, skills: { dominance: 1 } },
      },
      { text: 'Back out — not tonight', next: 'kink_maya_hub' },
    ],
  },

  kink_maya_cnc_play: {
    id: 'kink_maya_cnc_play',
    speaker: 'maya',
    text: 'Ten minutes later she ‘accidentally’ finds you in laundry and the script flips — shove, pinned wrists, her protests filthy and half-real against the machines. She thrashes, comes thrashing, then taps twice on purpose just to test you. You stop cold. She laughs wetly, eyes bright. “Good. Now finish me for real — still green.” You do — hard, until she is wrecked against the dryer.',
    focus: 'maya',
    nsfw: true,
    art: 'sex_maya_laundry',
    choices: [
      {
        text: 'Back to Maya’s kinks',
        next: 'kink_maya_hub',
        effect: {
          affection: { maya: 3 },
          flags: {
            mayaCnc: true,
            cncPlay: true,
            bathroomMaya: true,
            laundryMaya: true,
            deepMaya: true,
          },
          skills: { dominance: 1, nerve: 1 },
        },
      },
      {
        text: 'Back into the party',
        next: 'mid_hub',
        effect: {
          affection: { maya: 3 },
          flags: {
            mayaCnc: true,
            cncPlay: true,
            bathroomMaya: true,
            laundryMaya: true,
            deepMaya: true,
          },
          skills: { dominance: 1, nerve: 1 },
        },
      },
    ],
  },

  // —— RILEY KINK HUB ——
  kink_riley_hub: {
    id: 'kink_riley_hub',
    speaker: 'riley',
    text: 'Riley’s list is quieter and somehow filthier. “Praise — call me good while I am bad. Pet stuff — collar voice, not forever. Overstim — make me come until I cry. Soft degradation — mean words, then cuddles. And… CNC. Hallway ambush. With a script. Safeword lease. Please do not laugh.”',
    focus: 'riley',
    chapter: 'Act II · Kinks',
    choices: [
      {
        text: 'Praise kink — good girl traitor',
        next: 'kink_riley_praise',
        require: (s) => !s.flags.rileyPraise,
      },
      {
        text: 'Pet play — soft collar voice',
        next: 'kink_riley_pet',
        require: (s) => !s.flags.rileyPet,
        need: { charm: 3 },
        softLock: true,
      },
      {
        text: 'Overstim until she cries',
        next: 'kink_riley_overstim',
        require: (s) => !s.flags.rileyOverstim,
        need: { stamina: 4 },
        softLock: true,
      },
      {
        text: 'Soft degradation + aftercare',
        next: 'kink_riley_degrade',
        require: (s) => !s.flags.rileyDegrade,
        need: { dominance: 3 },
        softLock: true,
      },
      {
        text: 'Ambush Riley in the hallway — CNC [DOM 5]',
        next: 'kink_riley_cnc',
        require: (s) => !s.flags.rileyCnc,
        need: { dominance: 5, charm: 3 },
        softLock: true,
      },
      { text: 'Back to escalating with Riley', next: 'riley_escalate' },
      { text: 'Back into the party', next: 'mid_hub' },
    ],
  },

  kink_riley_praise: {
    id: 'kink_riley_praise',
    speaker: 'riley',
    text: 'Riley comes apart on praise faster than roughness. “Good girl” while she breaks the pact makes her sob and grind harder. You narrate every filthy loyal thing she is doing for you and she nods through tears, whispering “I am — I am —” until she shakes through another orgasm.',
    focus: 'riley',
    nsfw: true,
    art: 'sex_riley_ride',
    choices: [
      {
        text: 'Hold her and keep saying it',
        next: 'kink_riley_hub',
        effect: {
          affection: { riley: 3 },
          flags: { rileyPraise: true, couchRiley: true, deepRiley: true },
          skills: { charm: 1 },
        },
      },
    ],
  },

  kink_riley_pet: {
    id: 'kink_riley_pet',
    speaker: 'riley',
    text: 'Riley kneels on a throw pillow, cheeks burning, and asks for the soft voice — not ownership forever, just tonight. You scratch behind her ear while she takes you. She nuzzles your wrist after she comes, then hides her face. “If Lola saw that she would end me. Worth it.”',
    focus: 'riley',
    nsfw: true,
    art: 'sex_riley_collar',
    choices: [
      {
        text: 'Water and forehead kisses',
        next: 'kink_riley_hub',
        effect: {
          affection: { riley: 3 },
          flags: { rileyPet: true, deepRiley: true, corruptRiley: true },
          skills: { charm: 1, dominance: 1 },
        },
      },
    ],
  },

  kink_riley_overstim: {
    id: 'kink_riley_overstim',
    speaker: 'riley',
    text: 'Riley’s limit talk is clear: stop on lease, keep going through shakes otherwise. You edge her, then force her through back-to-back orgasms until she is laughing and crying into the sheets. She taps once for mercy, never twice. When you stop she pulls you back with wrecked honesty: “One more. Then blanket.”',
    focus: 'riley',
    nsfw: true,
    art: 'sex_riley_control',
    choices: [
      {
        text: 'Blanket. Water. Quiet.',
        next: 'kink_riley_hub',
        effect: {
          affection: { riley: 3 },
          flags: { rileyOverstim: true, dormRiley: true, deepRiley: true },
          skills: { stamina: 1, dominance: 1 },
        },
      },
    ],
  },

  kink_riley_degrade: {
    id: 'kink_riley_degrade',
    speaker: 'riley',
    text: 'Riley asks for mean words with a safe landing pad. You call her pact-breaker, roommate whore, soft liar — and she comes on it, then immediately needs your hand in her hair gentle. “Mean during. Soft after. That is the deal.” You honor both halves.',
    focus: 'riley',
    nsfw: true,
    art: 'sex_riley_stomach',
    choices: [
      {
        text: 'Aftercare like you meant the soft part',
        next: 'kink_riley_hub',
        effect: {
          affection: { riley: 3 },
          flags: { rileyDegrade: true, deepRiley: true, corruptRiley: true },
          skills: { dominance: 1, charm: 1 },
        },
      },
    ],
  },

  kink_riley_cnc: {
    id: 'kink_riley_cnc',
    speaker: 'riley',
    text: 'Riley shows you her phone twice — limits typed neat. “Hallway ambush. Soft noes. Mean voice. Lease stops everything. Lola can watch from a cracked door as safety if you want. I am scared and I still want it.” She puts the phone away and steps into the hall.',
    focus: 'riley',
    chapter: 'Act II · Kinks',
    choices: [
      {
        text: 'Pin her to the hallway wall',
        next: 'kink_riley_cnc_play',
        effect: { affection: { riley: 1 }, skills: { dominance: 1 } },
      },
      { text: 'Back out — not tonight', next: 'kink_riley_hub' },
    ],
  },

  kink_riley_cnc_play: {
    id: 'kink_riley_cnc_play',
    speaker: 'riley',
    text: 'She plays startled perfect — soft noes, shaking, clinging as you pin her against the hallway wall. Mid-scene she whispers lease; you freeze. She kisses you shaking and breathes, “Green again. Keep going.” She comes crying into your shoulder while Lola’s door stays cracked, silent safety. No soft landing — she pushes you toward the party before anyone asks questions.',
    focus: 'riley',
    nsfw: true,
    art: 'sex_group_hallway',
    choices: [
      {
        text: 'Back to Riley’s kinks',
        next: 'kink_riley_hub',
        effect: {
          affection: { riley: 3, jade: 1 },
          flags: {
            rileyCnc: true,
            cncPlay: true,
            couchRiley: true,
            deepRiley: true,
            corruptRiley: true,
          },
          skills: { dominance: 1, charm: 1 },
        },
      },
      {
        text: 'Back into the party',
        next: 'mid_hub',
        effect: {
          affection: { riley: 3, jade: 1 },
          flags: {
            rileyCnc: true,
            cncPlay: true,
            couchRiley: true,
            deepRiley: true,
            corruptRiley: true,
          },
          skills: { dominance: 1, charm: 1 },
        },
      },
    ],
  },

  // —— LOLA KINK HUB (submissive) ——
  kink_jade_hub: {
    id: 'kink_jade_hub',
    speaker: 'jade',
    text: 'Lola’s voice goes tiny. “Five things I… want. Kneeling until my knees hurt. Begging out loud. Blindfold so I cannot brace. Being edged until I cry. And CNC — please take me like I planned to be taken. Safeword lease. Please pick. Please do not make me pick.”',
    focus: 'jade',
    chapter: 'Act II · Kinks',
    choices: [
      {
        text: 'Make her kneel and stay',
        next: 'kink_jade_femdom',
        require: (s) => !s.flags.jadeFemdom,
      },
      {
        text: 'Make her beg for it',
        next: 'kink_jade_service',
        require: (s) => !s.flags.jadeService,
        need: { dominance: 3 },
        softLock: true,
      },
      {
        text: 'Blindfold her',
        next: 'kink_jade_sensory',
        require: (s) => !s.flags.jadeSensory,
        need: { nerve: 3 },
        softLock: true,
      },
      {
        text: 'Edge her until she breaks',
        next: 'kink_jade_denial',
        require: (s) => !s.flags.jadeDenial,
        need: { dominance: 4, stamina: 3 },
        softLock: true,
      },
      {
        text: 'Take Lola like she planned — CNC [DOM 6]',
        next: 'kink_jade_cnc',
        require: (s) => !s.flags.jadeCnc,
        need: { dominance: 6, nerve: 4 },
        softLock: true,
      },
      { text: 'Back to escalating with Lola', next: 'jade_escalate' },
      { text: 'Back into the party', next: 'mid_hub' },
    ],
  },

  kink_jade_femdom: {
    id: 'kink_jade_femdom',
    speaker: 'jade',
    text: 'Lola drops the second you point at the floor. Eyes down. Palms up. She takes you into her mouth like gratitude and stays there after she finishes you — waiting, drooling a little, hoping you call her good. When you do, she shivers like praise is stronger than sex.',
    focus: 'jade',
    nsfw: true,
    art: 'sex_jade_kneel',
    choices: [
      {
        text: 'Tell her she can look up',
        next: 'kink_jade_hub',
        effect: {
          affection: { jade: 3 },
          flags: { jadeFemdom: true, closetJade: true, deepJade: true, markedByJade: true },
          skills: { dominance: 1 },
        },
      },
    ],
  },

  kink_jade_service: {
    id: 'kink_jade_service',
    speaker: 'jade',
    text: 'You make Lola beg before every touch — please for fingers, please for mouth, please to come. Her sharp eyeliner goes wet. “Please use me — please — I will be quiet — I will be loud — whatever you want—” She comes on a broken please and thanks you like she stole it.',
    focus: 'jade',
    nsfw: true,
    art: 'sex_jade_pin',
    choices: [
      {
        text: 'Kiss her forehead after',
        next: 'kink_jade_hub',
        effect: {
          affection: { jade: 3 },
          flags: { jadeService: true, deepJade: true },
          skills: { dominance: 1, charm: 1 },
        },
      },
    ],
  },

  kink_jade_sensory: {
    id: 'kink_jade_sensory',
    speaker: 'jade',
    text: 'Blindfold on Lola. She startles at every touch, then melts. Without eye contact she cannot perform cool — only soft gasps and “please do not stop.” You take her slow in the dark until she is shaking and clutching the sheets. When the blindfold lifts she looks wrecked and happy.',
    focus: 'jade',
    nsfw: true,
    art: 'sex_bdsm',
    choices: [
      {
        text: 'Hold her while she comes down',
        next: 'kink_jade_hub',
        effect: {
          affection: { jade: 3 },
          flags: { jadeSensory: true, deepJade: true, bdsmSession: true },
          skills: { nerve: 1, dominance: 1 },
        },
      },
    ],
  },

  kink_jade_denial: {
    id: 'kink_jade_denial',
    speaker: 'jade',
    text: 'You edge Lola until her voice goes raw — close, stop, close, stop. She sobs into your shoulder promising anything. Only when she is trembling too hard to form sentences do you let her come. She does it silently, then whispers, “Thank you for deciding.”',
    focus: 'jade',
    nsfw: true,
    art: 'sex_jade_bed',
    choices: [
      {
        text: 'Tell her she did perfect',
        next: 'kink_jade_hub',
        effect: {
          affection: { jade: 3 },
          flags: { jadeDenial: true, deepJade: true, markedByJade: true },
          skills: { dominance: 2 },
        },
      },
    ],
  },

  kink_jade_cnc: {
    id: 'kink_jade_cnc',
    speaker: 'jade',
    text: 'Lola scripts her CNC soft and scared on purpose, eyes on the floor. “I will fight a little. I will say no. Lease stops everything. Two taps if I cannot speak.” She stays where she is, waiting to be taken.',
    focus: 'jade',
    chapter: 'Act II · Kinks',
    choices: [
      {
        text: 'Grab her and pin her down',
        next: 'kink_jade_cnc_play',
        effect: { affection: { jade: 1 }, skills: { dominance: 1 } },
      },
      { text: 'Back out — not tonight', next: 'kink_jade_hub' },
    ],
  },

  kink_jade_cnc_play: {
    id: 'kink_jade_cnc_play',
    speaker: 'jade',
    text: 'In-scene Lola trembles through the struggle-play — soft resistance, whispered noes, then melting when you pin her. She comes crying, ruined and smiling, already straightening her skirt. “Again later. Harder.”',
    focus: 'jade',
    nsfw: true,
    art: 'sex_jade_pin',
    choices: [
      {
        text: 'Back to Lola’s kinks',
        next: 'kink_jade_hub',
        effect: {
          affection: { jade: 3 },
          flags: {
            jadeCnc: true,
            cncPlay: true,
            closetJade: true,
            deepJade: true,
            markedByJade: true,
          },
          skills: { dominance: 2, insight: 1 },
        },
      },
      {
        text: 'Back into the party',
        next: 'mid_hub',
        effect: {
          affection: { jade: 3 },
          flags: {
            jadeCnc: true,
            cncPlay: true,
            closetJade: true,
            deepJade: true,
            markedByJade: true,
          },
          skills: { dominance: 2, insight: 1 },
        },
      },
    ],
  },
}
