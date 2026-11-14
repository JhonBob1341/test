import { HAREM_SCENES } from './haremRoute'
import { SKILL_EVENT_SCENES } from './skillEvents'
import { claimedCount, deepCount, hookedCount, type Flags, type Scene } from './types'

const BASE_SCENES: Record<string, Scene> = {
  title: {
    id: 'title',
    speaker: 'narrator',
    text: 'THREE ROOMMATES. ONE BLOOD PACT. ONE HOUSE PARTY THAT WILL MAKE THEM SHARE ANYWAY.',
    focus: 'none',
    chapter: 'Title',
    choices: [{ text: 'Enter the party (21+)', next: 'agegate' }],
  },

  agegate: {
    id: 'agegate',
    speaker: 'narrator',
    text: 'Adult dating game. All characters are 21+. Confirm you are 21 or older.',
    focus: 'none',
    choices: [
      { text: 'I am 21 or older — start', next: 'name' },
      { text: 'Leave', next: 'too_young' },
    ],
  },

  too_young: {
    id: 'too_young',
    speaker: 'narrator',
    text: 'Come back when you are 21.',
    focus: 'none',
    ending: 'reject',
    choices: [{ text: 'Back to title', next: 'title' }],
  },

  name: {
    id: 'name',
    speaker: 'narrator',
    text: 'Bass bleeds through the front door of an off-campus house that smells like perfume, laundry detergent, and bad ideas. What do they call you tonight?',
    focus: 'none',
    chapter: 'Act I · Arrival',
    choices: [{ text: 'Continue', next: 'archetype' }],
  },

  street: {
    id: 'street',
    speaker: 'narrator',
    text: 'The street is wet with spilled beer and bad decisions. Two guys argue about the guest list. A girl in glitter heels warns you, “Careful — the roommates who throw this thing collect people.” You keep walking.',
    focus: 'none',
    chapter: 'Act I · Arrival',
    choices: [
      { text: 'Approach the porch', next: 'porch' },
      { text: 'Slip in through the side gate', next: 'side_gate' },
    ],
  },

  porch: {
    id: 'porch',
    speaker: 'narrator',
    text: 'On the porch you overhear three voices through an open window. Maya: “If someone hot shows up, I am breaking the pact.” Riley: “Maya.” Jade: “Let her say it. I want the recording for later.”',
    focus: 'all',
    chapter: 'Act I · Arrival',
    choices: [{ text: 'Walk in like you heard nothing', next: 'arrive' }],
  },

  side_gate: {
    id: 'side_gate',
    speaker: 'narrator',
    text: 'The side gate sticks. In the yard, laundry hangs like surrender flags. A sticky note on the back door in Jade’s handwriting: NO EXES. NO COPS. NO FEELINGS UNLESS SCHEDULED.',
    focus: 'none',
    chapter: 'Act I · Arrival',
    choices: [{ text: 'Enter through the kitchen', next: 'arrive' }],
  },

  arrive: {
    id: 'arrive',
    speaker: 'narrator',
    text: 'First real college house party of the year — and it is happening in their living room. Solo cups on textbooks. A sock on one bedroom doorknob already. Near the kitchen island, three roommates own the night like they paid for it in secrets.',
    focus: 'all',
    chapter: 'Act I · Arrival',
    choices: [{ text: 'Walk over', next: 'meet_maya' }],
  },

  meet_maya: {
    id: 'meet_maya',
    speaker: 'maya',
    text: 'Maya clocks you instantly, honey-blonde hair bouncing. “Fresh meat in our house. I am Maya — I decorate, I drink, I dare. If you are boring I will invent a crime and blame you.”',
    focus: 'maya',
    choices: [{ text: 'Try not to look boring', next: 'meet_riley' }],
  },

  meet_riley: {
    id: 'meet_riley',
    speaker: 'riley',
    text: 'Riley’s smile is soft. Her eyes are not. “She is auditioning you for the group chat. I am Riley. I bake when I spiral and I spiral when I want something I should not want.”',
    focus: 'riley',
    choices: [{ text: 'Noted.', next: 'meet_jade' }],
  },

  meet_jade: {
    id: 'meet_jade',
    speaker: 'jade',
    text: 'Jade does not smile. She studies you like inventory. “Jade. I keep the lease, the Wi-Fi password, and the evidence. Do not waste my night.”',
    focus: 'jade',
    choices: [{ text: 'Ask about the house rules', next: 'house_rules' }],
  },

  house_rules: {
    id: 'house_rules',
    speaker: 'riley',
    text: '“Roommate rules,” Riley says, counting on her fingers. “No dishes in the sink overnight. No borrowing underwear. And the sacred one—” Maya cuts in, glitter flashing: “We do not fuck the same person. Ever.”',
    focus: 'all',
    choices: [{ text: 'Ask what happens if someone breaks it', next: 'pact_payment' }],
  },

  pact_payment: {
    id: 'pact_payment',
    speaker: 'jade',
    text: 'Jade’s mouth curves. “Then the traitor owes the other two a night. No safeword cosplay. No dignity. Screenshots optional. We call it oath payment.” Maya laughs. “We have never collected. Yet.”',
    focus: 'jade',
    choices: [
      {
        text: '“That sounds like a dare.”',
        next: 'pact_threat',
        effect: { affection: { maya: 1 }, flags: { oathPayment: true, mayaBet: true } },
      },
      {
        text: 'Ask who almost broke it before',
        next: 'pact_history',
        effect: { affection: { riley: 1, jade: 1 } },
      },
    ],
  },

  pact_history: {
    id: 'pact_history',
    speaker: 'riley',
    text: 'Riley’s cheeks pink. “There was a guy last spring. Jade liked him. I… almost.” Jade: “You did more than almost. You stopped. That is why you still get soft privileges.” Maya: “Boring ending. Let’s write a better one.”',
    focus: 'riley',
    choices: [{ text: 'Feel the tension thicken', next: 'pact_threat', effect: { flags: { rileyConfessed: true } } }],
  },

  pact_threat: {
    id: 'pact_threat',
    speaker: 'maya',
    text: 'Maya leans in until her mouth almost brushes your ear. “So. Are you the disaster we finally collect on — or are you smart enough to pick one of us and stay loyal?” Jade watches. Riley pretends to check her drink.',
    focus: 'maya',
    chapter: 'Act I · The Pact',
    choices: [
      {
        text: 'Flirt with Maya first — break the ice',
        next: 'maya_dance',
        effect: { affection: { maya: 1 } },
      },
      {
        text: 'Stick with Riley — play soft',
        next: 'riley_drink',
        effect: { affection: { riley: 1 } },
      },
      {
        text: 'Meet Jade’s stare head-on',
        next: 'jade_corner',
        effect: { affection: { jade: 1 } },
      },
      {
        text: 'Ask who is already taken',
        next: 'ex_reveal',
        effect: { affection: { maya: 1 } },
      },
      {
        text: 'Propose a harem — refuse to pick only one',
        next: 'harem_pitch',
        effect: { affection: { maya: 1, riley: 1, jade: 1 }, flags: { haremRoute: true } },
      },
      {
        text: 'Read the room before choosing [INS 3]',
        next: 'insight_read',
        need: { insight: 3 },
        softLock: true,
        effect: { skills: { insight: 1 } },
      },
      {
        text: 'Suggest a skill warm-up around the party first',
        next: 'skill_hub',
        effect: { flags: { phase: 'mid' } },
      },
    ],
  },

  insight_read: {
    id: 'insight_read',
    speaker: 'narrator',
    text: 'Insight paints tells: Maya’s pupils blow when risk is mentioned. Riley’s throat jumps at the word “pact.” Jade catalogues everyone who laughs too loud. You know who breaks first — and who collects after.',
    focus: 'all',
    chapter: 'Act I · The Pact',
    choices: [
      {
        text: 'Exploit Maya’s nerve first',
        next: 'maya_dance',
        effect: { affection: { maya: 2 }, skills: { nerve: 1 } },
      },
      {
        text: 'Exploit Riley’s guilt first',
        next: 'riley_drink',
        effect: { affection: { riley: 2 }, skills: { charm: 1 } },
      },
      {
        text: 'Exploit Jade’s need for control',
        next: 'jade_corner',
        effect: { affection: { jade: 2 }, skills: { dominance: 1 } },
      },
      {
        text: 'Open with the harem proposal [DOM 3 · CHM 2]',
        next: 'harem_pitch',
        need: { dominance: 3, charm: 2 },
        softLock: true,
        effect: { affection: { maya: 1, riley: 1, jade: 1 }, flags: { haremRoute: true }, skills: { dominance: 1 } },
      },
    ],
  },

  ex_reveal: {
    id: 'ex_reveal',
    speaker: 'maya',
    text: 'Maya shrugs like sin is cardio. “I have a situationship named Tyler. He thinks we are exclusive-ish. He is at a different party. He is also very boring in bed.” Riley winces. Jade: “She is advertising treason.”',
    focus: 'maya',
    choices: [
      {
        text: 'Offer to help her commit treason',
        next: 'maya_dance',
        effect: { affection: { maya: 2 }, flags: { exBetrayal: true } },
      },
      {
        text: 'Tell Jade you want the dangerous one',
        next: 'jade_corner',
        effect: { affection: { jade: 2 } },
      },
    ],
  },

  // ════════════ MAYA EARLY ════════════
  maya_dance: {
    id: 'maya_dance',
    speaker: 'maya',
    text: 'Maya steals your wrist into the crush. Her ass finds your hips like practiced insult. “Keep up — or I grind on someone who can. Riley is watching. She hates that. Also Tyler would hate this more. Perfect.”',
    focus: 'maya',
    choices: [
      {
        text: 'Pull her flush and match her',
        next: 'maya_grind',
        effect: { affection: { maya: 2, riley: 1 } },
      },
      {
        text: 'Look at Riley while you dance with Maya',
        next: 'maya_jealous_bait',
        effect: { affection: { maya: 1, riley: 2 }, flags: { jealousyTrap: true } },
      },
      {
        text: 'Ask her to text Tyler a lie right now',
        next: 'maya_text_tyler',
        effect: { affection: { maya: 2 }, flags: { exBetrayal: true } },
      },
      {
        text: 'Out-shameless her in the circle [NRV 3]',
        next: 'skill_dance_win',
        need: { nerve: 3 },
        softLock: true,
        effect: { affection: { maya: 2 }, skills: { nerve: 1, stamina: 1 } },
      },
      {
        text: 'Discreetly finger her while dancing [DSC 4 · NRV 2]',
        next: 'maya_grind',
        need: { discretion: 4, nerve: 2 },
        softLock: true,
        effect: {
          affection: { maya: 3 },
          skills: { discretion: 1 },
          flags: { caughtAlmost: true },
        },
      },
    ],
  },

  maya_text_tyler: {
    id: 'maya_text_tyler',
    speaker: 'maya',
    text: 'Maya types one-handed against your chest: “studying, miss you.” Then she laughs into your mouth. “I am a monster. Touch me like you agree.”',
    focus: 'maya',
    choices: [{ text: 'Agree with your hands', next: 'maya_grind', effect: { affection: { maya: 2 } } }],
  },

  maya_jealous_bait: {
    id: 'maya_jealous_bait',
    speaker: 'maya',
    text: 'Maya notices your glance and laughs mean and delighted. “Oh my god. You are sick. I love that. Make her watch.” She hooks a finger in your waistband under her shirt so Riley can see the shape of the sin without the proof.',
    focus: 'maya',
    choices: [{ text: 'Commit to the show', next: 'maya_grind', effect: { affection: { maya: 2 } } }],
  },

  maya_grind: {
    id: 'maya_grind',
    speaker: 'maya',
    text: 'Heat. Perfume. Your hand under her skirt just enough to be criminal. “Laundry room,” she mouths. “Door locks. Detergent smell. If Jade finds us she will invoice my soul.”',
    focus: 'maya',
    choices: [
      {
        text: 'Follow her to the laundry room',
        next: 'maya_laundry',
        effect: { affection: { maya: 2 }, flags: { kissedMaya: true, pactBroken: true } },
      },
      {
        text: 'Bathroom instead — faster lock',
        next: 'maya_bathroom',
        effect: { affection: { maya: 2 }, flags: { kissedMaya: true, pactBroken: true } },
      },
      {
        text: 'Kiss her on the floor in front of everyone',
        next: 'maya_public',
        effect: {
          affection: { maya: 2, riley: -1, jade: 1 },
          flags: { kissedMaya: true, pactBroken: true, caughtAlmost: true },
        },
      },
    ],
  },

  maya_public: {
    id: 'maya_public',
    speaker: 'narrator',
    text: 'You kiss Maya under the strobes. She moans into it like she wants the whole house as witness. Riley’s cup freezes. Jade’s smile goes knife-thin. Someone films. Maya flips them off without breaking the kiss.',
    focus: 'maya',
    choices: [{ text: 'Drag her somewhere lockable', next: 'maya_laundry' }],
  },

  maya_laundry: {
    id: 'maya_laundry',
    speaker: 'maya',
    text: 'Dryer thumps like a second bassline. Maya hops onto the washer, thighs open, already pulling her panties aside. “Quiet — unless you want my roommates to hear me cheating on a situationship and a pact in the same thrust.”',
    focus: 'maya',
    nsfw: true,
    choices: [
      {
        text: 'Fuck her on the washer',
        next: 'maya_nsfw_washer',
        effect: { affection: { maya: 3 }, flags: { bathroomMaya: true, laundryMaya: true } },
      },
      {
        text: 'Make her face the door — risk footsteps',
        next: 'maya_nsfw_risk',
        effect: { affection: { maya: 3 }, flags: { bathroomMaya: true, laundryMaya: true, caughtAlmost: true } },
      },
      {
        text: 'Write TYLER WHO on her stomach in lipstick',
        next: 'maya_nsfw_write',
        effect: { affection: { maya: 3 }, flags: { bathroomMaya: true, laundryMaya: true, bodyWriting: true, exBetrayal: true } },
      },
    ],
  },

  maya_bathroom: {
    id: 'maya_bathroom',
    speaker: 'maya',
    text: 'Lock clicks. Maya on the sink, thighs open. “Quiet — unless you want my best friends to hear me being a fucking hypocrite.” She guides your hand between her legs. “Soaked. Pact dead. Make oath payment look cheap.”',
    focus: 'maya',
    nsfw: true,
    choices: [
      {
        text: 'Fuck her hard against the mirror',
        next: 'maya_nsfw_hard',
        effect: { affection: { maya: 3 }, flags: { bathroomMaya: true } },
      },
      {
        text: 'Edge her until she offers oath payment herself',
        next: 'maya_nsfw_edge',
        effect: { affection: { maya: 3 }, flags: { bathroomMaya: true, oathPayment: true } },
      },
    ],
  },

  maya_nsfw_washer: {
    id: 'maya_nsfw_washer',
    speaker: 'maya',
    text: 'The washer rattles under Maya as you take her. She laughs through moans. “Tell me I am a bad roommate — say it—” She comes loud enough that the dryer buzzes like applause. “Fuck. I am going to smell like you in the group chat.”',
    focus: 'maya',
    nsfw: true,
    choices: [{ text: 'Finish with her', next: 'maya_after', effect: { affection: { maya: 2 } } }],
  },

  maya_nsfw_risk: {
    id: 'maya_nsfw_risk',
    speaker: 'maya',
    text: 'You turn Maya toward the door, hand over her mouth, fucking her while footsteps pass. She drips down her thighs. When someone jiggles the handle, she comes — silent, violent, traitorous.',
    focus: 'maya',
    nsfw: true,
    choices: [{ text: 'Slip out before you are caught', next: 'maya_after', effect: { affection: { maya: 2 } } }],
  },

  maya_nsfw_write: {
    id: 'maya_nsfw_write',
    speaker: 'maya',
    text: 'Maya watches you write on her skin and gets wetter for it. “Jade is going to murder me. Riley is going to cry-masturbate. Tyler is going to—” You thrust and she forgets the rest, laughing filthy as she comes with the insult still drying on her stomach.',
    focus: 'maya',
    nsfw: true,
    choices: [{ text: 'Leave the writing on', next: 'maya_after', effect: { affection: { maya: 2 } } }],
  },

  maya_nsfw_hard: {
    id: 'maya_nsfw_hard',
    speaker: 'maya',
    text: 'Maya’s heels dig into your back. Mirror fogs. “Tell me I am a bad friend — say I am their slutty problem now—” She comes loud enough that someone knocks. Maya just laughs.',
    focus: 'maya',
    nsfw: true,
    choices: [{ text: 'Finish with her', next: 'maya_after', effect: { affection: { maya: 2 } } }],
  },

  maya_nsfw_edge: {
    id: 'maya_nsfw_edge',
    speaker: 'maya',
    text: 'You deny her until she is shaking. “Please — I will owe them — I will do oath payment on my knees — just fuck me—” You give her everything. She sobs through the orgasm like a contract signing.',
    focus: 'maya',
    nsfw: true,
    choices: [{ text: 'Let her come down', next: 'maya_after', effect: { affection: { maya: 2 } } }],
  },

  maya_after: {
    id: 'maya_after',
    speaker: 'maya',
    text: 'Maya fixes her lipstick with a wrecked smirk. “If anyone asks, laundry emergency.” She opens the group chat. “Or maybe I send Jade a mirror selfie with your handprint still on my waist. Debating how dead I want to be.”',
    focus: 'maya',
    choices: [
      {
        text: 'Dare her to send it',
        next: 'maya_leak_dare',
        effect: { affection: { maya: 1, jade: 1 }, flags: { phoneLeak: true } },
      },
      {
        text: 'Make her delete Tyler’s thread first',
        next: 'maya_delete_tyler',
        effect: { affection: { maya: 2 }, flags: { exBetrayal: true, deepMaya: true } },
      },
      {
        text: 'Beg her to keep it quiet',
        next: 'mid_hub',
        effect: { affection: { maya: 1 }, flags: { sharedSecret: true, phase: 'mid' } },
      },
    ],
  },

  maya_delete_tyler: {
    id: 'maya_delete_tyler',
    speaker: 'maya',
    text: 'Maya deletes the thread without blinking, then kisses you like absolution she does not deserve. “There. I am single for the next twenty minutes. Use them.”',
    focus: 'maya',
    choices: [{ text: 'Use them — then face the house', next: 'maya_round_two' }],
  },

  maya_round_two: {
    id: 'maya_round_two',
    speaker: 'maya',
    text: 'Round two is meaner. Maya on her knees on the laundry tile, looking up while she takes you deep, eyes watering with pride. “If Riley walks in, she joins or she watches. Those are the only moral options left.”',
    focus: 'maya',
    nsfw: true,
    choices: [
      {
        text: 'Finish down her throat',
        next: 'mid_hub',
        effect: { affection: { maya: 3 }, flags: { phase: 'mid', deepMaya: true } },
      },
      {
        text: 'Text Riley to come to laundry',
        next: 'maya_summon_riley',
        effect: { affection: { maya: 2, riley: 2 }, flags: { threesomeUnlocked: true, deepMaya: true } },
      },
    ],
  },

  maya_summon_riley: {
    id: 'maya_summon_riley',
    speaker: 'riley',
    text: 'Riley opens the door, freezes, then steps in and locks it. “You absolute bitches.” Maya pulls her down by the jersey. Within a minute Riley is kissing Maya while you fuck Maya from behind — a roommate sandwich of treason.',
    focus: 'all',
    nsfw: true,
    choices: [
      {
        text: 'Make them kiss through Maya’s orgasm',
        next: 'mid_hub',
        effect: {
          affection: { maya: 3, riley: 3 },
          flags: { phase: 'mid', girlOnGirl: true, couchRiley: true, threesomeUnlocked: true },
        },
      },
    ],
  },

  maya_leak_dare: {
    id: 'maya_leak_dare',
    speaker: 'maya',
    text: 'Maya sends a cropped photo — your forearm, her waist, enough implication to start a war. “Oops. Pact autopsy begins now.”',
    focus: 'maya',
    choices: [{ text: 'Face the fallout', next: 'mid_hub', effect: { flags: { phase: 'mid', toldOnFriend: true } } }],
  },

  // ════════════ RILEY EARLY ════════════
  riley_drink: {
    id: 'riley_drink',
    speaker: 'riley',
    text: 'Riley pours neon liquor and presses the cup into your hand. Her jersey slips further off one shoulder. “Maya collects bodies. Jade collects leverage. Me? I collect nights that should not happen — then I smile about them at brunch like I bake innocence from scratch.”',
    focus: 'riley',
    choices: [
      {
        text: 'Ask what she wants tonight',
        next: 'riley_want',
        effect: { affection: { riley: 2 } },
      },
      {
        text: 'Start Never Have I Ever',
        next: 'riley_nhie',
        effect: { affection: { riley: 1, maya: 1 } },
      },
      {
        text: 'Ask about the guy she almost took from Jade',
        next: 'riley_almost',
        effect: { affection: { riley: 2, jade: 1 }, flags: { rileyConfessed: true } },
      },
    ],
  },

  riley_almost: {
    id: 'riley_almost',
    speaker: 'riley',
    text: 'Riley’s voice drops. “I kissed him in our kitchen. Jade walked in. I stopped. She forgave me in the cruelest way — by trusting me again.” She looks at your mouth. “I do not want to be trustworthy tonight.”',
    focus: 'riley',
    choices: [{ text: 'Offer to help her fail', next: 'riley_want', effect: { affection: { riley: 2 } } }],
  },

  riley_nhie: {
    id: 'riley_nhie',
    speaker: 'riley',
    text: 'The game turns filthy. Maya drinks for everything. Jade drinks for almost nothing. Riley holds your gaze: “Never have I ever fucked someone my roommates wanted.” She does not drink. Her thigh presses yours under the table like a promise she will break.',
    focus: 'riley',
    choices: [
      {
        text: '“Want to change that?”',
        next: 'riley_want',
        effect: { affection: { riley: 2 } },
      },
    ],
  },

  riley_want: {
    id: 'riley_want',
    speaker: 'riley',
    text: '“I want your hand under my jersey on this couch while Maya talks about classes two feet away. I want to come without permission. I want to break our stupid pact and then act innocent when Jade audits the night.”',
    focus: 'riley',
    choices: [
      {
        text: 'Take the couch dare',
        next: 'riley_couch',
        effect: { affection: { riley: 2 }, flags: { kissedRiley: true, pactBroken: true } },
      },
      {
        text: 'Pull her to her bedroom',
        next: 'riley_bedroom',
        effect: { affection: { riley: 2 }, flags: { kissedRiley: true, pactBroken: true } },
      },
      {
        text: 'Confess you already want all three',
        next: 'riley_confession',
        effect: { affection: { riley: 1, jade: 1 }, flags: { rileyConfessed: true, threesomeUnlocked: true } },
      },
      {
        text: 'Talk her into it soft and filthy [CHM 3]',
        next: 'riley_bedroom',
        need: { charm: 3 },
        softLock: true,
        effect: {
          affection: { riley: 3 },
          skills: { charm: 1 },
          flags: { kissedRiley: true, pactBroken: true },
        },
      },
      {
        text: 'Order her to the couch [DOM 3]',
        next: 'riley_couch',
        need: { dominance: 3 },
        softLock: true,
        effect: {
          affection: { riley: 2 },
          skills: { dominance: 1 },
          flags: { kissedRiley: true, pactBroken: true },
        },
      },
    ],
  },

  riley_confession: {
    id: 'riley_confession',
    speaker: 'riley',
    text: 'Riley blinks — then laughs, flushed and dangerous. “That is the hottest worst thing you could say. Fine. Ruin me first. Then we can talk about sharing like absolute trash.” She tugs you toward the couch.',
    focus: 'riley',
    choices: [
      {
        text: 'Follow',
        next: 'riley_couch',
        effect: { affection: { riley: 2 }, flags: { kissedRiley: true, pactBroken: true } },
      },
    ],
  },

  riley_couch: {
    id: 'riley_couch',
    speaker: 'narrator',
    text: 'Music covers the wet sound of your fingers between Riley’s thighs. She keeps a polite conversation with Maya — until her voice hitch-breaks. Maya squints. “You good?” Riley smiles, eyes glassy. “Perfect. Just… warm.”',
    focus: 'riley',
    nsfw: true,
    choices: [
      {
        text: 'Make her come right there',
        next: 'riley_nsfw_couch',
        effect: { affection: { riley: 3 }, flags: { couchRiley: true, caughtAlmost: true } },
      },
      {
        text: 'Stop mid-edge and whisper “your room”',
        next: 'riley_bedroom',
        effect: { affection: { riley: 2 } },
      },
    ],
  },

  riley_nsfw_couch: {
    id: 'riley_nsfw_couch',
    speaker: 'riley',
    text: 'Riley bites her cup as she comes, thighs locking your wrist. A soft ruined sound escapes anyway. Maya’s eyes go wide — half scandal, half hunger. Riley whispers, “If Jade finds out I came on her favorite couch, she will end me. Worth it.”',
    focus: 'riley',
    nsfw: true,
    choices: [
      {
        text: 'Let Maya “accidentally” notice more',
        next: 'riley_maya_catch',
        effect: { affection: { maya: 2, riley: 1 }, flags: { watchedSecret: true, toldOnFriend: true } },
      },
      {
        text: 'Cover for Riley and slip to her room',
        next: 'riley_bedroom',
        effect: { affection: { riley: 2 }, flags: { sharedSecret: true } },
      },
    ],
  },

  riley_maya_catch: {
    id: 'riley_maya_catch',
    speaker: 'maya',
    text: 'Maya’s smile turns unholy. “Riley. You filthy little traitor.” She does not look angry — she looks inspired. “Jade is going to lose her mind. Or join. Fifty-fifty.” She licks the rim of her drink. “I want next. Or I want to watch next.”',
    focus: 'maya',
    choices: [
      {
        text: 'Survive the attention',
        next: 'mid_hub',
        effect: { flags: { phase: 'mid', threesomeUnlocked: true } },
      },
    ],
  },

  riley_bedroom: {
    id: 'riley_bedroom',
    speaker: 'riley',
    text: 'Riley’s room smells like clean sheets and guilt. Fairy lights. A photo of the three of them on the desk. She pushes you down, jersey gone. “I look sweet. I am not. Call me their good girl while you fuck the lease ethics out of me.”',
    focus: 'riley',
    nsfw: true,
    choices: [
      {
        text: 'Let her ride — watch her face',
        next: 'riley_nsfw_ride',
        effect: { affection: { riley: 3 }, flags: { couchRiley: true, dormRiley: true } },
      },
      {
        text: 'Flip her and take control',
        next: 'riley_nsfw_control',
        effect: { affection: { riley: 3 }, flags: { couchRiley: true, dormRiley: true } },
      },
      {
        text: 'Record a voice note for Jade',
        next: 'riley_nsfw_record',
        effect: { affection: { riley: 2, jade: 1 }, flags: { couchRiley: true, dormRiley: true, phoneLeak: true } },
      },
      {
        text: 'Make her look at their friendship photo while you fuck her',
        next: 'riley_nsfw_photo',
        effect: { affection: { riley: 3 }, flags: { couchRiley: true, dormRiley: true, deepRiley: true } },
      },
    ],
  },

  riley_nsfw_ride: {
    id: 'riley_nsfw_ride',
    speaker: 'riley',
    text: 'Riley rides with filthy commentary and soft eyes. “Feel that? That is me cheating on a friendship.” She comes first, shaking, then laughs like theft. “Okay. Wow. We are so going to hell — and then brunch.”',
    focus: 'riley',
    nsfw: true,
    choices: [{ text: 'Aftercare, then chaos', next: 'riley_after', effect: { affection: { riley: 2 } } }],
  },

  riley_nsfw_control: {
    id: 'riley_nsfw_control',
    speaker: 'riley',
    text: 'On her back, Riley goes beautifully ruined — nails, open legs, sweet voice begging dirty. “Harder — please — do not stop—” When she finishes, she kisses you soft. “If Maya asks, I was helping you find a charger. If Jade asks… invent a god.”',
    focus: 'riley',
    nsfw: true,
    choices: [{ text: 'Hold her a second', next: 'riley_after', effect: { affection: { riley: 2 }, flags: { sharedSecret: true } } }],
  },

  riley_nsfw_record: {
    id: 'riley_nsfw_record',
    speaker: 'riley',
    text: 'Riley moans into your phone on purpose, naming you, naming the pact, naming how wet she is for breaking it. “Send that to Jade if I ever get boring,” she pants. “Or send it tonight. I am feeling evil.”',
    focus: 'riley',
    nsfw: true,
    choices: [
      {
        text: 'Keep it as leverage',
        next: 'riley_after',
        effect: { affection: { riley: 2 }, flags: { sharedSecret: true } },
      },
      {
        text: 'Forward a clip to Jade',
        next: 'riley_to_jade',
        effect: { affection: { jade: 2 }, flags: { toldOnFriend: true } },
      },
    ],
  },

  riley_nsfw_photo: {
    id: 'riley_nsfw_photo',
    speaker: 'riley',
    text: 'Riley stares at the three smiling faces on her desk while you fuck her into the mattress. Tears of heat, not regret. “I love them,” she gasps. “I am still going to come.” She does — hard — whispering sorry to a photograph.',
    focus: 'riley',
    nsfw: true,
    choices: [{ text: 'Kiss the apology off her mouth', next: 'riley_after', effect: { affection: { riley: 3 } } }],
  },

  riley_after: {
    id: 'riley_after',
    speaker: 'riley',
    text: 'Riley pulls the jersey back on like a halo. “There is a second bedroll under my bed for when Jade and Maya fight and someone gets exiled. Stay. Or go start the war properly.”',
    focus: 'riley',
    choices: [
      {
        text: 'Stay for round two under the fairy lights',
        next: 'riley_round_two',
        effect: { affection: { riley: 2 }, flags: { deepRiley: true } },
      },
      {
        text: 'Go start the war',
        next: 'mid_hub',
        effect: { flags: { phase: 'mid' } },
      },
    ],
  },

  riley_round_two: {
    id: 'riley_round_two',
    speaker: 'riley',
    text: 'Round two is quieter and filthier. Riley on her stomach, face in a pillow embroidered with the house name, begging you to leave marks Jade will interrogate. You do. She comes muffling your name into cotton.',
    focus: 'riley',
    nsfw: true,
    choices: [{ text: 'Sneak back to the party', next: 'mid_hub', effect: { affection: { riley: 2 }, flags: { phase: 'mid' } } }],
  },

  riley_to_jade: {
    id: 'riley_to_jade',
    speaker: 'jade',
    text: 'Jade appears in the hallway like summoned weather. She listens to one second of the clip, eyes dark. “Cute. Riley always did break pretty. Come with me. Now. I am collecting interest — and oath payment.”',
    focus: 'jade',
    choices: [{ text: 'Go with Jade', next: 'jade_closet', effect: { affection: { jade: 1 }, flags: { oathPayment: true } } }],
  },

  // ════════════ JADE EARLY ════════════
  jade_corner: {
    id: 'jade_corner',
    speaker: 'jade',
    text: 'Jade claims a shadowed hallway corner. “Maya will fuck you for sport. Riley will romance you while she ruins you. Me?” Her finger hooks your belt. “I keep what I take. I punish what I share. And I have folders.”',
    focus: 'jade',
    choices: [
      {
        text: 'Ask what is in the folders',
        next: 'jade_folders',
        effect: { affection: { jade: 2 } },
      },
      {
        text: 'Ask what she wants to take',
        next: 'jade_terms',
        effect: { affection: { jade: 2 } },
      },
      {
        text: 'Kiss her without asking',
        next: 'jade_kiss',
        effect: { affection: { jade: 2 }, flags: { kissedJade: true } },
      },
    ],
  },

  jade_folders: {
    id: 'jade_folders',
    speaker: 'jade',
    text: '“Insurance,” Jade says. “Maya’s drunk voice notes. Riley’s almost-texts to that guy. Screenshots of the pact. If friendship is a religion, I am the inquisition.” She smiles. “Want to become evidence?”',
    focus: 'jade',
    choices: [
      {
        text: 'Yes — make you evidence',
        next: 'jade_closet',
        effect: { affection: { jade: 2 }, flags: { kissedJade: true, pactBroken: true, blackmailJade: true } },
      },
    ],
  },

  jade_terms: {
    id: 'jade_terms',
    speaker: 'jade',
    text: '“Your night. Your attention. Your dignity if you keep eye-fucking my roommates.” She smiles, sharp. “Coat closet. If you touch them after me, I will know — and I might make you do it again while I watch. That is not mercy. That is ownership.”',
    focus: 'jade',
    choices: [
      {
        text: 'Follow her into the closet',
        next: 'jade_closet',
        effect: { affection: { jade: 2 }, flags: { kissedJade: true, pactBroken: true } },
      },
    ],
  },

  jade_kiss: {
    id: 'jade_kiss',
    speaker: 'jade',
    text: 'Jade kisses like a claim. When she pulls back, her lipstick is on your mouth. “Coat closet. Before I decide you are too public a problem.”',
    focus: 'jade',
    choices: [{ text: 'Go', next: 'jade_closet', effect: { affection: { jade: 1 }, flags: { pactBroken: true } } }],
  },

  jade_closet: {
    id: 'jade_closet',
    speaker: 'jade',
    text: 'Coats swallow sound. Jade drops to her knees with terrifying calm. “If you moan loud enough for Maya to hear, I will not stop — I will get meaner.” Then her mouth is on you, slow, filthy, absolutely in charge.',
    focus: 'jade',
    nsfw: true,
    choices: [
      {
        text: 'Take it — hands in her hair',
        next: 'jade_nsfw_mouth',
        effect: { affection: { jade: 3 }, flags: { closetJade: true } },
      },
      {
        text: 'Pull her up and fuck her standing',
        next: 'jade_nsfw_stand',
        effect: { affection: { jade: 3 }, flags: { closetJade: true } },
      },
      {
        text: 'Ask her to leave the door cracked',
        next: 'jade_nsfw_watch',
        effect: {
          affection: { jade: 3, maya: 1 },
          flags: { closetJade: true, watchedSecret: true, caughtAlmost: true },
        },
      },
      {
        text: 'Ask her to record for the folder',
        next: 'jade_nsfw_folder',
        effect: { affection: { jade: 3 }, flags: { closetJade: true, blackmailJade: true, phoneLeak: true } },
      },
      {
        text: 'Take control and flip the power [DOM 4 · STM 3]',
        next: 'jade_nsfw_stand',
        need: { dominance: 4, stamina: 3 },
        softLock: true,
        effect: {
          affection: { jade: 3 },
          skills: { dominance: 1, stamina: 1 },
          flags: { closetJade: true, markedByJade: true },
        },
      },
      {
        text: 'Stay silent and survive longer [STM 4 · DSC 2]',
        next: 'jade_nsfw_mouth',
        need: { stamina: 4, discretion: 2 },
        softLock: true,
        effect: {
          affection: { jade: 3 },
          skills: { stamina: 1 },
          flags: { closetJade: true },
        },
      },
    ],
  },

  jade_nsfw_mouth: {
    id: 'jade_nsfw_mouth',
    speaker: 'jade',
    text: 'Jade takes you deep, eyes watering, pride intact. When you finish, she stands, wipes her mouth, presses two fingers to your lips. “Mine for the night. Say it — or I tell Riley you came down my throat while she was still being sweet to you.”',
    focus: 'jade',
    nsfw: true,
    choices: [
      {
        text: '“Yours.”',
        next: 'jade_after',
        effect: { affection: { jade: 2 }, flags: { markedByJade: true } },
      },
      {
        text: '“For now.”',
        next: 'jade_after',
        effect: { affection: { jade: 1, maya: 1, riley: 1 }, flags: { threesomeUnlocked: true } },
      },
    ],
  },

  jade_nsfw_stand: {
    id: 'jade_nsfw_stand',
    speaker: 'jade',
    text: 'You pin Jade against winter coats and slide into her. She gasps once — then laughs, possessive. “Yes. Use me. Let them wonder.” She comes biting your neck hard enough to leave a mark she will brag about. “That is my signature. And my claim.”',
    focus: 'jade',
    nsfw: true,
    choices: [{ text: 'Wear the mark', next: 'jade_after', effect: { affection: { jade: 2 }, flags: { markedByJade: true } } }],
  },

  jade_nsfw_watch: {
    id: 'jade_nsfw_watch',
    speaker: 'narrator',
    text: 'The door stays cracked. Somewhere in the hall, Maya freezes — then stays. Jade notices and fucks you harder on purpose, eyes locked on the gap. “Wave to your audience,” she whispers. Maya does not leave.',
    focus: 'jade',
    nsfw: true,
    choices: [
      {
        text: 'Invite Maya in with a look',
        next: 'jade_maya_join',
        effect: { affection: { maya: 2, jade: 2 }, flags: { threesomeUnlocked: true, watchedSecret: true } },
      },
      {
        text: 'Finish for Jade only',
        next: 'jade_after',
        effect: { affection: { jade: 2 }, flags: { markedByJade: true } },
      },
    ],
  },

  jade_nsfw_folder: {
    id: 'jade_nsfw_folder',
    speaker: 'jade',
    text: 'Jade props her phone on a shoe box and fucks you for the lens like a prosecutor building a case. “Smile,” she breathes. “This is what loyalty looks like when it fails.” She comes on camera without breaking eye contact.',
    focus: 'jade',
    nsfw: true,
    choices: [
      {
        text: 'Ask who gets the file',
        next: 'jade_after',
        effect: { affection: { jade: 2 }, flags: { deepJade: true, blackmailJade: true } },
      },
    ],
  },

  jade_maya_join: {
    id: 'jade_maya_join',
    speaker: 'maya',
    text: 'Maya slips in, already breathless. “This is so fucked.” Jade grabs Maya’s jaw and kisses her like punishment. “Share,” Jade orders. Maya drops to her knees beside her roommate without another joke — only a moan.',
    focus: 'all',
    nsfw: true,
    choices: [
      {
        text: 'Let them share you',
        next: 'jade_maya_share',
        effect: { affection: { maya: 3, jade: 3 }, flags: { bathroomMaya: true, girlOnGirl: true } },
      },
    ],
  },

  jade_maya_share: {
    id: 'jade_maya_share',
    speaker: 'narrator',
    text: 'Two mouths. Two egos. Maya messy and eager; Jade precise and cruel. When you finish, they kiss with you still on their tongues — a betrayal sealed in spit. Jade wipes Maya’s chin. “Riley is going to cry. Or beg. I cannot wait.”',
    focus: 'all',
    nsfw: true,
    choices: [
      {
        text: 'Return to the party',
        next: 'mid_hub',
        effect: { flags: { phase: 'mid', threesomeUnlocked: true } },
      },
    ],
  },

  jade_after: {
    id: 'jade_after',
    speaker: 'jade',
    text: 'Jade straightens her skirt like a reholstered weapon. “If you chase my roommates after this, I will know. I might even direct. Do not confuse that with permission to forget who started you.”',
    focus: 'jade',
    choices: [
      {
        text: 'Ask for a second mark',
        next: 'jade_round_two',
        effect: { affection: { jade: 2 }, flags: { deepJade: true } },
      },
      {
        text: 'Step back into the noise',
        next: 'mid_hub',
        effect: { flags: { phase: 'mid' } },
      },
    ],
  },

  jade_round_two: {
    id: 'jade_round_two',
    speaker: 'jade',
    text: 'Jade takes you against the hallway linen closet this time — riskier, meaner. She writes MINE at the base of your throat in eyeliner. “If Riley kisses you, she tastes me. That is the point.”',
    focus: 'jade',
    nsfw: true,
    choices: [
      {
        text: 'Accept the brand',
        next: 'mid_hub',
        effect: { affection: { jade: 3 }, flags: { phase: 'mid', markedByJade: true, bodyWriting: true } },
      },
    ],
  },

  // ════════════ MID HUB ════════════
  mid_hub: {
    id: 'mid_hub',
    speaker: 'narrator',
    text: 'The party is hotter, drunker, meaner. Secrets float like perfume. You can deepen one bond, cross another line, start a harem trial, collect oath payment, or light the whole roommate lease on fire.',
    focus: 'all',
    chapter: 'Act II · Fallout',
    choices: [
      {
        text: 'Find Maya on the balcony',
        next: 'maya_balcony',
        require: (s) => !s.flags.balconyMaya,
      },
      {
        text: 'Find Riley in the kitchen',
        next: 'riley_kitchen',
        require: (s) => !s.flags.kitchenRiley,
      },
      {
        text: 'Find Jade on the stairs',
        next: 'jade_stairs',
        require: (s) => !s.flags.stairsJade,
      },
      {
        text: 'Check the group chat fallout',
        next: 'groupchat',
        require: (s) => (s.flags.phoneLeak || s.flags.toldOnFriend || s.flags.pactBroken) && !s.flags.roommateRule,
      },
      {
        text: 'Accept a dangerous dare from all three',
        next: 'dare_offer',
        require: (s) => !s.flags.dareSpiral && hookedCount(s.flags) >= 1,
      },
      {
        text: 'Trigger oath payment',
        next: 'oath_payment',
        require: (s) => s.flags.pactBroken && !s.flags.oathPayment,
      },
      {
        text: 'Snoop Jade’s evidence folder',
        next: 'folder_snoop',
        require: (s) => s.flags.blackmailJade || s.affection.jade >= 4,
      },
      {
        text: 'Start / continue the harem claiming trial',
        next: 'harem_terms',
        require: (s) => !s.flags.ceremonyDone,
        effect: { flags: { haremRoute: true, threesomeUnlocked: true } },
      },
      {
        text: 'Negotiate “rent” with the house',
        next: 'rent_negotiation',
        require: (s) => hookedCount(s.flags) >= 1,
      },
      {
        text: 'Step onto the porch with Jade',
        next: 'porch_blackmail',
        require: (s) => s.affection.jade >= 3 || s.flags.blackmailJade,
      },
      {
        text: 'Train skills around the party',
        next: 'skill_hub',
      },
      {
        text: 'Private lesson with Jade [DOM 2]',
        next: 'skill_private_lesson',
        need: { dominance: 2 },
        softLock: true,
        require: (s) => s.affection.jade >= 2 || s.flags.closetJade,
      },
      {
        text: 'Help Riley stress-bake [CHM 2]',
        next: 'skill_riley_bake',
        need: { charm: 2 },
        softLock: true,
        require: (s) => s.affection.riley >= 2 || s.flags.rumorMill,
      },
      {
        text: 'Truth-or-slut with Maya [NRV 2]',
        next: 'skill_maya_truth',
        need: { nerve: 2 },
        softLock: true,
        require: (s) => s.affection.maya >= 2 || s.flags.danceOff,
      },
      {
        text: 'Push into late-night territory',
        next: 'late_hub',
        require: (s) =>
          s.flags.balconyMaya ||
          s.flags.kitchenRiley ||
          s.flags.stairsJade ||
          s.flags.dareSpiral ||
          s.flags.oathPayment ||
          s.flags.haremRoute ||
          s.flags.skillTour ||
          hookedCount(s.flags) >= 2 ||
          deepCount(s.flags) >= 1,
        effect: { flags: { phase: 'late' } },
      },
      {
        text: 'Call it a night',
        next: 'ending_route',
      },
    ],
  },

  groupchat: {
    id: 'groupchat',
    speaker: 'narrator',
    text: 'Their group chat is a crime scene. Maya: “pact is a suggestion.” Riley: “I can explain.” Jade: “Do not explain. Perform.” A poll appears: ruin him / share him / exile him / collect oath payment. Share is winning. Oath payment is closing fast.',
    focus: 'all',
    choices: [
      {
        text: 'Text: “Share.”',
        next: 'mid_hub',
        effect: { affection: { maya: 1, riley: 1, jade: 1 }, flags: { threesomeUnlocked: true, roommateRule: true } },
      },
      {
        text: 'Text: “Collect.”',
        next: 'oath_payment',
        effect: { flags: { oathPayment: true, roommateRule: true } },
      },
      {
        text: 'Text: “Pick a winner.”',
        next: 'mid_hub',
        effect: { affection: { jade: 1 }, flags: { jealousyTrap: true, roommateRule: true } },
      },
    ],
  },

  folder_snoop: {
    id: 'folder_snoop',
    speaker: 'narrator',
    text: 'Jade’s laptop is unlocked in her room — arrogant. You find the insurance folder: voice notes, almost-texts, a draft message titled IF THEY EVER HURT ME. Footsteps. Jade leans on the doorframe. “Curiosity is a kink. Kneel or confess.”',
    focus: 'jade',
    choices: [
      {
        text: 'Kneel',
        next: 'jade_stairs_nsfw',
        effect: { affection: { jade: 2 }, flags: { blackmailJade: true, stairsJade: true } },
      },
      {
        text: 'Confess you want the folder used on all three',
        next: 'late_hub',
        effect: { affection: { jade: 2 }, flags: { threesomeUnlocked: true, phase: 'late', blackmailJade: true } },
      },
    ],
  },

  oath_payment: {
    id: 'oath_payment',
    speaker: 'jade',
    text: 'Jade claps once, theatrical. “Pact broken. Payment due.” Maya cheers. Riley goes pale and wet-eyed. Jade: “You do not choose who. We do. Strip the ego. Tonight you are house property.”',
    focus: 'all',
    choices: [
      {
        text: 'Submit to oath payment',
        next: 'oath_nsfw',
        effect: { affection: { maya: 2, riley: 2, jade: 2 }, flags: { oathPayment: true, threesomeUnlocked: true } },
      },
      {
        text: 'Negotiate — payment after one private hour',
        next: 'late_hub',
        effect: { flags: { oathPayment: true, phase: 'late' } },
      },
    ],
  },

  oath_nsfw: {
    id: 'oath_nsfw',
    speaker: 'narrator',
    text: 'They take turns using you in the living room after locking the front door. Maya loud. Riley apologetic and soaking. Jade directing angles like a tyrant choreographer. At one point Jade makes Maya and Riley kiss with your come still on Riley’s tongue. “Friendship,” Jade says. “Revised.”',
    focus: 'all',
    nsfw: true,
    choices: [
      {
        text: 'Survive the revision',
        next: 'late_hub',
        effect: {
          affection: { maya: 3, riley: 3, jade: 3 },
          flags: { phase: 'late', girlOnGirl: true, bathroomMaya: true, couchRiley: true, closetJade: true },
        },
      },
    ],
  },

  maya_balcony: {
    id: 'maya_balcony',
    speaker: 'maya',
    text: 'Night air. Maya’s cigarette cherry glows. “You came back. Dangerous. I already told Riley you kiss like debt. Tyler texted ‘goodnight baby.’ I left him on read with your hickey still warm.”',
    focus: 'maya',
    choices: [
      {
        text: 'Bend her over the railing',
        next: 'maya_balcony_nsfw',
        effect: { affection: { maya: 2 }, flags: { balconyMaya: true, bathroomMaya: true } },
      },
      {
        text: 'Use her to bait Riley downstairs',
        next: 'maya_bait_riley',
        effect: { affection: { maya: 1, riley: 2 }, flags: { balconyMaya: true, jealousyTrap: true } },
      },
      {
        text: 'Tell her to call Tyler and keep him on the line',
        next: 'maya_call_tyler',
        effect: { affection: { maya: 3 }, flags: { balconyMaya: true, exBetrayal: true, deepMaya: true } },
      },
      {
        text: 'Ask for something softer',
        next: 'maya_soft',
        effect: { affection: { maya: 2 }, flags: { balconyMaya: true } },
      },
    ],
  },

  maya_call_tyler: {
    id: 'maya_call_tyler',
    speaker: 'maya',
    text: 'Maya calls Tyler on speaker, voice sweet. “Hey baby—” You fuck her from behind over the railing while she asks about his night. She muffles a moan as a cough. When she hangs up she comes laughing. “I am going to hell with perfect nails.”',
    focus: 'maya',
    nsfw: true,
    choices: [
      {
        text: 'Call that a new low — and keep going',
        next: 'mid_hub',
        effect: { affection: { maya: 3 }, flags: { sharedSecret: true } },
      },
    ],
  },

  maya_balcony_nsfw: {
    id: 'maya_balcony_nsfw',
    speaker: 'maya',
    text: 'Maya braces on the railing, skirt up, biting a laugh as you take her with the neighborhood as possible audience. “Slutty balcony treason,” she pants. “Put it in the group chat. Caption: roommate of the year.”',
    focus: 'maya',
    nsfw: true,
    choices: [
      {
        text: 'Finish and threaten to post',
        next: 'mid_hub',
        effect: { affection: { maya: 2 }, flags: { phoneLeak: true, sharedSecret: true } },
      },
    ],
  },

  maya_bait_riley: {
    id: 'maya_bait_riley',
    speaker: 'maya',
    text: 'Maya texts Riley: “balcony. bring ice. ignore the moaning.” Minutes later Riley appears, freezes, and does not leave. Maya locks eyes with her while you keep going. “Watch,” Maya mouths. Riley’s hand slides under her own jersey.',
    focus: 'all',
    nsfw: true,
    choices: [
      {
        text: 'Tell Riley to join',
        next: 'maya_riley_balcony',
        effect: { affection: { maya: 2, riley: 3 }, flags: { threesomeUnlocked: true, watchedSecret: true } },
      },
      {
        text: 'Make Riley only watch',
        next: 'mid_hub',
        effect: { affection: { maya: 2, riley: 2 }, flags: { watchedSecret: true } },
      },
    ],
  },

  maya_riley_balcony: {
    id: 'maya_riley_balcony',
    speaker: 'riley',
    text: 'Riley steps in shaking. Maya kisses her like a dare. You end up between them — Maya loud, Riley muffling moans into Maya’s neck, both breaking the same oath on the same railing. After, Riley: “Jade can never know.” Maya: “Jade already knows.”',
    focus: 'all',
    nsfw: true,
    choices: [
      {
        text: 'Deal with that later',
        next: 'mid_hub',
        effect: {
          affection: { maya: 2, riley: 2 },
          flags: { couchRiley: true, threesomeUnlocked: true, girlOnGirl: true },
        },
      },
    ],
  },

  maya_soft: {
    id: 'maya_soft',
    speaker: 'maya',
    text: 'For a second Maya is almost tender — forehead to yours. “Do not tell them I can do soft. I have a brand.” Then she kisses you like she is branding you back. “Also I am still a slut. Just… your slut, maybe. Lease pending.”',
    focus: 'maya',
    choices: [{ text: 'Hold that thought', next: 'mid_hub', effect: { affection: { maya: 1 } } }],
  },

  riley_kitchen: {
    id: 'riley_kitchen',
    speaker: 'riley',
    text: 'Riley steals dessert from someone else’s tray. Frosting on her thumb. “Jade thinks you are hers. Maya thinks you are a toy. Put me on this counter — the same counter where I almost ruined us last spring — and finish the job.”',
    focus: 'riley',
    choices: [
      {
        text: 'Counter. Now.',
        next: 'riley_kitchen_nsfw',
        effect: { affection: { riley: 2 }, flags: { kitchenRiley: true, couchRiley: true } },
      },
      {
        text: 'Ask her to confess to Jade on speaker',
        next: 'riley_confess_call',
        effect: { affection: { riley: 1, jade: 2 }, flags: { kitchenRiley: true, toldOnFriend: true } },
      },
      {
        text: 'Bend her over the sink while dishes wait',
        next: 'riley_sink',
        effect: { affection: { riley: 3 }, flags: { kitchenRiley: true, couchRiley: true, deepRiley: true } },
      },
      {
        text: 'Frosting kiss only — for now',
        next: 'riley_frosting',
        effect: { affection: { riley: 2 }, flags: { kitchenRiley: true } },
      },
    ],
  },

  riley_sink: {
    id: 'riley_sink',
    speaker: 'riley',
    text: 'Riley grips the sink, jersey hiked, whispering sorry to no one as you take her among half-washed cups. “Roommate rules,” she pants. “Broken. Broken. Broken—” She comes on the third broken, laughing wetly into the faucet.',
    focus: 'riley',
    nsfw: true,
    choices: [{ text: 'Clean nothing', next: 'mid_hub', effect: { affection: { riley: 2 }, flags: { sharedSecret: true } } }],
  },

  riley_kitchen_nsfw: {
    id: 'riley_kitchen_nsfw',
    speaker: 'riley',
    text: 'You lift Riley onto the counter. She wraps around you, muffling moans into your neck while the party thumps next door. “I am so easy for you,” she breathes. “Best-friend slut. Roommate slut. Do not stop.”',
    focus: 'riley',
    nsfw: true,
    choices: [
      {
        text: 'Give her everything',
        next: 'mid_hub',
        effect: { affection: { riley: 2 }, flags: { sharedSecret: true } },
      },
      {
        text: 'Leave a hickey where Jade will see',
        next: 'mid_hub',
        effect: { affection: { riley: 2, jade: 1 }, flags: { jealousyTrap: true } },
      },
    ],
  },

  riley_confess_call: {
    id: 'riley_confess_call',
    speaker: 'riley',
    text: 'Riley calls Jade on speaker, voice shaking with arousal. “I broke the pact. I came on him. Twice. On your couch.” Silence. Then Jade: “Put him on. And keep your legs open.” Riley obeys while Jade listens like evidence.',
    focus: 'riley',
    nsfw: true,
    choices: [
      {
        text: 'Perform for Jade over the phone',
        next: 'riley_phone_jade',
        effect: { affection: { riley: 3, jade: 3 }, flags: { watchedSecret: true, threesomeUnlocked: true } },
      },
    ],
  },

  riley_phone_jade: {
    id: 'riley_phone_jade',
    speaker: 'jade',
    text: 'Jade’s voice is velvet cruelty. “Faster. Make her say my name when she comes. Good girl, Riley — traitor.” Riley shatters on cue. Jade hangs up with: “Stairs. Both of you. Do not clean up.”',
    focus: 'jade',
    choices: [{ text: 'Go to the stairs', next: 'jade_stairs', effect: { affection: { jade: 1 } } }],
  },

  riley_frosting: {
    id: 'riley_frosting',
    speaker: 'riley',
    text: 'Sweet kiss. Filthy eyes. “If you leave without fucking me properly, I will start a rumor that you cry during sex.” She is joking. Probably. “Also Maya bet I would fold first. She is winning.”',
    focus: 'riley',
    choices: [{ text: 'File that under problems', next: 'mid_hub', effect: { flags: { mayaBet: true } } }],
  },

  jade_stairs: {
    id: 'jade_stairs',
    speaker: 'jade',
    text: 'Jade sits on the stairs like a queen between sets. She pulls you between her knees. “I can smell them on you. Cute. Sit. Earn forgiveness — or earn a worse assignment.”',
    focus: 'jade',
    choices: [
      {
        text: 'Earn it with your mouth',
        next: 'jade_stairs_nsfw',
        effect: { affection: { jade: 3 }, flags: { stairsJade: true, closetJade: true } },
      },
      {
        text: 'Admit you want all three',
        next: 'jade_all_three',
        effect: { affection: { jade: 1 }, flags: { stairsJade: true, threesomeUnlocked: true } },
      },
      {
        text: 'Offer to humiliate yourself for her',
        next: 'jade_humiliate',
        effect: { affection: { jade: 2 }, flags: { stairsJade: true, markedByJade: true } },
      },
      {
        text: 'Ask her to use the folder on Maya and Riley live',
        next: 'jade_weaponize',
        effect: { affection: { jade: 2 }, flags: { stairsJade: true, blackmailJade: true } },
      },
    ],
  },

  jade_stairs_nsfw: {
    id: 'jade_stairs_nsfw',
    speaker: 'jade',
    text: 'Jade’s thighs frame your face. She holds the banister and tries to look bored while you ruin that plan. When she comes, it is quiet and vicious — then she pulls you up to taste herself on your mouth. “Forgiven. Barely. Now ask nicer for the rest of them.”',
    focus: 'jade',
    nsfw: true,
    choices: [{ text: 'Ask nicer', next: 'mid_hub', effect: { affection: { jade: 2 } } }],
  },

  jade_all_three: {
    id: 'jade_all_three',
    speaker: 'jade',
    text: 'Jade studies you. “Greedy. Fine. But I set the rules. They can use you. I own the ending. Break that hierarchy and I burn the night into campus folklore with receipts.”',
    focus: 'jade',
    choices: [
      {
        text: 'Accept her rules',
        next: 'late_hub',
        effect: { affection: { jade: 2 }, flags: { phase: 'late', threesomeUnlocked: true } },
      },
    ],
  },

  jade_humiliate: {
    id: 'jade_humiliate',
    speaker: 'jade',
    text: 'Jade makes you kneel on the stairs while Maya and Riley walk past with drinks. “Say it,” she murmurs. You admit — out loud — that you broke their pact and want to keep breaking it. Maya cheers. Riley covers her face and smiles through her fingers.',
    focus: 'all',
    choices: [
      {
        text: 'Let the humiliation become foreplay',
        next: 'late_hub',
        effect: {
          affection: { maya: 1, riley: 1, jade: 2 },
          flags: { phase: 'late', threesomeUnlocked: true },
        },
      },
    ],
  },

  jade_weaponize: {
    id: 'jade_weaponize',
    speaker: 'jade',
    text: 'Jade plays a three-second Maya voice note and a Riley almost-text in front of both of them. The room goes nuclear — then weirdly horny. “Punishment,” Jade says. “You two kiss. He watches. Then he earns you.”',
    focus: 'all',
    choices: [
      {
        text: 'Watch them kiss',
        next: 'jade_force_kiss',
        effect: { affection: { maya: 2, riley: 2, jade: 2 }, flags: { girlOnGirl: true, threesomeUnlocked: true } },
      },
    ],
  },

  jade_force_kiss: {
    id: 'jade_force_kiss',
    speaker: 'narrator',
    text: 'Maya kisses Riley like a dare that turned into hunger. Riley makes a soft broken sound and fists Maya’s top. Jade watches you watching. “Good. Now upstairs. Payment continues.”',
    focus: 'all',
    nsfw: true,
    choices: [{ text: 'Follow the sentence', next: 'late_hub', effect: { flags: { phase: 'late' } } }],
  },

  dare_offer: {
    id: 'dare_offer',
    speaker: 'all',
    text: 'Maya: “Truth or slut.” Riley: “That is not the game.” Jade: “It is now.” They corner you with one dare: pick a girl to use in front of the other two — or refuse and get exposed in the group chat with timestamps.',
    focus: 'all',
    choices: [
      {
        text: 'Dare: Maya, while they watch',
        next: 'dare_maya',
        effect: { flags: { dareSpiral: true, watchedSecret: true } },
      },
      {
        text: 'Dare: Riley, while they watch',
        next: 'dare_riley',
        effect: { flags: { dareSpiral: true, watchedSecret: true } },
      },
      {
        text: 'Dare: Jade, while they watch',
        next: 'dare_jade',
        effect: { flags: { dareSpiral: true, watchedSecret: true } },
      },
      {
        text: 'Dare: make two of them pleasure each other first',
        next: 'dare_gog',
        effect: { flags: { dareSpiral: true, girlOnGirl: true, watchedSecret: true } },
      },
      {
        text: 'Refuse and risk exposure',
        next: 'dare_refuse',
        effect: { flags: { dareSpiral: true, phoneLeak: true, caughtAlmost: true } },
      },
    ],
  },

  dare_gog: {
    id: 'dare_gog',
    speaker: 'narrator',
    text: 'Maya and Riley end up on the den rug with Jade counting. Fingers. Mouths. Soft swearing. When Jade says stop, they are both shaking. “Now him,” Jade orders. You finish what the dare started while they still taste like each other.',
    focus: 'all',
    nsfw: true,
    choices: [
      {
        text: 'Obey',
        next: 'late_hub',
        effect: {
          affection: { maya: 3, riley: 3, jade: 2 },
          flags: { phase: 'late', threesomeUnlocked: true, bathroomMaya: true, couchRiley: true },
        },
      },
    ],
  },

  dare_maya: {
    id: 'dare_maya',
    speaker: 'maya',
    text: 'Maya bends over the arm of a couch in a locked den. Riley watches biting her lip. Jade times nothing and still somehow judges. Maya comes loud on purpose. “Scoreboard,” she gasps. “I win being the worst roommate.”',
    focus: 'maya',
    nsfw: true,
    choices: [
      {
        text: 'Ask who is next',
        next: 'late_hub',
        effect: {
          affection: { maya: 3, riley: 1, jade: 1 },
          flags: { bathroomMaya: true, phase: 'late', threesomeUnlocked: true },
        },
      },
    ],
  },

  dare_riley: {
    id: 'dare_riley',
    speaker: 'riley',
    text: 'Riley takes you on the den floor with her roommates staring. She tries to stay quiet and fails. Maya coaches. Jade corrects her posture like a tyrant. When Riley comes, she sobs a laugh. “I hate how much I like being seen.”',
    focus: 'riley',
    nsfw: true,
    choices: [
      {
        text: 'Kiss her in front of them',
        next: 'late_hub',
        effect: {
          affection: { riley: 3, maya: 1, jade: 1 },
          flags: { couchRiley: true, phase: 'late', threesomeUnlocked: true },
        },
      },
    ],
  },

  dare_jade: {
    id: 'dare_jade',
    speaker: 'jade',
    text: 'Jade refuses to look soft even while stuffed full of you. She makes Maya hold her wrists. She makes Riley count. She comes like a verdict. “Good,” she says after. “Now you understand the chain of command.”',
    focus: 'jade',
    nsfw: true,
    choices: [
      {
        text: 'Obey the chain',
        next: 'late_hub',
        effect: {
          affection: { jade: 3, maya: 1, riley: 1 },
          flags: { closetJade: true, phase: 'late', threesomeUnlocked: true },
        },
      },
    ],
  },

  dare_refuse: {
    id: 'dare_refuse',
    speaker: 'narrator',
    text: 'You refuse. Maya posts anyway — blurry, damning, enough. The house starts whispering. Jade looks almost proud. “Cowardice is still a kink,” she says. “Now fix it upstairs or leave famous.”',
    focus: 'all',
    choices: [
      {
        text: 'Go upstairs and fix it',
        next: 'late_hub',
        effect: { flags: { phase: 'late', threesomeUnlocked: true } },
      },
      {
        text: 'Call it before it gets worse',
        next: 'ending_route',
      },
    ],
  },

  // ════════════ LATE HUB ════════════
  late_hub: {
    id: 'late_hub',
    speaker: 'narrator',
    text: 'Upstairs air is thick with perfume and bad decisions. The pact is a corpse. The lease is a joke. Dawn is coming for everyone. Choose how filthy the ending gets.',
    focus: 'all',
    chapter: 'Act III · After Hours',
    choices: [
      {
        text: 'Enter the full harem claiming arc',
        next: 'harem_terms',
        require: (s) => !s.flags.ceremonyDone,
        effect: { flags: { haremRoute: true, threesomeUnlocked: true, phase: 'harem' } },
      },
      {
        text: 'Resume harem joint night',
        next: 'harem_joint_intro',
        require: (s) => claimedCount(s.flags) >= 3 && !s.flags.ceremonyDone,
      },
      {
        text: 'Text all three to the bedroom',
        next: 'group_setup',
        require: (s) => s.flags.threesomeUnlocked || hookedCount(s.flags) >= 2 || s.flags.oathPayment,
      },
      {
        text: 'Private finale with Maya',
        next: 'finale_maya',
        require: (s) => s.affection.maya >= 6,
      },
      {
        text: 'Private finale with Riley',
        next: 'finale_riley',
        require: (s) => s.affection.riley >= 6,
      },
      {
        text: 'Private finale with Jade',
        next: 'finale_jade',
        require: (s) => s.affection.jade >= 6,
      },
      {
        text: 'Stage a “caught” scene on purpose',
        next: 'finale_caught_bait',
        require: (s) => s.flags.caughtAlmost || s.flags.phoneLeak,
      },
      {
        text: 'Try to sneak out',
        next: 'ending_route',
      },
    ],
  },

  finale_maya: {
    id: 'finale_maya',
    speaker: 'maya',
    text: 'Maya locks the guest room and strips like she is late for sin. “One more. For Tyler. For the scrapbook. For the betrayal. For me.” She rides you facing the mirror so she can watch herself being exactly what her roommates warned about.',
    focus: 'maya',
    nsfw: true,
    choices: [
      {
        text: 'Ruin her for the night',
        next: 'finale_maya_2',
        effect: { affection: { maya: 2 }, flags: { bathroomMaya: true, deepMaya: true } },
      },
    ],
  },

  finale_maya_2: {
    id: 'finale_maya_2',
    speaker: 'maya',
    text: 'After she comes, Maya stays on top, soft for half a second. “If you pick me, I will still be messy. I will still be slutty. I will just be yours when it counts.” She kisses you like a contract with glitter on it.',
    focus: 'maya',
    choices: [{ text: 'Take the dawn', next: 'ending_route', effect: { affection: { maya: 2 } } }],
  },

  finale_riley: {
    id: 'finale_riley',
    speaker: 'riley',
    text: 'Riley wants lights on. “I want to see your face when I say I love being their whore for you.” She means it like romance. She comes twice, crying a little, then asks if you will still text her after the friend group explodes.',
    focus: 'riley',
    nsfw: true,
    choices: [
      {
        text: 'Promise — then finish her properly',
        next: 'finale_riley_2',
        effect: { affection: { riley: 2 }, flags: { couchRiley: true, deepRiley: true } },
      },
    ],
  },

  finale_riley_2: {
    id: 'finale_riley_2',
    speaker: 'riley',
    text: 'Riley tucks herself under your arm like the night did not just commit felonies against friendship. “I can be soft tomorrow. Tonight I needed to be bad. Thank you for letting me fail beautifully.”',
    focus: 'riley',
    choices: [{ text: 'Hold her into morning', next: 'ending_route', effect: { affection: { riley: 2 } } }],
  },

  finale_jade: {
    id: 'finale_jade',
    speaker: 'jade',
    text: 'Jade does not ask. She pins, takes, narrates. “You do not get a soft ending with me. You get a collar made of attention.” She makes you say her roommates’ names while you fuck her — then forbids you from choosing them tomorrow.',
    focus: 'jade',
    nsfw: true,
    choices: [
      {
        text: 'Obey through the orgasm',
        next: 'finale_jade_2',
        effect: { affection: { jade: 2 }, flags: { closetJade: true, markedByJade: true, deepJade: true } },
      },
    ],
  },

  finale_jade_2: {
    id: 'finale_jade_2',
    speaker: 'jade',
    text: 'Jade cleans her eyeliner mark on your throat and redraws it sharper. “Project status: ongoing. Do not make me open the folder.” She almost smiles. “Almost.”',
    focus: 'jade',
    choices: [{ text: 'Accept ongoing', next: 'ending_route', effect: { affection: { jade: 2 } } }],
  },

  finale_caught_bait: {
    id: 'finale_caught_bait',
    speaker: 'narrator',
    text: 'You leave a door unlocked on purpose. The party finds you mid-sin with at least one roommate. Phones up. Screams. Maya bows. Riley hides and waves. Jade stares into a lens like she planned the premiere.',
    focus: 'all',
    nsfw: true,
    choices: [
      {
        text: 'Own the scandal',
        next: 'ending_caught',
        effect: { flags: { caughtAlmost: true, phoneLeak: true } },
      },
    ],
  },

  group_setup: {
    id: 'group_setup',
    speaker: 'narrator',
    text: 'You send one message to all three. Maya kicks the bedroom door open. Riley giggles like guilt. Jade is already on the bed, legs crossed, as if she scheduled the apocalypse.',
    focus: 'all',
    choices: [{ text: 'Close the door', next: 'group_talk' }],
  },

  group_talk: {
    id: 'group_talk',
    speaker: 'all',
    text: 'Maya: “Absolutely not — wait, absolutely yes.” Riley: “This is so fucked. I am so in.” Jade: “Rules. You look at me when you come. They can use you. I own the ending. Break that and I post everything including Tyler.”',
    focus: 'all',
    choices: [
      {
        text: 'Agree to Jade’s hierarchy',
        next: 'group_nsfw',
        effect: {
          affection: { jade: 2, maya: 2, riley: 2 },
          flags: { threesomeUnlocked: true, sharedSecret: true },
        },
      },
      {
        text: 'Refuse hierarchy — free-for-all',
        next: 'group_nsfw_free',
        effect: {
          affection: { maya: 2, riley: 2, jade: 1 },
          flags: { threesomeUnlocked: true, sharedSecret: true },
        },
      },
      {
        text: 'Make them compete for you',
        next: 'group_compete',
        effect: {
          affection: { maya: 2, riley: 2, jade: 2 },
          flags: { jealousyTrap: true, threesomeUnlocked: true },
        },
      },
      {
        text: 'Demand oath payment mode',
        next: 'group_oath',
        effect: {
          affection: { maya: 2, riley: 2, jade: 2 },
          flags: { oathPayment: true, threesomeUnlocked: true },
        },
      },
    ],
  },

  group_nsfw: {
    id: 'group_nsfw',
    speaker: 'narrator',
    text: 'Hands everywhere. Maya rides your face while Riley takes you deep, moaning into Maya’s mouth. Jade directs like sin with a clipboard — then straddles you last, possessive, locking eyes as she finishes you while her roommates kiss her throat. The bed is a crime scene of lipstick and laughter.',
    focus: 'all',
    nsfw: true,
    choices: [
      {
        text: 'Afterglow',
        next: 'group_afterglow',
        effect: { affection: { maya: 2, riley: 2, jade: 2 } },
      },
    ],
  },

  group_nsfw_free: {
    id: 'group_nsfw_free',
    speaker: 'narrator',
    text: 'No rules survive contact. Maya and Riley share you in a messy rhythm while Jade bites, guides, and eventually laughs — actually laughs — when the three of them collapse into limbs and smug, slutty victory. Downstairs, the playlist keeps pretending the lease is fine.',
    focus: 'all',
    nsfw: true,
    choices: [
      {
        text: 'Afterglow',
        next: 'group_afterglow',
        effect: { affection: { maya: 2, riley: 2, jade: 1 } },
      },
    ],
  },

  group_compete: {
    id: 'group_compete',
    speaker: 'narrator',
    text: 'They compete. Maya goes louder. Riley goes sweeter. Jade goes meaner. You crown no winner with words — only with where you finish. All three kiss the proof off each other afterward like sportsmanlike demons.',
    focus: 'all',
    nsfw: true,
    choices: [
      {
        text: 'Admit you want this again',
        next: 'ending_harem',
        effect: { affection: { maya: 2, riley: 2, jade: 2 } },
      },
    ],
  },

  group_oath: {
    id: 'group_oath',
    speaker: 'jade',
    text: 'Oath payment mode is less romance, more sentencing. Jade ties Maya’s wrists with a scarf. Riley holds your hips steady. They pass you between them until the word “roommate” means nothing holy. Jade records one tasteful second “for the archive.”',
    focus: 'all',
    nsfw: true,
    choices: [
      {
        text: 'Serve the sentence',
        next: 'ending_threesome',
        effect: { affection: { maya: 2, riley: 2, jade: 3 }, flags: { blackmailJade: true } },
      },
    ],
  },

  group_afterglow: {
    id: 'group_afterglow',
    speaker: 'riley',
    text: 'Afterglow is sticky and strangely tender. Riley traces shapes on your chest. Maya steals water. Jade checks her phone, then flips it face down. “We rewrite the pact in the morning,” she says. “Or we do not. Either way, you are not leaving unmarked.”',
    focus: 'all',
    choices: [
      {
        text: 'Ask to rewrite it together',
        next: 'ending_harem',
        require: (s) => s.flags.jealousyTrap || s.flags.oathPayment || deepCount(s.flags) >= 2,
      },
      {
        text: 'Take the rideshare ending',
        next: 'ending_threesome',
      },
    ],
  },

  ending_route: {
    id: 'ending_route',
    speaker: 'narrator',
    text: 'Dawn bullies the blinds. Solo cups look like evidence. Someone’s eyeliner mark is still on your throat. Time to see what your night actually bought.',
    focus: 'none',
    choices: [{ text: 'See your ending', next: 'ending_resolve' }],
  },

  ending_resolve: {
    id: 'ending_resolve',
    speaker: 'narrator',
    text: 'Resolving…',
    focus: 'none',
    choices: [{ text: 'Continue', next: 'ending_solo_maya' }],
  },

  ending_solo_maya: {
    id: 'ending_solo_maya',
    speaker: 'maya',
    text: 'Maya steals your hoodie and texts a photo of her in nothing else before you hit the sidewalk. Tyler is blocked. Riley is mad. Jade is plotting. Maya is thriving. “Same party next week. Wear something easy to take off.”',
    focus: 'maya',
    ending: 'solo_maya',
    art: 'solo_maya',
    chapter: 'Ending',
    choices: [{ text: 'Play again', next: 'title' }],
  },

  ending_solo_riley: {
    id: 'ending_solo_riley',
    speaker: 'riley',
    text: 'Riley walks you out holding your hand like you are wholesome. Then she whispers exactly how she wants to be woken up — and that she will lie to the group chat for you if you keep choosing her. Soft girl. Filthy treaty. Roommate traitor with a heart.',
    focus: 'riley',
    ending: 'solo_riley',
    art: 'solo_riley',
    chapter: 'Ending',
    choices: [{ text: 'Play again', next: 'title' }],
  },

  ending_solo_jade: {
    id: 'ending_solo_jade',
    speaker: 'jade',
    text: 'Jade does not ask for your number. She puts it in her phone herself. “You are not a fling. You are a project.” From her, that is a love poem, a threat, and a calendar invite with the folder attached.',
    focus: 'jade',
    ending: 'solo_jade',
    art: 'solo_jade',
    chapter: 'Ending',
    choices: [{ text: 'Play again', next: 'title' }],
  },

  ending_threesome: {
    id: 'ending_threesome',
    speaker: 'all',
    text: 'They share a rideshare and an unspoken treaty: nobody talks in public… and everybody texts you before noon. Taboo tastes better with matching hickeys. You did not pick one roommate. You detonated the lease in the hottest way possible.',
    focus: 'all',
    ending: 'threesome',
    art: 'threesome',
    chapter: 'Ending',
    choices: [{ text: 'Play again', next: 'title' }],
  },

  ending_harem: {
    id: 'ending_harem',
    speaker: 'all',
    text: 'Monday, HOUSE HAREM v1 is live: shared calendar, veto clause, free-use party nights, mandatory aftercare, Tyler permanently blocked. Maya adds heart emojis she does not mean. Riley adds soft nights. Jade adds enforcement. You did not date one girl. You joined a lease.',
    focus: 'all',
    ending: 'harem',
    art: 'harem',
    chapter: 'Ending · Harem',
    choices: [{ text: 'Play again', next: 'title' }],
  },

  ending_messy: {
    id: 'ending_messy',
    speaker: 'narrator',
    text: 'You played too many sides without enough charm. Maya calls you a coward. Riley laughs and means it. Jade blocks you before breakfast. The party was fun. The aftermath is a group chat you are not in — and a lease that still has their names.',
    focus: 'none',
    ending: 'messy',
    art: 'messy',
    chapter: 'Ending',
    choices: [{ text: 'Play again', next: 'title' }],
  },

  ending_caught: {
    id: 'ending_caught',
    speaker: 'narrator',
    text: 'Someone opens the wrong door — or the right one, if fame was the goal. The house howls. Your night becomes campus folklore before sunrise. The roommates? Unbothered — famous, even. You? Assigned a nickname you will never live down.',
    focus: 'all',
    ending: 'caught',
    art: 'caught',
    chapter: 'Ending',
    choices: [{ text: 'Play again', next: 'title' }],
  },
}

export const SCENES: Record<string, Scene> = {
  ...BASE_SCENES,
  ...HAREM_SCENES,
  ...SKILL_EVENT_SCENES,
}

export function resolveEndingScene(state: {
  affection: { maya: number; riley: number; jade: number }
  flags: Flags
}): string {
  const { maya, riley, jade } = state.affection
  const scores = [
    { id: 'maya' as const, n: maya },
    { id: 'riley' as const, n: riley },
    { id: 'jade' as const, n: jade },
  ].sort((a, b) => b.n - a.n)

  const hooked = hookedCount(state.flags)
  const deep = deepCount(state.flags)
  const claimed = claimedCount(state.flags)

  if (state.flags.ceremonyDone || (state.flags.haremRoute && claimed >= 3)) {
    return 'ending_harem'
  }
  if (state.flags.haremRoute && state.flags.haremRules && hooked >= 2) {
    return 'ending_harem'
  }
  if (state.flags.caughtAlmost && state.flags.phoneLeak && scores[0].n < 8 && !state.flags.threesomeUnlocked) {
    return 'ending_caught'
  }
  if (
    (state.flags.threesomeUnlocked || state.flags.oathPayment) &&
    (hooked >= 2 || deep >= 2) &&
    (state.flags.jealousyTrap || state.flags.girlOnGirl || state.flags.oathPayment || state.flags.haremRoute)
  ) {
    return 'ending_harem'
  }
  if (state.flags.threesomeUnlocked && (hooked >= 2 || state.flags.sharedSecret || state.flags.girlOnGirl)) {
    return 'ending_threesome'
  }
  if (state.flags.sharedSecret && scores[0].n >= 10 && scores[1].n >= 7) return 'ending_threesome'
  if (state.flags.caughtAlmost && scores[0].n < 6 && hooked >= 2 && state.flags.phoneLeak) return 'ending_caught'
  if (scores[0].n < 5) return 'ending_messy'
  if (scores[0].n - scores[1].n < 2 && scores[1].n >= 7 && !state.flags.threesomeUnlocked) return 'ending_messy'

  if (scores[0].id === 'maya') return 'ending_solo_maya'
  if (scores[0].id === 'riley') return 'ending_solo_riley'
  return 'ending_solo_jade'
}
