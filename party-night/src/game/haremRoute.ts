import type { Scene } from './types'

/** Dedicated long harem arc — claim all three roommates and rewrite the pact. */
export const HAREM_SCENES: Record<string, Scene> = {
  harem_pitch: {
    id: 'harem_pitch',
    speaker: 'you',
    text: 'You look at all three of them and say it plain: you do not want to pick. You want the house. Maya’s eyebrows shoot up. Riley almost drops her cup. Jade goes very still — the dangerous kind of still.',
    focus: 'all',
    choices: [{ text: 'Hold the silence', next: 'harem_reaction' }],
  },

  harem_reaction: {
    id: 'harem_reaction',
    speaker: 'all',
    text: 'Maya: “Holy shit.” Riley: “That is… illegal for our friendship.” Jade: “It is not illegal. It is expensive.” She steps closer. “If you want a harem in this lease, you earn it. One claim each. Then a ceremony. Then you belong to the house as much as it belongs to you.”',
    focus: 'all',
    choices: [
      {
        text: 'Accept the claiming trial',
        next: 'harem_terms',
        effect: {
          affection: { maya: 1, riley: 1, jade: 1 },
          flags: { haremRoute: true, threesomeUnlocked: true, pactBroken: true },
        },
      },
      {
        text: 'Joke that you already paid in advance',
        next: 'harem_terms',
        effect: {
          affection: { maya: 2 },
          flags: { haremRoute: true, threesomeUnlocked: true, mayaBet: true },
        },
      },
    ],
  },

  harem_terms: {
    id: 'harem_terms',
    speaker: 'jade',
    text: 'Jade ticks rules on her fingers. “No choosing favorites in public. No screenshots without a vote. Tyler gets blocked before Maya’s claim counts. Riley admits the spring almost-kiss out loud. I keep veto. Break a rule and I open the folder.” Maya salutes. Riley swallows.',
    focus: 'jade',
    choices: [
      {
        text: 'Start with Maya’s claim',
        next: 'harem_claim_maya',
        effect: { flags: { phase: 'harem' } },
      },
      {
        text: 'Start with Riley — softest first',
        next: 'harem_claim_riley',
        effect: { flags: { phase: 'harem' } },
      },
      {
        text: 'Start with Jade — get the veto drunk on power',
        next: 'harem_claim_jade',
        effect: { flags: { phase: 'harem' } },
      },
    ],
  },

  // —— CLAIM MAYA ——
  harem_claim_maya: {
    id: 'harem_claim_maya',
    speaker: 'maya',
    text: 'Maya drags you to the laundry room like a victory lap. “Claim me properly. And Facetime Tyler while you do it — mute him if you want, but I want his name on the screen while you ruin me for the house.”',
    focus: 'maya',
    choices: [
      {
        text: 'Facetime Tyler on mute and fuck her',
        next: 'harem_maya_nsfw',
        effect: { affection: { maya: 3 }, flags: { exBetrayal: true, bathroomMaya: true, laundryMaya: true } },
      },
      {
        text: 'Make her block him first, then claim her',
        next: 'harem_maya_block',
        effect: { affection: { maya: 2 }, flags: { exBetrayal: true } },
      },
    ],
  },

  harem_maya_block: {
    id: 'harem_maya_block',
    speaker: 'maya',
    text: 'Maya blocks Tyler with theatrical flair, then hops on the washer. “Happy? Now make me forget he existed.”',
    focus: 'maya',
    choices: [
      {
        text: 'Claim her hard',
        next: 'harem_maya_nsfw',
        effect: { affection: { maya: 3 }, flags: { bathroomMaya: true, laundryMaya: true } },
      },
    ],
  },

  harem_maya_nsfw: {
    id: 'harem_maya_nsfw',
    speaker: 'maya',
    text: 'Maya comes twice on the washer, laughing through it, phone face-up with Tyler’s muted call still ringing into nowhere. “Tell them I’m claimed,” she gasps. “Tell Riley I folded like laundry.” You write HOUSE GIRL across her stomach in lipstick.',
    focus: 'maya',
    nsfw: true,
    choices: [
      {
        text: 'Mark the claim complete',
        next: 'harem_after_maya',
        effect: {
          affection: { maya: 3 },
          flags: { claimedMaya: true, bodyWriting: true, deepMaya: true, kissedMaya: true },
        },
      },
    ],
  },

  harem_after_maya: {
    id: 'harem_after_maya',
    speaker: 'maya',
    text: 'Maya fixes her lipstick over a ruined smile. “One down. Two to go. If Jade tries to veto me, remind her I already moaned on camera for the archive.”',
    focus: 'maya',
    choices: [
      {
        text: 'Claim Riley next',
        next: 'harem_claim_riley',
        require: (s) => !s.flags.claimedRiley,
      },
      {
        text: 'Claim Jade next',
        next: 'harem_claim_jade',
        require: (s) => !s.flags.claimedJade,
      },
      {
        text: 'All claimed — begin joint night',
        next: 'harem_joint_intro',
        require: (s) => s.flags.claimedMaya && s.flags.claimedRiley && s.flags.claimedJade,
      },
    ],
  },

  // —— CLAIM RILEY ——
  harem_claim_riley: {
    id: 'harem_claim_riley',
    speaker: 'riley',
    text: 'Riley’s bedroom. Fairy lights. The friendship photo watching like a jury. “If I do this, I am not the good one anymore,” she whispers. “Make me say the spring almost out loud. Then fuck the honesty into me.”',
    focus: 'riley',
    choices: [
      {
        text: 'Make her confess, then claim her',
        next: 'harem_riley_confess',
        effect: { affection: { riley: 2 }, flags: { rileyConfessed: true } },
      },
      {
        text: 'Skip talk — claim with her facing the photo',
        next: 'harem_riley_nsfw',
        effect: { affection: { riley: 3 }, flags: { couchRiley: true, dormRiley: true } },
      },
    ],
  },

  harem_riley_confess: {
    id: 'harem_riley_confess',
    speaker: 'riley',
    text: 'Riley stares at the photo. “I kissed Jade’s almost-boyfriend in our kitchen. I stopped. I hated stopping. I want to fail for real this time.” Tears and heat. “Please claim me like I am already guilty.”',
    focus: 'riley',
    choices: [
      {
        text: 'Claim her',
        next: 'harem_riley_nsfw',
        effect: { affection: { riley: 3 }, flags: { couchRiley: true, dormRiley: true } },
      },
    ],
  },

  harem_riley_nsfw: {
    id: 'harem_riley_nsfw',
    speaker: 'riley',
    text: 'Riley comes with the friendship photo in her peripheral vision, whispering sorry and thank you in the same breath. You leave a necklace of marks Jade will inventory. “Tell them I’m claimed,” she begs softly. “Tell Maya I am not sweet tonight.”',
    focus: 'riley',
    nsfw: true,
    choices: [
      {
        text: 'Seal Riley’s claim',
        next: 'harem_after_riley',
        effect: {
          affection: { riley: 3 },
          flags: { claimedRiley: true, deepRiley: true, kissedRiley: true, sharedSecret: true },
        },
      },
    ],
  },

  harem_after_riley: {
    id: 'harem_after_riley',
    speaker: 'riley',
    text: 'Riley pulls the jersey back on like a lie. “I can still bake tomorrow. Tonight I am house property. Who’s next?”',
    focus: 'riley',
    choices: [
      {
        text: 'Claim Maya next',
        next: 'harem_claim_maya',
        require: (s) => !s.flags.claimedMaya,
      },
      {
        text: 'Claim Jade next',
        next: 'harem_claim_jade',
        require: (s) => !s.flags.claimedJade,
      },
      {
        text: 'All claimed — begin joint night',
        next: 'harem_joint_intro',
        require: (s) => s.flags.claimedMaya && s.flags.claimedRiley && s.flags.claimedJade,
      },
    ],
  },

  // —— CLAIM JADE ——
  harem_claim_jade: {
    id: 'harem_claim_jade',
    speaker: 'jade',
    text: 'Jade does not take you to a closet. She takes you to her desk, opens the evidence folder, and turns the laptop toward you. “Claim me and you inherit this. Use it wrong and I burn you. Use it right and the house stays obedient.”',
    focus: 'jade',
    choices: [
      {
        text: 'Accept the folder and claim her on the desk',
        next: 'harem_jade_nsfw',
        effect: { affection: { jade: 3 }, flags: { blackmailJade: true, closetJade: true } },
      },
      {
        text: 'Ask her to kneel for once',
        next: 'harem_jade_kneel',
        effect: { affection: { jade: 2 }, flags: { markedByJade: true } },
      },
    ],
  },

  harem_jade_kneel: {
    id: 'harem_jade_kneel',
    speaker: 'jade',
    text: 'Jade kneels like a queen temporarily loaning the floor. “Do not get used to this.” Then she takes you with archival focus, eyes open, recording nothing — for once — because the claim itself is the file.',
    focus: 'jade',
    nsfw: true,
    choices: [
      {
        text: 'Pull her up and finish the claim',
        next: 'harem_jade_nsfw',
        effect: { affection: { jade: 3 }, flags: { closetJade: true } },
      },
    ],
  },

  harem_jade_nsfw: {
    id: 'harem_jade_nsfw',
    speaker: 'jade',
    text: 'Jade comes on her own desk calendar, biting your shoulder hard enough to brand. “I am claimed,” she says like a verdict she wrote herself. “Now the others answer to both of us — carefully.” She redraws MINE on your throat.',
    focus: 'jade',
    nsfw: true,
    choices: [
      {
        text: 'Seal Jade’s claim',
        next: 'harem_after_jade',
        effect: {
          affection: { jade: 3 },
          flags: { claimedJade: true, deepJade: true, kissedJade: true, bodyWriting: true, markedByJade: true },
        },
      },
    ],
  },

  harem_after_jade: {
    id: 'harem_after_jade',
    speaker: 'jade',
    text: 'Jade closes the laptop. “Two more claims, or joint night if you finished the set. Do not make me ask twice.”',
    focus: 'jade',
    choices: [
      {
        text: 'Claim Maya next',
        next: 'harem_claim_maya',
        require: (s) => !s.flags.claimedMaya,
      },
      {
        text: 'Claim Riley next',
        next: 'harem_claim_riley',
        require: (s) => !s.flags.claimedRiley,
      },
      {
        text: 'All claimed — begin joint night',
        next: 'harem_joint_intro',
        require: (s) => s.flags.claimedMaya && s.flags.claimedRiley && s.flags.claimedJade,
      },
    ],
  },

  // —— JOINT HAREM NIGHT ——
  harem_joint_intro: {
    id: 'harem_joint_intro',
    speaker: 'narrator',
    text: 'All three claimed. The guest bedroom becomes a throne room with bad lighting. Maya locks the door. Riley dims the fairy lights she stole from her own room. Jade opens Notes and titles a doc: HOUSE HAREM v1.',
    focus: 'all',
    choices: [
      {
        text: 'Read the first draft rules aloud',
        next: 'harem_rules_draft',
        effect: { flags: { haremRules: true } },
      },
    ],
  },

  harem_rules_draft: {
    id: 'harem_rules_draft',
    speaker: 'jade',
    text: '“One: he sleeps here when we say. Two: no solo exclusivity without a vote. Three: jealousy gets converted into performance, not exile. Four: oath payment still exists if someone goes soft. Five: I edit the doc.” Maya: “Add six — free use on party nights.” Riley, tiny: “Add seven — aftercare is mandatory.”',
    focus: 'all',
    choices: [
      {
        text: 'Sign with your body',
        next: 'harem_joint_1',
        effect: { affection: { maya: 1, riley: 1, jade: 1 }, flags: { haremRules: true, roommateRule: true } },
      },
    ],
  },

  harem_joint_1: {
    id: 'harem_joint_1',
    speaker: 'narrator',
    text: 'They start by using each other for you — Maya’s mouth on Riley while Jade holds Riley’s wrists and narrates. “Look how soft she breaks. Look how loud Maya gets when she is not the center.” When Riley comes, Jade kisses the sound off her lips and points you in.',
    focus: 'all',
    nsfw: true,
    choices: [
      {
        text: 'Take Riley while they kiss',
        next: 'harem_joint_2',
        effect: { affection: { riley: 2, maya: 1, jade: 1 }, flags: { girlOnGirl: true } },
      },
    ],
  },

  harem_joint_2: {
    id: 'harem_joint_2',
    speaker: 'maya',
    text: 'Maya climbs on next, facing Jade, making Jade watch every bounce. “Veto this,” Maya taunts. Jade does not. She leans in and bites Maya’s nipple instead. Maya comes swearing loyalty to a lease.',
    focus: 'maya',
    nsfw: true,
    choices: [
      {
        text: 'Pull Jade onto you after',
        next: 'harem_joint_3',
        effect: { affection: { maya: 2, jade: 2 }, flags: { jealousyTrap: true } },
      },
    ],
  },

  harem_joint_3: {
    id: 'harem_joint_3',
    speaker: 'jade',
    text: 'Jade rides like sentencing. She makes Maya and Riley hold her hands. “Say you are house,” she orders you. You say it. She comes with a tremor she will deny tomorrow, then wipes her mouth and smiles. “Ceremony.”',
    focus: 'jade',
    nsfw: true,
    choices: [
      {
        text: 'Begin the pact rewrite ceremony',
        next: 'harem_ceremony',
        effect: { affection: { jade: 2, maya: 1, riley: 1 } },
      },
    ],
  },

  harem_ceremony: {
    id: 'harem_ceremony',
    speaker: 'all',
    text: 'Phone notes. Candle Maya stole from a bathroom. They stand close enough to share breath and rewrite the sacred rule: we share him. We share blame. We share mornings. Riley cries once. Maya laughs once. Jade hits save.',
    focus: 'all',
    art: 'harem_pact',
    choices: [
      {
        text: 'Seal it with a final round',
        next: 'harem_joint_4',
        effect: { flags: { ceremonyDone: true, sharedSecret: true } },
      },
    ],
  },

  harem_joint_4: {
    id: 'harem_joint_4',
    speaker: 'narrator',
    text: 'Final round is slower and filthier — less performance, more possession. They take turns saying your name like a password. When you finish, they pass the proof between their mouths without being told. Jade: “Archive optional.” Maya: “Archive mandatory.” Riley: “Please just hold me after.”',
    focus: 'all',
    nsfw: true,
    choices: [
      {
        text: 'Hold all three into morning',
        next: 'harem_morning',
        effect: { affection: { maya: 2, riley: 2, jade: 2 }, flags: { oathPayment: true } },
      },
    ],
  },

  harem_morning: {
    id: 'harem_morning',
    speaker: 'narrator',
    text: 'Morning. Coffee. Stolen hoodie on Maya. Riley’s marks half-hidden by her jersey. Jade already editing HOUSE HAREM v1.1. The party trash is still everywhere. Nobody pretends last night was a dream.',
    focus: 'all',
    art: 'harem_morning',
    choices: [
      {
        text: 'Ask what happens on Monday',
        next: 'harem_monday',
      },
      {
        text: 'Ask who sleeps where tonight',
        next: 'harem_schedule',
      },
    ],
  },

  harem_monday: {
    id: 'harem_monday',
    speaker: 'jade',
    text: '“Monday we look normal in class. Monday night you come back. We study. We fuck. We update the doc.” Maya: “Also I need help blocking Tyler’s friends.” Riley: “Also I need help not smiling like a criminal.”',
    focus: 'all',
    choices: [{ text: 'Agree to the schedule', next: 'harem_ending_gate' }],
  },

  harem_schedule: {
    id: 'harem_schedule',
    speaker: 'riley',
    text: 'Riley opens a shared calendar like this is wholesome. “Maya Mondays. Jade veto overrides. Me on soft nights. Party nights are free use.” She blushes. “I cannot believe I said free use out loud.”',
    focus: 'riley',
    choices: [{ text: 'Save the calendar', next: 'harem_ending_gate' }],
  },

  harem_ending_gate: {
    id: 'harem_ending_gate',
    speaker: 'narrator',
    text: 'The house has a new religion and you are both prophet and offering. Time to lock the ending.',
    focus: 'all',
    choices: [
      {
        text: 'Live the harem ending',
        next: 'ending_harem',
        effect: {
          flags: {
            haremRoute: true,
            ceremonyDone: true,
            threesomeUnlocked: true,
            claimedMaya: true,
            claimedRiley: true,
            claimedJade: true,
          },
        },
      },
    ],
  },

  // Extra taboo spur from mid hub
  rent_negotiation: {
    id: 'rent_negotiation',
    speaker: 'jade',
    text: 'Jade corners you by the fridge. “Rent is due conceptually. Maya is short. Riley is soft. I am practical. Pay in performance and I will… reallocate chores.” She means sex. She always means sex when she sounds like a landlord.',
    focus: 'jade',
    choices: [
      {
        text: 'Pay the house in the kitchen',
        next: 'rent_nsfw',
        effect: { affection: { jade: 2, maya: 1, riley: 1 }, flags: { oathPayment: true } },
      },
      {
        text: 'Refuse — keep it messy',
        next: 'mid_hub',
        effect: { affection: { jade: -1 }, flags: { caughtAlmost: true } },
      },
    ],
  },

  rent_nsfw: {
    id: 'rent_nsfw',
    speaker: 'narrator',
    text: 'They take rent on the kitchen counter in shifts while the party thumps. Maya films ten seconds “for accounting.” Riley tallies orgasms like chores. Jade initials your throat in eyeliner: PAID.',
    focus: 'all',
    nsfw: true,
    choices: [
      {
        text: 'Receipt accepted',
        next: 'mid_hub',
        effect: {
          affection: { maya: 2, riley: 2, jade: 2 },
          flags: { bathroomMaya: true, couchRiley: true, closetJade: true, bodyWriting: true, threesomeUnlocked: true },
        },
      },
    ],
  },

  porch_blackmail: {
    id: 'porch_blackmail',
    speaker: 'jade',
    text: 'On the back porch, Jade shows you a draft post: blurry, damning, captioned roommate of the year. “Help me finish the harem properly and this stays private. Get boring and campus gets a newsletter.”',
    focus: 'jade',
    choices: [
      {
        text: 'Agree — push harem harder',
        next: 'harem_terms',
        effect: { affection: { jade: 2 }, flags: { blackmailJade: true, haremRoute: true, phoneLeak: false } },
      },
      {
        text: 'Dare her to post',
        next: 'dare_refuse',
        effect: { flags: { phoneLeak: true, caughtAlmost: true, blackmailJade: true } },
      },
    ],
  },
}
