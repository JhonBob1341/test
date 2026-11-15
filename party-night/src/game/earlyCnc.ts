import type { Scene } from './types'

/**
 * Aggressive CNC routes available from the very start (no skill gates).
 * Still negotiated / safeword lease — just rougher once the scene starts.
 */
export const EARLY_CNC_SCENES: Record<string, Scene> = {
  early_cnc_hub: {
    id: 'early_cnc_hub',
    speaker: 'narrator',
    text: 'The party is barely warm and they already want it mean. Safeword is lease. Two taps stop everything. After that, they asked for the rough version — pinned, silenced, used like the pact never existed. Pick who gets ruined first.',
    focus: 'all',
    chapter: 'Act I · Rough CNC',
    choices: [
      {
        text: 'Drag Maya into the bathroom and pin her',
        next: 'early_cnc_maya',
        require: (s) => !s.flags.mayaCncRough,
        for: 'maya',
      },
      {
        text: 'Shove Riley into her room and take her',
        next: 'early_cnc_riley',
        require: (s) => !s.flags.rileyCncRough,
        for: 'riley',
      },
      {
        text: 'Grab Lola by the hair and claim her',
        next: 'early_cnc_jade',
        require: (s) => !s.flags.jadeCncRough,
        for: 'jade',
      },
      {
        text: 'Lock all three in and run the rough house script',
        next: 'early_cnc_house',
        require: (s) => !(s.flags.mayaCncRough && s.flags.rileyCncRough && s.flags.jadeCncRough),
        for: 'house',
      },
      {
        text: 'Skip the rough stuff — face the pact instead',
        next: 'pact_threat',
        for: 'house',
        effect: { flags: { oathPayment: true } },
      },
    ],
  },

  early_cnc_maya: {
    id: 'early_cnc_maya',
    speaker: 'maya',
    text: 'Maya already texted you one line: bathroom. green. lease. Then she plays the bitch who doesn’t want it — shoving your chest, swearing, “Get off me—” while her thighs lock around you. You pin her wrists to the tile, cover her mouth with your hand, and fuck her hard enough the mirror rattles. She comes furious and wet, then taps twice. You stop. She gasps, “Good. Now don’t be gentle.”',
    focus: 'maya',
    nsfw: true,
    art: 'sex_maya_bathroom',
    chapter: 'Act I · Rough CNC',
    choices: [
      {
        text: 'Finish her rough against the sink',
        next: 'early_cnc_maya_after',
        for: 'maya',
        effect: {
          affection: { maya: 3 },
          flags: {
            mayaCncRough: true,
            mayaCnc: true,
            cncPlay: true,
            bathroomMaya: true,
            deepMaya: true,
            pactBroken: true,
          },
          skills: { dominance: 1, nerve: 1 },
        },
      },
    ],
  },

  early_cnc_maya_after: {
    id: 'early_cnc_maya_after',
    speaker: 'maya',
    text: 'Maya fixes her lipstick like a crime scene cover-up. “That was the mean version. I liked it. Lease still works — don’t forget.” She smacks your chest. “Now go look innocent before Riley smells me on you.”',
    focus: 'maya',
    art: 'sex_maya_after',
    choices: [
      { text: 'Back to rough CNC picks', next: 'early_cnc_hub', for: 'house' },
      { text: 'Walk into the pact choice', next: 'pact_threat', for: 'house', effect: { flags: { oathPayment: true } } },
      { text: 'Drift into the party', next: 'mid_hub', for: 'house', effect: { flags: { phase: 'mid' } } },
    ],
  },

  early_cnc_riley: {
    id: 'early_cnc_riley',
    speaker: 'riley',
    text: 'Riley left her door cracked on purpose. Limits already in your messages: mean voice, hold me down, lease stops it. In-scene she gasps “wait— don’t—” as you shove her onto the bed, yank her jersey up, and take her hard. She fights soft, then breaks into shaking yeses she pretends are noes. Midway she whispers lease; you freeze. She pulls you back in, crying. “Green. Harder. Please don’t stop being mean.”',
    focus: 'riley',
    nsfw: true,
    art: 'sex_riley_bed',
    chapter: 'Act I · Rough CNC',
    choices: [
      {
        text: 'Hold her down and finish her crying',
        next: 'early_cnc_riley_after',
        for: 'riley',
        effect: {
          affection: { riley: 3 },
          flags: {
            rileyCncRough: true,
            rileyCnc: true,
            cncPlay: true,
            dormRiley: true,
            deepRiley: true,
            corruptRiley: true,
            pactBroken: true,
          },
          skills: { dominance: 1, charm: 1 },
        },
      },
    ],
  },

  early_cnc_riley_after: {
    id: 'early_cnc_riley_after',
    speaker: 'riley',
    text: 'Riley hides under her blanket and counts breaths with you. “Scary. Hot. Safe.” She kisses your knuckles. “Thank you for stopping. Thank you for not staying stopped.”',
    focus: 'riley',
    art: 'sex_riley_couch',
    choices: [
      { text: 'Back to rough CNC picks', next: 'early_cnc_hub', for: 'house' },
      { text: 'Walk into the pact choice', next: 'pact_threat', for: 'house', effect: { flags: { oathPayment: true } } },
      { text: 'Drift into the party', next: 'mid_hub', for: 'house', effect: { flags: { phase: 'mid' } } },
    ],
  },

  early_cnc_jade: {
    id: 'early_cnc_jade',
    speaker: 'jade',
    text: 'Lola kneels first — then begs you to ignore that she asked. “Please take me like I said no. Hair. Floor. Rough. Lease if I mean it.” You fist her hair, shove her down, and use her mouth then her cunt while she whimpers no into the carpet. She comes shaking, then taps twice. You release. She presses her forehead to your boot. “Praise. Water. Tell me I was good for being ruined.”',
    focus: 'jade',
    nsfw: true,
    art: 'sex_jade_pin',
    chapter: 'Act I · Rough CNC',
    choices: [
      {
        text: 'Praise her wrecked and hold her',
        next: 'early_cnc_jade_after',
        for: 'jade',
        effect: {
          affection: { jade: 3 },
          flags: {
            jadeCncRough: true,
            jadeCnc: true,
            cncPlay: true,
            closetJade: true,
            deepJade: true,
            markedByJade: true,
            pactBroken: true,
          },
          skills: { dominance: 2 },
        },
      },
    ],
  },

  early_cnc_jade_after: {
    id: 'early_cnc_jade_after',
    speaker: 'jade',
    text: 'Lola drinks from your palm like that was the point. “Aggressive is allowed when I ask for aggressive.” She straightens her skirt with trembling hands. “Please do it again later. Harder.”',
    focus: 'jade',
    art: 'sex_jade_kneel',
    choices: [
      { text: 'Back to rough CNC picks', next: 'early_cnc_hub', for: 'house' },
      { text: 'Walk into the pact choice', next: 'pact_threat', for: 'house', effect: { flags: { oathPayment: true } } },
      { text: 'Drift into the party', next: 'mid_hub', for: 'house', effect: { flags: { phase: 'mid' } } },
    ],
  },

  early_cnc_house: {
    id: 'early_cnc_house',
    speaker: 'narrator',
    text: 'They lock the guest room together — three greens in the chat, one safeword, one hour. What follows is messy and loud on purpose: Maya pinned to the dresser, Riley muffled into a pillow, Lola held open between them. Safewords fire once and are honored instantly. When the timer ends, the roughness drops. Blankets. Water. Maya laughing like she got away with murder.',
    focus: 'all',
    nsfw: true,
    art: 'sex_cnc',
    chapter: 'Act I · Rough CNC',
    choices: [
      {
        text: 'Hold the group aftercare',
        next: 'early_cnc_house_after',
        for: 'house',
        effect: {
          affection: { maya: 3, riley: 3, jade: 3 },
          flags: {
            mayaCncRough: true,
            rileyCncRough: true,
            jadeCncRough: true,
            mayaCnc: true,
            rileyCnc: true,
            jadeCnc: true,
            cncPlay: true,
            bathroomMaya: true,
            dormRiley: true,
            closetJade: true,
            deepMaya: true,
            deepRiley: true,
            deepJade: true,
            threesomeUnlocked: true,
            pactBroken: true,
          },
          skills: { dominance: 2, stamina: 1, nerve: 1 },
        },
      },
    ],
  },

  early_cnc_house_after: {
    id: 'early_cnc_house_after',
    speaker: 'riley',
    text: 'Riley’s voice is tiny under Maya’s jacket. “We did the scary thing first.” Lola: “Good. Now the night cannot pretend to be soft.” Maya grins at you. “Pact’s already dead. Might as well pick how we spend the body.”',
    focus: 'all',
    choices: [
      { text: 'Face the pact choice for real', next: 'pact_threat', for: 'house', effect: { flags: { oathPayment: true } } },
      { text: 'Open the mid-party hub', next: 'mid_hub', for: 'house', effect: { flags: { phase: 'mid' } } },
      { text: 'Push straight toward harem talk', next: 'harem_pitch', for: 'house', effect: { flags: { haremRoute: true } } },
    ],
  },
}
