export class DamageCalculator {
  public static getStackMultiplier(stack: number): number {
    if (stack >= 5) {
      return 1 + Math.floor(stack / 5) * 0.1;
    } else {
      return 1;
    }
  }
}
