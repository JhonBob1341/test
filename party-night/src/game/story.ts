import type { Scene } from './types'

export const SCENES: Record<string, Scene> = {
  title: {
    id: 'title',
    speaker: 'narrator',
    text: 'THREE FRIENDS. ONE HOUSE PARTY. ZERO SELF-CONTROL.',
    focus: 'none',
    choices: [{ text: 'Enter the party (21+)', next: 'agegate' }],
  },

  agegate: {
    id: 'agegate',
    speaker: 'narrator',
    text: 'This is an adult dating game. All characters are 21+. Confirm you are 21 or older to continue.',
    focus: 'none',
    choices: [
      { text: 'I am 21 or older — start', next: 'name' },
      { text: 'Leave', next: 'too_young' },
    ],
  },

  too_young: {
    id: 'too_young',
    speaker: 'narrator',
    text: 'Come back when you are 21. The party is not for you yet.',
    focus: 'none',
    ending: 'reject',
    choices: [{ text: 'Back to title', next: 'title' }],
  },

  name: {
    id: 'name',
    speaker: 'narrator',
    text: 'The bass is already bleeding through the front door. What do they call you tonight?',
    focus: 'none',
    choices: [{ text: 'Continue', next: 'arrive' }],
  },

  arrive: {
    id: 'arrive',
    speaker: 'narrator',
    text: 'It is the first real college house party of the year — sticky cups, bad playlist, bodies packed into a living room that smells like perfume and cheap vodka. Near the kitchen island, three girls own the room like they paid rent on the night itself.',
    focus: 'all',
    choices: [{ text: 'Walk over', next: 'meet_all' }],
  },

  meet_all: {
    id: 'meet_all',
    speaker: 'maya',
    text: 'Oh my god — fresh meat. I am Maya. This is Riley, and that quiet menace is Jade. We do not bite… unless you ask nice.',
    focus: 'maya',
    choices: [{ text: '…Hi.', next: 'meet_riley' }],
  },

  meet_riley: {
    id: 'meet_riley',
    speaker: 'riley',
    text: 'Ignore her. She is already drunk on attention. I am Riley. You look like you need a drink and a bad decision.',
    focus: 'riley',
    choices: [{ text: 'Both sound good.', next: 'meet_jade' }],
  },

  meet_jade: {
    id: 'meet_jade',
    speaker: 'jade',
    text: 'Jade. Do not disappear on us. I hate hunting for people I already decided are interesting.',
    focus: 'jade',
    choices: [
      {
        text: 'Flirt with Maya first',
        next: 'maya_dance',
        effect: { affection: { maya: 1 } },
      },
      {
        text: 'Stick close to Riley',
        next: 'riley_drink',
        effect: { affection: { riley: 1 } },
      },
      {
        text: 'Meet Jade’s stare',
        next: 'jade_corner',
        effect: { affection: { jade: 1 } },
      },
    ],
  },

  // —— MAYA PATH ——
  maya_dance: {
    id: 'maya_dance',
    speaker: 'maya',
    text: 'Maya grabs your wrist and drags you into the crush of dancers. Her hips find yours like she has done this a hundred times — maybe she has. “Keep up,” she laughs against your ear. “Or I will find someone who can.”',
    focus: 'maya',
    choices: [
      {
        text: 'Match her rhythm and pull her closer',
        next: 'maya_closer',
        effect: { affection: { maya: 2 } },
      },
      {
        text: 'Tease her — dance just out of reach',
        next: 'maya_tease',
        effect: { affection: { maya: 1, jade: 1 } },
      },
    ],
  },

  maya_tease: {
    id: 'maya_tease',
    speaker: 'maya',
    text: 'She bites her lip, annoyed and turned on in equal measure. “Oh, you play. Fine. Play.” Across the room Jade watches you both with a sharp little smile, like she is taking notes.',
    focus: 'maya',
    choices: [{ text: 'Pull Maya in anyway', next: 'maya_closer', effect: { affection: { maya: 1 } } }],
  },

  maya_closer: {
    id: 'maya_closer',
    speaker: 'maya',
    text: 'Maya’s body is flush against yours now — heat, perfume, the soft catch of her breath when your hand settles on her waist. “Bathroom,” she murmurs. “Before Riley notices I stole you.”',
    focus: 'maya',
    choices: [
      {
        text: 'Follow her',
        next: 'maya_bathroom',
        effect: { affection: { maya: 2 }, flags: { kissedMaya: true } },
      },
      {
        text: 'Stay public — kiss her on the floor',
        next: 'maya_public',
        effect: { affection: { maya: 1, riley: -1 }, flags: { kissedMaya: true, caughtAlmost: true } },
      },
    ],
  },

  maya_public: {
    id: 'maya_public',
    speaker: 'narrator',
    text: 'You kiss her under the strobe lights. Maya moans into it like she wants the whole house to hear. Riley’s eyes go wide from the couch. Jade mouths “bold” and looks hungry.',
    focus: 'maya',
    choices: [{ text: 'Escape to the hallway', next: 'hallway_choice' }],
  },

  maya_bathroom: {
    id: 'maya_bathroom',
    speaker: 'maya',
    text: 'The bathroom lock clicks. Maya hops onto the sink, skirts hiked, thighs parting around your hips. “Quiet,” she whispers, already undoing your belt. “Unless you want my friends to know how easy I am for you.”',
    focus: 'maya',
    nsfw: true,
    choices: [
      {
        text: 'Take her hard against the mirror',
        next: 'maya_nsfw_1',
        effect: { affection: { maya: 3 }, flags: { bathroomMaya: true } },
      },
      {
        text: 'Go slow — make her beg',
        next: 'maya_nsfw_slow',
        effect: { affection: { maya: 3 }, flags: { bathroomMaya: true } },
      },
    ],
  },

  maya_nsfw_1: {
    id: 'maya_nsfw_1',
    speaker: 'maya',
    text: 'She is wet the second you touch her. Maya bites your shoulder when you push in, legs locked around you, fogging the mirror with every thrust. “Fuck — they think I am the wild one,” she gasps. “They have no idea how slutty I get when I like someone.”',
    focus: 'maya',
    nsfw: true,
    choices: [{ text: 'Finish with her', next: 'maya_after', effect: { affection: { maya: 2 } } }],
  },

  maya_nsfw_slow: {
    id: 'maya_nsfw_slow',
    speaker: 'maya',
    text: 'You deny her speed until she is shaking. “Please — please, I will be so good—” Maya’s voice breaks into a whimper as you finally give her what she wants, slow and deep, watching her fall apart on the cold sink.',
    focus: 'maya',
    nsfw: true,
    choices: [{ text: 'Let her come undone', next: 'maya_after', effect: { affection: { maya: 2 } } }],
  },

  maya_after: {
    id: 'maya_after',
    speaker: 'maya',
    text: 'Maya fixes her lipstick with a satisfied smirk. “If Riley asks, we were fighting over playlist rights. Now go. Or stay. I am selfish either way.”',
    focus: 'maya',
    choices: [{ text: 'Slip back into the party', next: 'hallway_choice' }],
  },

  // —— RILEY PATH ——
  riley_drink: {
    id: 'riley_drink',
    speaker: 'riley',
    text: 'Riley pours something neon into a plastic cup and presses it into your hand. Her jersey slips further off her shoulder. “Maya collects people. Jade collects secrets. Me? I collect nights that get messy on purpose.”',
    focus: 'riley',
    choices: [
      {
        text: 'Ask what kind of messy',
        next: 'riley_messy',
        effect: { affection: { riley: 2 } },
      },
      {
        text: 'Challenge her to a drinking game',
        next: 'riley_game',
        effect: { affection: { riley: 1, maya: 1 } },
      },
    ],
  },

  riley_game: {
    id: 'riley_game',
    speaker: 'riley',
    text: 'Never Have I Ever turns filthy fast. Maya howls. Jade barely drinks — she has done everything. Riley holds your gaze when she says, “Never have I ever fucked someone my friends wanted.” She does not drink. Yet.',
    focus: 'riley',
    choices: [{ text: 'Lean in and ask if tonight changes that', next: 'riley_messy', effect: { affection: { riley: 2 } } }],
  },

  riley_messy: {
    id: 'riley_messy',
    speaker: 'riley',
    text: 'Riley’s smile goes soft and filthy. “The kind where I put your hand under my jersey on this crowded couch and dare you not to make a sound. Maya is right there. That is the fun.”',
    focus: 'riley',
    choices: [
      {
        text: 'Take the dare',
        next: 'riley_couch',
        effect: { affection: { riley: 2 }, flags: { kissedRiley: true } },
      },
      {
        text: 'Pull her somewhere private',
        next: 'riley_bedroom',
        effect: { affection: { riley: 2 }, flags: { kissedRiley: true } },
      },
    ],
  },

  riley_couch: {
    id: 'riley_couch',
    speaker: 'narrator',
    text: 'Music covers the wet sound of your fingers between Riley’s thighs. She keeps chatting with Maya like nothing is happening — until her voice hitch-breaks mid-sentence. Maya squints. “You good?” Riley smiles, breathless. “Perfect.”',
    focus: 'riley',
    nsfw: true,
    choices: [
      {
        text: 'Keep going until she comes quietly',
        next: 'riley_nsfw_couch',
        effect: { affection: { riley: 3 }, flags: { couchRiley: true, caughtAlmost: true } },
      },
    ],
  },

  riley_nsfw_couch: {
    id: 'riley_nsfw_couch',
    speaker: 'riley',
    text: 'Riley bites the rim of her cup as she comes, thighs clamping your wrist. “Holy shit,” she whispers after, eyes glassy. “You are dangerous. If Jade finds out I came on her favorite couch, she will murder us both… hotly.”',
    focus: 'riley',
    nsfw: true,
    choices: [{ text: 'Recover before anyone notices', next: 'hallway_choice' }],
  },

  riley_bedroom: {
    id: 'riley_bedroom',
    speaker: 'riley',
    text: 'A borrowed bedroom. Coats on the bed. Riley pushes you down and straddles you, jersey gone, lace still on for about three seconds. “I look sweet,” she says, rolling her hips down onto you. “I am not. Tell me how you want your slut.”',
    focus: 'riley',
    nsfw: true,
    choices: [
      {
        text: '“Ride me. Look at me.”',
        next: 'riley_nsfw_ride',
        effect: { affection: { riley: 3 }, flags: { couchRiley: true } },
      },
      {
        text: 'Flip her and take control',
        next: 'riley_nsfw_control',
        effect: { affection: { riley: 3 }, flags: { couchRiley: true } },
      },
    ],
  },

  riley_nsfw_ride: {
    id: 'riley_nsfw_ride',
    speaker: 'riley',
    text: 'Riley rides you with filthy commentary and soft eyes — a devastating combo. “Feel that? That is me being bad for a stranger at a house party. God, I love this.” She comes first, shaking, then laughs like she got away with theft.',
    focus: 'riley',
    nsfw: true,
    choices: [{ text: 'Catch your breath and head back', next: 'hallway_choice' }],
  },

  riley_nsfw_control: {
    id: 'riley_nsfw_control',
    speaker: 'riley',
    text: 'On her back, Riley goes beautifully ruined — nails in your shoulders, legs open, begging in that sweet voice that makes every word dirtier. “Harder — yes — do not stop, please—” When she finishes, she kisses you soft. “Okay. Wow. Hi.”',
    focus: 'riley',
    nsfw: true,
    choices: [{ text: 'Sneak back downstairs', next: 'hallway_choice' }],
  },

  // —— JADE PATH ——
  jade_corner: {
    id: 'jade_corner',
    speaker: 'jade',
    text: 'Jade does not dance. She claims a shadowed corner of the hallway and lets the party orbit her. “Maya will fuck you for sport. Riley will romance you while she ruins you. Me?” Her finger hooks your belt loop. “I keep what I take.”',
    focus: 'jade',
    choices: [
      {
        text: 'Ask what she wants to take',
        next: 'jade_want',
        effect: { affection: { jade: 2 } },
      },
      {
        text: 'Kiss her without asking',
        next: 'jade_kiss',
        effect: { affection: { jade: 2 }, flags: { kissedJade: true } },
      },
    ],
  },

  jade_want: {
    id: 'jade_want',
    speaker: 'jade',
    text: '“Your attention. Your night. Maybe your dignity if you keep looking at my friends like that.” She smiles, sharp. “Coat closet. Now. I do not share well — but I like knowing they want what I have.”',
    focus: 'jade',
    choices: [
      {
        text: 'Follow her into the closet',
        next: 'jade_closet',
        effect: { affection: { jade: 2 }, flags: { kissedJade: true } },
      },
    ],
  },

  jade_kiss: {
    id: 'jade_kiss',
    speaker: 'jade',
    text: 'Jade kisses like a claim. When she pulls back, her lipstick is on your mouth and her eyes are darker. “Coat closet. Before I decide you are too public a problem.”',
    focus: 'jade',
    choices: [
      {
        text: 'Go with her',
        next: 'jade_closet',
        effect: { affection: { jade: 1 } },
      },
    ],
  },

  jade_closet: {
    id: 'jade_closet',
    speaker: 'jade',
    text: 'Coats swallow the sound. Jade drops to her knees with terrifying confidence, looking up once. “If you moan loud enough for Maya to hear, I will not stop — I will just get meaner.” Then her mouth is on you, slow and filthy and absolutely in charge.',
    focus: 'jade',
    nsfw: true,
    choices: [
      {
        text: 'Thread your hands in her hair and take it',
        next: 'jade_nsfw_1',
        effect: { affection: { jade: 3 }, flags: { closetJade: true } },
      },
      {
        text: 'Pull her up and fuck her standing',
        next: 'jade_nsfw_stand',
        effect: { affection: { jade: 3 }, flags: { closetJade: true } },
      },
    ],
  },

  jade_nsfw_1: {
    id: 'jade_nsfw_1',
    speaker: 'jade',
    text: 'Jade takes you deep, eyes watering, pride intact. When you finish, she stands, wipes her mouth with two fingers, and presses them to your lips. “Mine for the night. Say it.”',
    focus: 'jade',
    nsfw: true,
    choices: [
      {
        text: '“Yours.”',
        next: 'jade_after',
        effect: { affection: { jade: 2 } },
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
    text: 'You pin Jade against winter coats and slide into her. She gasps once — then laughs, breathless, possessive. “Yes. Use me. Let them wonder where you went.” She comes biting your neck hard enough to leave a mark she will brag about later.',
    focus: 'jade',
    nsfw: true,
    choices: [{ text: 'Mark accepted — head back', next: 'jade_after', effect: { affection: { jade: 2 } } }],
  },

  jade_after: {
    id: 'jade_after',
    speaker: 'jade',
    text: 'Jade straightens her skirt like a weapon being reholstered. “If you chase my friends after this, I will know. I might even watch.”',
    focus: 'jade',
    choices: [{ text: 'Return to the hallway', next: 'hallway_choice' }],
  },

  // —— MIDGAME HUB ——
  hallway_choice: {
    id: 'hallway_choice',
    speaker: 'narrator',
    text: 'The party has gotten louder, drunker, hotter. The three of them are scattered through the house like open invitations — and like traps. You can still choose who gets the rest of your night… or get greedy.',
    focus: 'all',
    choices: [
      {
        text: 'Find Maya on the balcony',
        next: 'maya_balcony',
      },
      {
        text: 'Find Riley in the kitchen',
        next: 'riley_kitchen',
      },
      {
        text: 'Find Jade on the stairs',
        next: 'jade_stairs',
      },
      {
        text: 'Text all three to meet upstairs',
        next: 'group_setup',
        require: (s) => {
          const hot = [s.affection.maya, s.affection.riley, s.affection.jade].filter((n) => n >= 4).length
          const hooked = [s.flags.bathroomMaya, s.flags.couchRiley, s.flags.closetJade].filter(Boolean).length
          return hot >= 2 || hooked >= 2 || s.flags.threesomeUnlocked
        },
      },
      {
        text: 'Call it a night',
        next: 'ending_route',
      },
    ],
  },

  maya_balcony: {
    id: 'maya_balcony',
    speaker: 'maya',
    text: 'Night air. Maya’s cigarette cherry glows. “You came back. Dangerous. I already told Riley you kiss like you mean it.” She flicks ash. “Want to make her jealous for real?”',
    focus: 'maya',
    choices: [
      {
        text: 'Bend her over the railing (careful)',
        next: 'maya_balcony_nsfw',
        effect: { affection: { maya: 2, riley: 1 }, flags: { bathroomMaya: true, sharedSecret: true } },
      },
      {
        text: 'Just talk — then steal another kiss',
        next: 'maya_soft',
        effect: { affection: { maya: 2 } },
      },
    ],
  },

  maya_balcony_nsfw: {
    id: 'maya_balcony_nsfw',
    speaker: 'maya',
    text: 'Maya braces on the railing, skirt up, biting a laugh as you take her from behind with the whole neighborhood possibly watching. “Slutty balcony finale,” she pants. “Put it in the yearbook.”',
    focus: 'maya',
    nsfw: true,
    choices: [{ text: 'Finish the night’s chaos', next: 'ending_route', effect: { affection: { maya: 2 } } }],
  },

  maya_soft: {
    id: 'maya_soft',
    speaker: 'maya',
    text: 'For a second Maya is almost tender — forehead against yours, voice quiet. “Do not tell them I can do soft. I have a brand.” Then she kisses you like she is branding you back.',
    focus: 'maya',
    choices: [{ text: 'Go settle the night', next: 'ending_route', effect: { affection: { maya: 1 } } }],
  },

  riley_kitchen: {
    id: 'riley_kitchen',
    speaker: 'riley',
    text: 'Riley is stealing dessert from someone else’s tray. Frosting on her thumb. She offers it to you without shame. “Jade thinks you are hers. Maya thinks you are a toy. I think you should put me on this counter and prove them both wrong.”',
    focus: 'riley',
    choices: [
      {
        text: 'Counter. Now.',
        next: 'riley_kitchen_nsfw',
        effect: { affection: { riley: 2 }, flags: { couchRiley: true, sharedSecret: true } },
      },
      {
        text: 'Steal the frosting kiss only',
        next: 'riley_frosting',
        effect: { affection: { riley: 2 } },
      },
    ],
  },

  riley_kitchen_nsfw: {
    id: 'riley_kitchen_nsfw',
    speaker: 'riley',
    text: 'You lift Riley onto the counter. She wraps around you, muffling moans into your neck while the party thumps one room over. “I am so easy for you,” she breathes. “Do not stop. Do not you dare stop.”',
    focus: 'riley',
    nsfw: true,
    choices: [{ text: 'Give her everything', next: 'ending_route', effect: { affection: { riley: 2 } } }],
  },

  riley_frosting: {
    id: 'riley_frosting',
    speaker: 'riley',
    text: 'Sweet kiss. Filthy eyes. Riley whispers, “If you leave without fucking me properly, I will start a rumor that you cry during sex.” She is joking. Probably.',
    focus: 'riley',
    choices: [{ text: 'Laugh and continue the night', next: 'ending_route' }],
  },

  jade_stairs: {
    id: 'jade_stairs',
    speaker: 'jade',
    text: 'Jade sits on the stairs like a queen between sets. She pats the step beside her — then pulls you between her knees instead. “I can smell them on you. Cute. Sit. Earn forgiveness.”',
    focus: 'jade',
    choices: [
      {
        text: 'Earn it with your mouth',
        next: 'jade_stairs_nsfw',
        effect: { affection: { jade: 3 }, flags: { closetJade: true } },
      },
      {
        text: 'Admit you want all three',
        next: 'group_setup',
        effect: { affection: { jade: 1 }, flags: { threesomeUnlocked: true } },
      },
    ],
  },

  jade_stairs_nsfw: {
    id: 'jade_stairs_nsfw',
    speaker: 'jade',
    text: 'Jade’s thighs frame your face. She holds the banister and tries to look bored while you ruin that plan. When she comes, it is quiet, vicious, beautiful — and she pulls you up by the collar to taste herself on your mouth. “Forgiven. Barely.”',
    focus: 'jade',
    nsfw: true,
    choices: [{ text: 'Survive her verdict', next: 'ending_route', effect: { affection: { jade: 2 } } }],
  },

  // —— GROUP / TABOO ——
  group_setup: {
    id: 'group_setup',
    speaker: 'narrator',
    text: 'You send the same message to all three. A minute later, Maya kicks open the upstairs bedroom door with Riley giggling behind her and Jade already sitting on the bed like she scheduled this.',
    focus: 'all',
    choices: [{ text: 'Close the door', next: 'group_talk' }],
  },

  group_talk: {
    id: 'group_talk',
    speaker: 'all',
    text: 'Maya: “Absolutely not — wait, absolutely yes.” Riley: “This is so fucked. I am so in.” Jade: “Rules. You look at me when you come. They can use you. I own the ending.”',
    focus: 'all',
    choices: [
      {
        text: 'Agree to Jade’s rules',
        next: 'group_nsfw',
        effect: { affection: { jade: 2, maya: 2, riley: 2 }, flags: { threesomeUnlocked: true, sharedSecret: true } },
      },
      {
        text: 'Refuse hierarchy — pleasure free-for-all',
        next: 'group_nsfw_free',
        effect: { affection: { maya: 2, riley: 2, jade: 1 }, flags: { threesomeUnlocked: true, sharedSecret: true } },
      },
    ],
  },

  group_nsfw: {
    id: 'group_nsfw',
    speaker: 'narrator',
    text: 'Hands everywhere. Maya rides your face while Riley takes you deep, moaning into Maya’s mouth. Jade directs like sin with a clipboard — then straddles your hips last, possessive, locking eyes as she finishes you while her friends kiss her neck. The bed is a crime scene of lipstick and laughter.',
    focus: 'all',
    nsfw: true,
    choices: [{ text: 'Afterglow', next: 'ending_threesome', effect: { affection: { maya: 2, riley: 2, jade: 2 } } }],
  },

  group_nsfw_free: {
    id: 'group_nsfw_free',
    speaker: 'narrator',
    text: 'No rules survive contact. Maya and Riley share you in a messy rhythm while Jade bites, guides, and eventually laughs — actually laughs — when the three of them collapse into a tangle of limbs and smug, slutty victory. Someone’s playlist is still blasting downstairs like nothing sacred happened.',
    focus: 'all',
    nsfw: true,
    choices: [{ text: 'Afterglow', next: 'ending_threesome', effect: { affection: { maya: 2, riley: 2, jade: 1 } } }],
  },

  // —— ENDINGS ——
  ending_route: {
    id: 'ending_route',
    speaker: 'narrator',
    text: 'Dawn starts bullying the blinds. Time to see what your night actually bought you.',
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
    text: 'Maya steals your hoodie on the way out and texts you a photo of her in nothing else before you even reach the sidewalk. “Same party next week. Wear something easy to take off.” You did not tame her. You enrolled.',
    focus: 'maya',
    ending: 'solo',
    choices: [{ text: 'Play again', next: 'title' }],
  },

  ending_solo_riley: {
    id: 'ending_solo_riley',
    speaker: 'riley',
    text: 'Riley walks you out holding your hand like you are wholesome. Then she whispers exactly how she wants you to wake her up tomorrow. Soft girl. Filthy plans. You are so screwed — happily.',
    focus: 'riley',
    ending: 'solo',
    choices: [{ text: 'Play again', next: 'title' }],
  },

  ending_solo_jade: {
    id: 'ending_solo_jade',
    speaker: 'jade',
    text: 'Jade does not ask for your number. She puts it in her phone herself. “You are not a fling. You are a project.” From her, that is a love poem. Possibly a threat. Definitely a second date.',
    focus: 'jade',
    ending: 'solo',
    choices: [{ text: 'Play again', next: 'title' }],
  },

  ending_threesome: {
    id: 'ending_threesome',
    speaker: 'all',
    text: 'The three of them share a rideshare and an unspoken treaty: nobody talks about tonight in public… and everybody texts you before noon. Taboo tastes better with matching hickeys. You did not pick one girl. You detonated the friend group in the hottest way possible.',
    focus: 'all',
    ending: 'threesome',
    choices: [{ text: 'Play again', next: 'title' }],
  },

  ending_messy: {
    id: 'ending_messy',
    speaker: 'narrator',
    text: 'You played too many sides without enough charm. Maya calls you a coward. Riley laughs it off and means it. Jade blocks you before breakfast. The party was fun. The aftermath is a group chat you are not in.',
    focus: 'none',
    ending: 'messy',
    choices: [{ text: 'Play again', next: 'title' }],
  },

  ending_caught: {
    id: 'ending_caught',
    speaker: 'narrator',
    text: 'Someone opens the wrong door at the wrong time. The house howls. Your night becomes campus folklore before sunrise. The girls? Unbothered. Famous, even. You? Assigned a nickname you will never live down.',
    focus: 'all',
    ending: 'caught',
    choices: [{ text: 'Play again', next: 'title' }],
  },
}

export function resolveEndingScene(state: {
  affection: { maya: number; riley: number; jade: number }
  flags: { threesomeUnlocked: boolean; sharedSecret: boolean; caughtAlmost: boolean; bathroomMaya: boolean; couchRiley: boolean; closetJade: boolean }
}): string {
  const { maya, riley, jade } = state.affection
  const scores = [
    { id: 'maya', n: maya },
    { id: 'riley', n: riley },
    { id: 'jade', n: jade },
  ].sort((a, b) => b.n - a.n)

  const hooked = [state.flags.bathroomMaya, state.flags.couchRiley, state.flags.closetJade].filter(Boolean).length

  if (state.flags.threesomeUnlocked && hooked >= 2) return 'ending_threesome'
  if (state.flags.sharedSecret && scores[0].n >= 6 && scores[1].n >= 5) return 'ending_threesome'
  if (state.flags.caughtAlmost && scores[0].n < 5 && hooked >= 2) return 'ending_caught'
  if (scores[0].n < 3) return 'ending_messy'
  if (scores[0].n - scores[1].n < 2 && scores[1].n >= 5) return 'ending_messy'

  if (scores[0].id === 'maya') return 'ending_solo_maya'
  if (scores[0].id === 'riley') return 'ending_solo_riley'
  return 'ending_solo_jade'
}
