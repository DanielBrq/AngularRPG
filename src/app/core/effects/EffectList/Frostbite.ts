import { Effect } from '@app/core/effects/Effect';
import { STATUS_EFFECTS } from '@app/shared/types';
import { GameEntityType } from '@app/core/entities';

export class Frostbite extends Effect {
  constructor(
    duration: number = 2,
    stack: number = 1,
    target: GameEntityType,
    isBeneficial: boolean = false,
  ) {
    super(
      'Frostbite',
      `Reduces target speed by 5% (max 30%) \n
            Increases damage by 5% per 5 frostbite stacks`,
      STATUS_EFFECTS.FROSTBITE,
      target,
      stack,
      duration,
      isBeneficial
    );
  }

  override apply(target: GameEntityType): void {
    // Lower target speed by 20%
  }

  override expire(): void { }
}
