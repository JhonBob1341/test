import type { Scene } from './types'

/**
 * Darker adult taboo routes (all characters 21+).
 * Themes: free-use contracts, breeding risk, collar/ownership,
 * corruption, blackmail countdown, cuckold Facetime, public use,
 * orgy, choking, impact play, BDSM bondage, CNC rape-play.
 */
export const EXTREME_TABOO_SCENES: Record<string, Scene> = {
  extreme_hub: {
    id: 'extreme_hub',
    speaker: 'maya',
    text: 'Maya grins over Lola’s bowed head. “Cute treason is finished. Contracts. Collars. Timers. Public use. Breeding dares. Orgy. Choking. Spanking. Rope. CNC. Riley corruption. Tyler on speaker.” Lola whispers, “Please put me on whatever list you want.” Riley’s hands shake and stay.',
    focus: 'all',
    chapter: 'Act II · Escalation',
    choices: [
      {
        text: 'Draft the free-use weekend (Lola will sign first)',
        next: 'xt_freeuse',
        require: (s) => !s.flags.freeUse,
        need: { dominance: 3 },
        softLock: true,
      },
      {
        text: 'Collar Lola — she has been eyeing the choker',
        next: 'xt_collar',
        require: (s) => !s.flags.collarClaim,
        need: { dominance: 4 },
        softLock: true,
      },
      {
        text: 'Let Maya name the breeding dare',
        next: 'xt_breed',
        require: (s) => !s.flags.breedingDare,
        need: { nerve: 4, stamina: 3 },
        softLock: true,
      },
      {
        text: 'Tell Riley you are going to finish corrupting her',
        next: 'xt_corrupt_riley',
        require: (s) => !s.flags.corruptRiley,
        need: { charm: 3, dominance: 3 },
        softLock: true,
      },
      {
        text: 'Ask what happens if the draft post timer hits zero',
        next: 'xt_blackmail_timer',
        require: (s) => !s.flags.blackmailTimer && (s.flags.blackmailJade || s.flags.phoneLeak || s.flags.closetJade),
        need: { insight: 3, dominance: 2 },
        softLock: true,
      },
      {
        text: 'Tell Maya to put Tyler on Facetime',
        next: 'xt_cuck_tyler',
        require: (s) => !s.flags.cuckoldLive && (s.flags.exBetrayal || s.affection.maya >= 4),
        need: { nerve: 5 },
        softLock: true,
      },
      {
        text: 'Take them to the hallway while guests still roam',
        next: 'xt_hallway_use',
        require: (s) => !s.flags.publicUse,
        need: { nerve: 4, discretion: 2 },
        softLock: true,
      },
      {
        text: 'Ask if the friendship dies on camera tonight',
        next: 'xt_break_bond',
        require: (s) => !s.flags.friendshipBroken && hookedCountGate(s),
        need: { dominance: 4, insight: 3 },
        softLock: true,
      },
      {
        text: 'Turn the living room into an orgy [NRV 5 · STM 4]',
        next: 'xt_orgy',
        require: (s) => !s.flags.orgyNight,
        need: { nerve: 5, stamina: 4 },
        softLock: true,
      },
      {
        text: 'Ask who wants hands on their throat [DOM 5]',
        next: 'xt_choke',
        require: (s) => !s.flags.chokingPlay,
        need: { dominance: 5 },
        softLock: true,
      },
      {
        text: 'Bring up spanking and open-hand hits [DOM 4]',
        next: 'xt_impact',
        require: (s) => !s.flags.impactPlay,
        need: { dominance: 4, nerve: 3 },
        softLock: true,
      },
      {
        text: 'Ask Lola to open the rope kit [DOM 5 · INS 3]',
        next: 'xt_bdsm',
        require: (s) => !s.flags.bdsmSession,
        need: { dominance: 5, insight: 3 },
        softLock: true,
      },
      {
        text: 'Force a CNC rape-play scene [DOM 6 · NRV 5]',
        next: 'xt_cnc',
        require: (s) => !(s.flags.mayaCnc && s.flags.rileyCnc && s.flags.jadeCnc),
        need: { dominance: 6, nerve: 5 },
        softLock: true,
      },
      {
        text: 'Open Maya’s personal kink menu',
        next: 'kink_maya_hub',
      },
      {
        text: 'Open Riley’s personal kink menu',
        next: 'kink_riley_hub',
      },
      {
        text: 'Open Lola’s personal kink menu',
        next: 'kink_jade_hub',
      },
      {
        text: 'Not yet — step back into the party',
        next: 'fallout_continue',
      },
    ],
  },

  // —— FREE USE ——
  xt_freeuse: {
    id: 'xt_freeuse',
    speaker: 'jade',
    text: 'Lola opens Notes. Title: FREE-USE WEEKEND. “Consenting adults. Revocable by safeword ‘lease.’ Until then: mouth, cunt, time — house property.” Maya: “Evil. I’m in.” Riley’s hands shake. “If I sign… I’m not the good one anymore.”',
    focus: 'all',
    chapter: 'Act II · Escalation',
    choices: [
      {
        text: 'Make all three sign',
        next: 'xt_freeuse_sign',
        effect: { affection: { maya: 2, riley: 1, jade: 2 }, flags: { freeUse: true } },
      },
      {
        text: 'Force Riley to read it aloud first [DOM 5]',
        next: 'xt_freeuse_read',
        need: { dominance: 5 },
        softLock: true,
        effect: { affection: { riley: 2, jade: 1 }, skills: { dominance: 1 } },
      },
    ],
  },

  xt_freeuse_read: {
    id: 'xt_freeuse_read',
    speaker: 'riley',
    text: 'Riley reads every filthy clause while Maya films and Lola corrects pronunciation. By “available without asking,” Riley is crying and wet. “I hate how hard this makes me,” she whispers, then signs.',
    focus: 'riley',
    nsfw: true,
    art: 'sex_riley_bathroom',
    choices: [
      {
        text: 'Seal with immediate use',
        next: 'xt_freeuse_seal',
        effect: { flags: { freeUse: true, corruptRiley: true }, affection: { riley: 2 } },
      },
    ],
  },

  xt_freeuse_sign: {
    id: 'xt_freeuse_sign',
    speaker: 'narrator',
    text: 'Three signatures. Maya draws a heart that looks like a threat. Lola initials like a landlord. Riley’s handwriting breaks on the last letter.',
    focus: 'all',
    choices: [{ text: 'Test the contract now', next: 'xt_freeuse_seal' }],
  },

  xt_freeuse_seal: {
    id: 'xt_freeuse_seal',
    speaker: 'narrator',
    text: 'You test free-use in the living room after locking the front door. No romance. No asking. Maya on her knees first, Riley bent over the couch arm, Lola timing rounds like a tyrant. When someone knocks, Lola mouths “still free” and does not stop you.',
    focus: 'all',
    nsfw: true,
    art: 'sex_group_living',
    choices: [
      {
        text: 'Mark the contract satisfied',
        next: 'fallout_continue',
        effect: {
          affection: { maya: 2, riley: 2, jade: 2 },
          flags: {
            freeUse: true,
            bathroomMaya: true,
            couchRiley: true,
            closetJade: true,
            threesomeUnlocked: true,
            oathPayment: true,
          },
          skills: { stamina: 1, dominance: 1 },
        },
      },
    ],
  },

  // —— COLLAR ——
  xt_collar: {
    id: 'xt_collar',
    speaker: 'jade',
    text: 'Lola holds out a black choker with both hands like an offering. “Please. Not fashion. Claim. Put it on me first — or them — but if you collar me I will be good. I swear.” Maya snorts. “She means it.”',
    focus: 'jade',
    chapter: 'Act II · Escalation',
    choices: [
      {
        text: 'Collar Lola first',
        next: 'xt_collar_jade',
        effect: { affection: { jade: 2 } },
      },
      {
        text: 'Collar Riley while Lola watches',
        next: 'xt_collar_riley',
        effect: { affection: { riley: 2, jade: 1 } },
      },
      {
        text: 'Collar Maya in front of a window [NRV 4]',
        next: 'xt_collar_maya',
        need: { nerve: 4 },
        softLock: true,
        effect: { affection: { maya: 2 }, skills: { nerve: 1 } },
      },
    ],
  },

  xt_collar_jade: {
    id: 'xt_collar_jade',
    speaker: 'jade',
    text: 'Lola lifts her hair with shaking fingers. You buckle the choker. She goes soft immediately — eyes wet, knees weak. “Say I belong to you.” You do. She comes on the next thrust whispering “keep it — please keep it —” like the collar is the real climax.',
    focus: 'jade',
    nsfw: true,
    art: 'sex_jade_collar',
    choices: [
      {
        text: 'Leave it on her',
        next: 'fallout_continue',
        effect: {
          affection: { jade: 3 },
          flags: { collarClaim: true, markedByJade: true, closetJade: true, deepJade: true },
          skills: { dominance: 2 },
        },
      },
    ],
  },

  xt_collar_riley: {
    id: 'xt_collar_riley',
    speaker: 'riley',
    text: 'Riley sobs when the buckle clicks — not from pain. Lola stands behind her and holds her wrists. “Good girl traitors wear jewelry,” Lola says. You take Riley from behind while she stares at their friendship photo and comes with the collar tight.',
    focus: 'riley',
    nsfw: true,
    art: 'sex_riley_collar',
    choices: [
      {
        text: 'Call her house property',
        next: 'fallout_continue',
        effect: {
          affection: { riley: 3, jade: 2 },
          flags: { collarClaim: true, corruptRiley: true, couchRiley: true, deepRiley: true },
          skills: { dominance: 1, charm: -1 },
        },
      },
    ],
  },

  xt_collar_maya: {
    id: 'xt_collar_maya',
    speaker: 'maya',
    text: 'Maya wants the window open. Collar on, skirt up, she waves at the street between thrusts. “If Tyler ever drives by, he can learn visually.” She comes laughing with the choker printed into her throat.',
    focus: 'maya',
    nsfw: true,
    art: 'sex_maya_collar',
    choices: [
      {
        text: 'Tighten it one notch',
        next: 'fallout_continue',
        effect: {
          affection: { maya: 3 },
          flags: { collarClaim: true, exBetrayal: true, bathroomMaya: true, caughtAlmost: true, deepMaya: true },
          skills: { nerve: 2 },
        },
      },
    ],
  },

  // —— BREEDING RISK ——
  xt_breed: {
    id: 'xt_breed',
    speaker: 'maya',
    text: 'Maya locks the guest room and drops her pills bottle on the nightstand unopened. “Dare. No pull-out. No condom. I want the risk. I want to feel like a ruined roommate.” She is 21, grinning, deadly serious.',
    focus: 'maya',
    chapter: 'Act II · Escalation',
    choices: [
      {
        text: 'Take the breeding dare',
        next: 'xt_breed_nsfw',
        effect: { flags: { breedingDare: true }, affection: { maya: 2 } },
      },
      {
        text: 'Make Riley watch the dare [NRV 3]',
        next: 'xt_breed_watch',
        need: { nerve: 3 },
        softLock: true,
        effect: { flags: { breedingDare: true, watchedSecret: true }, affection: { maya: 2, riley: 2 } },
      },
      {
        text: 'Refuse the risk — keep the heat',
        next: 'fallout_continue',
        effect: { affection: { maya: 1 }, skills: { discretion: 1 } },
      },
    ],
  },

  xt_breed_nsfw: {
    id: 'xt_breed_nsfw',
    speaker: 'maya',
    text: 'Maya rides bare and mean, chanting the dare like a prayer. “Fill me — roommate slut — pact killer—” When you finish inside her she clamps down and laughs through it. “If I panic tomorrow, you still did it. That is the point.”',
    focus: 'maya',
    nsfw: true,
    art: 'sex_maya_laundry',
    choices: [
      {
        text: 'Hold her through the aftershock',
        next: 'fallout_continue',
        effect: {
          affection: { maya: 3 },
          flags: { breedingDare: true, bathroomMaya: true, deepMaya: true, exBetrayal: true },
          skills: { stamina: 2, nerve: 1 },
        },
      },
    ],
  },

  xt_breed_watch: {
    id: 'xt_breed_watch',
    speaker: 'riley',
    text: 'Riley sits in the corner chair as ordered. Maya makes eye contact with her while you finish inside. Riley’s hand is under her jersey. “I am so fucked up for watching,” she whispers. Maya: “Join the club. Literally.”',
    focus: 'all',
    nsfw: true,
    art: 'sex_maya_riley',
    choices: [
      {
        text: 'Pull Riley over to clean Maya up',
        next: 'xt_breed_clean',
        effect: { affection: { riley: 2, maya: 2 }, flags: { girlOnGirl: true, corruptRiley: true } },
      },
    ],
  },

  xt_breed_clean: {
    id: 'xt_breed_clean',
    speaker: 'riley',
    text: 'Riley’s mouth on Maya is apology and theft at once. Lola opens the door mid-act, watches ten seconds, and says, “Add breeding clause to the doc,” like she is updating a syllabus.',
    focus: 'all',
    nsfw: true,
    art: 'sex_maya_riley',
    choices: [
      {
        text: 'Log the clause',
        next: 'fallout_continue',
        effect: {
          affection: { maya: 2, riley: 2, jade: 2 },
          flags: {
            breedingDare: true,
            bathroomMaya: true,
            couchRiley: true,
            threesomeUnlocked: true,
            haremRules: true,
          },
          skills: { dominance: 1, nerve: 1 },
        },
      },
    ],
  },

  // —— CORRUPT RILEY ——
  xt_corrupt_riley: {
    id: 'xt_corrupt_riley',
    speaker: 'riley',
    text: 'Riley knows what you came for. “If you corrupt me, I will still bake for them tomorrow. That is the worst part.” She offers her phone. “Make me send Lola something I cannot unsend.”',
    focus: 'riley',
    chapter: 'Act II · Escalation',
    choices: [
      {
        text: 'Make her send a live video to Lola',
        next: 'xt_corrupt_send',
        effect: { flags: { corruptRiley: true, phoneLeak: true, toldOnFriend: true } },
      },
      {
        text: 'Make her beg to be called their whore [DOM 4 · CHM 3]',
        next: 'xt_corrupt_name',
        need: { dominance: 4, charm: 3 },
        softLock: true,
      },
    ],
  },

  xt_corrupt_send: {
    id: 'xt_corrupt_send',
    speaker: 'riley',
    text: 'Riley films herself taking you, voice breaking as she addresses Lola by name. “I broke the pact. I wanted to. Come punish me.” Send. Delivered. She comes from the notification buzz alone.',
    focus: 'riley',
    nsfw: true,
    art: 'sex_riley_record',
    choices: [
      {
        text: 'Wait for Lola’s arrival',
        next: 'xt_corrupt_jade',
        effect: { affection: { riley: 3, jade: 1 }, skills: { nerve: 1 } },
      },
    ],
  },

  xt_corrupt_name: {
    id: 'xt_corrupt_name',
    speaker: 'riley',
    text: 'You make Riley say it until it sticks: house whore, pact traitor, soft girl ruined. She repeats it into a pillow, then without the pillow, then while smiling. “Okay. I’m not coming back from that.”',
    focus: 'riley',
    nsfw: true,
    art: 'sex_riley_bathroom',
    choices: [
      {
        text: 'Finish the corruption',
        next: 'xt_corrupt_jade',
        effect: { affection: { riley: 3 }, flags: { corruptRiley: true, deepRiley: true }, skills: { dominance: 1 } },
      },
    ],
  },

  xt_corrupt_jade: {
    id: 'xt_corrupt_jade',
    speaker: 'jade',
    text: 'Lola arrives already wet with rage. She does not yell. She fucks Riley’s mouth while you take Riley from behind — a punishment that looks exactly like a reward. “She is corrupted,” Lola says afterward. “Good. Corrupt people are easier to schedule.”',
    focus: 'all',
    nsfw: true,
    art: 'sex_group_hallway',
    choices: [
      {
        text: 'Add her to the extreme ledger',
        next: 'fallout_continue',
        effect: {
          affection: { riley: 2, jade: 3 },
          flags: {
            corruptRiley: true,
            couchRiley: true,
            closetJade: true,
            girlOnGirl: true,
            threesomeUnlocked: true,
            blackmailJade: true,
          },
          skills: { dominance: 1, stamina: 1 },
        },
      },
    ],
  },

  // —— BLACKMAIL TIMER ——
  xt_blackmail_timer: {
    id: 'xt_blackmail_timer',
    speaker: 'jade',
    text: 'Lola sets a sixty-minute lock on a draft post: faces cropped, bodies obvious, caption “roommate ethics.” “Perform what I ask before it posts. Or we all get famous. I am curious which you fear more.”',
    focus: 'jade',
    chapter: 'Act II · Escalation',
    choices: [
      {
        text: 'Play her game',
        next: 'xt_blackmail_tasks',
        effect: { flags: { blackmailTimer: true, blackmailJade: true } },
      },
      {
        text: 'Dare her to post now [NRV 5]',
        next: 'xt_blackmail_post',
        need: { nerve: 5 },
        softLock: true,
        effect: { flags: { blackmailTimer: true, phoneLeak: true, caughtAlmost: true }, skills: { nerve: 1 } },
      },
    ],
  },

  xt_blackmail_tasks: {
    id: 'xt_blackmail_tasks',
    speaker: 'jade',
    text: 'Tasks: make Maya confess Tyler treason on voice note; make Riley crawl; fuck Lola in the hallway mirror. Timer ticking. Maya does the voice note laughing. Riley crawls flushed. You take Lola against the mirror while party bass covers the slap of skin.',
    focus: 'all',
    nsfw: true,
    art: 'sex_group_hallway',
    choices: [
      {
        text: 'Beat the timer',
        next: 'xt_blackmail_clear',
        effect: {
          affection: { maya: 2, riley: 2, jade: 3 },
          flags: {
            blackmailTimer: true,
            exBetrayal: true,
            corruptRiley: true,
            closetJade: true,
            bathroomMaya: true,
          },
          skills: { stamina: 1, dominance: 1 },
        },
      },
    ],
  },

  xt_blackmail_clear: {
    id: 'xt_blackmail_clear',
    speaker: 'jade',
    text: 'Lola cancels the post with one thumb. “Good pets. The draft stays in the folder forever. Motivation.” She kisses you like a receipt.',
    focus: 'jade',
    choices: [{ text: 'Accept the leash', next: 'fallout_continue', effect: { flags: { markedByJade: true } } }],
  },

  xt_blackmail_post: {
    id: 'xt_blackmail_post',
    speaker: 'narrator',
    text: 'She posts. The house detonates in screams and phones. Maya bows. Riley hides behind you and waves. Lola watches the metrics like stock. Extreme fame route unlocked the ugly way.',
    focus: 'all',
    choices: [
      {
        text: 'Own the scandal ending',
        next: 'ending_caught',
        effect: { flags: { phoneLeak: true, caughtAlmost: true, blackmailTimer: true } },
      },
      {
        text: 'Drag them upstairs anyway',
        next: 'late_hub',
        effect: { flags: { phoneLeak: true, threesomeUnlocked: true, phase: 'late' } },
      },
    ],
  },

  // —— CUCK TYLER ——
  xt_cuck_tyler: {
    id: 'xt_cuck_tyler',
    speaker: 'maya',
    text: 'Maya Facetimes Tyler with the camera aimed at her face only — at first. “Hey baby, lonely.” Then she angles lower on purpose. “Say hi to the reason I will never be exclusive.”',
    focus: 'maya',
    chapter: 'Act II · Escalation',
    choices: [
      {
        text: 'Fuck her on camera for him',
        next: 'xt_cuck_nsfw',
        effect: { flags: { cuckoldLive: true, exBetrayal: true } },
      },
      {
        text: 'Make him stay on mute while she comes [NRV 5 · DOM 3]',
        next: 'xt_cuck_mute',
        need: { nerve: 5, dominance: 3 },
        softLock: true,
        effect: { flags: { cuckoldLive: true, exBetrayal: true }, skills: { nerve: 1 } },
      },
    ],
  },

  xt_cuck_nsfw: {
    id: 'xt_cuck_nsfw',
    speaker: 'maya',
    text: 'Tyler’s face goes white, then ugly. Maya rides you harder for the lens. “This is what boring gets you.” She finishes loud, ends the call, and blocks him mid-vibration. “Situationship: deceased. Roommate slut: thriving.”',
    focus: 'maya',
    nsfw: true,
    art: 'sex_maya_phone',
    choices: [
      {
        text: 'Brand the win',
        next: 'fallout_continue',
        effect: {
          affection: { maya: 3 },
          flags: { cuckoldLive: true, bathroomMaya: true, deepMaya: true, phoneLeak: true },
          skills: { nerve: 2 },
        },
      },
    ],
  },

  xt_cuck_mute: {
    id: 'xt_cuck_mute',
    speaker: 'maya',
    text: 'You mute Tyler and keep his horrified face on-screen like art. Maya watches him watch her come undone. When she can speak, she whispers, “That was the meanest orgasm of my life,” and kisses you with zero remorse.',
    focus: 'maya',
    nsfw: true,
    art: 'sex_maya_bathroom',
    choices: [
      {
        text: 'Leave him muted in the archive',
        next: 'fallout_continue',
        effect: {
          affection: { maya: 3, jade: 1 },
          flags: { cuckoldLive: true, bathroomMaya: true, blackmailJade: true, deepMaya: true },
          skills: { dominance: 1, nerve: 1 },
        },
      },
    ],
  },

  // —— HALLWAY PUBLIC USE ——
  xt_hallway_use: {
    id: 'xt_hallway_use',
    speaker: 'narrator',
    text: 'Lola posts you all in the upstairs hallway with a rule: do not stop when people walk by. Eyes only. No names. Maya faces the wall. Riley faces the stairs. Guests pretend not to see — badly.',
    focus: 'all',
    chapter: 'Act II · Escalation',
    nsfw: true,
    art: 'sex_group_hallway',
    choices: [
      {
        text: 'Use Maya first while a stranger stares',
        next: 'xt_hallway_maya',
        effect: { affection: { maya: 2 }, flags: { publicUse: true, caughtAlmost: true } },
      },
      {
        text: 'Use Riley and make her stay quiet [DSC 3]',
        next: 'xt_hallway_riley',
        need: { discretion: 3 },
        softLock: true,
        effect: { affection: { riley: 2 }, flags: { publicUse: true } },
      },
    ],
  },

  xt_hallway_maya: {
    id: 'xt_hallway_maya',
    speaker: 'maya',
    text: 'Maya comes with a stranger’s phone half-raised. She flips them off mid-orgasm. “Post it. Caption: ethics.” Lola confiscates the phone and keeps walking like security for sin.',
    focus: 'maya',
    nsfw: true,
    art: 'sex_maya_public',
    choices: [
      {
        text: 'Continue the hallway shift',
        next: 'xt_hallway_finish',
        effect: { affection: { maya: 2, jade: 1 }, flags: { bathroomMaya: true, phoneLeak: true } },
      },
    ],
  },

  xt_hallway_riley: {
    id: 'xt_hallway_riley',
    speaker: 'riley',
    text: 'Riley bites your wrist bloody-soft to stay silent as footsteps pass. Tears of heat. When the hall clears she gasps, “I came when they looked away. I am not okay. Do it again.”',
    focus: 'riley',
    nsfw: true,
    art: 'sex_riley_couch',
    choices: [
      {
        text: 'Do it again',
        next: 'xt_hallway_finish',
        effect: { affection: { riley: 3 }, flags: { couchRiley: true, corruptRiley: true }, skills: { discretion: 1 } },
      },
    ],
  },

  xt_hallway_finish: {
    id: 'xt_hallway_finish',
    speaker: 'jade',
    text: 'Lola takes the last turn facing the stairwell like a challenge. She does not hide her face. When she finishes she fixes her lipstick and says, “Public use logged. Anyone who talks pays oath.”',
    focus: 'jade',
    nsfw: true,
    art: 'sex_jade_stairs',
    choices: [
      {
        text: 'Log it and move on',
        next: 'fallout_continue',
        effect: {
          affection: { jade: 2, maya: 1, riley: 1 },
          flags: { publicUse: true, closetJade: true, threesomeUnlocked: true, caughtAlmost: true },
          skills: { nerve: 1, stamina: 1 },
        },
      },
    ],
  },

  // —— BREAK THE FRIENDSHIP ——
  xt_break_bond: {
    id: 'xt_break_bond',
    speaker: 'jade',
    text: 'Lola’s worst idea yet: “Say the friendship is over on camera. Then fuck like you mean the funeral.” Maya looks thrilled. Riley looks like she might vomit and still say yes.',
    focus: 'all',
    chapter: 'Act II · Escalation',
    choices: [
      {
        text: 'Make them say it',
        next: 'xt_break_say',
        effect: { flags: { friendshipBroken: true } },
      },
      {
        text: 'Refuse — keep the bond twisted instead',
        next: 'fallout_continue',
        effect: { affection: { riley: 1 }, skills: { charm: 1 } },
      },
    ],
  },

  xt_break_say: {
    id: 'xt_break_say',
    speaker: 'all',
    text: 'Maya: “Friends was a costume.” Riley: “I loved you both. I still will. That is why this hurts.” Lola: “Love is a scheduling problem.” They kiss angrily, then pull you in like the breakup needs a body.',
    focus: 'all',
    choices: [{ text: 'Fuck the funeral into them', next: 'xt_break_nsfw' }],
  },

  xt_break_nsfw: {
    id: 'xt_break_nsfw',
    speaker: 'narrator',
    text: 'It is not tender. It is memorial sex — biting, crying, laughing, claiming. When it ends, Riley asks if they can still be friends in the morning. Lola: “We can be worse. Worse lasts longer.”',
    focus: 'all',
    nsfw: true,
    art: 'sex_group_couch',
    choices: [
      {
        text: 'Lock the corruption ending path',
        next: 'ending_corrupt',
        effect: {
          affection: { maya: 3, riley: 3, jade: 3 },
          flags: {
            friendshipBroken: true,
            threesomeUnlocked: true,
            girlOnGirl: true,
            bathroomMaya: true,
            couchRiley: true,
            closetJade: true,
            corruptRiley: true,
          },
        },
      },
      {
        text: 'Rewrite it as harem instead of a funeral',
        next: 'harem_joint_intro',
        effect: {
          flags: {
            friendshipBroken: true,
            haremRoute: true,
            claimedMaya: true,
            claimedRiley: true,
            claimedJade: true,
            threesomeUnlocked: true,
          },
        },
      },
    ],
  },

  // —— ORGY ——
  xt_orgy: {
    id: 'xt_orgy',
    speaker: 'maya',
    text: 'Maya’s eyes go bright and mean. “Lock the front door. Soft music. No strangers — just us and whoever Lola already vetted on the porch.” Riley whispers, “Orgy is such an ugly word.” Lola: “Then call it inventory. Safeword is still lease. Hands up if you want in.” Three hands rise.',
    focus: 'all',
    chapter: 'Act II · Escalation',
    choices: [
      {
        text: 'Lock the door and start',
        next: 'xt_orgy_nsfw',
        effect: { affection: { maya: 2, riley: 1, jade: 2 }, flags: { orgyNight: true } },
      },
      {
        text: 'Make them strip each other first [DOM 6]',
        next: 'xt_orgy_strip',
        need: { dominance: 6 },
        softLock: true,
        effect: { affection: { jade: 2 }, skills: { dominance: 1 } },
      },
    ],
  },

  xt_orgy_strip: {
    id: 'xt_orgy_strip',
    speaker: 'jade',
    text: 'Lola undresses Maya like evidence. Maya peels Riley’s jersey with a kiss that is also a dare. Riley’s hands shake on Lola’s zipper and still finish the job. Clothes hit the rug. Lola looks at you. “Now fill the blank.”',
    focus: 'all',
    choices: [{ text: 'Take them all', next: 'xt_orgy_nsfw' }],
  },

  xt_orgy_nsfw: {
    id: 'xt_orgy_nsfw',
    speaker: 'narrator',
    text: 'The living room becomes a wet circuit — Maya on your face, Riley riding with soft broken noises, Lola directing who gets the next mouth. They trade places without jealousy, only hunger. Someone comes laughing. Someone comes crying. Nobody leaves the pile until the playlist loops twice.',
    focus: 'all',
    nsfw: true,
    art: 'sex_orgy',
    choices: [
      {
        text: 'Collapse into aftercare on the rug',
        next: 'xt_orgy_after',
        effect: {
          affection: { maya: 3, riley: 3, jade: 3 },
          flags: {
            orgyNight: true,
            threesomeUnlocked: true,
            girlOnGirl: true,
            bathroomMaya: true,
            couchRiley: true,
            closetJade: true,
            deepMaya: true,
            deepRiley: true,
            deepJade: true,
          },
          skills: { stamina: 2, nerve: 1 },
        },
      },
    ],
  },

  xt_orgy_after: {
    id: 'xt_orgy_after',
    speaker: 'riley',
    text: 'Riley’s head on your chest, voice tiny. “If anyone asks, we were watching a movie.” Maya snorts. Lola texts the group chat a single period like a threat. The house smells like sex and laundry detergent. You are not going back to soft.',
    focus: 'all',
    choices: [
      {
        text: 'Keep escalating',
        next: 'extreme_hub',
        effect: { flags: { phase: 'late' } },
      },
      {
        text: 'Rewrite the night as harem',
        next: 'harem_joint_intro',
        effect: { flags: { haremRoute: true, claimedMaya: true, claimedRiley: true, claimedJade: true } },
      },
      { text: 'Return to the party haze', next: 'fallout_continue' },
    ],
  },

  // —— CHOKING ——
  xt_choke: {
    id: 'xt_choke',
    speaker: 'jade',
    text: 'Lola taps her own throat. “Breath play. Controlled. Safeword lease — and two taps means stop even if you cannot talk. Who wants the hand?” Maya raises two fingers. Riley hesitates, then nods. Lola: “Pick your victim. Or let them pick you.”',
    focus: 'all',
    chapter: 'Act II · Escalation',
    choices: [
      {
        text: 'Choke Maya while you take her',
        next: 'xt_choke_maya',
        effect: { affection: { maya: 2 } },
      },
      {
        text: 'Let Lola coach you choking Riley',
        next: 'xt_choke_riley',
        effect: { affection: { riley: 2, jade: 1 } },
      },
      {
        text: 'Ask Lola to take your hand on her throat',
        next: 'xt_choke_jade',
        effect: { affection: { jade: 2 } },
      },
    ],
  },

  xt_choke_maya: {
    id: 'xt_choke_maya',
    speaker: 'maya',
    text: 'Maya’s eyes go glassy-happy the second your palm settles. “Not too hard — yes — there—” She comes with a silent open mouth, thighs shaking, then gasps air like it is funny. “Tyler never— fuck. Do that again later.”',
    focus: 'maya',
    nsfw: true,
    art: 'sex_choke',
    choices: [
      {
        text: 'Log the lesson',
        next: 'fallout_continue',
        effect: {
          affection: { maya: 3 },
          flags: { chokingPlay: true, bathroomMaya: true, deepMaya: true, exBetrayal: true },
          skills: { dominance: 1, nerve: 1 },
        },
      },
      {
        text: 'Ask who is next',
        next: 'xt_choke',
        effect: { flags: { chokingPlay: true, bathroomMaya: true, deepMaya: true } },
      },
    ],
  },

  xt_choke_riley: {
    id: 'xt_choke_riley',
    speaker: 'riley',
    text: 'Lola places your fingers. “Here. Light. Watch her eyes.” Riley’s soft whimper turns into a ruined moan when you squeeze on the thrust. Tears spill without panic — just overwhelm. She taps once for more, never twice. When she comes she sobs “thank you” like a prayer she should not say.',
    focus: 'riley',
    nsfw: true,
    art: 'sex_choke',
    choices: [
      {
        text: 'Hold her through the aftercare',
        next: 'fallout_continue',
        effect: {
          affection: { riley: 3, jade: 1 },
          flags: { chokingPlay: true, couchRiley: true, deepRiley: true, corruptRiley: true },
          skills: { dominance: 1, charm: 1 },
        },
      },
    ],
  },

  xt_choke_jade: {
    id: 'xt_choke_jade',
    speaker: 'jade',
    text: 'Lola melts the second your hand settles on her throat — eyes glassy, thighs shaking, little broken sounds. She does not dare you. She trusts you. She comes silent and grateful, then whispers, “Thank you for being careful with me.”',
    focus: 'jade',
    nsfw: true,
    art: 'sex_choke',
    choices: [
      {
        text: 'Kiss the place your hand was',
        next: 'fallout_continue',
        effect: {
          affection: { jade: 3 },
          flags: { chokingPlay: true, closetJade: true, deepJade: true, markedByJade: true },
          skills: { dominance: 2 },
        },
      },
    ],
  },

  // —— IMPACT / HITTING ——
  xt_impact: {
    id: 'xt_impact',
    speaker: 'maya',
    text: 'Maya grins like a bad idea. “Spanking. Slaps. Open hand — not stupid, not permanent. I want my ass pink. Riley wants to cry cute. Lola wants to count.” Lola: “Safeword lease. Ask before face. Ass is fair game.”',
    focus: 'all',
    chapter: 'Act II · Escalation',
    choices: [
      {
        text: 'Bend Maya over and spank her through it',
        next: 'xt_impact_maya',
      },
      {
        text: 'Put Riley over your lap',
        next: 'xt_impact_riley',
      },
      {
        text: 'Let Lola demand harder hits',
        next: 'xt_impact_jade',
        need: { dominance: 5 },
        softLock: true,
      },
    ],
  },

  xt_impact_maya: {
    id: 'xt_impact_maya',
    speaker: 'maya',
    text: 'Maya laughs on the first smack, then swears, then pushes back for more. You spank her while you fuck her until her thighs shake and her voice breaks into filthy praise. “Harder — mark me — fuck—” She comes loud enough the dryer in laundry might hear.',
    focus: 'maya',
    nsfw: true,
    art: 'sex_impact',
    choices: [
      {
        text: 'Admire the handprints',
        next: 'fallout_continue',
        effect: {
          affection: { maya: 3 },
          flags: { impactPlay: true, bathroomMaya: true, deepMaya: true, bodyWriting: true },
          skills: { dominance: 1, stamina: 1 },
        },
      },
    ],
  },

  xt_impact_riley: {
    id: 'xt_impact_riley',
    speaker: 'riley',
    text: 'Riley over your lap is a soft disaster — jersey hiked, face buried in a cushion, counting out loud so she does not float away. Each slap makes her wetter. When you finally fuck her she comes almost immediately, whispering sorry between thank-yous.',
    focus: 'riley',
    nsfw: true,
    art: 'sex_impact',
    choices: [
      {
        text: 'Kiss the sting better',
        next: 'fallout_continue',
        effect: {
          affection: { riley: 3 },
          flags: { impactPlay: true, couchRiley: true, deepRiley: true, corruptRiley: true },
          skills: { dominance: 1, charm: 1 },
        },
      },
    ],
  },

  xt_impact_jade: {
    id: 'xt_impact_jade',
    speaker: 'jade',
    text: 'Lola flinches, then pushes back for more. She counts out loud when you tell her to, voice sweet and ruined. A slap across her ass makes her moan “thank you.” She comes messy and honest, then hides her face. “I needed that. Please do not tell them I asked.”',
    focus: 'jade',
    nsfw: true,
    art: 'sex_impact',
    choices: [
      {
        text: 'Pet her hair and keep the secret',
        next: 'fallout_continue',
        effect: {
          affection: { jade: 3 },
          flags: { impactPlay: true, closetJade: true, deepJade: true },
          skills: { dominance: 2, nerve: 1 },
        },
      },
    ],
  },

  // —— BDSM / BONDAGE ——
  xt_bdsm: {
    id: 'xt_bdsm',
    speaker: 'jade',
    text: 'Lola opens the drawer with both hands shaking: soft rope, velvet cuffs, a blindfold. “Please… BDSM night. My limits: no blood, no permanent marks, safeword lease. I want to be the one tied. Or watch. Or both. Just tell me.”',
    focus: 'jade',
    chapter: 'Act II · Escalation',
    choices: [
      {
        text: 'Tie Riley while Lola watches on her knees',
        next: 'xt_bdsm_riley',
        effect: { affection: { riley: 1, jade: 1 } },
      },
      {
        text: 'Cuff Maya — Lola holds the spare rope',
        next: 'xt_bdsm_maya',
        effect: { affection: { maya: 2, jade: 1 } },
      },
      {
        text: 'Restrain Lola first',
        next: 'xt_bdsm_jade',
        effect: { affection: { jade: 2 } },
      },
      {
        text: 'Restrain all three in turn [STM 5]',
        next: 'xt_bdsm_all',
        need: { stamina: 5, dominance: 5 },
        softLock: true,
      },
    ],
  },

  xt_bdsm_riley: {
    id: 'xt_bdsm_riley',
    speaker: 'riley',
    text: 'Riley’s wrists kiss above her head. Lola narrates every knot like a lecture. You fuck Riley while she cannot cover her face — soft, ruined, grateful. Lola fingers her mouth open. “Look how pretty a traitor is when she cannot run.”',
    focus: 'riley',
    nsfw: true,
    art: 'sex_bdsm',
    choices: [
      {
        text: 'Untie her into aftercare',
        next: 'xt_bdsm_after',
        effect: {
          affection: { riley: 3, jade: 2 },
          flags: { bdsmSession: true, couchRiley: true, deepRiley: true, corruptRiley: true },
          skills: { dominance: 1, insight: 1 },
        },
      },
    ],
  },

  xt_bdsm_maya: {
    id: 'xt_bdsm_maya',
    speaker: 'maya',
    text: 'Maya in cuffs is still chaos — laughing, rolling her hips, daring you to use the blindfold. When the world goes dark she gets louder. “Do not be sweet—” You are not. She comes thrashing against the restraints and afterward asks for a photo she will never send Tyler.',
    focus: 'maya',
    nsfw: true,
    art: 'sex_bdsm',
    choices: [
      {
        text: 'Unlock her and kiss the red lines',
        next: 'xt_bdsm_after',
        effect: {
          affection: { maya: 3 },
          flags: { bdsmSession: true, bathroomMaya: true, deepMaya: true, phoneLeak: true },
          skills: { dominance: 1, nerve: 1 },
        },
      },
    ],
  },

  xt_bdsm_jade: {
    id: 'xt_bdsm_jade',
    speaker: 'jade',
    text: 'Lola offers her wrists before you ask. She tests nothing — she trusts. Bound, she goes quiet and wet and obedient, whispering please every time you move. She comes soft and shaking. After: “You can keep the rope. Please keep me too.”',
    focus: 'jade',
    nsfw: true,
    art: 'sex_bdsm',
    choices: [
      {
        text: 'Release her carefully',
        next: 'xt_bdsm_after',
        effect: {
          affection: { jade: 3 },
          flags: { bdsmSession: true, closetJade: true, deepJade: true, markedByJade: true },
          skills: { dominance: 2, insight: 1 },
        },
      },
    ],
  },

  xt_bdsm_all: {
    id: 'xt_bdsm_all',
    speaker: 'narrator',
    text: 'One after another: Riley soft and shaking, Maya loud and greedy, Lola precise until she cracks. Rope burns gentle pink into three pairs of wrists. By the end the bedroom looks like a crime scene made of aftercare blankets and water bottles.',
    focus: 'all',
    nsfw: true,
    art: 'sex_bdsm',
    choices: [
      {
        text: 'Collapse into aftercare',
        next: 'xt_bdsm_after',
        effect: {
          affection: { maya: 3, riley: 3, jade: 3 },
          flags: {
            bdsmSession: true,
            bathroomMaya: true,
            couchRiley: true,
            closetJade: true,
            deepMaya: true,
            deepRiley: true,
            deepJade: true,
            threesomeUnlocked: true,
          },
          skills: { dominance: 2, stamina: 1 },
        },
      },
    ],
  },

  xt_bdsm_after: {
    id: 'xt_bdsm_after',
    speaker: 'jade',
    text: 'Lola checks circulation like a professional. Maya steals the blindfold as a souvenir. Riley asks if wanting this again makes her broken. Lola: “No. It makes you scheduled.” She looks at you. “Extreme wing stays open.”',
    focus: 'all',
    choices: [
      { text: 'Return to the escalation menu', next: 'extreme_hub' },
      { text: 'Push toward harem rewrite', next: 'harem_pitch', effect: { flags: { haremRoute: true } } },
      { text: 'Step back into the party', next: 'fallout_continue' },
    ],
  },

  // —— CNC / CONSENSUAL RAPE-PLAY ——
  xt_cnc: {
    id: 'xt_cnc',
    speaker: 'jade',
    text: 'Lola’s voice goes clinical. “CNC. Consensual non-consent. Rape play. Limits first, then we pretend we did not. Hard rules: safeword lease ends it instantly. Two taps ends it if you cannot speak. No permanent injury. No involving anyone who did not opt in.” Maya’s grin is feral. Riley’s voice shakes: “I… I want to try. With a script.” Pick who you take.',
    focus: 'all',
    chapter: 'Act II · Escalation',
    choices: [
      {
        text: 'Catch Maya in the laundry — CNC',
        next: 'xt_cnc_maya',
        require: (s) => !s.flags.mayaCnc,
        effect: { affection: { maya: 2 } },
      },
      {
        text: 'Ambush Riley in the hallway — CNC',
        next: 'xt_cnc_riley',
        require: (s) => !s.flags.rileyCnc,
        effect: { affection: { riley: 2 } },
      },
      {
        text: 'Take Lola like she planned — CNC',
        next: 'xt_cnc_jade',
        require: (s) => !s.flags.jadeCnc,
        need: { dominance: 7 },
        softLock: true,
        effect: { affection: { jade: 2 } },
      },
      {
        text: 'Claim all three in a house CNC night [STM 6]',
        next: 'xt_cnc_house',
        require: (s) => !(s.flags.mayaCnc && s.flags.rileyCnc && s.flags.jadeCnc),
        need: { stamina: 6, dominance: 6, nerve: 5 },
        softLock: true,
      },
    ],
  },

  xt_cnc_maya: {
    id: 'xt_cnc_maya',
    speaker: 'maya',
    text: 'Pre-scene, Maya is crystal clear: “I will fight and swear. Lease stops everything. Aftercare on the dryer. Go.” Ten minutes later she ‘accidentally’ finds you in laundry and the script flips — shove, pinned wrists, her protests filthy and half-real. She comes thrashing, then taps twice on purpose just to test you stop. You stop. She laughs wetly. “Good. Now finish me for real.”',
    focus: 'maya',
    nsfw: true,
    art: 'sex_maya_laundry',
    choices: [
      {
        text: 'Finish with aftercare as promised',
        next: 'xt_cnc_after',
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

  xt_cnc_riley: {
    id: 'xt_cnc_riley',
    speaker: 'riley',
    text: 'Riley writes her limits on her phone and shows you twice. “Please do the mean voice. Please stop if I say lease.” In the hallway she plays startled perfect — soft noes, shaking, clinging. Lola watches from a cracked door as safety. When Riley safewords mid-scene you freeze; she kisses you shaking and whispers, “Green again. Keep going.” She comes crying into your shoulder.',
    focus: 'riley',
    nsfw: true,
    art: 'sex_group_hallway',
    choices: [
      {
        text: 'Wrap her in a blanket and check in',
        next: 'xt_cnc_after',
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

  xt_cnc_jade: {
    id: 'xt_cnc_jade',
    speaker: 'jade',
    text: 'Lola scripts her CNC soft and scared on purpose: “I will fight a little. I will say no. Lease stops everything. Aftercare means you hold me and say I was brave.” In-scene she trembles through the struggle-play, comes crying, then drops character into your chest: “Water. Then praise. Then tell me I am still good.”',
    focus: 'jade',
    nsfw: true,
    art: 'sex_jade_pin',
    choices: [
      {
        text: 'Hold her and debrief gently',
        next: 'xt_cnc_after',
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

  xt_cnc_house: {
    id: 'xt_cnc_house',
    speaker: 'narrator',
    text: 'They each sign a one-night CNC waiver in Notes — joke formatting, serious rules. For an hour the house is a negotiated nightmare: Maya ‘caught,’ Riley ‘ambushed,’ Lola ‘claimed.’ Safewords fire twice and are honored both times. When the clock ends, character drops. Blankets. Water. Stupid jokes. Riley: “That was the scariest safe thing I have ever done.”',
    focus: 'all',
    nsfw: true,
    art: 'sex_cnc',
    choices: [
      {
        text: 'Hold the group aftercare',
        next: 'xt_cnc_after',
        effect: {
          affection: { maya: 3, riley: 3, jade: 3 },
          flags: {
            cncPlay: true,
            mayaCnc: true,
            rileyCnc: true,
            jadeCnc: true,
            bathroomMaya: true,
            couchRiley: true,
            closetJade: true,
            deepMaya: true,
            deepRiley: true,
            deepJade: true,
            threesomeUnlocked: true,
          },
          skills: { dominance: 2, nerve: 1, stamina: 1 },
        },
      },
    ],
  },

  xt_cnc_after: {
    id: 'xt_cnc_after',
    speaker: 'jade',
    text: 'Lola runs the checklist like a drill sergeant who cares: breathing, hydration, “was anything actually bad.” Maya wants a rematch next weekend. Riley wants cuddles and a dumb movie. Lola files the night under EXTREME / CNC and looks at you. “Consent theater is still consent. Do not forget which side of the curtain you are on.”',
    focus: 'all',
    choices: [
      { text: 'Return to the escalation menu', next: 'extreme_hub' },
      { text: 'Push the house toward harem', next: 'harem_pitch', effect: { flags: { haremRoute: true } } },
      { text: 'Step back into the party', next: 'fallout_continue' },
    ],
  },

  ending_corrupt: {
    id: 'ending_corrupt',
    speaker: 'narrator',
    text: 'By Monday the friendship chat is silent and the secret chat is not. Free-use clauses. Collar photos. Rope marks fading under sleeves. A CNC script still sitting in Notes. A breeding dare neither of you discuss in daylight. They did not fall in love with you cleanly. They let you ruin the softest parts on purpose — and asked for a rematch.',
    focus: 'all',
    ending: 'corrupt',
    art: 'caught',
    chapter: 'Ending · Corrupt',
    choices: [{ text: 'Play again', next: 'title' }],
  },
}

function hookedCountGate(s: { flags: { bathroomMaya: boolean; couchRiley: boolean; closetJade: boolean } }): boolean {
  return [s.flags.bathroomMaya, s.flags.couchRiley, s.flags.closetJade].filter(Boolean).length >= 2
}
