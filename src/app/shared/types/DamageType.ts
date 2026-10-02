
import { WEAPONS } from './WeaponType';

export const ELEMENT = {
  HEAT: 'heat',
  COLD: 'cold',
  LIGHTNING: 'lightning',
  TOXIN: 'toxin',
  DARK: 'dark',
  LIGHT: 'light',
} as const;
export type ElementType = (typeof ELEMENT)[keyof typeof ELEMENT];

export const PHYSICAL_DAMAGE = 'physical_damage';
export type PhysicalDamageType = (typeof PHYSICAL_DAMAGE)[keyof typeof PHYSICAL_DAMAGE];
export const ELEMENTAL_DAMAGE = ELEMENT;
export type ElementalDamageType = (typeof ELEMENTAL_DAMAGE)[keyof typeof ELEMENTAL_DAMAGE];

export const DAMAGE = {
  ...ELEMENT,
  ...WEAPONS,
} as const;
export type DamageType = (typeof DAMAGE)[keyof typeof DAMAGE];

