import { SkillType } from '@app/shared/types';
import { CharacterEntity, FoeEntity, GameEntityType } from '@app/core/entities';
// TODO: Finish skills feature 
export abstract class Skill {
  constructor(
    protected readonly _name: string,
    protected readonly _description: string,
    protected _target: GameEntityType,
    protected _skillType: SkillType,
    protected _maxBoostLevel: number = 2,
    protected _baseMpCost: number = 0,
    protected _basePotency: number = 1,
    protected _currentBoostLevel: number = 1,
  ) { }

  protected execute(target: GameEntityType): void {
    //IF boost, apply boost
  }

  protected isNegativeValue(value: number): boolean {
    if (value < 0) throw new Error('Value must be positive');
    return value < 0;
  }

  private preventCharacterTarget(target: GameEntityType): void {
    if (target instanceof CharacterEntity) throw new Error('Self attack is not allowed');
  }

  private preventDeadTarget(target: GameEntityType): void {
    if (target.isAlive === false) throw new Error('Target is dead');
  }

  private preventFoeTarget(target: GameEntityType): void {
    if (target instanceof FoeEntity) throw new Error('Target is a foe');
  }

}
