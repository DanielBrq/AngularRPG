import { SkillType } from '@app/shared/types';
import { GameEntityType } from '@app/core/entities';
// TODO: Finish skills feature 
export abstract class Skill {
  constructor(
    protected readonly _name: string,
    protected readonly _description: string,
    protected _target: GameEntityType,
    protected _skillType: SkillType,
    protected _maxBoostLevel: number = 7,
    protected _baseMpCost: number = 0,
    protected _basePotency: number = 1,
    protected _currentBoostLevel: number = 1,
  ) { }

  protected execute(target: GameEntityType): void {
    //IF boost, apply boost
  }

  // validators
  protected isNegativeValue(value: number): boolean {
    if (value < 0) throw new Error('Value must be positive');
    return value < 0;
  }

}
