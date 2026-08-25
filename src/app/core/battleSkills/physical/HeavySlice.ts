import { Skill } from '@app/core/battleSkills/Skill';
import { SKILL } from '@app/shared/types';

export class HeavySliceSkill extends Skill {
  constructor(
    name: string,
    executorId: string,
    targetId: string,
    skillType: typeof SKILL.PHYSICAL,
    _maxBoostLevel: number,
    _baseMpCost: number,
    _basePotency: number,
    _currentBoostLevel: number = 1,
  ) {
    super(
      name,
      executorId,
      targetId,
      skillType,
      _maxBoostLevel,
      _baseMpCost,
      _basePotency,
      _currentBoostLevel,
    );
  }

  public override execute(): void {}
}
