import { Skill, BP } from '@app/core/skills/Skill';
import { GameEntityType } from '@app/core/entities';
import { CharactersMetadata, SKILL } from '@app/shared/types';
import { WaterDominionEffect } from '@app/core/effects';

export class WaterDominion extends Skill {
  private readonly _effectInstance: WaterDominionEffect;

  constructor(
    target: GameEntityType,
    skillOwner: GameEntityType,
    duration: number = 5,
    coldDmgBonus: number = 0.6,
    heatResistanceBonus: number = 0.3,
    maxBoostLevel: number = 2,
    baseMpCost: number = 0,
    skillMultiplier: number = 1,
  ) {
    const effect = new WaterDominionEffect(target, duration, 1, {
      coldDmgBonus,
      heatResistanceBonus,
      duration,
    });
    super(
      'Water Dominion',
      `Grant self the ability to exploit cold weakness with any attack (based on Physical Damage). \n
      Raise Cold Damage (+60%), Heat Resistance (+30%). \n
      Raise self Physical Damage based on speed (+12% per 100 Speed points).\n
      (5 turns).`,
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

  // TODO: Feature that exploit extra weakness points solution - Generic solution.

  public override getDescription(efficiencyBP: number = 0, strengthBP: number = 0, speedBP: number = 0): string {
    const boost = this.previewSkillBoostResult(efficiencyBP, strengthBP, speedBP);
    return `Raise Cold Damage (+60%), Heat Resistance (+30%), and Physical Damage based on speed (+12% per 100 Speed points) (5 turns).
      Mp cost: ${this._baseMpCost * boost.mpCostMultiplier}`;
  }

  public override execute(target: GameEntityType, bp?: BP): void {
    this.preventDeadTarget(target);
    if (this._skillOwner.getId !== CharactersMetadata.SURVIVOR.id) {
      throw new Error('Water Dominion can only be applied by the Survivor.');
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
