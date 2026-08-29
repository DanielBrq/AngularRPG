import { DamageType, ELEMENTAL_DAMAGE, PHYSICAL_DAMAGE } from '@app/shared/types/';
import { Randomizer } from '@app/shared/utils/Randomizer';
import { BattleStats, FoeEntity, GameEntity } from '@app/core/entities';

export class DamageCalculator {

  public static calcDmg(
    attacker: GameEntity,
    target: GameEntity,
    damageBasedOn: DamageType,    // Come from skill.
    skillMultiplier: number = 1,  // Come from skill
  ): number {
    let damage: number;
    let damageMultiplier: number = 1;
    let targetWeaknesses: DamageType[] = [];
    const attackerExploitable: DamageType[] = attacker.getDamageData.exploitableWeaknesses;

    //Problema se usan porcentajes por 0.x y se setean en 0 sumando buffs en 0.x decimales pero en el 
    // switch de abajo si no hay buff de arma, se multiplicará por 0 y eso le quitará
    switch (damageBasedOn) {
      case PHYSICAL_DAMAGE.SWORD:
        damageMultiplier += attacker.getBattleStats.physAtk * attacker.getBattleStats.swordDmg;
        break;
      case PHYSICAL_DAMAGE.SPEAR:
        damageMultiplier += attacker.getBattleStats.physAtk * attacker.getBattleStats.spearDmg;
        break;
      case PHYSICAL_DAMAGE.AXE:
        damageMultiplier += attacker.getBattleStats.physAtk * attacker.getBattleStats.axeDmg;
        break;
      case PHYSICAL_DAMAGE.DAGGER:
        damageMultiplier += attacker.getBattleStats.physAtk * attacker.getBattleStats.daggerDmg;
        break;
      case ELEMENTAL_DAMAGE.HEAT:
        damageMultiplier += attacker.getBattleStats.magAtk * attacker.getBattleStats.heatDmg;
        break;
      case ELEMENTAL_DAMAGE.COLD:
        damageMultiplier += attacker.getBattleStats.magAtk * attacker.getBattleStats.coldDmg;
        break;
      case ELEMENTAL_DAMAGE.LIGHTNING:
        damageMultiplier += attacker.getBattleStats.magAtk * attacker.getBattleStats.lightningDmg;
        break;
      case ELEMENTAL_DAMAGE.TOXIN:
        damageMultiplier += attacker.getBattleStats.magAtk * attacker.getBattleStats.toxinDmg;
        break;
      case ELEMENTAL_DAMAGE.DARK:
        damageMultiplier += attacker.getBattleStats.magAtk * attacker.getBattleStats.darkDmg;
        break;
      case ELEMENTAL_DAMAGE.LIGHT:
        damageMultiplier += attacker.getBattleStats.magAtk * attacker.getBattleStats.lightDmg;
        break;
    }

    if (target instanceof FoeEntity) {
      targetWeaknesses = target.getWeakness;
    }

    // Filtrar coincidencias
    attackerExploitable.forEach((weakness) => {
      if (targetWeaknesses.find((e) => e === weakness)) {


      }
    });

    const { criticalTier, critDamage } = this.criticalTier(attacker.getBattleStats.critChance, target.getBattleStats.critDmg)

    return 0
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

}
