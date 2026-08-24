import { clamp } from '@app/shared/utils';
import { BaseStats, BuildStats, DynamicsStats } from "@app/core/entities/gameEntity";
import { ModifierEffect } from '@app/core/effects/ModifierEffect';

export abstract class GameEntity {
  constructor(
    protected readonly _id: string,
    protected readonly _name: string,
    protected _isAlive: boolean = true,
    protected _currentLvl: number,

    protected _baseStats: BaseStats,
    protected _dynamicStats: DynamicsStats,

  ) { }

  protected attack(): void { }

  public get baseStats(): BaseStats {
    return this._baseStats;
  }

  public get dynamicStats(): DynamicsStats {
    return this._dynamicStats;
  }




  /*
    useSkill(mpCost: number): void {
      if (!this.hasEnoughMP(mpCost)) throw new Error('Not enough magic points');
      this._mp -= mpCost;
    }
  
    public takeDamage(amount: number): void {
      if (this.isPositiveValue(amount)) throw new Error('Value must be negative');
      if (this._isAlive && amount >= this._hp) {
        this._isAlive = false;
      } else if (this._isAlive && amount < this._hp) {
        this._hp = clamp(this._hp + amount, this._maxHp);
      }
    }
  
    public heal(amount: number): void {
      if (!this.isPositiveValue(amount)) throw new Error('Value must be positive');
      if (this._isAlive && amount < this._hp) {
        this._hp = clamp(this._hp + amount, this._maxHp);
      }
    }
  
    public mpRecover(amount: number): void {
      if (this._isAlive && !this.isPositiveValue(amount)) throw new Error('Value must be positive');
    }
  
    private isPositiveValue(amount: number): boolean { return (amount > 0) }
  
    private hasEnoughMP(cost: number): boolean {
      return this._mp >= cost;
    }
      */
}
