import { SkillType } from '@app/shared/types';

export abstract class SkillModel {
  constructor(
    public readonly name: string,
    protected executorId: string,
    protected targetId: string,
    protected skillType: SkillType,
    protected readonly _maxBoostLevel: number,
    protected readonly _baseMpCost: number,
    protected readonly _basePotency: number,
    protected _currentBoostLevel: number = 1,
    protected duration?: number | null,
  ) {}

  protected skillBoost(boostLevel: number): void {
    if (boostLevel > this._maxBoostLevel) throw new Error('Skill cannot be boosted further');
    this._currentBoostLevel = boostLevel;
  }

  protected resetBoost(): void {
    this._currentBoostLevel = 1;
  }

  protected get potency(): number {
    return this._basePotency * this._currentBoostLevel;
  }

  protected get mpCost(): number {
    return this._baseMpCost * this._currentBoostLevel;
  }

  public execute(): void {
    //IF boost, apply boost
  }
}
