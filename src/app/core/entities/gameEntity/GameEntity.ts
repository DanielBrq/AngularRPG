import { BaseStats, CharacterEntity, FoeEntity, BattleStats, DamageWeaknessData } from "@app/core/entities";
import { Randomizer, clamp } from '@app/shared/utils';
import { Skill } from '@app/core/skills';
import { Effect } from "@app/core/effects/Effect";
import { DamageCalculator } from '@app/core/combat';
import { DamageType } from '@app/shared/types/';

export type GameEntityType = CharacterEntity | FoeEntity

export abstract class GameEntity {
  constructor(
    protected readonly _id: string,
    protected readonly _name: string,
    protected _isAlive: boolean = true,
    protected _currentLvl: number,

    protected _baseStats: BaseStats,
    protected _battleStats: BattleStats,

    protected _skills: Skill[] = [],
    protected _effects: Effect[],
    protected _damageData: DamageWeaknessData
  ) { }

  //#region getters
  public get getId(): string { return this._id }
  public get getBaseStats(): BaseStats { return this._baseStats }
  public get getBattleStats(): BattleStats { return this._battleStats }
  public get getEntityEffects(): Effect[] { return this._effects }
  public get isAlive(): boolean { return this._isAlive }
  //#endregion

  public set setEntityEffects(incomingEffect: Effect) {
    const existingEffect = this._effects.find(e => e.getEffect === incomingEffect.getEffect);
    if (existingEffect) {
      const stackable = incomingEffect;

      // TODO: 

    } else {
      this._effects.push(incomingEffect);
    }
  }

  protected attack(target: GameEntity, damageBasedOn: DamageType, skillMultiplier?: number): void {
    const total: number = DamageCalculator.calcDmg(this, target, damageBasedOn, skillMultiplier,);
    target.takeDamage(total);

    // Clamp(totalDmg, dmgLimit)
  }

  public attackRandomTarget(target: GameEntity[], damageBasedOn: DamageType, skillMultiplier?: number): void {
    const targetIndex = Randomizer.integerFromRange(0, target.length - 1);
    this.attack(target[targetIndex], damageBasedOn, skillMultiplier);
  }

  public attackAll(target: GameEntity[], damageBasedOn: DamageType, skillMultiplier?: number): void {
    // Character attacks group of foes, or foes attacks group of characterrs
    target.forEach(entity => this.attack(entity, damageBasedOn, skillMultiplier));
  }

  public get getDamageData(): DamageWeaknessData { return this._damageData }

  public takeDamage(incomingDmg: number): void {
    if (!this.isPositiveValue(incomingDmg)) throw new Error('Value must be positive');

    if (this._isAlive && incomingDmg >= this._battleStats.hp) {
      this._isAlive = false;
    } else if (this._isAlive && incomingDmg < this._battleStats.hp) {
      this._battleStats.hp = clamp(this._battleStats.hp + incomingDmg, this._battleStats.maxHp);
    }
  }

  public hpRecover(amount: number): void {
    if (!this.isPositiveValue(amount)) throw new Error('Value must be positive');
    if (this._isAlive) {
      this.getBattleStats.hp = clamp(this._battleStats.hp + amount, this._battleStats.maxHp);
    }
  }

  public mpRecover(amount: number): void {
    if (this._isAlive && !this.isPositiveValue(amount)) throw new Error('Value must be positive');
  }

  // Validators
  protected hasEnoughMP(cost: number): boolean { return this._battleStats.mp >= cost }

  protected isPositiveValue(amount: number): boolean { return (amount > 0) }


}
