import { SkillData } from "@src/app/core/skills/databases";

export const PHYSICAL_SKILLS: Record<string, SkillData> = {
    HEAVY_SLICE: {
        name: 'Heavy Slice',
        description: `Deals physical sword damage to a single target`,
        damageType: 'physical',
        baseMpCost: 0,
        baseMaxBoostLevel: 3,
        baseSkillMultiplier: 1,
        boost: {
            MpCost: 0,
            skillMultiplier: 1,
            maxBoostLevel: 3
        }
    }

}