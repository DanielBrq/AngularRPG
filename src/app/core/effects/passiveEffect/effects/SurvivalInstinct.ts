import { SpecialEffect } from '@app/core/effects/';
import { CharacterEntity } from '@app/core/entities';
import { SPECIAL_EFFECTS } from '@app/shared/types';
import { CharacterLabelType } from '@app/shared/types';

export class SurvivalInstinct extends SpecialEffect {
  constructor(
    target: CharacterEntity,
    private readonly _physAtkBonus: number = 0.5,
    private readonly _critChanceBonus: number = 1.5,
    private readonly _critDmgBonus: number = 0.3,
    private readonly _speedBonus: number = 0.4,
  ) {
    super(
      'Survival Instinct',
      `Increase Physical Damage (50%), Critical Chance (150%), \n
      Critical Damage (30%) and Speed (40%) \n
      while HP is lower than 25%`,
      SPECIAL_EFFECTS.SURVIVAL_INSTINCT,
      target,
      1,
      1,
    );
  }

  public override apply(): void {
    if (!this.OwnerValidation()) throw new Error('Survival Instinct can only be applied to the Survivor.');
    if (this.hasLowHP()) {
      this._target.battleStats.physAtk += this._physAtkBonus;
      this._target.battleStats.critChance += this._critChanceBonus;
      this._target.battleStats.critDmg += this._critDmgBonus;
      this._target.battleStats.speed += this._speedBonus;
    } else {
      this.expire()
    }
  }

  public override expire(): void {
    this._target.battleStats.physAtk -= this._physAtkBonus;
    this._target.battleStats.critChance -= this._critChanceBonus;
    this._target.battleStats.critDmg -= this._critDmgBonus;
    this._target.battleStats.speed -= this._speedBonus;
  }

  private hasLowHP(): boolean {
    return this._target.isAlive && (this._target.battleStats.hp / this._target.battleStats.maxHp <= 0.25);
  }

  private OwnerValidation(): boolean {
    return this._target.id === CharacterLabelType.SURVIVOR.id;
  }

  override decreaseDuration(turns?: number): void {
    throw new Error("Survival Instinct cannot be removed by turns.");
  }
  override increaseDuration(turns?: number): void {
    throw new Error("Survival Instinct cannot be increased by turns.");
  }

}
