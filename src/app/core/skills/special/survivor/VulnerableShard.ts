import { Skill, BP } from '@app/core/skills/Skill';
import { GameEntityType } from '@app/core/entities';
import { CharactersMetadata, SKILL } from '@app/shared/types';
import { VulnerableShardEffect } from '@app/core/effects';

export class VulnerableShard extends Skill {
  private readonly _effectInstance: VulnerableShardEffect;

  constructor(
    target: GameEntityType,
    skillOwner: GameEntityType,
    duration: number = 5,
    physDefPenalty: number = 0.4,
    magDefPenalty: number = 0.4,
    speedBonus: number = 1.2,
    maxBoostLevel: number = 2,
    baseMpCost: number = 0,
    skillMultiplier: number = 1,
  ) {
    const effect = new VulnerableShardEffect(target, duration, 1, {
      physDefPenalty,
      magDefPenalty,
      speedBonus,
      duration,
    });
    super(
      'Vulnerable Shard',
      'Lower self Physical and Magic Defence (-40%) and raise Speed (+120%) (5 turns).',
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
    return `Lower self Physical and Magic Defence (-40%) and raise Speed (+120%) (5 turns).
      Mp cost: ${this._baseMpCost * boost.mpCostMultiplier}`;
  }

  public override execute(target: GameEntityType, bp?: BP): void {
    this.preventDeadTarget(target);
    if (this._skillOwner.getId !== CharactersMetadata.SURVIVOR.id) {
      throw new Error('Vulnerable Shard can only be applied by the Survivor.');
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
