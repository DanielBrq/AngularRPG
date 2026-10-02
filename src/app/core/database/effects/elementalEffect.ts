import { EffectConfig } from '@src/app/core/database/effects';

export const ELEMENTAL_EFFECTS: Record<string, EffectConfig> = {
    BURN: {
        name: 'burn',
        description: `Deals heat damage each turn \n
        Stacks: Increases damage by 10% per 5 burn stack`, // move to passive
        type: 'elemental',
        duration: 3,
        isBeneficial: false,
    },
    FROSTBITE: {
        name: 'frostbite',
        description: `Reduces target speed by 5% (max 30%) \n
            Increases self cold damage by 5% per 5 (max 30%) frostbite stacks`, // move to passive
        type: 'elemental',
        duration: 3,
        isBeneficial: false,
    },
    ELECTRIFIED: {
        name: 'electrified',
        description: `Chance to deal a extra hit of lightning damage \n
            1% chance per lightning stack applied (max 100%)`, // move to passive
        type: 'elemental',
        duration: 3,
        isBeneficial: false,
    },
    SOLIDIFICATION: {
        name: 'solidification',
        description: `Decrease physical attack by 5% to the affected target`,
        type: 'elemental',
        duration: 3,
        isBeneficial: false,
        statModifiers: [{ stat: 'phys_atk_down', value: 0.05 }]
    },
    SWIRLING: {
        name: 'swirling',
        description: `Decrease magical defence and magical attack by 3% to the affected target`,
        type: 'elemental',
        duration: 3,
        isBeneficial: false,
        statModifiers: [{ stat: 'mag_def_down', value: 0.03 },
        { stat: 'mag_atk_down', value: 0.03 }]
    },
    POISON: {
        name: 'poison',
        description: `Deals Toxin damage each turn \n
            Decrease physical defence by 5% to the affected target`,
        type: 'elemental',
        duration: 3,
        isBeneficial: false,
        statModifiers: [{ stat: 'speed_down', value: 0.05 },
        { stat: 'phys_def_down', value: 0.05 }]
    }
}