export const ELEMENTS = {
  HEAT: 'heat',
  COLD: 'cold',
  LIGHTNING: 'lightning',
  TOXIN: 'toxin',
  DARK: 'dark',
  LIGHT: 'light',
} as const;
export type ELEMENTS = (typeof ELEMENTS)[keyof typeof ELEMENTS];
