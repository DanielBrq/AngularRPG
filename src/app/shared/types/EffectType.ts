export const STATUS_EFFECTS = {
  BURN: 'burn',
  FROSTBITE: 'frostbite',
  PARALYSIS: 'paralysis',
  POISON: 'poison',
} as const;
export type STATUS_EFFECTS = (typeof STATUS_EFFECTS)[keyof typeof STATUS_EFFECTS];

export const MODIFIERS_EFFECTS = {
  PHYS_ATK_UP: 'phys_atk_up',
  PHYS_ATK_DOWN: 'phys_atk_down',
  PHYS_DEFENCE_UP: 'phys_defence_up',
  PHYS_DEFENCE_DOWN: 'phys_defence_down',

  MAG_ATK_UP: 'mag_atk_up',
  MAG_ATK_DOWN: 'mag_atk_down',
  MAG_DEFENCE_UP: 'mag_defence_up',
  MAG_DEFENCE_DOWN: 'mag_defence_down',

  SPEED_UP: 'speed_up',
  SPEED_DOWN: 'speed_down',
  CRIT_PROB_UP: 'crit_prob_up',
  CRIT_PROB_DOWN: 'crit_prob_down',
  CRIT_DMG_UP: 'crit_dmg_up',
  CRIT_DMG_DOWN: 'crit_dmg_down',

  MP_RECOVER: 'mp_recover',
  MP_LOSS: 'mp_loss',
  HP_RECOVER: 'hp_recover',
  HP_LOSS: 'hp_loss',

  //ELEMENTAL DAMAGE / RESISTANCE MODIFIERS
  HEAT_DMG_UP: 'heat_dmg_up',
  HEAT_DMG_DOWN: 'heat_dmg_down',
  HEAT_RESISTANCE_UP: 'heat_resistance_up',
  HEAT_RESISTANCE_DOWN: 'heat_resistance_down',

  COLD_DMG_UP: 'cold_dmg_up',
  COLD_DMG_DOWN: 'cold_dmg_down',
  COLD_RESISTANCE_UP: 'cold_resistance_up',
  COLD_RESISTANCE_DOWN: 'cold_resistance_down',

  LIGHTNING_DMG_UP: 'lightning_dmg_up',
  LIGHTNING_DMG_DOWN: 'lightning_dmg_down',
  LIGHTNING_RESISTANCE_UP: 'lightning_resistance_up',
  LIGHTNING_RESISTANCE_DOWN: 'lightning_resistance_down',

  TOXIN_DMG_UP: 'toxin_dmg_up',
  TOXIN_DMG_DOWN: 'toxin_dmg_down',
  TOXIN_RESISTANCE_UP: 'toxin_resistance_up',
  TOXIN_RESISTANCE_DOWN: 'toxin_resistance_down',

  LIGHT_DMG_UP: 'light_dmg_up',
  LIGHT_DMG_DOWN: 'light_dmg_down',
  LIGHT_RESISTANCE_UP: 'light_resistance_up',
  LIGHT_RESISTANCE_DOWN: 'light_resistance_down',

  DARK_DMG_UP: 'dark_dmg_up',
  DARK_DMG_DOWN: 'dark_dmg_down',
  DARK_RESISTANCE_UP: 'dark_resistance_up',
  DARK_RESISTANCE_DOWN: 'dark_resistance_down',
} as const;
export type MODIFIERS_EFFECTS = (typeof MODIFIERS_EFFECTS)[keyof typeof MODIFIERS_EFFECTS];

export const PASSIVE_EFFECTS = {
  BLIND: 'blind', // + Chance to miss hit
  AGILITY: 'agility', // + Chance evade/dodge
  HAWKEYE: 'hawkeye', // + Chance to hit
  PHYS_DOUBLE_CAST: 'phys_double_cast', // hits phys double hits
  MAG_DOUBLE_CAST: 'mag_double_cast', // hit mag double hits
  LIFE_MIRACLE: 'life_miracle', // Revive when dead at 100% stats
  STURDY_WILL: 'sturdy_will', // Can survive with 1 HP 
} as const;
export type PASSIVE_EFFECTS = (typeof PASSIVE_EFFECTS)[keyof typeof PASSIVE_EFFECTS];

export const SPECIAL_EFFECTS = {
  // # Character unique skills

  // ## The Survivor character
  SURVIVAL_INSTINCT: 'survival_instinct',
  MONARCH_SHARD: 'monarch_shard',
  MERCYLESS_SHARD: 'mercyless_shard',
  VULNERABLE_SHARD: 'vulnerable_shard',
  IDEALIST_SHARD: 'idealist_shard',
  WATER_DOMINION: 'water_dominion',

  // ## The Warrior character
  THE_DULL_BLADE: 'the_dull_blade',
  KENARIAN_WILL: 'kenarian_will',    // Grant self survive with 1 hp one time and take 50% teamate damage (3 turns).
  THUNDER_ROAR: 'thunder_roar',     //SKILL: Great lightning dmg and inflicts 50 stacks of paralyze (3 turns).

  // ## The Wizard character
  UMBRA_FLICKER: 'umbra_flicker', // SKILL: Extreme dark dmg, lower magDef (-15%) and dark resistance (-30%), consume all MP and block MP recover (3 turns), during this skill consume HP instead of MP.
  BLACK_LUMINA: 'black_lumina', // Grant self capability to exploit all elemental weakpoints and double cast for 3 turn, during this skill consume HP instead of MP.
  WISSENVEIN_DEBT: 'wissenvein_debt', // Raise mag def (+50%), dark resistance (+50%) and speed (+30%) of the party (3 turns).

  // ## The Liberator character
  THE_SEVENTH_CYCLE: 'the_sevent_cycle', // Skill: Cast skill to meditate, takes 6 turns to ready, on seventh turn: Grant all party members "Divine Flame" .If her life falls below 20% MaxHP while she's meditating, the skill cancels.
  DIVINE_FLAME: 'divine_flame',         // Increase phys and mag Atk (+177%), and max hp (+277%), speed(+57%), crit chance(+77%), crit dmg (+77%), Heat Dmg (+177%) and Heat Resistance (+77%) (duration: rest of the battle).
  SOLEMN_DANCE: 'solemn_dance',         // Grant self phys and mag dodge (77%), and 17% dodge for all party (3 turns)
  HONORIAN_WILL: 'honorian_will',       // Grant self Heat dmg (+177%) and Heat Resistance (+117%) (3 turns) 

  // ## The Scholar character
  PERFECT_PLAN: 'perfect_plan',       // Raise to all party members beneficial effect duration by (9 turns, max of 9 stack) and lower perjudical effects by (2 turn).
  REVERSE_CURE: 'reverse_cure',       // Lower to all foes the duration of the beneficial effects by (2 turns) and raise to all foes perjudical effects duration by (4 turn).
  MEDICAL_SERVICE: 'medical_service', // Grant all party HP (15%)) recover and MP recover (15%) based on their max for (5 turn).
  RATIONAL_MIND: 'rational_mind',     // Increase Skill Efficiency of party skills by (40%) for (3 turns)

  // # Unique Skills for Bosses (special foes)

  // ## The Blazing Justice of Honori
  BLAZING_JUSTICE: 'blazing_justice',           // Skill: Extreme fire dmg, and inflicts 150 stacks of burn to single target, exploit sword damage. (3 turns)
  JUDGE_SENTENCE: 'judge_sentence',             // Counter phys Atk to single target with great heat dmg and inflicts 20 stacks of burn, exploit sword damage. (3 turns)
  FLAMES_OF_APOCALYPSE: 'flames_of_apocalypse', // Counter mag Atk with extreme heat dmg to all party, exploit sword damage. (3 turns) 
  CRIMSOM_FLOWER: 'crimsom_flower',             // Skill: Inclicts all party members fire resistance(-60%) and inflicts 5 stack of burn every turn (5 turns) 
  SEARING_SPIRE: 'searing_spire',               // Skill Inclicts great heat dmg to random targets 3 times, chance (15%) for each hit to lower spear and sword resistance (-30%), exploit spear and sword resistance (3 turns)
  ASHEN_GROUND: 'ashen_ground',                 // Lower speed (-60%) of all party members and apply burn 5 stack for each turn. (3 turns)
  ARTIFACT_LIMIT_BREAK: 'artifact_limit_break', // Revive one time with full HP. Raise maxHP (+150%), maxMP (+80%), phys and magic defence (+50%), speed (+70%), phys Atk (+50%), crit chance (+50%), crit dmg (+30%), Heat Dmg (+50%) and Heat Resistance (+100%) (duration: rest of the battle)

  // ## The Condemned of Wissenvein
  CURSE_OF_ABYSS: 'curse_of_abyss',             // Inclicts all party members with low dark dmg (-30%), magAtk (-30%) and consume (5%). 
  WISSENVEIN_KNOWLEDGE: 'wissenvein_knowledge', // Grant self phys and mag dodge (50%), speed (+10%) (3 turns)
  WISSENVEIN_CLAIM: 'wissenvein_claim',         // Lower all the phys def and mag def of all party (-30%) and dark Resistance (-70%) (3 turns) 

  // # Foes unique skills
  BEAST_WRATH: 'beast_wrath',               // The [] Foe
  WICKED_PERFORMANCE: 'wicked_performance', // The [] Foe



} as const
export type SPECIAL_EFFECTS = (typeof SPECIAL_EFFECTS)[keyof typeof SPECIAL_EFFECTS];

export const EFFECT_SOURCE = {
  PARTY: 'party',
  SKILL: {
    PHYSICAL: 'skill_physical',
    MAGIC: 'skill_magic',
    SUPPORT: 'skill_support',
    PASSIVE: 'skill_passive',
    SPECIAL: 'skill_special',
  },
  ITEM: {
    EQUIPMENT: {
      HELMET: 'item_equipment_helmet',
      CHEST: 'item_equipment_chest',
      RING: 'item_equipment_ring',
      BELT: 'item_equipment_belt',
      BOOTS: 'item_equipment_boots',
    },
    WEAPON: {
      SWORD: 'item_weapon_sword',
      SPEAR: 'item_weapon_spear',
      AXE: 'item_weapon_axe',
      DAGGER: 'item_weapon_dagger',
      GRIMOIRE: 'item_weapon_grimoire',
    },
  },
} as const;
export type EFFECT_SOURCE = (typeof EFFECT_SOURCE)[keyof typeof EFFECT_SOURCE];
