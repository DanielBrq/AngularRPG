export const WEAPONS = {
  SWORD: 'sword',
  SPEAR: 'spear',
  AXE: 'axe',
  BOW: 'bow',
  DAGGER: 'dagger',
  GRIMOIRE: 'grimoire',
} as const;
export type WeaponsType = (typeof WEAPONS)[keyof typeof WEAPONS];

export const EQUIPMENT = {
  HELMET: 'helmet',
  CHEST: 'chest',
  RING: 'ring',
  BELT: 'belt',
  BOOTS: 'boots',
} as const;
export type EquipmentType = (typeof EQUIPMENT)[keyof typeof EQUIPMENT];
