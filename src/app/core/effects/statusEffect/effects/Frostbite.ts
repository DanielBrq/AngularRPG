import { StatusEffect } from '@app/core/effects/statusEffect/StatusEffect';
import { STATUS_EFFECTS } from '@app/shared/types';
import { GameEntity } from '@app/core/entities';

export class Frostbite extends StatusEffect {
  constructor(duration: number = 2, stack: number = 1) {
    super(
      'Frostbite',
      `Reduces target speed by 5% (max 30%) \n
            Increases damage by 5% per 5 frostbite stacks`,
      STATUS_EFFECTS.FROSTBITE,
      stack,
      duration,
    );
  }

  override apply(target: GameEntity, executor: GameEntity): void {
    // Lower target speed by 20%
  }
}
