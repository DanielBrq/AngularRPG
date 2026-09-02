import { Skill, BP } from '@app/core/skills/Skill';
import { GameEntityType } from '@app/core/entities';
import { CharactersMetadata, SKILL } from '@app/shared/types';
import { SurvivalInstinctEffect } from '@app/core/effects';

export class SurvivalInstinct extends Skill {
  private readonly _effectInstance: SurvivalInstinctEffect;

  constructor(
    target: GameEntityType,
    skillOwner: GameEntityType,
    duration: number = 1,
    physAtkBonus: number = 0.5,
    critChanceBonus: number = 1.5,
    critDmgBonus: number = 0.3,
    speedBonus: number = 0.4,
    maxBoostLevel: number = 2,
    baseMpCost: number = 0,
    skillMultiplier: number = 1,
  ) {
    const effect = new SurvivalInstinctEffect(target, duration, 1, {
      physAtkBonus,
      critChanceBonus,
      critDmgBonus,
      speedBonus,
      duration,
    });
    super(
      'Survival Instinct',
      `Increase self Physical Damage (50%), Critical Chance (150%), \nCritical Damage (30%) and Speed (40%) \nwhile HP is lower than 25%`,
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
    return `Increase self Physical Damage (50%), Critical Chance (150%), Critical Damage (30%) and Speed (40%) while HP is lower than 25%.
      Mp cost: ${this._baseMpCost * boost.mpCostMultiplier}`;
  }

  public override execute(target: GameEntityType, bp?: BP): void {
    this.preventDeadTarget(target);
    if (this._skillOwner.getId !== CharactersMetadata.SURVIVOR.id) {
      throw new Error('Survival Instinct can only be applied by the Survivor.');
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
