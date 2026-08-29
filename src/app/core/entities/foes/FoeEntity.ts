import { BaseStats, GameEntity, BattleStats, DamageWeaknessData } from "@app/core/entities/gameEntity";
import { DamageType } from "@app/shared";
import { clamp } from "@app/shared/utils";

export class FoeEntity extends GameEntity {
  constructor(
    readonly id: string,
    readonly name: string,
    isAlive: boolean = true,
    currentLvl: number,
    baseStats: BaseStats,
    battleStats: BattleStats,
    protected _weakness: DamageType[],
    protected _maxPressurePoints: number = 100,
    protected _currentPressurePoints: number = 0,
    protected _pressureDamageReduction: number = 0.99,
    protected _presureBonusMultiplierDmg: number = 1,
    protected damageData: DamageWeaknessData,
  ) {
    super(
      id,
      name,
      isAlive,
      currentLvl,
      baseStats,
      battleStats,
      [],
      [],
      damageData,
    )
  }

  public override takeDamage(incomingDmg: number): void {
    if (!this.isPositiveValue(incomingDmg)) throw new Error('Value must be positive');

    this.updatePressureDmgBonusScaling();
    incomingDmg *= this._presureBonusMultiplierDmg;

    this.updatePressureDamageReduction();
    incomingDmg *= this._pressureDamageReduction;

    if (this._isAlive && incomingDmg >= this._battleStats.hp) {
      this._battleStats.hp = clamp(this._battleStats.hp - incomingDmg, this._battleStats.maxHp);
      this._isAlive = false;

    } else if (this._isAlive && incomingDmg < this._battleStats.hp) {
      this._battleStats.hp = clamp(this._battleStats.hp - incomingDmg, this._battleStats.maxHp);

    } else if (!this._isAlive) {
      throw new Error("The entity is already dead");
    }
  }

  private set Weakness(w: DamageType) {
    if (this._weakness.find((e) => e === w)) throw new Error("The entity already has this weakness");
    this._weakness.push(w)
  }

  private removeWeakness(w: DamageType) {
    const index = this._weakness.indexOf(w);
    if (index === -1) throw new Error("The entity does not have this weakness");
    this._weakness.splice(index, 1);
  }

  public get getWeakness(): DamageType[] {
    return this._weakness;
  }

  public hasWeakness(w: DamageType): boolean {
    if (this._weakness.find((e) => e === w)) return true
    return false
  }

  private updatePressureDamageReduction(): void {
    if (this._currentPressurePoints <= this._maxPressurePoints) {
      const updatedReduction = (this._maxPressurePoints - this._currentPressurePoints) / 100;
      this._pressureDamageReduction = updatedReduction;
    } else {
      this._pressureDamageReduction = 0.99;
    }
  }

  public resetPressure(): void {
    if (this._currentPressurePoints >= this._maxPressurePoints) {
      this._currentPressurePoints = 0;
      this._pressureDamageReduction = 0.99;
      this._presureBonusMultiplierDmg = 1;
    } else {
      throw new Error("You can't reset the pressure, it is not at its maximum value");
    }
  }

  private updatePressureDmgBonusScaling(): void {
    if (this._currentPressurePoints > this._maxPressurePoints) {
      let scaledBonus: number = ((this._currentPressurePoints - this._maxPressurePoints) / 100) + 1;
      scaledBonus = clamp(scaledBonus, 7); // x7 multiplier cap
      this._presureBonusMultiplierDmg = scaledBonus;
    }
  }

  public get getPressureBonusMultiplier(): number {
    return this._presureBonusMultiplierDmg;
  }


}
