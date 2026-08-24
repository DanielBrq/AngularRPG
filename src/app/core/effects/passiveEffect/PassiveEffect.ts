import { Effect } from '@app/core/effects/Effect';
import { GameEntity } from '@app/core/entities';
import { PASSIVE_EFFECTS } from '@app/shared/types';

export abstract class PassiveEffect extends Effect {
  constructor(name: string, description: string, effect: PASSIVE_EFFECTS) {
    super(name, description, effect);
  }

  override apply(starget: GameEntity, executor: GameEntity): void {}
}
