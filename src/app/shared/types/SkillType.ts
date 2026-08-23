
export const SKILL = {
    MAGIC_DMG: "magic_dmg",
    PHYSICAL_DMG: "physical_dmg",
    SUPPORT: "support",
    PASSIVE: "passive"
} as const;
export type SkillType = typeof SKILL[keyof typeof SKILL];