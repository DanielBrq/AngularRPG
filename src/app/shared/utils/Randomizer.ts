export function randomizer(chance: number): boolean {
  if (chance <= 0) return false;
  if (chance >= 100) return true;
  return Math.random() * 100 < chance;
}

export function randomIntegerFromRange(min: number, max: number): number {
  if (max < min) throw new Error('Max must be greater than or equal to min');
  if (min < 0) throw new Error("Min must be greater than 0");

  return  Math.floor(Math.random() * (max - min + 1)) + min;
}
