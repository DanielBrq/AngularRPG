import { Effect } from '@app/core/effects/Effect';
import { GameEntityType } from '@app/core/entities';
import { STATUS_EFFECTS } from '@app/shared/types';

export abstract class StatusEffect extends Effect {
  constructor(
    name: string,
    description: string,
    effect: STATUS_EFFECTS,
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

}
