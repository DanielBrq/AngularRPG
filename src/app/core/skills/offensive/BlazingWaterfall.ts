import { Skill } from '@app/core/skills/Skill';
import { GameEntityType } from '@app/core/entities';
import { SKILL } from '@app/shared/types';

export class BlazingWaterfallSkill extends Skill {
  constructor(
    target: GameEntityType,
    skillOwner: GameEntityType,
    maxBoostLevel: number = 3,
    baseMpCost: number = 0,
    skillMultiplier: number = 1,
  ) {
    super(
      'Blazing Waterfall',
      'Deals magic damage.',
      target,
      skillOwner,
      SKILL.OFENSIVE,
      [],
      maxBoostLevel,
      baseMpCost,
      skillMultiplier,
    );
  }

  public override execute(): void { }
}
