import { EffectData } from '@src/app/core/effects/databases/effectDatabase';

export const BUFF_EFFECTS: Record<string, EffectData> = {
    BURN_STACK: {
        name: 'burn_stack',
        description: `Increase self heat damage by 5% (max 100%) per 5 burn stack`,
        type: 'buffs',
        duration: 3,
        isBeneficial: true,
        statModifiers: [{ stat: 'heat_dmg_up', value: 0.05 }],
    },
    FROSTBITE_STACK: {
        name: 'frostbite_stack',
        description: `Increase self cold damage by 5% (max 100%) per 5 frostbite stack`,
        type: 'buffs',
        duration: 3,
        isBeneficial: true,
        statModifiers: [{ stat: 'cold_dmg_up', value: 0.05 }],
    },
    ELECTRIFIED_STACK: {
        name: 'electrified_stack',
        description: `Chance to deal a extra hit of lightning damage \n
            1% chance per electrified stack applied (max 100%)`,
        type: 'buffs',
        duration: 3,
        isBeneficial: true,
    },
    SOLIDIFICATION_STACK: {
        name: 'solidification_stack',
        description: `Increases self solid damage by 5% per 5 (max 100%) solidification stacks`,
        type: 'buffs',
        duration: 3,
        isBeneficial: true,
        statModifiers: [{ stat: 'solidification_dmg_up', value: 0.05 }],
    },
    SWIRLING_STACK: {
        name: 'swirling_stack',
        description: `Increases self wind damage by 5% per 5 (max 100%) swirling stacks`,
        type: 'buffs',
        duration: 3,
        isBeneficial: true,
        statModifiers: [{ stat: 'wind_dmg_up', value: 0.05 }],
    },
    POISON_STACK: {
        name: 'poison_stack',
        description: `Increases self poison damage by 5% per 5 (max 100%) poison stacks`,
        type: 'buffs',
        duration: 3,
        isBeneficial: true,
        statModifiers: [{ stat: 'toxin_dmg_up', value: 0.05 }],
    },

}