import { hookedCount, type Flags, type Scene } from './types'

export const SCENES: Record<string, Scene> = {
  title: {
    id: 'title',
    speaker: 'narrator',
    text: 'THREE BEST FRIENDS. ONE PACT. ONE HOUSE PARTY THAT WILL BREAK IT.',
    focus: 'none',
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
    text: 'Bass bleeds through the front door. Solo cups. Perfume. Trouble. What do they call you tonight?',
    focus: 'none',
    choices: [{ text: 'Continue', next: 'arrive' }],
  },

  arrive: {
    id: 'arrive',
    speaker: 'narrator',
    text: 'First real college house party of the year — bodies packed into a living room that smells like citrus vodka and expensive lotion. Near the kitchen island, three girls own the night like they paid for it in secrets.',
    focus: 'all',
    choices: [{ text: 'Walk over', next: 'meet_maya' }],
  },

  meet_maya: {
    id: 'meet_maya',
    speaker: 'maya',
    text: 'Maya clocks you instantly, honey-blonde hair bouncing as she hops closer. “Fresh meat. I am Maya. I bite if you are boring — and I get bored fast.”',
    focus: 'maya',
    choices: [{ text: 'Try not to look boring', next: 'meet_riley' }],
  },

  meet_riley: {
    id: 'meet_riley',
    speaker: 'riley',
    text: 'Riley offers a sweet smile that does not match her eyes. “She is already auditioning you. I am Riley. If you want the nice one… lower your expectations. I only look nice.”',
    focus: 'riley',
    choices: [{ text: 'Noted.', next: 'meet_jade' }],
  },

  meet_jade: {
    id: 'meet_jade',
    speaker: 'jade',
    text: 'Jade does not smile. She studies you like inventory. “Jade. Do not waste my night. I hate hunting for people I already decided are interesting.”',
    focus: 'jade',
    choices: [{ text: 'Ask how they know each other', next: 'pact_hint' }],
  },

  pact_hint: {
    id: 'pact_hint',
    speaker: 'riley',
    text: '“Best friends since sophomore year,” Riley says. Maya snorts. “With one sacred rule.” Jade’s mouth curves. “We do not share men. Ever. Pinky swear. Blood oath. Whole mythology.”',
    focus: 'all',
    choices: [
      {
        text: '“What if someone breaks it?”',
        next: 'pact_threat',
        effect: { affection: { jade: 1 } },
      },
      {
        text: 'Joke that rules are for cowards',
        next: 'pact_threat',
        effect: { affection: { maya: 1 }, flags: { mayaBet: true } },
      },
    ],
  },

  pact_threat: {
    id: 'pact_threat',
    speaker: 'jade',
    text: '“Then the traitor gets ruined,” Jade says lightly. “Group chat. Screenshots. Social death. Or…” Maya leans in, glitter flashing. “Or we all get curious about the same disaster. Which would be worse?”',
    focus: 'jade',
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
    ],
  },

  // ════════════ MAYA EARLY ════════════
  maya_dance: {
    id: 'maya_dance',
    speaker: 'maya',
    text: 'Maya steals your wrist and pulls you into the crush. Her ass finds your hips like a practiced insult. “Keep up,” she laughs into your ear, “or I will grind on someone who can. Riley is watching, by the way. She hates that.”',
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
    ],
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
    text: 'Heat. Perfume. The soft catch in Maya’s breath when your hand slides under the hem of her skirt just enough to be criminal. “Bathroom,” she mouths. “Before Jade decides you are a group project.”',
    focus: 'maya',
    choices: [
      {
        text: 'Follow her — break the pact in private',
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
    text: 'You kiss Maya under the strobes. She moans into it like she wants the whole house as witness. Riley’s cup freezes mid-air. Jade’s smile goes knife-thin. Someone films. Maya flips them off without breaking the kiss.',
    focus: 'maya',
    choices: [{ text: 'Drag her to the bathroom anyway', next: 'maya_bathroom' }],
  },

  maya_bathroom: {
    id: 'maya_bathroom',
    speaker: 'maya',
    text: 'Lock clicks. Maya hops onto the sink, thighs open, already breathless. “Quiet — unless you want my best friends to hear me being a fucking hypocrite.” She guides your hand between her legs. “I am soaked. Pact is dead. Make it worth it.”',
    focus: 'maya',
    nsfw: true,
    choices: [
      {
        text: 'Fuck her hard against the mirror',
        next: 'maya_nsfw_hard',
        effect: { affection: { maya: 3 }, flags: { bathroomMaya: true } },
      },
      {
        text: 'Edge her until she begs',
        next: 'maya_nsfw_edge',
        effect: { affection: { maya: 3 }, flags: { bathroomMaya: true } },
      },
      {
        text: 'Make her face the door — risk someone walking in',
        next: 'maya_nsfw_risk',
        effect: { affection: { maya: 3 }, flags: { bathroomMaya: true, caughtAlmost: true } },
      },
    ],
  },

  maya_nsfw_hard: {
    id: 'maya_nsfw_hard',
    speaker: 'maya',
    text: 'Maya’s heels dig into your back. The mirror fogs with every thrust. “Tell me I am a bad friend,” she gasps, grinning through it. “Say it — say I am their slutty problem now—” She comes loud enough that someone knocks. Maya just laughs.',
    focus: 'maya',
    nsfw: true,
    choices: [{ text: 'Finish with her', next: 'maya_after', effect: { affection: { maya: 2 } } }],
  },

  maya_nsfw_edge: {
    id: 'maya_nsfw_edge',
    speaker: 'maya',
    text: 'You deny her until she is shaking, mascara threatening ruin. “Please — I will text Riley right now and confess — just fuck me—” You give her everything at once. She sobs through the orgasm like a secret leaving her body.',
    focus: 'maya',
    nsfw: true,
    choices: [{ text: 'Let her come down', next: 'maya_after', effect: { affection: { maya: 2 } } }],
  },

  maya_nsfw_risk: {
    id: 'maya_nsfw_risk',
    speaker: 'maya',
    text: 'You turn Maya toward the door, one hand over her mouth, fucking her while footsteps pass in the hall. She drips down her thighs, eyes wild. When someone jiggles the handle, she comes — silent, violent, traitorous.',
    focus: 'maya',
    nsfw: true,
    choices: [{ text: 'Slip out before you are caught', next: 'maya_after', effect: { affection: { maya: 2 } } }],
  },

  maya_after: {
    id: 'maya_after',
    speaker: 'maya',
    text: 'Maya fixes her lipstick with a wrecked smirk. “If anyone asks, we fought about the playlist.” She screenshots nothing — yet. “Or maybe I send Jade a mirror selfie with your handprint still on my waist. Debating.”',
    focus: 'maya',
    choices: [
      {
        text: 'Dare her to send it',
        next: 'maya_leak_dare',
        effect: { affection: { maya: 1, jade: 1 }, flags: { phoneLeak: true } },
      },
      {
        text: 'Beg her to keep it quiet',
        next: 'mid_hub',
        effect: { affection: { maya: 1 }, flags: { sharedSecret: true, phase: 'mid' } },
      },
    ],
  },

  maya_leak_dare: {
    id: 'maya_leak_dare',
    speaker: 'maya',
    text: 'Maya’s eyes light up like arson. She sends a cropped photo to the group chat — your forearm, her waist, enough implication to start a war. “Oops,” she whispers. “Pact autopsy begins now.”',
    focus: 'maya',
    choices: [{ text: 'Face the fallout', next: 'mid_hub', effect: { flags: { phase: 'mid', toldOnFriend: true } } }],
  },

  // ════════════ RILEY EARLY ════════════
  riley_drink: {
    id: 'riley_drink',
    speaker: 'riley',
    text: 'Riley pours neon liquor and presses the cup into your hand. Her jersey slips further off one shoulder. “Maya collects bodies. Jade collects leverage. Me? I collect nights that should not happen — then I smile about them at brunch.”',
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
    ],
  },

  riley_nhie: {
    id: 'riley_nhie',
    speaker: 'riley',
    text: 'The game turns filthy. Maya drinks for everything. Jade drinks for almost nothing — which is somehow worse. Riley holds your gaze: “Never have I ever fucked someone my friends wanted.” She does not drink. Her thigh presses yours under the table like a promise.',
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
    text: 'Riley’s voice goes soft and ruinous. “I want your hand under my jersey on this couch while Maya talks about classes two feet away. I want to come without permission. I want to break our stupid pact and then act innocent.”',
    focus: 'riley',
    choices: [
      {
        text: 'Take the couch dare',
        next: 'riley_couch',
        effect: { affection: { riley: 2 }, flags: { kissedRiley: true, pactBroken: true } },
      },
      {
        text: 'Pull her to a bedroom',
        next: 'riley_bedroom',
        effect: { affection: { riley: 2 }, flags: { kissedRiley: true, pactBroken: true } },
      },
      {
        text: 'Confess you already want all three',
        next: 'riley_confession',
        effect: { affection: { riley: 1, jade: 1 }, flags: { rileyConfessed: true, threesomeUnlocked: true } },
      },
    ],
  },

  riley_confession: {
    id: 'riley_confession',
    speaker: 'riley',
    text: 'Riley blinks — then laughs, flushed and dangerous. “That is the hottest worst thing you could say. Fine. Ruin me first. Then we can talk about sharing like absolute trash.” She stands and tugs you toward the couch.',
    focus: 'riley',
    choices: [{ text: 'Follow', next: 'riley_couch', effect: { affection: { riley: 2 }, flags: { kissedRiley: true, pactBroken: true } } }],
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
        text: 'Stop mid-edge and whisper “bedroom”',
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
        text: 'Cover for Riley and slip away',
        next: 'mid_hub',
        effect: { affection: { riley: 2 }, flags: { sharedSecret: true, phase: 'mid' } },
      },
    ],
  },

  riley_maya_catch: {
    id: 'riley_maya_catch',
    speaker: 'maya',
    text: 'Maya’s smile turns unholy. “Riley. You filthy little traitor.” She does not look angry — she looks inspired. “Jade is going to lose her mind. Or join. Fifty-fifty.” She licks the rim of her drink. “I want next.”',
    focus: 'maya',
    choices: [{ text: 'Survive the attention', next: 'mid_hub', effect: { flags: { phase: 'mid', threesomeUnlocked: true } } }],
  },

  riley_bedroom: {
    id: 'riley_bedroom',
    speaker: 'riley',
    text: 'Borrowed bedroom. Coat pile. Riley pushes you down, jersey gone, lace surviving three seconds. “I look sweet,” she says, sinking onto you. “I am not. Call me their good girl while you fuck the pact out of me.”',
    focus: 'riley',
    nsfw: true,
    choices: [
      {
        text: 'Let her ride — watch her face',
        next: 'riley_nsfw_ride',
        effect: { affection: { riley: 3 }, flags: { couchRiley: true } },
      },
      {
        text: 'Flip her and take control',
        next: 'riley_nsfw_control',
        effect: { affection: { riley: 3 }, flags: { couchRiley: true } },
      },
      {
        text: 'Record a voice note for later blackmail-flirt',
        next: 'riley_nsfw_record',
        effect: { affection: { riley: 2, jade: 1 }, flags: { couchRiley: true, phoneLeak: true } },
      },
    ],
  },

  riley_nsfw_ride: {
    id: 'riley_nsfw_ride',
    speaker: 'riley',
    text: 'Riley rides with filthy commentary and soft eyes — devastating. “Feel that? That is me cheating on a friendship.” She comes first, shaking, then laughs like theft. “Okay. Wow. We are so going to hell.”',
    focus: 'riley',
    nsfw: true,
    choices: [{ text: 'Aftercare, then chaos', next: 'mid_hub', effect: { affection: { riley: 2 }, flags: { phase: 'mid' } } }],
  },

  riley_nsfw_control: {
    id: 'riley_nsfw_control',
    speaker: 'riley',
    text: 'On her back, Riley goes beautifully ruined — nails, open legs, sweet voice begging dirty. “Harder — please — do not stop—” When she finishes, she kisses you soft. “If Maya asks, I was helping you find a charger.”',
    focus: 'riley',
    nsfw: true,
    choices: [{ text: 'Sneak downstairs', next: 'mid_hub', effect: { affection: { riley: 2 }, flags: { phase: 'mid', sharedSecret: true } } }],
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
        next: 'mid_hub',
        effect: { affection: { riley: 2 }, flags: { phase: 'mid', sharedSecret: true } },
      },
      {
        text: 'Forward a clip to Jade',
        next: 'riley_to_jade',
        effect: { affection: { jade: 2 }, flags: { toldOnFriend: true, phase: 'mid' } },
      },
    ],
  },

  riley_to_jade: {
    id: 'riley_to_jade',
    speaker: 'jade',
    text: 'Jade appears in the hallway like summoned weather. She listens to one second of the clip, eyes dark. “Cute. Riley always did break pretty. Come with me. Now. I am collecting interest.”',
    focus: 'jade',
    choices: [{ text: 'Go with Jade', next: 'jade_closet', effect: { affection: { jade: 1 } } }],
  },

  // ════════════ JADE EARLY ════════════
  jade_corner: {
    id: 'jade_corner',
    speaker: 'jade',
    text: 'Jade claims a shadowed hallway corner and lets the party orbit her. “Maya will fuck you for sport. Riley will romance you while she ruins you. Me?” Her finger hooks your belt. “I keep what I take. And I punish what I share.”',
    focus: 'jade',
    choices: [
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

  jade_terms: {
    id: 'jade_terms',
    speaker: 'jade',
    text: '“Your night. Your attention. Your dignity if you keep eye-fucking my friends.” She smiles, sharp. “Coat closet. If you touch them after me, I will know — and I might make you do it again while I watch. That is not mercy. That is ownership.”',
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
    choices: [
      {
        text: 'Go',
        next: 'jade_closet',
        effect: { affection: { jade: 1 }, flags: { pactBroken: true } },
      },
    ],
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
        effect: { affection: { jade: 3, maya: 1 }, flags: { closetJade: true, watchedSecret: true, caughtAlmost: true } },
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
    text: 'You pin Jade against winter coats and slide into her. She gasps once — then laughs, possessive. “Yes. Use me. Let them wonder.” She comes biting your neck hard enough to leave a mark she will brag about. “That is my signature.”',
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

  jade_maya_join: {
    id: 'jade_maya_join',
    speaker: 'maya',
    text: 'Maya slips in, already breathless. “This is so fucked.” Jade grabs Maya’s jaw and kisses her like punishment. “Share,” Jade orders. Maya drops to her knees beside her best friend without another joke — only a moan.',
    focus: 'all',
    nsfw: true,
    choices: [
      {
        text: 'Let them share you',
        next: 'jade_maya_share',
        effect: { affection: { maya: 3, jade: 3 }, flags: { bathroomMaya: true, phase: 'mid' } },
      },
    ],
  },

  jade_maya_share: {
    id: 'jade_maya_share',
    speaker: 'narrator',
    text: 'Two mouths. Two egos. Maya messy and eager; Jade precise and cruel. When you finish, they kiss with you still on their tongues — a betrayal sealed in spit. Jade wipes Maya’s chin. “Riley is going to cry. Or beg. I cannot wait.”',
    focus: 'all',
    nsfw: true,
    choices: [{ text: 'Return to the party', next: 'mid_hub', effect: { flags: { phase: 'mid', threesomeUnlocked: true } } }],
  },

  jade_after: {
    id: 'jade_after',
    speaker: 'jade',
    text: 'Jade straightens her skirt like a reholstered weapon. “If you chase my friends after this, I will know. I might even direct. Do not confuse that with permission to forget who started you.”',
    focus: 'jade',
    choices: [{ text: 'Step back into the noise', next: 'mid_hub', effect: { flags: { phase: 'mid' } } }],
  },

  // ════════════ MID HUB ════════════
  mid_hub: {
    id: 'mid_hub',
    speaker: 'narrator',
    text: 'The party is hotter, drunker, meaner. Secrets are loose in the air like perfume. You can deepen one bond, cross another line, or light the whole friend group on fire.',
    focus: 'all',
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
        require: (s) => s.flags.phoneLeak || s.flags.toldOnFriend || s.flags.pactBroken,
      },
      {
        text: 'Accept a dangerous dare from all three',
        next: 'dare_offer',
        require: (s) => !s.flags.dareSpiral && hookedCount(s.flags) >= 1,
      },
      {
        text: 'Push into late-night territory',
        next: 'late_hub',
        require: (s) =>
          s.flags.balconyMaya ||
          s.flags.kitchenRiley ||
          s.flags.stairsJade ||
          s.flags.dareSpiral ||
          hookedCount(s.flags) >= 2,
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
    text: 'Their group chat is a crime scene. Maya: “pact is a suggestion.” Riley: “I can explain.” Jade: “Do not explain. Perform.” A poll appears: ruin him / share him / exile him. Share is winning.',
    focus: 'all',
    choices: [
      {
        text: 'Text: “Share.”',
        next: 'mid_hub',
        effect: { affection: { maya: 1, riley: 1, jade: 1 }, flags: { threesomeUnlocked: true } },
      },
      {
        text: 'Text: “Pick a winner.”',
        next: 'mid_hub',
        effect: { affection: { jade: 1 }, flags: { jealousyTrap: true } },
      },
    ],
  },

  // Maya mid
  maya_balcony: {
    id: 'maya_balcony',
    speaker: 'maya',
    text: 'Night air. Maya’s cigarette cherry glows. “You came back. Dangerous. I already told Riley you kiss like debt.” She flicks ash. “Want to make her jealous for real — or do you want me to tell Jade exactly how you fuck?”',
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
        text: 'Ask for something softer',
        next: 'maya_soft',
        effect: { affection: { maya: 2 }, flags: { balconyMaya: true } },
      },
    ],
  },

  maya_balcony_nsfw: {
    id: 'maya_balcony_nsfw',
    speaker: 'maya',
    text: 'Maya braces on the railing, skirt up, biting a laugh as you take her with the neighborhood as possible audience. “Slutty balcony treason,” she pants. “Put it in the group chat. Caption: pact deceased.”',
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
        effect: { affection: { maya: 2, riley: 2 }, flags: { watchedSecret: true, kitchenRiley: false } },
      },
    ],
  },

  maya_riley_balcony: {
    id: 'maya_riley_balcony',
    speaker: 'riley',
    text: 'Riley steps in shaking. Maya kisses her like a dare. You end up between them — Maya loud, Riley muffling moans into Maya’s neck, both of them breaking the same oath on the same railing. After, Riley whispers, “Jade can never know.” Maya: “Jade already knows.”',
    focus: 'all',
    nsfw: true,
    choices: [
      {
        text: 'Deal with that later',
        next: 'mid_hub',
        effect: { affection: { maya: 2, riley: 2 }, flags: { couchRiley: true, threesomeUnlocked: true } },
      },
    ],
  },

  maya_soft: {
    id: 'maya_soft',
    speaker: 'maya',
    text: 'For a second Maya is almost tender — forehead to yours. “Do not tell them I can do soft. I have a brand.” Then she kisses you like she is branding you back. “Also I am still a slut. Just… your slut, maybe.”',
    focus: 'maya',
    choices: [{ text: 'Hold that thought', next: 'mid_hub', effect: { affection: { maya: 1 } } }],
  },

  // Riley mid
  riley_kitchen: {
    id: 'riley_kitchen',
    speaker: 'riley',
    text: 'Riley steals dessert from someone else’s tray. Frosting on her thumb. She offers it without shame. “Jade thinks you are hers. Maya thinks you are a toy. Put me on this counter and prove the pact was cosplay.”',
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
        text: 'Frosting kiss only — for now',
        next: 'riley_frosting',
        effect: { affection: { riley: 2 }, flags: { kitchenRiley: true } },
      },
    ],
  },

  riley_kitchen_nsfw: {
    id: 'riley_kitchen_nsfw',
    speaker: 'riley',
    text: 'You lift Riley onto the counter. She wraps around you, muffling moans into your neck while the party thumps next door. “I am so easy for you,” she breathes. “Best-friend slut. Do not stop. Please do not stop.”',
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
        effect: { affection: { riley: 2, jade: 1 }, flags: { jealousyTrap: true, markedByJade: false } },
      },
    ],
  },

  riley_confess_call: {
    id: 'riley_confess_call',
    speaker: 'riley',
    text: 'Riley calls Jade on speaker, voice shaking with arousal. “I broke the pact. I came on him. Twice.” Silence. Then Jade: “Put him on. And keep your legs open.” Riley obeys, eyes wet, while Jade listens to every wet sound like evidence.',
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
    text: 'Sweet kiss. Filthy eyes. “If you leave without fucking me properly, I will start a rumor that you cry during sex.” She is joking. Probably. “Also Maya already knows I want you. She bet I would fold first.”',
    focus: 'riley',
    choices: [{ text: 'File that under problems', next: 'mid_hub', effect: { flags: { mayaBet: true } } }],
  },

  // Jade mid
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
        effect: { affection: { maya: 1, riley: 1, jade: 2 }, flags: { phase: 'late', threesomeUnlocked: true } },
      },
    ],
  },

  // Dare spiral
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
        text: 'Refuse and risk exposure',
        next: 'dare_refuse',
        effect: { flags: { dareSpiral: true, phoneLeak: true, caughtAlmost: true } },
      },
    ],
  },

  dare_maya: {
    id: 'dare_maya',
    speaker: 'maya',
    text: 'Maya bends over the arm of a couch in a locked den. Riley watches biting her lip. Jade times nothing and still somehow judges. Maya comes loud on purpose. “Scoreboard,” she gasps. “I win being the worst friend.”',
    focus: 'maya',
    nsfw: true,
    choices: [
      {
        text: 'Ask who is next',
        next: 'late_hub',
        effect: { affection: { maya: 3, riley: 1, jade: 1 }, flags: { bathroomMaya: true, phase: 'late', threesomeUnlocked: true } },
      },
    ],
  },

  dare_riley: {
    id: 'dare_riley',
    speaker: 'riley',
    text: 'Riley takes you on the den floor with her friends staring. She tries to stay quiet and fails. Maya coaches. Jade corrects her posture like a tyrant. When Riley comes, she sobs a laugh. “I hate how much I like being seen.”',
    focus: 'riley',
    nsfw: true,
    choices: [
      {
        text: 'Kiss her in front of them',
        next: 'late_hub',
        effect: { affection: { riley: 3, maya: 1, jade: 1 }, flags: { couchRiley: true, phase: 'late', threesomeUnlocked: true } },
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
        effect: { affection: { jade: 3, maya: 1, riley: 1 }, flags: { closetJade: true, phase: 'late', threesomeUnlocked: true } },
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
    text: 'Upstairs air is thick with perfume and bad decisions. The pact is a corpse. Dawn is coming for everyone. Choose how filthy the ending gets.',
    focus: 'all',
    choices: [
      {
        text: 'Text all three to the bedroom',
        next: 'group_setup',
        require: (s) => s.flags.threesomeUnlocked || hookedCount(s.flags) >= 2,
      },
      {
        text: 'Private finale with Maya',
        next: 'finale_maya',
        require: (s) => s.affection.maya >= 5,
      },
      {
        text: 'Private finale with Riley',
        next: 'finale_riley',
        require: (s) => s.affection.riley >= 5,
      },
      {
        text: 'Private finale with Jade',
        next: 'finale_jade',
        require: (s) => s.affection.jade >= 5,
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
    text: 'Maya locks the guest room and strips like she is late for sin. “One more. For the scrapbook. For the betrayal. For me.” She rides you facing the mirror so she can watch herself being exactly what her friends warned about.',
    focus: 'maya',
    nsfw: true,
    choices: [
      {
        text: 'Ruin her for the night',
        next: 'ending_route',
        effect: { affection: { maya: 3 }, flags: { bathroomMaya: true } },
      },
    ],
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
        next: 'ending_route',
        effect: { affection: { riley: 3 }, flags: { couchRiley: true } },
      },
    ],
  },

  finale_jade: {
    id: 'finale_jade',
    speaker: 'jade',
    text: 'Jade does not ask. She pins, takes, narrates. “You do not get a soft ending with me. You get a collar made of attention.” She makes you say her friends’ names while you fuck her — then forbids you from choosing them tomorrow.',
    focus: 'jade',
    nsfw: true,
    choices: [
      {
        text: 'Obey through the orgasm',
        next: 'ending_route',
        effect: { affection: { jade: 3 }, flags: { closetJade: true, markedByJade: true } },
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
    text: 'Maya: “Absolutely not — wait, absolutely yes.” Riley: “This is so fucked. I am so in.” Jade: “Rules. You look at me when you come. They can use you. I own the ending. Break that and I post everything.”',
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
    ],
  },

  group_nsfw: {
    id: 'group_nsfw',
    speaker: 'narrator',
    text: 'Hands everywhere. Maya rides your face while Riley takes you deep, moaning into Maya’s mouth. Jade directs like sin with a clipboard — then straddles you last, possessive, locking eyes as she finishes you while her friends kiss her throat. The bed is a crime scene of lipstick and laughter.',
    focus: 'all',
    nsfw: true,
    choices: [
      {
        text: 'Afterglow',
        next: 'ending_threesome',
        effect: { affection: { maya: 2, riley: 2, jade: 2 } },
      },
    ],
  },

  group_nsfw_free: {
    id: 'group_nsfw_free',
    speaker: 'narrator',
    text: 'No rules survive contact. Maya and Riley share you in a messy rhythm while Jade bites, guides, and eventually laughs — actually laughs — when the three of them collapse into limbs and smug, slutty victory. Downstairs, the playlist keeps pretending nothing sacred died.',
    focus: 'all',
    nsfw: true,
    choices: [
      {
        text: 'Afterglow',
        next: 'ending_threesome',
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

  // Endings
  ending_route: {
    id: 'ending_route',
    speaker: 'narrator',
    text: 'Dawn bullies the blinds. Solo cups look like evidence. Time to see what your night actually bought.',
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
    text: 'Maya steals your hoodie and texts a photo of her in nothing else before you hit the sidewalk. “Same party next week. Wear something easy to take off. Also Riley is mad. Jade is plotting. I am thriving.”',
    focus: 'maya',
    ending: 'solo',
    choices: [{ text: 'Play again', next: 'title' }],
  },

  ending_solo_riley: {
    id: 'ending_solo_riley',
    speaker: 'riley',
    text: 'Riley walks you out holding your hand like you are wholesome. Then she whispers exactly how she wants to be woken up — and that she will lie to the group chat for you if you keep choosing her. Soft girl. Filthy treaty.',
    focus: 'riley',
    ending: 'solo',
    choices: [{ text: 'Play again', next: 'title' }],
  },

  ending_solo_jade: {
    id: 'ending_solo_jade',
    speaker: 'jade',
    text: 'Jade does not ask for your number. She puts it in her phone herself. “You are not a fling. You are a project.” From her, that is a love poem, a threat, and a calendar invite.',
    focus: 'jade',
    ending: 'solo',
    choices: [{ text: 'Play again', next: 'title' }],
  },

  ending_threesome: {
    id: 'ending_threesome',
    speaker: 'all',
    text: 'They share a rideshare and an unspoken treaty: nobody talks in public… and everybody texts you before noon. Taboo tastes better with matching hickeys. You did not pick one girl. You detonated the friend group in the hottest way possible.',
    focus: 'all',
    ending: 'threesome',
    choices: [{ text: 'Play again', next: 'title' }],
  },

  ending_harem: {
    id: 'ending_harem',
    speaker: 'all',
    text: 'Monday, the pact is rewritten in a notes app: no exclusivity, no screenshots without consent, weekly “study sessions.” Maya adds heart emojis she does not mean. Riley adds rules she will break. Jade adds a clause that she still owns veto power. You somehow agreed to all of it.',
    focus: 'all',
    ending: 'harem',
    choices: [{ text: 'Play again', next: 'title' }],
  },

  ending_messy: {
    id: 'ending_messy',
    speaker: 'narrator',
    text: 'You played too many sides without enough charm. Maya calls you a coward. Riley laughs and means it. Jade blocks you before breakfast. The party was fun. The aftermath is a group chat you are not in.',
    focus: 'none',
    ending: 'messy',
    choices: [{ text: 'Play again', next: 'title' }],
  },

  ending_caught: {
    id: 'ending_caught',
    speaker: 'narrator',
    text: 'Someone opens the wrong door. The house howls. Your night becomes campus folklore before sunrise. The girls? Unbothered — famous, even. You? Assigned a nickname you will never live down.',
    focus: 'all',
    ending: 'caught',
    choices: [{ text: 'Play again', next: 'title' }],
  },
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

  if (state.flags.threesomeUnlocked && hooked >= 2 && state.flags.jealousyTrap) return 'ending_harem'
  if (state.flags.threesomeUnlocked && (hooked >= 2 || state.flags.sharedSecret)) return 'ending_threesome'
  if (state.flags.sharedSecret && scores[0].n >= 8 && scores[1].n >= 6) return 'ending_threesome'
  if (state.flags.caughtAlmost && scores[0].n < 6 && hooked >= 2 && state.flags.phoneLeak) return 'ending_caught'
  if (scores[0].n < 4) return 'ending_messy'
  if (scores[0].n - scores[1].n < 2 && scores[1].n >= 6 && !state.flags.threesomeUnlocked) return 'ending_messy'

  if (scores[0].id === 'maya') return 'ending_solo_maya'
  if (scores[0].id === 'riley') return 'ending_solo_riley'
  return 'ending_solo_jade'
}
