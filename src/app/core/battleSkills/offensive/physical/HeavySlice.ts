import { OfensiveSkill } from '@app/core/battleSkills/offensive/OfensiveSkill';
import { GameEntityType } from '@app/core/entities';
import { SKILL } from '@app/shared/types';

export class HeavySliceSkill extends OfensiveSkill {
  constructor(
    name: string,
    target: GameEntityType,
    skillType: typeof SKILL.OFENSIVE,
    _maxBoostLevel: number = 3,
    _baseMpCost: number = 0,
    _basePotency: number = 1,
    _currentBoostLevel: number = 1,
  ) {
    super(
      name,
      target,
      skillType,
      _baseMpCost,
      _basePotency,
      2,
      _maxBoostLevel,
      _currentBoostLevel,
    );
  }

  public override execute(): void {}
}
