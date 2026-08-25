import { SkillType } from '@app/shared/types';
// TODO: Finish skills feature 
export abstract class Skill {
  constructor(
    public readonly name: string,
    protected executorId: string,
    protected targetId: string,
    protected skillType: SkillType,
    protected readonly _maxBoostLevel: number = 3,
    protected readonly _basePotency: number,
    protected _baseMpCost: number,
    protected _currentBoostLevel: number = 0,
    protected duration?: number | null,
  ) { }

  protected skillBoost(boostLevel: number): void {
    if (boostLevel > this._maxBoostLevel) throw new Error('Skill cannot be boosted further');
    this._currentBoostLevel = boostLevel;
  }

  protected resetBoost(): void {
    this._currentBoostLevel = 0;
  }

  protected get potency(): number {
    return this._basePotency * this._currentBoostLevel;
  }

  protected get mpCost(): number {
    return this._baseMpCost * (this._currentBoostLevel * 0.25);
  }

  public execute(): void {
    //IF boost, apply boost
  }
}
