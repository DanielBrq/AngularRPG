export const ELEMENT = {
  HEAT: 'heat',
  COLD: 'cold',
  LIGHTNING: 'lightning',
  TOXIN: 'toxin',
  DARK: 'dark',
  LIGHT: 'light',
} as const;
export type ElementType = (typeof ELEMENT)[keyof typeof ELEMENT];
