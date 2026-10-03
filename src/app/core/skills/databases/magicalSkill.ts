import { SkillData } from "@src/app/core/skills/databases";

export const MAGICAL_SKILLS: Record<string, SkillData> = {
    LUX_IGNIS: {
        name: 'Lux Ignis',
        description: `Deals 1 hit of heat damage to a single target`,
        damageType: 'magical',
        baseMpCost: 25,
        baseMaxBoostLevel: 3,
        baseSkillMultiplier: 2,
        skillSpeedMultiplier: 1,
        boost: {
            MpCost: 25,
            skillMultiplier: 2,
            maxBoostLevel: 3
        },
        effectsToApply: [{ effectId: "burn", durationTurns: 3, target: "target" }]
    },
    LUX_TONITRUS: {
        name: 'Lux Tonitrus',
        description: `Deals 1 hit of lightning damage to a single target`,
        damageType: 'magical',
        baseMpCost: 25,
        baseMaxBoostLevel: 3,
        baseSkillMultiplier: 2,
        skillSpeedMultiplier: 1,
        boost: {
            MpCost: 25,
            skillMultiplier: 2,
            maxBoostLevel: 3
        },
        effectsToApply: [{ effectId: "electrified", durationTurns: 3, target: "target" }]
    },
    LUX_GLACIEI: {
        name: 'Lux Glaciei',
        description: `Deals 1 hit of cold damage to a single target`,
        damageType: 'magical',
        baseMpCost: 25,
        baseMaxBoostLevel: 3,
        baseSkillMultiplier: 2,
        skillSpeedMultiplier: 1,
        boost: {
            MpCost: 25,
            skillMultiplier: 2,
            maxBoostLevel: 3
        },
        effectsToApply: [{ effectId: "frostbite", durationTurns: 3, target: "target" }]
    },
    LUX_TERRAE: {
        name: 'Lux Terrae',
        description: `Deals 1 hit of solidification damage to a single target`,
        damageType: 'magical',
        baseMpCost: 25,
        baseMaxBoostLevel: 3,
        baseSkillMultiplier: 1.8,
        skillSpeedMultiplier: 1,
        boost: {
            MpCost: 25,
            skillMultiplier: 1.8,
            maxBoostLevel: 3
        },
        effectsToApply: [{ effectId: "solidification", durationTurns: 3, target: "target" }]
    },
    LUX_VENTI: {
        name: 'Lux Venti',
        description: `Deals 1 hit of wind damage to a single target`,
        damageType: 'magical',
        baseMpCost: 25,
        baseMaxBoostLevel: 3,
        baseSkillMultiplier: 1.5,
        skillSpeedMultiplier: 1,
        boost: {
            MpCost: 25,
            skillMultiplier: 1.5,
            maxBoostLevel: 3
        },
        effectsToApply: [{ effectId: "swirling", durationTurns: 3, target: "target" }]
    },
    LUX_NOCTIS: {
        name: 'Lux Noctis',
        description: `Deals 1 hit of dark damage to a single target \n
            Exploit all elemental weaknesess at 50% of the total damage \n
            The skill will consume HP instead of MP`,
        damageType: 'magical',
        baseMpCost: 0.20, //Exception: consumes 20% of user's HP instead of MP, manage in skill system.
        baseMaxBoostLevel: 3,
        baseSkillMultiplier: 3,
        skillSpeedMultiplier: 1,
        boost: {
            MpCost: 0.20, //consume 20% of user's HP instead of MP (max boost 20%) 
            skillMultiplier: 3,
            maxBoostLevel: 3
        }
    },
    LUX_DIVINA: {
        name: 'Lux Divina',
        description: `Deals 1 hit of light damage to a single target \n
            Exploit all elemental weaknesess at 100% of the total damage`,
        damageType: 'magical',
        baseMpCost: 25,
        baseMaxBoostLevel: 3,
        baseSkillMultiplier: 4,
        skillSpeedMultiplier: 1,
        boost: {
            MpCost: 25,
            skillMultiplier: 4,
            maxBoostLevel: 3
        }
    }
}