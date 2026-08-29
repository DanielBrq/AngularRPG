export class Randomizer {
  /**
   * Returns true with the given probability (0-100).
   * @example Randomizer.chance(25) // 25% chance of true
   */
  public static chance(percent: number): boolean {
    if (percent <= 0) return false;
    if (percent >= 100) return true;
    return Math.random() * 100 < percent;
  }

  /**
   * Returns a random integer between min and max, inclusive.
   * @throws if max < min or min < 0
   */
  public static integerFromRange(min: number, max: number): number {
    if (max < min) throw new Error('Max must be greater than or equal to min');
    if (min < 0) throw new Error('Min must be greater than 0');
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
