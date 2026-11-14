import type { Scene } from './types'

/**
 * Darker adult taboo routes (all characters 21+).
 * Themes: free-use contracts, breeding risk, collar/ownership,
 * corruption, blackmail countdown, cuckold Facetime, public use.
 */
export const EXTREME_TABOO_SCENES: Record<string, Scene> = {
  extreme_hub: {
    id: 'extreme_hub',
    speaker: 'narrator',
    text: 'Past flirtation. Past “oops.” This is the wing of the night where the house stops pretending the games are cute. Free-use contracts. Breeding dares. Collars. Blackmail timers. Corruption. Pick how far you drag them.',
    focus: 'all',
    chapter: 'Act X · Extreme',
    choices: [
      {
        text: 'Draft a free-use weekend contract',
        next: 'xt_freeuse',
        require: (s) => !s.flags.freeUse,
        need: { dominance: 3 },
        softLock: true,
      },
      {
        text: 'Collar claim with Jade watching',
        next: 'xt_collar',
        require: (s) => !s.flags.collarClaim,
        need: { dominance: 4 },
        softLock: true,
      },
      {
        text: 'Breeding-risk dare with Maya',
        next: 'xt_breed',
        require: (s) => !s.flags.breedingDare,
        need: { nerve: 4, stamina: 3 },
        softLock: true,
      },
      {
        text: 'Corrupt Riley on purpose',
        next: 'xt_corrupt_riley',
        require: (s) => !s.flags.corruptRiley,
        need: { charm: 3, dominance: 3 },
        softLock: true,
      },
      {
        text: 'Start a blackmail countdown',
        next: 'xt_blackmail_timer',
        require: (s) => !s.flags.blackmailTimer && (s.flags.blackmailJade || s.flags.phoneLeak),
        need: { insight: 3, dominance: 2 },
        softLock: true,
      },
      {
        text: 'Cuckold Tyler on live Facetime',
        next: 'xt_cuck_tyler',
        require: (s) => !s.flags.cuckoldLive && (s.flags.exBetrayal || s.affection.maya >= 4),
        need: { nerve: 5 },
        softLock: true,
      },
      {
        text: 'Hallway free-use while guests pass',
        next: 'xt_hallway_use',
        require: (s) => !s.flags.publicUse,
        need: { nerve: 4, discretion: 2 },
        softLock: true,
      },
      {
        text: 'Make them destroy the friendship on camera',
        next: 'xt_break_bond',
        require: (s) => !s.flags.friendshipBroken && hookedCountGate(s),
        need: { dominance: 4, insight: 3 },
        softLock: true,
      },
      {
        text: 'Return to the main night',
        next: 'mid_hub',
      },
    ],
  },

  // —— FREE USE ——
  xt_freeuse: {
    id: 'xt_freeuse',
    speaker: 'jade',
    text: 'Jade opens Notes. Title: FREE-USE WEEKEND. “Consenting adults. Revocable by safeword ‘lease.’ Until then: mouth, cunt, time — house property.” Maya: “Evil. I’m in.” Riley’s hands shake. “If I sign… I’m not the good one anymore.”',
    focus: 'all',
    chapter: 'Act X · Extreme',
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
    text: 'Riley reads every filthy clause while Maya films and Jade corrects pronunciation. By “available without asking,” Riley is crying and wet. “I hate how hard this makes me,” she whispers, then signs.',
    focus: 'riley',
    nsfw: true,
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
    text: 'Three signatures. Maya draws a heart that looks like a threat. Jade initials like a landlord. Riley’s handwriting breaks on the last letter.',
    focus: 'all',
    choices: [{ text: 'Test the contract now', next: 'xt_freeuse_seal' }],
  },

  xt_freeuse_seal: {
    id: 'xt_freeuse_seal',
    speaker: 'narrator',
    text: 'You test free-use in the living room after locking the front door. No romance. No asking. Maya on her knees first, Riley bent over the couch arm, Jade timing rounds like a tyrant. When someone knocks, Jade mouths “still free” and does not stop you.',
    focus: 'all',
    nsfw: true,
    choices: [
      {
        text: 'Mark the contract satisfied',
        next: 'extreme_hub',
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
    text: 'Jade produces a black choker from her jewelry box like she planned this semester. “Not fashion. Claim. You put it on one of us — or all of us in turn — and we stop pretending this is dating.”',
    focus: 'jade',
    chapter: 'Act X · Extreme',
    choices: [
      {
        text: 'Collar Jade first',
        next: 'xt_collar_jade',
        effect: { affection: { jade: 2 } },
      },
      {
        text: 'Collar Riley while Jade watches',
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
    text: 'Jade lifts her hair. You buckle the choker. Her pulse jumps against your knuckles. “Say it.” You say she belongs to the night. She fucks you with the collar on, eyes furious with relief, and comes whispering “keep it.”',
    focus: 'jade',
    nsfw: true,
    choices: [
      {
        text: 'Leave it on her',
        next: 'extreme_hub',
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
    text: 'Riley sobs when the buckle clicks — not from pain. Jade stands behind her and holds her wrists. “Good girl traitors wear jewelry,” Jade says. You take Riley from behind while she stares at their friendship photo and comes with the collar tight.',
    focus: 'riley',
    nsfw: true,
    choices: [
      {
        text: 'Call her house property',
        next: 'extreme_hub',
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
    choices: [
      {
        text: 'Tighten it one notch',
        next: 'extreme_hub',
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
    chapter: 'Act X · Extreme',
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
        next: 'extreme_hub',
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
    choices: [
      {
        text: 'Hold her through the aftershock',
        next: 'extreme_hub',
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
    text: 'Riley’s mouth on Maya is apology and theft at once. Jade opens the door mid-act, watches ten seconds, and says, “Add breeding clause to the doc,” like she is updating a syllabus.',
    focus: 'all',
    nsfw: true,
    choices: [
      {
        text: 'Log the clause',
        next: 'extreme_hub',
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
    text: 'Riley knows what you came for. “If you corrupt me, I will still bake for them tomorrow. That is the worst part.” She offers her phone. “Make me send Jade something I cannot unsend.”',
    focus: 'riley',
    chapter: 'Act X · Extreme',
    choices: [
      {
        text: 'Make her send a live video to Jade',
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
    text: 'Riley films herself taking you, voice breaking as she addresses Jade by name. “I broke the pact. I wanted to. Come punish me.” Send. Delivered. She comes from the notification buzz alone.',
    focus: 'riley',
    nsfw: true,
    choices: [
      {
        text: 'Wait for Jade’s arrival',
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
    text: 'Jade arrives already wet with rage. She does not yell. She fucks Riley’s mouth while you take Riley from behind — a punishment that looks exactly like a reward. “She is corrupted,” Jade says afterward. “Good. Corrupt people are easier to schedule.”',
    focus: 'all',
    nsfw: true,
    choices: [
      {
        text: 'Add her to the extreme ledger',
        next: 'extreme_hub',
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
    text: 'Jade sets a sixty-minute lock on a draft post: faces cropped, bodies obvious, caption “roommate ethics.” “Perform what I ask before it posts. Or we all get famous. I am curious which you fear more.”',
    focus: 'jade',
    chapter: 'Act X · Extreme',
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
    text: 'Tasks: make Maya confess Tyler treason on voice note; make Riley crawl; fuck Jade in the hallway mirror. Timer ticking. Maya does the voice note laughing. Riley crawls flushed. You take Jade against the mirror while party bass covers the slap of skin.',
    focus: 'all',
    nsfw: true,
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
    text: 'Jade cancels the post with one thumb. “Good pets. The draft stays in the folder forever. Motivation.” She kisses you like a receipt.',
    focus: 'jade',
    choices: [{ text: 'Accept the leash', next: 'extreme_hub', effect: { flags: { markedByJade: true } } }],
  },

  xt_blackmail_post: {
    id: 'xt_blackmail_post',
    speaker: 'narrator',
    text: 'She posts. The house detonates in screams and phones. Maya bows. Riley hides behind you and waves. Jade watches the metrics like stock. Extreme fame route unlocked the ugly way.',
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
    chapter: 'Act X · Extreme',
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
    choices: [
      {
        text: 'Brand the win',
        next: 'extreme_hub',
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
    choices: [
      {
        text: 'Leave him muted in the archive',
        next: 'extreme_hub',
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
    text: 'Jade posts you all in the upstairs hallway with a rule: do not stop when people walk by. Eyes only. No names. Maya faces the wall. Riley faces the stairs. Guests pretend not to see — badly.',
    focus: 'all',
    chapter: 'Act X · Extreme',
    nsfw: true,
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
    text: 'Maya comes with a stranger’s phone half-raised. She flips them off mid-orgasm. “Post it. Caption: ethics.” Jade confiscates the phone and keeps walking like security for sin.',
    focus: 'maya',
    nsfw: true,
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
    text: 'Jade takes the last turn facing the stairwell like a challenge. She does not hide her face. When she finishes she fixes her lipstick and says, “Public use logged. Anyone who talks pays oath.”',
    focus: 'jade',
    nsfw: true,
    choices: [
      {
        text: 'Log it and move on',
        next: 'extreme_hub',
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
    text: 'Jade’s worst idea yet: “Say the friendship is over on camera. Then fuck like you mean the funeral.” Maya looks thrilled. Riley looks like she might vomit and still say yes.',
    focus: 'all',
    chapter: 'Act X · Extreme',
    choices: [
      {
        text: 'Make them say it',
        next: 'xt_break_say',
        effect: { flags: { friendshipBroken: true } },
      },
      {
        text: 'Refuse — keep the bond twisted instead',
        next: 'extreme_hub',
        effect: { affection: { riley: 1 }, skills: { charm: 1 } },
      },
    ],
  },

  xt_break_say: {
    id: 'xt_break_say',
    speaker: 'all',
    text: 'Maya: “Friends was a costume.” Riley: “I loved you both. I still will. That is why this hurts.” Jade: “Love is a scheduling problem.” They kiss angrily, then pull you in like the breakup needs a body.',
    focus: 'all',
    choices: [{ text: 'Fuck the funeral into them', next: 'xt_break_nsfw' }],
  },

  xt_break_nsfw: {
    id: 'xt_break_nsfw',
    speaker: 'narrator',
    text: 'It is not tender. It is memorial sex — biting, crying, laughing, claiming. When it ends, Riley asks if they can still be friends in the morning. Jade: “We can be worse. Worse lasts longer.”',
    focus: 'all',
    nsfw: true,
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

  ending_corrupt: {
    id: 'ending_corrupt',
    speaker: 'narrator',
    text: 'By Monday the friendship chat is silent and the secret chat is not. Free-use clauses. Collar photos. A breeding dare neither of you discuss in daylight. They did not fall in love with you cleanly. They let you ruin the softest parts on purpose — and asked for a rematch.',
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
