import { Skill } from '@app/core/skills/Skill';
import { GameEntityType } from '@app/core/entities';
import { SKILL } from '@app/shared/types';

export class BlazingWaterfallSkill extends Skill {
  constructor(
    target: GameEntityType,
    skillOwner: GameEntityType,
    speed: number = 10,
    maxBoostLevel: number = 3,
    baseMpCostOriginal: number = 0,
    skillMultiplierOriginal: number = 1,
    currentBoostLevelOriginal: number = 1,
    baseMpCost: number = 0,
    skillMultiplier: number = 1,
    currentBoostLevel: number = 1,
  ) {
    super(
      'Blazing Waterfall',
      'Deals magic damage.',
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
      currentBoostLevel,
    );
  }

  public override execute(): void { }
}
