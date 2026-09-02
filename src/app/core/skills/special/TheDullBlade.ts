import { Skill, BP } from '@src/app/core/skills/Skill';
import { GameEntityType } from '@src/app/core/entities';
import { CharactersMetadata, SKILL } from '@src/app/shared/types';
import { TheDullBladeEffect } from '@src/app/core/effects';

export class TheDullBlade extends Skill {
  private readonly _effectInstance: TheDullBladeEffect;

  constructor(
    target: GameEntityType,
    skillOwner: GameEntityType,
    duration: number = 3,
    physDefPenalty: number = 0.6,
    magDefPenalty: number = 0.6,
    physAtkBonus: number = 0.8,
    critChanceBonus: number = 0.5,
    critDmgBonus: number = 0.3,
    speedBonus: number = 0.4,
    maxBoostLevel: number = 2,
    baseMpCost: number = 0,
    skillMultiplier: number = 1,
  ) {
    const effect = new TheDullBladeEffect(target, duration, 1, {
      physDefPenalty,
      magDefPenalty,
      physAtkBonus,
      critChanceBonus,
      critDmgBonus,
      speedBonus,
      duration,
    });
    super(
      'The Dull Blade',
      `Lower self Physical and Magic Defence (-60%). \nRaise self Physical Atk (+80%), Critical Prob (+50%), Critical Dmg (+30%), and Speed (+40%) \n(3 turns).`,
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
    return `Lower self Physical and Magic Defence (-60%). Raise self Physical Atk (+80%), Critical Prob (+50%), Critical Dmg (+30%), and Speed (+40%) (3 turns).
      Mp cost: ${this._baseMpCost * boost.mpCostMultiplier}`;
  }

  public override execute(target: GameEntityType, bp?: BP): void {
    this.preventDeadTarget(target);
    if (this._skillOwner.getId !== CharactersMetadata.WARRIOR.id) {
      throw new Error('The Dull Blade can only be applied by the Warrior.');
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
