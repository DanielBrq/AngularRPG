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
  SHARDED_SOUL: 'sharded_soul', // monarch mode: Raise (30%) all atributes of the party (5 turns), mercyless mode: raise self atk dmg (+100%), vulnerable mode: lower self def (-40%) and raise speed (+100%) , idealist mode: lower self phys and mag dmg (-100%) and raise all party speed (+200%) 
  WATER_DOMINION: 'water_dominion', // grant self the hability to exploit cold weakness with any attack, raise self cold dmg (+100%) (5 turns).

  // ## The Warrior character
  THE_DULL_BLADE: 'the_dull_blade', // low self def (-80%), increment physAtk (+50%), crits chance (+30%), critDmg(+100%) and speed (+40%) for (3 turns)
  THUNDER_ROAR: 'thunder_roar',     // Great lightning dmg and inflicts 50 stacks of paralyze (3 turns).
  KENARIA_WILL: 'kenarias_will',    // Grant self survive with 1 hp one time and take 50% teamate damage (3 turns).

  // ## The Wizard character
  UMBRA_FLICKER: 'umbra_flicker', // Extreme dark dmg, lower magDef (-15%) and dark resistance (-30%), consume all MP and block MP recover (3 turns), during this skill consume HP instead of MP.
  DARK_LUMINA: 'dark_lumina', // Grant self capability to exploit all elemental weakpoints and double cast for 3 turn, during this skill consume HP instead of MP.
  WISSENVEIN_DEBT: 'wissenvein_debt', // Raise mag def (+20%), dark resistance (+30%) and speed (+15%) of the party (3 turns).

  // ## The Liberator character
  DIVINE_FLAME: 'divine_flame', // Unable to act for 6 turns, meditate to grant to all party phys and mag Atk (+77%), and max hp (+77%), speed(+37%), crit chance(+117%), crit dmg (+47%) on seventh turn (duration: rest of the battle). If her life falls below 20%HP the skill cancels.
  SOLEMN_DANCE: 'solemn_dance', // Grant self phys and mag dodge (77%), and 17% dodge for all party (3 turns)
  SHIN_LANCE: 'shin_lance',     // Self heat dmg (+117%) (3 turns) 

  // ## The Scholar character
  PERFECT_PLAN: 'perfect_plan', // Raise to all party beneficial effect duration by (9 turns) and remove perjudical effects by (2 turn).
  RATIONAL_MIND: 'rational_mind', // Increase Skill Efficiency of party skills by (40%) for (3 turns)
  REVERSE_CURE: 'reverse_cure', //Grant all party HP (15%)) recover and MP recover (15%) based on their max for (5 turn).

  // # Unique Skills for Bosses (special foes)

  // ## The Blazing Justice of Honori
  BLAZING_JUSTICE: 'blazing_justice',           // Extreme fire dmg, and inflicts 100 stacks of burn to single target (3 turns)
  JUDGE_SENTENCE: 'judge_sentence',             // Counter phys Atk with great heat dmg to single target (3 turns)
  FLAMES_OF_APOCALYPSE: 'flames_of_apocalypse', // Counter mag Atk with extreme heat dmg to all party (3 turns) 

  // ## The Condemned of Wissenvein
  CURSE_OF_ABYSS: 'curse_of_abyss',             // Low dark dmg and consume MP of all party (5%). 
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
