import { Effect } from '@src/app/core/effects/Effect';
import { GameEntityType } from '@src/app/core/entities';
import { SPECIAL_EFFECTS } from '@src/app/shared/types';

export class MonarchShardEffect extends Effect {
  constructor(
    target: GameEntityType,
    duration: number = 5,
    stack: number = 1,
    public override readonly baseEffect: {
      allStatsBonus: number;
      duration: number;
    } = {
        allStatsBonus: 0.2,
        duration: 5,
      },
    public override effectSnapshot: {
      allStatsBonus: number;
      duration: number;
    } = {
        allStatsBonus: 0.2,
        duration: 5,
      },
  ) {
    super(
      'Monarch Shard',
      'Raise all party members stats (+20%).',
      SPECIAL_EFFECTS.MONARCH_SHARD,
      target,
      stack,
      duration,
      true,
      baseEffect,
      effectSnapshot,
    );
  }

  override apply(target: GameEntityType): void {
    const stats = target.getBattleStats;
    const bonus = this.effectSnapshot.allStatsBonus;
    stats.maxHp += bonus;
    stats.hp += Math.floor(stats.maxHp * bonus);
    stats.speed += bonus;
    stats.physAtk += bonus;
    stats.physDef += bonus;
    stats.critChance += bonus;
    stats.critDmg += bonus;
    stats.magAtk += bonus;
    stats.magDef += bonus;
    stats.maxMp += bonus;
    stats.mp += bonus;
    stats.swordDmg += bonus;
    stats.spearDmg += bonus;
    stats.axeDmg += bonus;
    stats.daggerDmg += bonus;
    stats.swordResistance += bonus;
    stats.spearResistance += bonus;
    stats.axeResistance += bonus;
    stats.daggerResistance += bonus;
    stats.heatDmg += bonus;
    stats.coldDmg += bonus;
    stats.lightningDmg += bonus;
    stats.toxinDmg += bonus;
    stats.darkDmg += bonus;
    stats.lightDmg += bonus;
    stats.heatResistance += bonus;
    stats.coldResistance += bonus;
    stats.lightningResistance += bonus;
    stats.toxinResistance += bonus;
    stats.darkResistance += bonus;
    stats.lightResistance += bonus;
  }

  override expire(): void {
    const stats = this._target.getBattleStats;
    const bonus = this.effectSnapshot.allStatsBonus;
    stats.maxHp -= bonus;
    stats.hp -= Math.floor(stats.maxHp * bonus);
    stats.speed -= bonus;
    stats.physAtk -= bonus;
    stats.physDef -= bonus;
    stats.critChance -= bonus;
    stats.critDmg -= bonus;
    stats.magAtk -= bonus;
    stats.magDef -= bonus;
    stats.maxMp -= bonus;
    stats.mp -= bonus;
    stats.swordDmg -= bonus;
    stats.spearDmg -= bonus;
    stats.axeDmg -= bonus;
    stats.daggerDmg -= bonus;
    stats.swordResistance -= bonus;
    stats.spearResistance -= bonus;
    stats.axeResistance -= bonus;
    stats.daggerResistance -= bonus;
    stats.heatDmg -= bonus;
    stats.coldDmg -= bonus;
    stats.lightningDmg -= bonus;
    stats.toxinDmg -= bonus;
    stats.darkDmg -= bonus;
    stats.lightDmg -= bonus;
    stats.heatResistance -= bonus;
    stats.coldResistance -= bonus;
    stats.lightningResistance -= bonus;
    stats.toxinResistance -= bonus;
    stats.darkResistance -= bonus;
    stats.lightResistance -= bonus;

    this.effectSnapshot = {
      ...this.baseEffect,
    };
  }
}
