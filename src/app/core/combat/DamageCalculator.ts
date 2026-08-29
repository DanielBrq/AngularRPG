import { DamageType } from '@app/shared/types/';
import { Randomizer } from '@app/shared/utils/Randomizer';
import { BattleStats, GameEntity } from '@app/core/entities';

export class DamageCalculator {

  public static calculate(attacker: GameEntity, target: GameEntity, skillMultiplier?: number): number {



    return 0
  }

  public static getStackMultiplier(stack: number): number {
    if (stack >= 5) {
      return 1 + Math.floor(stack / 5) * 0.1;
    } else {
      return 1;
    }
  }

  // Private

  private static criticalTier(critChance: number, critDmg: number): { tier: number, critDmg: number } {
    let tier: number = 1;
    const baseCritDmg = critDmg;
    // Tier Yellow critics = 1  -> normal crit, no bonus
    // Tier orange critics = 2  -> crit multiplier x2
    // Tier red critics = 3     -> crit muliplier x3
    while (critChance > 100 && tier < 3) {
      critChance -= 100;
      if (!Randomizer.chance(critChance)) break;
      tier++;
      critDmg = baseCritDmg * tier;
    }
    return { tier, critDmg };
  }

}
