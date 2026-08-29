import { Skill } from '@app/core/skills/Skill';
import { GameEntityType } from '@app/core/entities';
import { SKILL } from '@app/shared/types';

export class HeavySliceSkill extends Skill {
  constructor(
    target: GameEntityType,
    baseMpCost: number = 0,
    basePotency: number = 1,
    maxBoostLevel: number = 3,
    currentBoostLevel: number = 1,
  ) {
    super(
      'Heavy Slice',
      'Deals physical damage.',
      target,
      SKILL.OFENSIVE,
      maxBoostLevel,
      baseMpCost,
      basePotency,
      currentBoostLevel,
    );
  }

  // ponytail: flat potency * physAtk, real dmg formula lives in GameEntity's TODO: calculator
  public override execute(target: GameEntityType): void {
    const dmg = Math.round(this._basePotency * target.getBattleStats.physAtk);
    target.takeDamage(-dmg);
  }
}
