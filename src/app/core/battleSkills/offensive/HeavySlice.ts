import { Skill } from '@app/core/battleSkills/';
import { GameEntityType } from '@app/core/entities';
import { SKILL } from '@app/shared/types';
import { i18nTranslation } from '@app/shared/i18n/i18n';

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

  // ponytail: flat potency * physAtk, real dmg formula lives in GameEntity's TODO calculator
  public override execute(target: GameEntityType): void {
    const dmg = Math.round(this._basePotency * target.battleStats.physAtk);
    target.takeDamage(-dmg);
  }

  public getName(): string { return i18nTranslation('skills.offensive.common.heavySlice.name', {}); }
  public getDescription(): string { return i18nTranslation('skills.offensive.common.heavySlice.description', {}); }
}
