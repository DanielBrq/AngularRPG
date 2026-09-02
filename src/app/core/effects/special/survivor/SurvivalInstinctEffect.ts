import { Effect } from '@src/app/core/effects/Effect';
import { GameEntityType } from '@src/app/core/entities';
import { SPECIAL_EFFECTS } from '@src/app/shared/types';

export class SurvivalInstinctEffect extends Effect {
  private _applied: boolean = false;

  constructor(
    target: GameEntityType,
    duration: number = 1,
    stack: number = 1,
    public override readonly baseEffect: {
      physAtkBonus: number;
      critChanceBonus: number;
      critDmgBonus: number;
      speedBonus: number;
      duration: number;
    } = {
        physAtkBonus: 0.5,
        critChanceBonus: 1.5,
        critDmgBonus: 0.3,
        speedBonus: 0.4,
        duration: 1,
      },
    public override effectSnapshot: {
      physAtkBonus: number;
      critChanceBonus: number;
      critDmgBonus: number;
      speedBonus: number;
      duration: number;
    } = {
        physAtkBonus: 0.5,
        critChanceBonus: 1.5,
        critDmgBonus: 0.3,
        speedBonus: 0.4,
        duration: 1,
      },
  ) {
    super(
      'Survival Instinct',
      'Increase Physical Damage (50%), Critical Chance (150%), Critical Damage (30%) and Speed (40%) while HP is lower than 25%.',
      SPECIAL_EFFECTS.SURVIVAL_INSTINCT,
      target,
      stack,
      duration,
      true,
      baseEffect,
      effectSnapshot,
    );
  }

  override apply(target: GameEntityType): void {
    if (this.hasLowHP(target)) {
      if (!this._applied) {
        target.getBattleStats.physAtk += this.effectSnapshot.physAtkBonus;
        target.getBattleStats.critChance += this.effectSnapshot.critChanceBonus;
        target.getBattleStats.critDmg += this.effectSnapshot.critDmgBonus;
        target.getBattleStats.speed += this.effectSnapshot.speedBonus;
        this._applied = true;
      }
    } else {
      this.expire();
    }
  }

  override expire(): void {
    if (this._applied) {
      this._target.getBattleStats.physAtk -= this.effectSnapshot.physAtkBonus;
      this._target.getBattleStats.critChance -= this.effectSnapshot.critChanceBonus;
      this._target.getBattleStats.critDmg -= this.effectSnapshot.critDmgBonus;
      this._target.getBattleStats.speed -= this.effectSnapshot.speedBonus;
      this._applied = false;
    }

    this.effectSnapshot = {
      ...this.baseEffect,
    };
  }

  private hasLowHP(target: GameEntityType): boolean {
    return target.isAlive && (target.getBattleStats.hp / target.getBattleStats.maxHp <= 0.25);
  }
}
