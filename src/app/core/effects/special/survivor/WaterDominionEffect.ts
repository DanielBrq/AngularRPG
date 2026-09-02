import { Effect } from '@src/app/core/effects/Effect';
import { GameEntityType } from '@src/app/core/entities';
import { SPECIAL_EFFECTS } from '@src/app/shared/types';

export class WaterDominionEffect extends Effect {
  private _speedBonus: number = 0;

  constructor(
    target: GameEntityType,
    duration: number = 5,
    stack: number = 1,
    public override readonly baseEffect: {
      coldDmgBonus: number;
      heatResistanceBonus: number;
      duration: number;
    } = {
        coldDmgBonus: 0.6,
        heatResistanceBonus: 0.3,
        duration: 5,
      },
    public override effectSnapshot: {
      coldDmgBonus: number;
      heatResistanceBonus: number;
      duration: number;
    } = {
        coldDmgBonus: 0.6,
        heatResistanceBonus: 0.3,
        duration: 5,
      },
  ) {
    super(
      'Water Dominion',
      'Raise Cold Damage (+60%), Heat Resistance (+30%), and Physical Damage based on speed (+12% per 100 Speed points).',
      SPECIAL_EFFECTS.WATER_DOMINION,
      target,
      stack,
      duration,
      true,
      baseEffect,
      effectSnapshot,
    );
  }

  override apply(target: GameEntityType): void {
    target.getBattleStats.coldDmg += this.effectSnapshot.coldDmgBonus;
    target.getBattleStats.heatResistance += this.effectSnapshot.heatResistanceBonus;

    // Save speed bonus at the moment of application to avoid miscalculations if speed changes during duration
    this._speedBonus = this.getSpeedBonus(target);
    target.getBattleStats.physAtk += this._speedBonus;
  }

  override expire(): void {
    this._target.getBattleStats.coldDmg -= this.effectSnapshot.coldDmgBonus;
    this._target.getBattleStats.heatResistance -= this.effectSnapshot.heatResistanceBonus;
    this._target.getBattleStats.physAtk -= this._speedBonus;

    this.effectSnapshot = {
      ...this.baseEffect,
    };
  }

  private getSpeedBonus(target: GameEntityType): number {
    return Math.floor(target.getBattleStats.speed / 100) * 0.12;
  }
}
