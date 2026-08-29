import { Skill } from '@app/core/skills/Skill';
import { GameEntityType } from '@app/core/entities';
import { SKILL } from '@app/shared/types';

export class BlazingWaterfallSkill extends Skill {
  constructor(
    target: GameEntityType,
    baseMpCost: number = 0,
    basePotency: number = 1,
    maxBoostLevel: number = 3,
    currentBoostLevel: number = 1,
  ) {
    super(
      'Blazing Waterfall',
      'Deals magic damage.',
      target,
      SKILL.OFENSIVE,
      maxBoostLevel,
      baseMpCost,
      basePotency,
      currentBoostLevel,
    );
  }

  public override execute(): void { }
}
