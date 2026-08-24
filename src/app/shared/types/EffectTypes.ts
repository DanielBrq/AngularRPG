
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
    BLIND: "blind",           // + Chance to miss hit
    AGILITY: "agility",       // + Chance evade/dodge
    HAWKEYE: "hawkeye",       // + Chance to hit
    PHYS_DOUBLE_CAST: "phys_double_cast", // hits phys double hits
    MAG_DOUBLE_CAST: "mag_double_cast", // hit mag double hits
    SURVIVAL_INSTINCT: "survival_instinct", // Increase dmg, crit prob, crit dmg, speed, at low hp
    LIFE_MIRACLE: "life_miracle", // Revive when dead at 100% stats
} as const;
export type PASSIVE_EFFECTS = (typeof PASSIVE_EFFECTS)[keyof typeof PASSIVE_EFFECTS];

export const EFFECT_SOURCE = {
    PARTY: "party",
    SKILL: {
        PHYSICAL: "skill_physical",
        MAGIC: "skill_magic",
        SUPPORT: "skill_support",
        PASSIVE: "skill_passive",
        SPECIAL: "skill_special",
    },
    ITEM: {
        EQUIPMENT: {
            HELMET: "item_equipment_helmet",
            CHEST: "item_equipment_chest",
            RING: "item_equipment_ring",
            BELT: "item_equipment_belt",
            BOOTS: "item_equipment_boots",
        },
        WEAPON: {
            SWORD: "item_weapon_sword",
            SPEAR: "item_weapon_spear",
            AXE: "item_weapon_axe",
            BOW: "item_weapon_bow",
            DAGGER: "item_weapon_dagger",
            GRIMOIRE: "item_weapon_grimoire",
        },
    },
} as const
export type EFFECT_SOURCE = (typeof EFFECT_SOURCE)[keyof typeof EFFECT_SOURCE]