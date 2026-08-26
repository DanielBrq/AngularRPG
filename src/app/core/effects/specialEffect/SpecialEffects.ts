import { Effect } from '@app/core/effects/Effect';
import { GameEntityType } from '@app/core/entities';
import { SPECIAL_EFFECTS } from '@app/shared/types';

export abstract class SpecialEffect extends Effect {
  constructor(
    protected name: string,
    protected description: string,
    protected effect: SPECIAL_EFFECTS,
    protected target: GameEntityType,
    protected stack: number,
    protected duration: number,
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
