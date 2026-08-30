import { DamageType, ELEMENTAL_DAMAGE, PHYSICAL_DAMAGE } from '@app/shared/types/';
import { Randomizer } from '@app/shared/utils/Randomizer';
import { BattleStats, FoeEntity, GameEntity } from '@app/core/entities';
import { clamp } from '@app/shared';

export class DamageCalculator {
  private static readonly MIN_DAMAGE_MULTIPLIER = 0.1;

  public static calcDmg(
    attacker: GameEntity,
    target: GameEntity,
    damageBasedOn: DamageType,    // Come from skill.
    skillMultiplier: number = 1,  // Come from skill
  ): { damage: number, criticalTier: number, exploitedWeakness: DamageType[] } {

    const isPhysical = (Object.values(PHYSICAL_DAMAGE) as readonly DamageType[]).includes(damageBasedOn);

    let damage = this.resolveAttackAgainstDefense(
      isPhysical
        ? attacker.getBattleStats.physAtk
        : attacker.getBattleStats.magAtk,
      isPhysical
        ? target.getBattleStats.physDef
        : target.getBattleStats.magDef
    );

    let damageMultiplier: number = 1;

    switch (damageBasedOn) {
      case PHYSICAL_DAMAGE.SWORD:
        damageMultiplier += this.resolveDmgTypeAgainstDefType(attacker.getBattleStats.swordDmg, target.getBattleStats.swordResistance);
        break;
      case PHYSICAL_DAMAGE.SPEAR:
        damageMultiplier += this.resolveDmgTypeAgainstDefType(attacker.getBattleStats.spearDmg, target.getBattleStats.spearResistance);
        break;
      case PHYSICAL_DAMAGE.AXE:
        damageMultiplier += this.resolveDmgTypeAgainstDefType(attacker.getBattleStats.axeDmg, target.getBattleStats.axeResistance);
        break;
      case PHYSICAL_DAMAGE.DAGGER:
        damageMultiplier += this.resolveDmgTypeAgainstDefType(attacker.getBattleStats.daggerDmg, target.getBattleStats.daggerResistance);
        break;
      case ELEMENTAL_DAMAGE.HEAT:
        damageMultiplier += this.resolveDmgTypeAgainstDefType(attacker.getBattleStats.heatDmg, target.getBattleStats.heatResistance);
        break;
      case ELEMENTAL_DAMAGE.COLD:
        damageMultiplier += this.resolveDmgTypeAgainstDefType(attacker.getBattleStats.coldDmg, target.getBattleStats.coldResistance);
        break;
      case ELEMENTAL_DAMAGE.LIGHTNING:
        damageMultiplier += this.resolveDmgTypeAgainstDefType(attacker.getBattleStats.lightningDmg, target.getBattleStats.lightningResistance);
        break;
      case ELEMENTAL_DAMAGE.TOXIN:
        damageMultiplier += this.resolveDmgTypeAgainstDefType(attacker.getBattleStats.toxinDmg, target.getBattleStats.toxinResistance);
        break;
      case ELEMENTAL_DAMAGE.DARK:
        damageMultiplier += this.resolveDmgTypeAgainstDefType(attacker.getBattleStats.darkDmg, target.getBattleStats.darkResistance);
        break;
      case ELEMENTAL_DAMAGE.LIGHT:
        damageMultiplier += this.resolveDmgTypeAgainstDefType(attacker.getBattleStats.lightDmg, target.getBattleStats.lightResistance);
        break;
    }

    // Prevent inmunity, deals at least 10% of damage.
    damageMultiplier = Math.max(damageMultiplier, this.MIN_DAMAGE_MULTIPLIER);

    // When target is a Foe. Get weaknesses from the FoeEntity.
    let exploitedWeakness: DamageType[] = [];
    if (target instanceof FoeEntity) {
      // Match weakness Exploitable vs Weakness Resistance.
      exploitedWeakness = target.getWeakness.filter((weakness) =>
        attacker.getDamageData.exploitableWeaknesses.includes(weakness));
    }

    // Game rule: Exploitable weakness = +50% damage
    if (exploitedWeakness.length > 0) damageMultiplier += 0.5;

    // Apply physical or elemental damage
    damage *= damageMultiplier;

    // Apply skill multiplier
    damage *= skillMultiplier;

    // Apply critical hit chance
    const { criticalTier, critDamage } = this.criticalTier(attacker.getBattleStats.critChance, target.getBattleStats.critDmg)

    // Apply critical damage
    damage *= critDamage;

    // Apply damage limit
    damage = clamp(damage, target.getBattleStats.dmgLimit);

    return { damage, criticalTier, exploitedWeakness }
  }

  public static getStackMultiplier(stack: number): number {
    if (stack >= 5) {
      return 1 + Math.floor(stack / 5) * 0.1;
    } else {
      return 1;
    }
  }

  private static criticalTier(critChance: number, critDamage: number): { criticalTier: number, critDamage: number } {
    let criticalTier: number = 1;
    const baseCritDmg = critDamage;
    // Tier Yellow critics = 1  -> normal crit, no bonus
    // Tier orange critics = 2  -> crit multiplier x2
    // Tier red critics = 3     -> crit muliplier x3
    while (critChance > 100 && criticalTier < 3) {
      critChance -= 100;
      if (!Randomizer.chance(critChance)) break;
      criticalTier++;
      critDamage = baseCritDmg * criticalTier;
    }
    return { criticalTier, critDamage };
  }

  private static resolveAttackAgainstDefense(attack: number, defense: number): number {
    return Math.max(attack - defense, 1);
  }

  private static resolveDmgTypeAgainstDefType(attackerStat: number, targetStat: number): number {
    return attackerStat - targetStat;
  }

}
