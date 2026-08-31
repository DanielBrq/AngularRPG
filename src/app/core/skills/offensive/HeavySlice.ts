import { Skill, BP } from '@app/core/skills/Skill';
import { FoeEntity, GameEntityType } from '@app/core/entities';
import { SKILL } from '@app/shared/types';
import { DAMAGE } from '@app/shared/types';

export class HeavySliceSkill extends Skill {
  constructor(
    target: GameEntityType,
    skillOwner: GameEntityType,
    speed: number = 10,
    maxBoostLevel: number = 3,
    baseMpCostOriginal: number = 50,
    skillMultiplierOriginal: number = 1,
    currentBoostLevelOriginal: number = 1,
    baseMpCost: number = 50,
    skillMultiplier: number = 1,
  ) {
    super(
      'Heavy Slice',
      'Deals physical damage to a single target.',
      target,
      skillOwner,
      speed,
      SKILL.OFENSIVE,
      maxBoostLevel,
      baseMpCostOriginal,
      skillMultiplierOriginal,
      currentBoostLevelOriginal,
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
    if (target instanceof FoeEntity) { this.preventFoeTarget(target) }
    else { this.preventCharacterTarget(target); }

    let mpCostMultiplier = 1;
    let skillMultiplier = 1;
    let speedMultiplier = 1;

    if (bp) {
      const { mpCostMultiplier, skillMultiplier, speedMultiplier } =
        this.previewSkillBoostResult(bp.efficiency, bp.strength, bp.speed);

      //Skill mutations
      this._skillOwner.getBattleStats.physAtk *= skillMultiplier;
      this._skillOwner.getBattleStats.speed *= speedMultiplier;
      this._baseMpCost *= mpCostMultiplier;
    }

    //Execute skill
    target.attack(target, DAMAGE.SWORD, this._skillMultiplier);

    // Reset stats
    if (bp) {
      this._skillOwner.getBattleStats.physAtk *= (skillMultiplier * - 1);
      this._skillOwner.getBattleStats.speed *= (speedMultiplier * - 1);
      this._baseMpCost *= (mpCostMultiplier * - 1);
      this.resetSkillBoost();
    }
  }

  public resetSkillBoost(): void {
    this._baseMpCost = this._baseMpCostOriginal;
    this._skillMultiplier = this._skillMultiplierOriginal;
  }
}

