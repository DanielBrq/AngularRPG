import { BaseStats, CharacterEntity, FoeEntity, BattleStats, DamageWeaknessData } from "@src/app/core_old/entities";
import { Randomizer, assertPositive, clamp } from '@src/app/shared/utils';
import { Skill } from '@src/app/core_old/skills';
import { Effect } from "@src/app/core_old/effects/Effect";
import { DamageCalculator } from '@src/app/core_old/combat';
import { DamageType, ELEMENTAL_DAMAGE, PHYSICAL_DAMAGE } from '@src/app/shared/types/';


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
    protected _effects: Effect[] = [],
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

  public attack(target: GameEntity, damageBasedOn: DamageType, skillMultiplier?: number): void {
    const result: { damage: number, criticalTier: number, exploitedWeakness: DamageType[] } = DamageCalculator.calcDmg(this, target, damageBasedOn, skillMultiplier,);

    // TODO: publish result on event to show it in HUD

    target.takeDamage(result.damage);
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
    assertPositive(incomingDmg);

    if (this._isAlive && incomingDmg >= this._battleStats.hp) {
      this._isAlive = false;
    } else if (this._isAlive && incomingDmg < this._battleStats.hp) {
      this._battleStats.hp = clamp(this._battleStats.hp + incomingDmg, this._battleStats.maxHp);
    }
  }

  public hpRecover(amount: number): void {
    assertPositive(amount);
    if (this._isAlive) {
      this.getBattleStats.hp = clamp(this._battleStats.hp + amount, this._battleStats.maxHp);
    }
  }

  public mpRecover(amount: number): void {
    if (this._isAlive) assertPositive(amount);
  }

  // Validators
  protected hasEnoughMP(cost: number): boolean { return this._battleStats.mp >= cost }


  public addResistance(value: number, resistanceType: DamageType): void {
    assertPositive(value);
    switch (resistanceType) {
      case ELEMENTAL_DAMAGE.HEAT: {
        this._battleStats.heatResistance += value;
        break;
      }
      case ELEMENTAL_DAMAGE.COLD: {
        this._battleStats.coldResistance += value;
        break;
      }
      case ELEMENTAL_DAMAGE.LIGHTNING: {
        this._battleStats.lightningResistance += value;
        break;
      }
      case ELEMENTAL_DAMAGE.TOXIN: {
        this._battleStats.toxinResistance += value;
        break;
      }
      case ELEMENTAL_DAMAGE.DARK: {
        this._battleStats.darkResistance += value;
        break;
      }
      case ELEMENTAL_DAMAGE.LIGHT: {
        this._battleStats.lightResistance -= value;
        break;
      }
      default: {
        throw new Error('Invalid resistance type');
      }
    }

  }

  public addDamageType(value: number, damageType: DamageType): void {
    assertPositive(value);
    switch (damageType) {
      case ELEMENTAL_DAMAGE.HEAT: {
        this._battleStats.heatDmg += value;
        break;
      }
      case ELEMENTAL_DAMAGE.COLD: {
        this._battleStats.coldDmg += value;
        break;
      }
      case ELEMENTAL_DAMAGE.LIGHTNING: {
        this._battleStats.lightningDmg += value;
        break;
      }
      case ELEMENTAL_DAMAGE.TOXIN: {
        this._battleStats.toxinDmg += value;
        break;
      }
      case ELEMENTAL_DAMAGE.DARK: {
        this._battleStats.darkDmg += value;
        break;
      }
      case ELEMENTAL_DAMAGE.LIGHT: {
        this._battleStats.lightDmg -= value;
        break;
      }
      default: {
        throw new Error('Invalid resistance type');
      }
    }
  }

  public removeResistance(value: number, resistanceType: DamageType): void {
    assertPositive(value);
    switch (resistanceType) {
      case ELEMENTAL_DAMAGE.HEAT: {
        this._battleStats.heatResistance -= value;
        break;
      }
      case ELEMENTAL_DAMAGE.COLD: {
        this._battleStats.coldResistance -= value;
        break;
      }
      case ELEMENTAL_DAMAGE.LIGHTNING: {
        this._battleStats.lightningResistance -= value;
        break;
      }
      case ELEMENTAL_DAMAGE.TOXIN: {
        this._battleStats.toxinResistance -= value;
        break;
      }
      case ELEMENTAL_DAMAGE.DARK: {
        this._battleStats.darkResistance -= value;
        break;
      }
      case ELEMENTAL_DAMAGE.LIGHT: {
        this._battleStats.lightResistance -= value;
        break;
      }
      default: {
        throw new Error('Invalid resistance type');
      }
    }

  }

  public removeDamageType(value: number, damageType: DamageType): void {
    assertPositive(value);
    switch (damageType) {
      case ELEMENTAL_DAMAGE.HEAT: {
        this._battleStats.heatDmg -= value;
        break;
      }
      case ELEMENTAL_DAMAGE.COLD: {
        this._battleStats.coldDmg -= value;
        break;
      }
      case ELEMENTAL_DAMAGE.LIGHTNING: {
        this._battleStats.lightningDmg -= value;
        break;
      }
      case ELEMENTAL_DAMAGE.TOXIN: {
        this._battleStats.toxinDmg -= value;
        break;
      }
      case ELEMENTAL_DAMAGE.DARK: {
        this._battleStats.darkDmg -= value;
        break;
      }
      case ELEMENTAL_DAMAGE.LIGHT: {
        this._battleStats.lightDmg -= value;
        break;
      }
      default: {
        throw new Error('Invalid resistance type');
      }
    }
  }

}
