import { SkillConfig } from "@src/app/core/database/skills";
import { statModifierEffectId } from '@src/app/core/database/effects';

export const MAGICAL_SKILLS: Record<string, SkillConfig> = {
    LUX_IGNIS: {
        name: 'Lux Ignis',
        description: `Deals heat damage.`,
        damageType: 'magical',
        baseMpCost: 25,
        maxBoostLevel: 3,
        skillMultiplier: 2,
        boost: {
            descriptionPerLevel: `Deals {x} hit{s} of heat damage to a single target`,
            baseMpCost: 25,
            extraHit: 0,
            skillMultiplier: 2,
            maxBoostLevel: 3
        },
        effectsToApply: [{ effectId: "burn", durationTurns: 3, target: "target" }]
    },
    LUX_TONITRUS: {
        name: 'Lux Tonitrus',
        description: `Deals lightning damage.`,
        damageType: 'magical',
        baseMpCost: 25,
        maxBoostLevel: 3,
        skillMultiplier: 2,
        boost: {
            descriptionPerLevel: `Deals {x} hit{s} of lightning damage to a single target`,
            baseMpCost: 25,
            extraHit: 0,
            skillMultiplier: 2,
            maxBoostLevel: 3
        },
        effectsToApply: [{ effectId: "electrified", durationTurns: 3, target: "target" }]
    },
    LUX_GLACIEI: {
        name: 'Lux Glaciei',
        description: `Deals cold damage.`,
        damageType: 'magical',
        baseMpCost: 25,
        maxBoostLevel: 3,
        skillMultiplier: 2,
        boost: {
            descriptionPerLevel: `Deals {x} hit{s} of cold damage to a single target`,
            baseMpCost: 25,
            extraHit: 0,
            skillMultiplier: 2,
            maxBoostLevel: 3
        },
        effectsToApply: [{ effectId: "frostbite", durationTurns: 3, target: "target" }]
    },
    LUX_TERRAE: {
        name: 'Lux Terrae',
        description: `Deals solidification damage.`,
        damageType: 'magical',
        baseMpCost: 25,
        maxBoostLevel: 3,
        skillMultiplier: 1.8,
        boost: {
            descriptionPerLevel: `Deals {x} hit{s} of solidification damage to a single target`,
            baseMpCost: 25,
            extraHit: 0,
            skillMultiplier: 1.8,
            maxBoostLevel: 3
        },
        effectsToApply: [{ effectId: "solidification", durationTurns: 3, target: "target" }]
    },
    LUX_VENTI: {
        name: 'Lux Venti',
        description: `Deals wind damage.`,
        damageType: 'magical',
        baseMpCost: 25,
        maxBoostLevel: 3,
        skillMultiplier: 1.5,
        boost: {
            descriptionPerLevel: `Deals {x} hit{s} of wind damage to a single target`,
            baseMpCost: 25,
            extraHit: 0,
            skillMultiplier: 1.5,
            maxBoostLevel: 3
        },
        effectsToApply: [{ effectId: "swirling", durationTurns: 3, target: "target" }]
    },
    LUX_NOCTIS: {
        name: 'Lux Noctis',
        description: `Deals dark damage`,
        damageType: 'magical',
        baseMpCost: 0.20, //Exception: consumes 20% of user's HP instead of MP, manage in skill system.
        maxBoostLevel: 3,
        skillMultiplier: 3,
        boost: {
            descriptionPerLevel: `Deals {x} hit{s} of dark damage to a single target \n
            Exploit all elemental weaknesess at 50% of the total damage \n
            The skill will consume HP instead of MP`,
            baseMpCost: 0.20, //consume 20% of user's HP instead of MP (max boost 20%) 
            extraHit: 0,
            skillMultiplier: 3,
            maxBoostLevel: 3
        }
    },
    LUX_DIVINA: {
        name: 'Lux Divina',
        description: `Deals light damage.`,
        damageType: 'magical',
        baseMpCost: 25,
        maxBoostLevel: 3,
        skillMultiplier: 4,
        boost: {
            descriptionPerLevel: `Deals {x} hit{s} of light damage to a single target \n
            Exploit all elemental weaknesess at 100% of the total damage`,
            baseMpCost: 25,
            extraHit: 0,
            skillMultiplier: 4,
            maxBoostLevel: 3
        }
    }
}