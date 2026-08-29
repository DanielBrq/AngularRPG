import { Effect } from '@app/core/effects/Effect';
import { STATUS_EFFECTS } from '@app/shared/types';
import { GameEntityType } from '@app/core/entities';

export class Paralysis extends Effect {
  constructor(
    duration: number = 2,
    stack: number = 1,
    entity: GameEntityType,
    isBeneficial: boolean = false,
  ) {
    super(
      'Paralysis',
      'Chance to make target unable to act',
      STATUS_EFFECTS.PARALYSIS,
      entity,
      stack,
      duration,
      isBeneficial
    );
  }

  override apply(target: GameEntityType): void {
    // 30% Skip turn action
  }

  override expire(): void { }
}
