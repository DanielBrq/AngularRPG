import { Effect } from '@app/core/effects/Effect';
import { GameEntityType } from '@app/core/entities';
import { SPECIAL_EFFECTS } from '@app/shared/types';

export abstract class SpecialEffect extends Effect {
  constructor(
    name: string,
    description: string,
    effect: SPECIAL_EFFECTS,
    target: GameEntityType,
    stack: number,
    duration: number,
  ) {
    super(
      name,
      description,
      effect,
      target,
      stack,
      duration,
    );
  }

  apply(target: GameEntityType): void { }

  expire(): void { }

}
