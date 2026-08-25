import { Effect } from '@app/core/effects/Effect';
import { GameEntityType } from '@app/core/entities';
import { PASSIVE_EFFECTS } from '@app/shared/types';

export abstract class PassiveEffect extends Effect {
  constructor(
    name: string,
    description: string,
    effect: PASSIVE_EFFECTS,
    target: GameEntityType,
  ) {
    super(name, description, effect, target);
  }

  override apply(target: GameEntityType): void { }
}
