export const SKILL = {
  PHYSICAL: 'physical',
  MAGIC: 'magic',
  SUPPORT: 'support',
  PASSIVE: 'passive',
  SPECIAL: 'special',
} as const;
export type SkillType = (typeof SKILL)[keyof typeof SKILL];
