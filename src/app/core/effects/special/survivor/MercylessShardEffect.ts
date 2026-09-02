import { Effect } from '@app/core/effects/Effect';
import { GameEntityType } from '@app/core/entities';
import { SPECIAL_EFFECTS } from '@app/shared/types';

export class MercylessShardEffect extends Effect {
  constructor(
    target: GameEntityType,
    duration: number = 5,
    stack: number = 1,
    public override readonly baseEffect: {
      physAtkBonus: number;
      duration: number;
    } = {
        physAtkBonus: 1.0,
        duration: 5,
      },
    public override effectSnapshot: {
      physAtkBonus: number;
      duration: number;
    } = {
        physAtkBonus: 1.0,
        duration: 5,
      },
  ) {
    super(
      'Mercyless Shard',
      'Raise Physical Damage (+100%).',
      SPECIAL_EFFECTS.MERCYLESS_SHARD,
      target,
      stack,
      duration,
      true,
      baseEffect,
      effectSnapshot,
    );
  }

  override apply(target: GameEntityType): void {
    target.getBattleStats.physAtk += this.effectSnapshot.physAtkBonus;
  }

  override expire(): void {
    this._target.getBattleStats.physAtk -= this.effectSnapshot.physAtkBonus;

    this.effectSnapshot = {
      ...this.baseEffect,
    };
  }
}
