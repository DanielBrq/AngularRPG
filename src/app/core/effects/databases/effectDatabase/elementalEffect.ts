import { EffectConfig } from '@src/app/core/effects/databases/effectDatabase';

export const ELEMENTAL_EFFECTS: Record<string, EffectConfig> = {
    BURN: {
        name: 'burn',
        description: `Deals heat damage each turn`,
        type: 'elemental',
        duration: 3,
        isBeneficial: false,
    },
    FROSTBITE: {
        name: 'frostbite',
        description: `Reduce target speed by 10%`, // move to passive
        type: 'elemental',
        duration: 3,
        isBeneficial: false,
    },
    ELECTRIFIED: {
        name: 'electrified',
        description: `Deals lightning damage each turn`,
        type: 'elemental',
        duration: 3,
        isBeneficial: false,
    },
    SOLIDIFICATION: {
        name: 'solidification',
        description: `Reduce physical attack by 5% for the affected target`,
        type: 'elemental',
        duration: 3,
        isBeneficial: false,
        statModifiers: [{ stat: 'phys_atk_down', value: -0.05 }]
    },
    SWIRLING: {
        name: 'swirling',
        description: `Reduce magical defence and magical attack by 5% to the affected target`,
        type: 'elemental',
        duration: 3,
        isBeneficial: false,
        statModifiers: [{ stat: 'mag_def_down', value: -0.05 },
        { stat: 'mag_atk_down', value: -0.05 }]
    },
    POISON: {
        name: 'poison',
        description: `Deals Toxin damage each turn \n
            Decrease physical defence by 5% to the affected target`,
        type: 'elemental',
        duration: 3,
        isBeneficial: false,
        statModifiers: [{ stat: 'speed_down', value: -0.05 },
        { stat: 'phys_def_down', value: -0.05 }]
    }
}