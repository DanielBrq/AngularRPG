import { Effect } from '@src/app/core/effects/Effect';
import { STATUS_EFFECTS } from '@src/app/shared/types';
import { GameEntityType } from '@src/app/core/entities';
import { DamageCalculator } from '@src/app/core/combat';

export class Burn extends Effect {
  constructor(
    _dmg: number = 100,
    duration: number = 3,
    stack: number = 1,
    target: GameEntityType,
    isBeneficial: boolean = false,
    public override readonly baseEffect: {
      dmg: number;
      duration: number;
      stack: number;
    } = {
        dmg: _dmg,
        duration: duration,
        stack: stack,
      },
    public override effectSnapshot: {
      dmg: number;
      duration: number;
      stack: number;
    } = {
        dmg: _dmg,
        duration: duration,
        stack: stack,
      },
  ) {
    super(
      'Burn',
      `Deals Heat damage each turn \n
      Stacks: Increases damage by 10% per 5 burn stacks \n`,
      STATUS_EFFECTS.BURN,
      target,
      stack,
      duration,
      isBeneficial,
      baseEffect,
      effectSnapshot,
    );
  }

  override apply(target: GameEntityType): void {
    let dmg: number = this.calculateDmg(target);
    this.effectSnapshot.dmg = dmg;
    //TODO: _dmg save the result of mag dmg calculator and apply for X turns
  }

  override expire(): void {
    this.effectSnapshot = {
      ...this.baseEffect,
    };
  }

  private calculateDmg(target: GameEntityType): number {
    //TODO: refactor create and use DamageCalculator.ts instead of getting base stats
    const mgaDmg: number = target.getBaseStats._magAtk * 0.25; //TODO: apply dmg calculator
    const heatDmg: number = target.getBaseStats._heatDmg ?? 1;
    const stackMultiplier: number = DamageCalculator.getStackMultiplier(this.effectSnapshot.stack);
    return mgaDmg * stackMultiplier * heatDmg;
  }
}
