import { Effect } from '@app/core/effects/Effect';
import { GameEntityType } from '@app/core/entities';
import { SPECIAL_EFFECTS } from '@app/shared/types';

export class VulnerableShardEffect extends Effect {
  constructor(
    target: GameEntityType,
    duration: number = 5,
    stack: number = 1,
    public override readonly baseEffect: {
      physDefPenalty: number;
      magDefPenalty: number;
      speedBonus: number;
      duration: number;
    } = {
        physDefPenalty: 0.4,
        magDefPenalty: 0.4,
        speedBonus: 1.2,
        duration: 5,
      },
    public override effectSnapshot: {
      physDefPenalty: number;
      magDefPenalty: number;
      speedBonus: number;
      duration: number;
    } = {
        physDefPenalty: 0.4,
        magDefPenalty: 0.4,
        speedBonus: 1.2,
        duration: 5,
      },
  ) {
    super(
      'Vulnerable Shard',
      'Lower Physical and Magic Defence (-40%) and raise Speed (+120%).',
      SPECIAL_EFFECTS.VULNERABLE_SHARD,
      target,
      stack,
      duration,
      true,
      baseEffect,
      effectSnapshot,
    );
  }

  override apply(target: GameEntityType): void {
    target.getBattleStats.physDef -= this.effectSnapshot.physDefPenalty;
    target.getBattleStats.magDef -= this.effectSnapshot.magDefPenalty;
    target.getBattleStats.speed += this.effectSnapshot.speedBonus;
  }

  override expire(): void {
    this._target.getBattleStats.physDef += this.effectSnapshot.physDefPenalty;
    this._target.getBattleStats.magDef += this.effectSnapshot.magDefPenalty;
    this._target.getBattleStats.speed -= this.effectSnapshot.speedBonus;

    this.effectSnapshot = {
      ...this.baseEffect,
    };
  }
}
