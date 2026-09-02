import { Effect } from '@src/app/core/effects/Effect';
import { STATUS_EFFECTS } from '@src/app/shared/types';
import { GameEntityType } from '@src/app/core/entities';

export class Paralysis extends Effect {
  constructor(
    duration: number = 2,
    stack: number = 1,
    entity: GameEntityType,
    isBeneficial: boolean = false,
    public override readonly baseEffect: {
      skipChance: number;
      duration: number;
      stack: number;
    } = {
        skipChance: 0.3,
        duration: duration,
        stack: stack,
      },
    public override effectSnapshot: {
      skipChance: number;
      duration: number;
      stack: number;
    } = {
        skipChance: 0.3,
        duration: duration,
        stack: stack,
      },
  ) {
    super(
      'Paralysis',
      'Chance to make target unable to act',
      STATUS_EFFECTS.PARALYSIS,
      entity,
      stack,
      duration,
      isBeneficial,
      baseEffect,
      effectSnapshot,
    );
  }

  override apply(target: GameEntityType): void {
    // 30% Skip turn action based on snapshot
  }

  override expire(): void {
    this.effectSnapshot = {
      ...this.baseEffect,
    };
  }
}
