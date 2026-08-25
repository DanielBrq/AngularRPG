import { clamp } from '@app/shared/utils';
import { BaseStats, CharacterEntity, FoeEntity, BattleStats } from "@app/core/entities";

export type GameEntityType = CharacterEntity | FoeEntity

export abstract class GameEntity {
  constructor(
    protected readonly _id: string,
    protected readonly _name: string,
    protected _isAlive: boolean = true,
    protected _currentLvl: number,

    protected _baseStats: BaseStats,
    protected _battleStats: BattleStats,
  ) { }

  protected attack(): void { }

  public get baseStats(): BaseStats { return this._baseStats }

  public get battleStats(): BattleStats { return this._battleStats }

  protected hasEnoughMP(cost: number): boolean { return this._battleStats.mp >= cost }

  public takeDamage(incomingDmg: number): void {
    if (this.isPositiveValue(incomingDmg)) throw new Error('Value must be negative');

    if (this._isAlive && incomingDmg >= this._battleStats.hp) {
      this._isAlive = false;
    } else if (this._isAlive && incomingDmg < this._battleStats.hp) {
      this._battleStats.hp = clamp(this._battleStats.hp + incomingDmg, this._battleStats.maxHp);
    }
  }

  private isPositiveValue(amount: number): boolean { return (amount > 0) }

  public hpRecover(amount: number): void {
    if (!this.isPositiveValue(amount)) throw new Error('Value must be positive');
    if (this._isAlive) {
      this.battleStats.hp = clamp(this._battleStats.hp + amount, this._battleStats.maxHp);
    }
  }

  public mpRecover(amount: number): void {
    if (this._isAlive && !this.isPositiveValue(amount)) throw new Error('Value must be positive');
  }

}
