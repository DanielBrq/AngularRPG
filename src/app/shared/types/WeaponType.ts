export const WEAPONS = {
  SWORD: 'sword',
  SPEAR: 'spear',
  AXE: 'axe',
  DAGGER: 'dagger',
  GRIMOIRE: 'grimoire',
} as const;
export type WeaponType = (typeof WEAPONS)[keyof typeof WEAPONS];