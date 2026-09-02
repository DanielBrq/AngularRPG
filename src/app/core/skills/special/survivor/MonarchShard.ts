import { Skill, BP } from '@src/app/core/skills/Skill';
import { GameEntityType } from '@src/app/core/entities';
import { CharactersMetadata, SKILL } from '@src/app/shared/types';
import { MonarchShardEffect } from '@src/app/core/effects';

export class MonarchShard extends Skill {
  private readonly _effectInstance: MonarchShardEffect;

  constructor(
    target: GameEntityType,
    skillOwner: GameEntityType,
    duration: number = 5,
    allStatsBonus: number = 0.2,
    maxBoostLevel: number = 2,
    baseMpCost: number = 0,
    skillMultiplier: number = 1,
  ) {
    const effect = new MonarchShardEffect(target, duration, 1, {
      allStatsBonus,
      duration,
    });
    super(
      'Monarch Shard',
      'Raise all party members stats (+20%) (5 turns).',
      target,
      skillOwner,
      SKILL.SPECIAL,
      [effect],
      maxBoostLevel,
      baseMpCost,
      skillMultiplier,
    );
    this._effectInstance = effect;
  }

  public override getDescription(efficiencyBP: number = 0, strengthBP: number = 0, speedBP: number = 0): string {
    const boost = this.previewSkillBoostResult(efficiencyBP, strengthBP, speedBP);
    return `Raise all party members stats (+20%) (5 turns).
      Mp cost: ${this._baseMpCost * boost.mpCostMultiplier}`;
  }

  public override execute(target: GameEntityType, bp?: BP): void {
    this.preventDeadTarget(target);
    if (this._skillOwner.getId !== CharactersMetadata.SURVIVOR.id) {
      throw new Error('Monarch Shard can only be applied by the Survivor.');
    }

    const boost = bp
      ? this.previewSkillBoostResult(bp.efficiency, bp.strength, bp.speed)
      : { mpCostMultiplier: 1, skillMultiplier: 1, speedMultiplier: 1 };

    const finalMpCost = this._baseMpCost * boost.mpCostMultiplier;
    if (this._skillOwner.getBattleStats.mp < finalMpCost) throw new Error('Not enough MP');
    this._skillOwner.getBattleStats.mp -= finalMpCost;

    target.setEntityEffects = this._effectInstance;
    this._effectInstance.apply(target);
  }
}
