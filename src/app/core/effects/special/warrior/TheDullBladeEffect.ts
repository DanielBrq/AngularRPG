import { Effect } from '@app/core/effects/Effect';
import { GameEntityType } from '@app/core/entities';
import { SPECIAL_EFFECTS } from '@app/shared/types';

export class TheDullBladeEffect extends Effect {
  constructor(
    target: GameEntityType,
    duration: number = 3,
    stack: number = 1,
    public override readonly baseEffect: {
      physDefPenalty: number;
      magDefPenalty: number;
      physAtkBonus: number;
      critChanceBonus: number;
      critDmgBonus: number;
      speedBonus: number;
      duration: number;
    } = {
        physDefPenalty: 0.6,
        magDefPenalty: 0.6,
        physAtkBonus: 0.8,
        critChanceBonus: 0.5,
        critDmgBonus: 0.3,
        speedBonus: 0.4,
        duration: 3,
      },
    public override effectSnapshot: {
      physDefPenalty: number;
      magDefPenalty: number;
      physAtkBonus: number;
      critChanceBonus: number;
      critDmgBonus: number;
      speedBonus: number;
      duration: number;
    } = {
        physDefPenalty: 0.6,
        magDefPenalty: 0.6,
        physAtkBonus: 0.8,
        critChanceBonus: 0.5,
        critDmgBonus: 0.3,
        speedBonus: 0.4,
        duration: 3,
      },
  ) {
    super(
      'The Dull Blade',
      'Lower Physical and Magic Defence (-60%). Raise Physical Atk (+80%), Critical Chance (+50%), Critical Dmg (+30%), and Speed (+40%).',
      SPECIAL_EFFECTS.THE_DULL_BLADE,
      target,
      stack,
      duration,
      true,
      baseEffect,
      effectSnapshot,
    );
  }

  override apply(target: GameEntityType): void {
    target.getBattleStats.physDef -= this.effectSnapshot.physDefPenalty;
    target.getBattleStats.magDef -= this.effectSnapshot.magDefPenalty;
    target.getBattleStats.physAtk += this.effectSnapshot.physAtkBonus;
    target.getBattleStats.critChance += this.effectSnapshot.critChanceBonus;
    target.getBattleStats.critDmg += this.effectSnapshot.critDmgBonus;
    target.getBattleStats.speed += this.effectSnapshot.speedBonus;
  }

  override expire(): void {
    this._target.getBattleStats.physDef += this.effectSnapshot.physDefPenalty;
    this._target.getBattleStats.magDef += this.effectSnapshot.magDefPenalty;
    this._target.getBattleStats.physAtk -= this.effectSnapshot.physAtkBonus;
    this._target.getBattleStats.critChance -= this.effectSnapshot.critChanceBonus;
    this._target.getBattleStats.critDmg -= this.effectSnapshot.critDmgBonus;
    this._target.getBattleStats.speed -= this.effectSnapshot.speedBonus;

    this.effectSnapshot = {
      ...this.baseEffect,
    };
  }
}
