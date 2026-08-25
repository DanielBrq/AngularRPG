export const SKILL = {
  OFENSIVE: 'ofensive', // Inflicts some type of dmg
  SUPPORT: 'support', // Defensive, healing, stat modifier, debuff.
  PASSIVE: 'passive', // Items effects
  SPECIAL: 'special', // Exclusive skills for some entity (characters or foes).
} as const;
export type SkillType = (typeof SKILL)[keyof typeof SKILL];
