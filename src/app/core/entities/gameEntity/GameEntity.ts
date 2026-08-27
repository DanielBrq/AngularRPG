import { clamp } from '@app/shared/utils';
import { BaseStats, CharacterEntity, FoeEntity, BattleStats } from "@app/core/entities";
import { randomIntegerFromRange } from '@app/shared/utils/Randomizer';
import { Skill } from '@app/core/battleSkills/Skill';
import { Effect, EffectType } from "@app/core/effects/Effect";

export type GameEntityType = CharacterEntity | FoeEntity

export abstract class GameEntity {
  constructor(
    protected readonly _id: string,
    protected readonly _name: string,
    protected _isAlive: boolean = true,
    protected _currentLvl: number,

    protected _baseStats: BaseStats,
    protected _battleStats: BattleStats,

    protected skills: Skill[] = [],
    protected _effects: Effect[],

  ) { }

  //#region getters
  public get baseStats(): BaseStats { return this._baseStats }
  public get battleStats(): BattleStats { return this._battleStats }
  public get setEntityEffects(): Effect[] { return this._effects }
  public get isAlive() { return this._isAlive }
  //#endregion


  // Setter
  public set setEntityEffects(incomingEffect: Effect) {
    const existingEffect = this._effects.find(e => e.getEffect === incomingEffect.getEffect);
    if (existingEffect) {
      const stackable = incomingEffect;



    } else {
      this._effects.push(incomingEffect);
    }
  }

  // Actions
  protected attack(target: GameEntity): void {
    target.takeDamage(1)// TODO: DMG calculator
  }

  private attackRandomTarget(target: GameEntity[]): void {
    const targetIndex = randomIntegerFromRange(0, target.length - 1);
    this.attack(target[targetIndex]);
  }

  private attackAll(target: GameEntity[]): void {
    target.forEach(entity => this.attack(entity));
  }

  public takeDamage(incomingDmg: number): void {
    if (this.isPositiveValue(incomingDmg)) throw new Error('Value must be negative');

    if (this._isAlive && incomingDmg >= this._battleStats.hp) {
      this._isAlive = false;
    } else if (this._isAlive && incomingDmg < this._battleStats.hp) {
      this._battleStats.hp = clamp(this._battleStats.hp + incomingDmg, this._battleStats.maxHp);
    }
  }

  public hpRecover(amount: number): void {
    if (!this.isPositiveValue(amount)) throw new Error('Value must be positive');
    if (this._isAlive) {
      this.battleStats.hp = clamp(this._battleStats.hp + amount, this._battleStats.maxHp);
    }
  }

  public mpRecover(amount: number): void {
    if (this._isAlive && !this.isPositiveValue(amount)) throw new Error('Value must be positive');
  }

  // Validators
  protected hasEnoughMP(cost: number): boolean { return this._battleStats.mp >= cost }

  private isPositiveValue(amount: number): boolean { return (amount > 0) }


}
