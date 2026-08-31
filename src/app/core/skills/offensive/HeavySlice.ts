import { Skill, BP } from '@app/core/skills/Skill';
import { CharacterEntity, FoeEntity, GameEntityType } from '@app/core/entities';
import { SKILL } from '@app/shared/types';
import { DAMAGE } from '@app/shared/types';

export class HeavySliceSkill extends Skill {
  constructor(
    target: GameEntityType,
    skillOwner: GameEntityType,
    maxBoostLevel: number = 3,
    baseMpCost: number = 50,
    skillMultiplier: number = 1,
  ) {
    super(
      'Heavy Slice',
      'Deals physical damage to a single target.',
      target,
      skillOwner,
      SKILL.OFENSIVE,
      maxBoostLevel,
      baseMpCost,
      skillMultiplier,
    );
  }

  public override getDescription(efficiencyBP: number = 0, strengthBP: number = 0, speedBP: number = 0): string {
    const { mpCostMultiplier, skillMultiplier, speedMultiplier } =
      this.previewSkillBoostResult(efficiencyBP, strengthBP, speedBP);
    return `Deals physical damage to a single target.
      Mp cost: ${this._baseMpCost * mpCostMultiplier}
      Skill multiplier: ${skillMultiplier * 100}%
      Speed multiplier: ${speedMultiplier * 100}%`;
  }

  public override execute(target: GameEntityType, bp?: BP): void {
    this.preventDeadTarget(target);
    if (target instanceof CharacterEntity) {
      this.preventCharacterTarget(target);
    } else {
      this.preventFoeTarget(target);
    }

    const boost = bp
      ? this.previewSkillBoostResult(bp.efficiency, bp.strength, bp.speed)
      : { mpCostMultiplier: 1, skillMultiplier: 1, speedMultiplier: 1 };

    const finalMpCost = this._baseMpCost * boost.mpCostMultiplier;
    if (this._skillOwner.getBattleStats.mp < finalMpCost) throw new Error('Not enough MP');
    this._skillOwner.getBattleStats.mp -= finalMpCost;

    // Temporary stat boosts for attack execution
    this._skillOwner.getBattleStats.physAtk *= boost.skillMultiplier;
    this._skillOwner.getBattleStats.speed *= boost.speedMultiplier;

    try {
      this._skillOwner.attack(target, DAMAGE.SWORD, this._skillMultiplier);
    } finally {
      this._skillOwner.getBattleStats.physAtk /= boost.skillMultiplier;
      this._skillOwner.getBattleStats.speed /= boost.speedMultiplier;
    }
  }
}


