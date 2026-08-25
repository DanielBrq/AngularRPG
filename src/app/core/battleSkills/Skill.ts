import { SkillType } from '@app/shared/types';
import { GameEntityType } from '@app/core/entities';
// TODO: Finish skills feature 
export abstract class Skill {
  constructor(
    public readonly _name: string,
    protected _target: GameEntityType,
    protected _skillType: SkillType,
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
