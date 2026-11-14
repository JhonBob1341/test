import type { Scene } from './types'

/** Party side-content that trains skills and opens longer branches. */
export const SKILL_EVENT_SCENES: Record<string, Scene> = {
  archetype: {
    id: 'archetype',
    speaker: 'narrator',
    text: 'Before you step fully into their chaos, decide how you move through a night like this. Your skills open options — and close others.',
    focus: 'none',
    chapter: 'Act I · Build',
    choices: [
      {
        text: 'Smooth Talker — Charm + Insight',
        next: 'street',
        effect: {
          skills: { charm: 3, insight: 2 },
          flags: { archetype: 'smooth' },
        },
      },
      {
        text: 'Party Devil — Nerve + Stamina',
        next: 'street',
        effect: {
          skills: { nerve: 3, stamina: 2 },
          flags: { archetype: 'devil' },
        },
      },
      {
        text: 'Handler — Dominance + Discretion',
        next: 'street',
        effect: {
          skills: { dominance: 3, discretion: 2 },
          flags: { archetype: 'handler' },
        },
      },
      {
        text: 'Quiet Ghost — Discretion + Insight',
        next: 'street',
        effect: {
          skills: { discretion: 3, insight: 2 },
          flags: { archetype: 'ghost' },
        },
      },
      {
        text: 'All-Nighter — Stamina + Dominance',
        next: 'street',
        effect: {
          skills: { stamina: 3, dominance: 2 },
          flags: { archetype: 'athlete' },
        },
      },
    ],
  },

  skill_hub: {
    id: 'skill_hub',
    speaker: 'narrator',
    text: 'Same party, deeper veins. Maya’s circle is still grinding. Jade’s poker table still eats secrets. Riley is still half-swallowed by hallway gossip. The plank dare still has a queue.',
    focus: 'all',
    chapter: 'Act II · The Floor',
    choices: [
      {
        text: 'Step into Maya’s dance circle',
        next: 'skill_dance',
        require: (s) => !s.flags.danceOff,
      },
      {
        text: 'Sit at Jade’s poker table',
        next: 'skill_poker',
        require: (s) => !s.flags.pokerNight,
      },
      {
        text: 'Pull Riley out of the rumor knot',
        next: 'skill_rumor',
        require: (s) => !s.flags.rumorMill,
      },
      {
        text: 'Take the hallway plank dare',
        next: 'skill_endurance',
        require: (s) => !s.flags.enduranceTest,
      },
      {
        text: 'Scout the house for leverage [INS 3]',
        next: 'skill_scout',
        need: { insight: 3 },
        softLock: true,
      },
      {
        text: 'Cut back to the roommates',
        next: 'fallout_continue',
        effect: { flags: { skillTour: true, phase: 'mid' } },
      },
    ],
  },

  skill_dance: {
    id: 'skill_dance',
    speaker: 'maya',
    text: 'Maya owns the circle. “If you can keep up, I might keep you.” The beat is nasty. Eyes are watching. Keep pace or get replaced.',
    focus: 'maya',
    chapter: 'Act II · The Floor',
    choices: [
      {
        text: 'Match her shameless [NRV 3]',
        next: 'skill_dance_win',
        need: { nerve: 3 },
        softLock: true,
        effect: { affection: { maya: 2 }, skills: { nerve: 1, stamina: 1 } },
      },
      {
        text: 'Grind close and make it filthy [NRV 2 · STM 2]',
        next: 'skill_dance_filth',
        need: { nerve: 2, stamina: 2 },
        softLock: true,
        effect: { affection: { maya: 2, riley: 1 }, skills: { nerve: 1 } },
      },
      {
        text: 'Fake confidence and stumble through',
        next: 'skill_dance_fail',
        effect: { affection: { maya: 1 }, skills: { nerve: 1, stamina: 1 } },
      },
    ],
  },

  skill_dance_win: {
    id: 'skill_dance_win',
    speaker: 'maya',
    text: 'You keep pace until Maya is laughing and flushed. “Okay. Okay. You are not furniture.” She steals your hand toward her waistband for one public second — then lets go like a promise.',
    focus: 'maya',
    choices: [
      {
        text: 'Bank the heat',
        next: 'party_floor',
        effect: { flags: { danceOff: true }, skills: { nerve: 1 } },
      },
      {
        text: 'Pull her to laundry now [NRV 4]',
        next: 'maya_laundry',
        need: { nerve: 4 },
        softLock: true,
        effect: {
          affection: { maya: 2 },
          flags: { danceOff: true, kissedMaya: true, pactBroken: true },
        },
      },
    ],
  },

  skill_dance_filth: {
    id: 'skill_dance_filth',
    speaker: 'maya',
    text: 'You make it filthy enough that Riley covers her mouth and Jade’s eyes sharpen. Maya moans into your neck on purpose. “If Jade bills me for this, you are paying in oath.”',
    focus: 'maya',
    nsfw: true,
    choices: [
      {
        text: 'Keep dancing like nothing happened',
        next: 'party_floor',
        effect: {
          affection: { maya: 2 },
          flags: { danceOff: true, caughtAlmost: true },
          skills: { nerve: 1, discretion: -1 },
        },
      },
    ],
  },

  skill_dance_fail: {
    id: 'skill_dance_fail',
    speaker: 'maya',
    text: 'You survive, barely. Maya pats your cheek. “Cute effort. Come back when your hips have a thesis.” Still — she remembers you tried.',
    focus: 'maya',
    choices: [
      {
        text: 'Swallow the L',
        next: 'party_floor',
        effect: { flags: { danceOff: true }, skills: { stamina: 1 } },
      },
    ],
  },

  skill_poker: {
    id: 'skill_poker',
    speaker: 'jade',
    text: 'Kitchen-table poker. Jade is not playing chips — she is playing people. “Blind bets. Losers answer a question. Winners ask one.” Insight reads tells. Discretion keeps you from bleeding secrets.',
    focus: 'jade',
    chapter: 'Act II · The Floor',
    choices: [
      {
        text: 'Read Jade’s tell and win [INS 3]',
        next: 'skill_poker_win',
        need: { insight: 3 },
        softLock: true,
        effect: { affection: { jade: 2 }, skills: { insight: 1 } },
      },
      {
        text: 'Bluff hard [DOM 3 · DSC 2]',
        next: 'skill_poker_bluff',
        need: { dominance: 3, discretion: 2 },
        softLock: true,
        effect: { affection: { jade: 1, maya: 1 }, skills: { dominance: 1 } },
      },
      {
        text: 'Fold early and listen',
        next: 'skill_poker_listen',
        effect: { skills: { insight: 1, discretion: 1 } },
      },
    ],
  },

  skill_poker_win: {
    id: 'skill_poker_win',
    speaker: 'jade',
    text: 'Jade’s eye twitches half a second before she overbets. You call. She loses a rare hand and hates how much she likes it. “Ask,” she says. You ask what she wants tonight. “Control. Proof. You, eventually.”',
    focus: 'jade',
    choices: [
      {
        text: 'Hold that intel',
        next: 'party_floor',
        effect: { flags: { pokerNight: true }, skills: { insight: 1 }, affection: { jade: 1 } },
      },
      {
        text: 'Ask for closet access now [DOM 4]',
        next: 'jade_closet',
        need: { dominance: 4 },
        softLock: true,
        effect: {
          flags: { pokerNight: true, kissedJade: true, pactBroken: true },
          affection: { jade: 2 },
        },
      },
    ],
  },

  skill_poker_bluff: {
    id: 'skill_poker_bluff',
    speaker: 'jade',
    text: 'Your bluff should not work. It does. Maya howls. Jade studies you like a new threat class. “Interesting. Liars with posture are my favorite mistake.”',
    focus: 'jade',
    choices: [
      {
        text: 'Smile like you meant it',
        next: 'party_floor',
        effect: { flags: { pokerNight: true }, skills: { dominance: 1, charm: 1 } },
      },
    ],
  },

  skill_poker_listen: {
    id: 'skill_poker_listen',
    speaker: 'narrator',
    text: 'You fold and harvest. Maya admits she texted Tyler a lie already. Riley almost says Jade’s name when she talks about guilt. Jade pretends not to notice you noticing.',
    focus: 'all',
    choices: [
      {
        text: 'File the tells',
        next: 'party_floor',
        effect: {
          flags: { pokerNight: true, rileyConfessed: true, exBetrayal: true },
          skills: { insight: 2 },
        },
      },
    ],
  },

  skill_rumor: {
    id: 'skill_rumor',
    speaker: 'riley',
    text: 'Riley is trapped in a hallway gossip knot and looks at you like rescue. Charm opens mouths. Insight sorts truth from thirst.',
    focus: 'riley',
    chapter: 'Act II · The Floor',
    choices: [
      {
        text: 'Extract her gracefully [CHM 3]',
        next: 'skill_rumor_save',
        need: { charm: 3 },
        softLock: true,
        effect: { affection: { riley: 2 }, skills: { charm: 1 } },
      },
      {
        text: 'Steer the rumor toward the pact [INS 3 · CHM 2]',
        next: 'skill_rumor_steer',
        need: { insight: 3, charm: 2 },
        softLock: true,
        effect: { affection: { riley: 1, jade: 1 }, skills: { insight: 1 } },
      },
      {
        text: 'Stand there looking supportive',
        next: 'skill_rumor_fail',
        effect: { affection: { riley: 1 }, skills: { charm: 1 } },
      },
    ],
  },

  skill_rumor_save: {
    id: 'skill_rumor_save',
    speaker: 'riley',
    text: 'You peel Riley out with a soft lie about needing her for “ice.” She squeezes your wrist. “Thank you. If you ever want me to be bad on purpose, ask nicer than they do.”',
    focus: 'riley',
    choices: [
      {
        text: 'Ask nicer later',
        next: 'party_floor',
        effect: { flags: { rumorMill: true }, skills: { charm: 1 } },
      },
      {
        text: 'Ask now [CHM 4]',
        next: 'riley_want',
        need: { charm: 4 },
        softLock: true,
        effect: { flags: { rumorMill: true }, affection: { riley: 2 } },
      },
    ],
  },

  skill_rumor_steer: {
    id: 'skill_rumor_steer',
    speaker: 'narrator',
    text: 'You seed a rumor that the roommates’ pact is already cracked. By the time it reaches Jade, it has teeth. She looks impressed and murderous. Riley looks terrified and wet-eyed.',
    focus: 'all',
    choices: [
      {
        text: 'Ride the chaos',
        next: 'party_floor',
        effect: {
          flags: { rumorMill: true, jealousyTrap: true, phoneLeak: true },
          skills: { insight: 1, nerve: 1 },
        },
      },
    ],
  },

  skill_rumor_fail: {
    id: 'skill_rumor_fail',
    speaker: 'riley',
    text: 'You stand there. The gossip eats ten minutes of Riley’s life. She still mouths thank you when it ends. Soft points. No mastery.',
    focus: 'riley',
    choices: [
      {
        text: 'Walk her to water',
        next: 'party_floor',
        effect: { flags: { rumorMill: true }, affection: { riley: 1 }, skills: { charm: 1 } },
      },
    ],
  },

  skill_endurance: {
    id: 'skill_endurance',
    speaker: 'maya',
    text: 'Maya’s hallway dare: hold a plank while she sits on your back and whispers filth. “Last thirty seconds and I owe you a favor. Fail and you owe Jade a kneel.” Stamina is the gate. Dominance decides whether the favor is useful.',
    focus: 'maya',
    chapter: 'Act II · The Floor',
    choices: [
      {
        text: 'Hold the plank [STM 3]',
        next: 'skill_endurance_win',
        need: { stamina: 3 },
        softLock: true,
        effect: { affection: { maya: 2 }, skills: { stamina: 1 } },
      },
      {
        text: 'Hold it and talk shit back [STM 3 · DOM 3]',
        next: 'skill_endurance_dom',
        need: { stamina: 3, dominance: 3 },
        softLock: true,
        effect: { affection: { maya: 2, jade: 1 }, skills: { stamina: 1, dominance: 1 } },
      },
      {
        text: 'Collapse early',
        next: 'skill_endurance_fail',
        effect: { skills: { stamina: 1 }, flags: { markedByJade: true } },
      },
    ],
  },

  skill_endurance_win: {
    id: 'skill_endurance_win',
    speaker: 'maya',
    text: 'You last. Maya hops off, impressed against her will. “Favor owed. Do not waste it on something wholesome.”',
    focus: 'maya',
    choices: [
      {
        text: 'Bank the favor',
        next: 'party_floor',
        effect: { flags: { enduranceTest: true }, skills: { stamina: 1 } },
      },
      {
        text: 'Cash favor: unlock harem pitch support [CHM 2]',
        next: 'harem_pitch',
        need: { charm: 2 },
        softLock: true,
        effect: {
          flags: { enduranceTest: true, haremRoute: true },
          affection: { maya: 2, riley: 1, jade: 1 },
        },
      },
    ],
  },

  skill_endurance_dom: {
    id: 'skill_endurance_dom',
    speaker: 'maya',
    text: 'You hold the plank and tell Maya exactly how you would use the favor. She goes quiet, then grins. “Fuck. Jade is going to hate how hard that just made me.”',
    focus: 'maya',
    nsfw: true,
    choices: [
      {
        text: 'Collect later',
        next: 'party_floor',
        effect: {
          flags: { enduranceTest: true, threesomeUnlocked: true },
          skills: { dominance: 1 },
        },
      },
    ],
  },

  skill_endurance_fail: {
    id: 'skill_endurance_fail',
    speaker: 'jade',
    text: 'You drop. Jade appears as if summoned by failure. “Kneel. Payment for quitting.” You do. She looks pleased enough to almost be merciful.',
    focus: 'jade',
    choices: [
      {
        text: 'Take the lesson',
        next: 'party_floor',
        effect: {
          flags: { enduranceTest: true },
          affection: { jade: 1 },
          skills: { dominance: 1, stamina: 1 },
        },
      },
    ],
  },

  skill_scout: {
    id: 'skill_scout',
    speaker: 'narrator',
    text: 'Insight paints the house: Maya’s phone face-up with Tyler typing, Riley’s bedroom door cracked, Jade’s laptop warm in her room, a group chat poll already drafting your fate.',
    focus: 'none',
    chapter: 'Act II · The Floor',
    choices: [
      {
        text: 'Steal a glance at the poll [DSC 3]',
        next: 'skill_scout_poll',
        need: { discretion: 3 },
        softLock: true,
        effect: { skills: { insight: 1, discretion: 1 } },
      },
      {
        text: 'Slip into Jade’s room for folder crumbs [INS 4 · DSC 3]',
        next: 'folder_snoop',
        need: { insight: 4, discretion: 3 },
        softLock: true,
        effect: { skills: { insight: 1 }, flags: { blackmailJade: true } },
      },
      {
        text: 'Back out clean',
        next: 'party_floor',
        effect: { skills: { discretion: 1 } },
      },
    ],
  },

  skill_scout_poll: {
    id: 'skill_scout_poll',
    speaker: 'narrator',
    text: 'The poll is brutal: share / exile / collect. Share is winning. Collect is rising. You now know the house is already bargaining your body in emoji.',
    focus: 'all',
    choices: [
      {
        text: 'Return wiser',
        next: 'party_floor',
        effect: {
          flags: { threesomeUnlocked: true, roommateRule: true },
          skills: { insight: 2 },
        },
      },
    ],
  },

  // Extra long taboo skill scenes
  skill_private_lesson: {
    id: 'skill_private_lesson',
    speaker: 'jade',
    text: 'Jade offers a “private lesson” in the linen closet: posture, eye contact, when to speak. “Dominance without timing is just noise. Fail my drill and I keep your phone until dawn.”',
    focus: 'jade',
    chapter: 'Act II · The Floor',
    choices: [
      {
        text: 'Take the drill [DOM 2]',
        next: 'skill_lesson_drill',
        need: { dominance: 2 },
        softLock: true,
      },
      {
        text: 'Flirt through it instead [CHM 3]',
        next: 'skill_lesson_flirt',
        need: { charm: 3 },
        softLock: true,
      },
      {
        text: 'Decline',
        next: 'fallout_continue',
      },
    ],
  },

  skill_lesson_drill: {
    id: 'skill_lesson_drill',
    speaker: 'jade',
    text: 'Jade corrects your stance with her knee between your legs and her voice in your ear. When you finally hold the look she wants, she rewards you with a slow, filthy kiss — then stops. “Homework: use that on Riley without crumbling.”',
    focus: 'jade',
    nsfw: true,
    choices: [
      {
        text: 'Accept homework',
        next: 'fallout_continue',
        effect: { affection: { jade: 2 }, skills: { dominance: 2, stamina: 1 }, flags: { markedByJade: true } },
      },
    ],
  },

  skill_lesson_flirt: {
    id: 'skill_lesson_flirt',
    speaker: 'jade',
    text: 'You turn the lesson into charm. Jade hates that it works. She laughs once — rare — and pins you anyway. “Fine. Soft power counts. Do not tell Maya I smiled.”',
    focus: 'jade',
    choices: [
      {
        text: 'Keep her secret',
        next: 'fallout_continue',
        effect: { affection: { jade: 2 }, skills: { charm: 1, dominance: 1 }, flags: { sharedSecret: true } },
      },
    ],
  },

  skill_riley_bake: {
    id: 'skill_riley_bake',
    speaker: 'riley',
    text: 'Riley is stress-baking at 1 a.m. with party bass still thumping. “Help me or distract me. Charm gets cookies. Dominance gets me on the counter. Discretion gets both without Jade noticing.”',
    focus: 'riley',
    chapter: 'Act II · The Floor',
    choices: [
      {
        text: 'Help bake and talk soft [CHM 2]',
        next: 'skill_bake_soft',
        need: { charm: 2 },
        softLock: true,
        effect: { affection: { riley: 2 }, skills: { charm: 1 } },
      },
      {
        text: 'Lift her onto the counter [DOM 3]',
        next: 'skill_bake_dom',
        need: { dominance: 3 },
        softLock: true,
        effect: { affection: { riley: 3 }, skills: { dominance: 1 } },
      },
      {
        text: 'Do both quietly [DSC 4 · CHM 2]',
        next: 'skill_bake_both',
        need: { discretion: 4, charm: 2 },
        softLock: true,
        effect: { affection: { riley: 3 }, skills: { discretion: 1, charm: 1 } },
      },
    ],
  },

  skill_bake_soft: {
    id: 'skill_bake_soft',
    speaker: 'riley',
    text: 'Flour on her cheek. Soft confession between timers. “I want to be chosen without being the only one sometimes. That sounds evil. Is that evil?” You do not call it evil. You call it honest.',
    focus: 'riley',
    choices: [
      {
        text: 'Kiss flour off her cheek',
        next: 'fallout_continue',
        effect: { affection: { riley: 2 }, flags: { kissedRiley: true, sharedSecret: true }, skills: { charm: 1 } },
      },
    ],
  },

  skill_bake_dom: {
    id: 'skill_bake_dom',
    speaker: 'riley',
    text: 'Riley on the counter, jersey up, biting a wooden spoon so Jade will not hear. She comes fast and sorry and grateful. “Okay. Dominance works on me. Please do not weaponize that unless I ask.”',
    focus: 'riley',
    nsfw: true,
    choices: [
      {
        text: 'Help her fix her clothes',
        next: 'fallout_continue',
        effect: {
          affection: { riley: 2 },
          flags: { couchRiley: true, kitchenRiley: true, pactBroken: true },
          skills: { dominance: 1, stamina: 1 },
        },
      },
    ],
  },

  skill_bake_both: {
    id: 'skill_bake_both',
    speaker: 'riley',
    text: 'You finish the cookies and finish Riley with the mixer still running as cover noise. She laughs into your shoulder, wrecked and delighted. “That was the most discreet crime of my life.”',
    focus: 'riley',
    nsfw: true,
    choices: [
      {
        text: 'Leave no crumbs',
        next: 'fallout_continue',
        effect: {
          affection: { riley: 3 },
          flags: { couchRiley: true, kitchenRiley: true, sharedSecret: true, pactBroken: true },
          skills: { discretion: 2 },
        },
      },
    ],
  },

  skill_maya_truth: {
    id: 'skill_maya_truth',
    speaker: 'maya',
    text: 'Maya corners you with two shots. “Truth or slut, but skill-check edition. Nerve lets you match me. Charm lets you redirect. Insight lets you catch me lying about Tyler.”',
    focus: 'maya',
    chapter: 'Act II · The Floor',
    choices: [
      {
        text: 'Match her shameless truth [NRV 3]',
        next: 'skill_maya_nerve',
        need: { nerve: 3 },
        softLock: true,
      },
      {
        text: 'Redirect into flirting [CHM 3]',
        next: 'skill_maya_charm',
        need: { charm: 3 },
        softLock: true,
      },
      {
        text: 'Catch the Tyler lie [INS 4]',
        next: 'skill_maya_insight',
        need: { insight: 4 },
        softLock: true,
      },
    ],
  },

  skill_maya_nerve: {
    id: 'skill_maya_nerve',
    speaker: 'maya',
    text: 'You trade truths until Maya admits she wants to be caught on purpose once. “Not famous. Just witnessed. By them.” She kisses you like a spoiler.',
    focus: 'maya',
    choices: [
      {
        text: 'Promise a witnessed sin',
        next: 'fallout_continue',
        effect: {
          affection: { maya: 3 },
          flags: { watchedSecret: true, jealousyTrap: true },
          skills: { nerve: 2 },
        },
      },
    ],
  },

  skill_maya_charm: {
    id: 'skill_maya_charm',
    speaker: 'maya',
    text: 'You charm the game sideways until Maya forgets the dare and remembers your mouth. “Ugh. Smooth is annoying when it works.” She still pulls you closer.',
    focus: 'maya',
    choices: [
      {
        text: 'Keep her smiling',
        next: 'fallout_continue',
        effect: { affection: { maya: 2 }, skills: { charm: 2 }, flags: { kissedMaya: true } },
      },
    ],
  },

  skill_maya_insight: {
    id: 'skill_maya_insight',
    speaker: 'maya',
    text: 'You catch the micro-pause when she says Tyler “doesn’t care.” Maya swears, then softens. “Fine. He cares. I want him to care while I choose someone worse.” She shows you the unread thread.',
    focus: 'maya',
    choices: [
      {
        text: 'Use that leverage gently',
        next: 'fallout_continue',
        effect: {
          affection: { maya: 2 },
          flags: { exBetrayal: true, sharedSecret: true },
          skills: { insight: 2 },
        },
      },
      {
        text: 'Use that leverage filthy [NRV 3]',
        next: 'maya_call_tyler',
        need: { nerve: 3 },
        softLock: true,
        effect: { affection: { maya: 2 }, flags: { exBetrayal: true }, skills: { nerve: 1, insight: 1 } },
      },
    ],
  },
}
