import { Effect } from '@app/core/effects/Effect';
import { GameEntityType } from '@app/core/entities';
import { SPECIAL_EFFECTS } from '@app/shared/types';

export class IdealistShardEffect extends Effect {
  constructor(
    target: GameEntityType,
    duration: number = 3,
    stack: number = 1,
    private readonly _isSelfTarget: boolean = false,
    public override readonly baseEffect: {
      physDefPenalty: number;
      magDefPenalty: number;
      speedBonus: number;
      duration: number;
    } = {
        physDefPenalty: 0.5,
        magDefPenalty: 0.5,
        speedBonus: 2.5,
        duration: 3,
      },
    public override effectSnapshot: {
      physDefPenalty: number;
      magDefPenalty: number;
      speedBonus: number;
      duration: number;
    } = {
        physDefPenalty: 0.5,
        magDefPenalty: 0.5,
        speedBonus: 2.5,
        duration: 3,
      },
  ) {
    super(
      'Idealist Shard',
      'Raise all group members Speed (+150%) (5 turns).\nLower self Phys and Mag defense (-50%) (3 turns).',
      SPECIAL_EFFECTS.IDEALIST_SHARD,
      target,
      stack,
      duration,
      true,
      baseEffect,
      effectSnapshot,
    );
  }

  override apply(target: GameEntityType): void {
    if (this._isSelfTarget) {
      target.getBattleStats.physDef -= this.effectSnapshot.physDefPenalty;
      target.getBattleStats.magDef -= this.effectSnapshot.magDefPenalty;
    }
    target.getBattleStats.speed += this.effectSnapshot.speedBonus;
  }

  public applyBoost(efficiencyBP: number = 0, strengthBP: number = 0, speedBP: number = 0): void {
    this.effectSnapshot.physDefPenalty += efficiencyBP * 0.1;
    this.effectSnapshot.magDefPenalty += efficiencyBP * 0.1;
    this.effectSnapshot.speedBonus += speedBP * 0.1;
  }

  public getBaseEffects(): {
    physDefPenalty: number;
    magDefPenalty: number;
    speedBonus: number;
    duration: number;
    isSelfTarget: boolean;
  } {
    return {
      physDefPenalty: this.baseEffect.physDefPenalty,
      magDefPenalty: this.baseEffect.magDefPenalty,
      speedBonus: this.baseEffect.speedBonus,
      duration: this.baseEffect.duration,
      isSelfTarget: this._isSelfTarget,
    };
  }

  public override expire(): void {
    if (this._isSelfTarget) {
      this._target.getBattleStats.physDef += this.effectSnapshot.physDefPenalty;
      this._target.getBattleStats.magDef += this.effectSnapshot.magDefPenalty;
    }
    this._target.getBattleStats.speed -= this.effectSnapshot.speedBonus;

    // Reset snapshot
    this.effectSnapshot = {
      ...this.baseEffect,
    };
    this._duration = this.baseEffect.duration;
  }
}
