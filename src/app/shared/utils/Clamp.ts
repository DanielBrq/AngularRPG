// calculate increase or decrease bewteen the bar limits (min-max)
export function clamp(value: number, max: number): number {
  return Math.max(0, Math.min(value, max));
}
