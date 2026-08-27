export const EQUIPMENT = {
  HELMET: 'helmet',
  CHEST: 'chest',
  RING: 'ring',
  BELT: 'belt',
  BOOTS: 'boots',
} as const;
export type EquipmentType = (typeof EQUIPMENT)[keyof typeof EQUIPMENT];
