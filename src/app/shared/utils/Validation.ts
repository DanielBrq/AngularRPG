export function assertPositive(value: number): void {
  if (!(value > 0)) throw new Error('Value must be positive');
}
