import { Effect } from '@app/core/effects/Effect';
import { STATUS_EFFECTS } from '@app/shared/types';
import { GameEntityType } from '@app/core/entities';
import { DamageCalculator } from '@app/core/combat';
import { i18nTranslation } from '@app/shared/i18n/i18n';

export class Poison extends Effect {
  constructor(
    _dmg: number = 100,
    duration: number = 3,
    stack: number = 1,
    target: GameEntityType,
    isBeneficial: boolean = false,
  ) {
    super(
      'Poison',
      `Deals Toxin damage each turn \n
            Stacks: Increases damage by 10% per 5 poison stacks \n`,
      STATUS_EFFECTS.POISON,
      target,
      stack,
      duration,
      isBeneficial
    );
  }

  override apply(target: GameEntityType): void {
    let dmg: number = this.calculateDmg(target);

    //_dmg save the result of mag dmg calculator and apply for X turns
  }

  override expire(): void { }

  public getName(): string { return i18nTranslation('effects.status.poison.name', {}); }
  public getDescription(): string { return i18nTranslation('effects.status.poison.description', {}); }

  private calculateDmg(target: GameEntityType): number {
    //TODO: refactor create and use DamageCalculator.ts instead of getting base stats
    const mgaDmg: number = target.getBaseStats._magAtk * 0.25; //TODO: apply dmg calculator
    const heatDmg: number = target.getBaseStats._toxinDmg ?? 1;
    const stackMultiplier: number = DamageCalculator.getStackMultiplier(this._stack);
    return mgaDmg * stackMultiplier * heatDmg;
  }
}
