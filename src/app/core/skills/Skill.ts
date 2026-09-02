import { SkillType } from '@src/app/shared/types';
import { CharacterEntity, FoeEntity, GameEntityType } from '@src/app/core/entities';
import { Effect } from '../effects';

export type BP = {
  efficiency: number;
  strength: number;
  speed: number;
}
export abstract class Skill {
  constructor(
    protected readonly _name: string,
    protected readonly _description: string,
    protected _target: GameEntityType,
    protected _skillOwner: GameEntityType,
    protected _skillType: SkillType,
    protected _effect: Effect[] = [],
    protected readonly _maxBoostLevel: number = 2,
    protected readonly _baseMpCost: number = 0,
    protected readonly _skillMultiplier: number = 1,
  ) { }

  protected execute(target: GameEntityType | GameEntityType[]): void { }

  protected getDescription(efficiencyBP: number = 0, strengthBP: number = 0, speedBP: number = 0) { }

  protected previewSkillBoostResult(
    efficiencyBP: number,
    strengthBP: number,
    speedBP: number,
  ): {
    mpCostMultiplier: number
    skillMultiplier: number
    speedMultiplier: number
  } {
    const verifySpendedBP = efficiencyBP + strengthBP + speedBP;
    if (verifySpendedBP > this._maxBoostLevel && this._maxBoostLevel < 1) throw new Error('maxBoostLevel must be between 1 and ' + this._maxBoostLevel);

    let RemainingBP: number = verifySpendedBP;
    let mpCostMultiplier: number = 1; // Lower, better
    let skillMultiplier: number = 1; // Higher, better
    let speedMultiplier: number = 1; // Higher, better

    if (efficiencyBP && efficiencyBP <= RemainingBP) {
      mpCostMultiplier -= efficiencyBP * 0.1; // Save 10% mp cost per BP
      skillMultiplier -= efficiencyBP * 0.1; // Trade off: Reduce skill multiplier 10% per BP
      speedMultiplier -= efficiencyBP * 0.1; // Trade off: Reduce speed multiplier 10% per BP
      RemainingBP -= efficiencyBP;   // Remove BP spended
    }
    if (strengthBP && strengthBP <= RemainingBP) {
      skillMultiplier += strengthBP * 0.1; // Increase 10% skill multiplier per BP
      mpCostMultiplier += strengthBP * 0.1; // Trade off: Increase mp cost 10% per BP
      speedMultiplier -= strengthBP * 0.1; // Trade off: Reduce speed multiplier 10% per BP
      RemainingBP -= strengthBP;   // Remove BP spended
    }
    if (speedBP && speedBP <= RemainingBP) {
      speedMultiplier += speedBP * 0.1; // Increase 10% speed multiplier per BP
      mpCostMultiplier += speedBP * 0.1; // Trade off: Increase mp cost 10% per BP
      skillMultiplier -= speedBP * 0.1; // Trade off: Reduce skill multiplier 10% per BP
      RemainingBP -= speedBP;   // Remove BP spended
    }

    return {
      mpCostMultiplier: mpCostMultiplier,
      skillMultiplier: skillMultiplier,
      speedMultiplier: speedMultiplier
    }
  }

  public getMpCost(): number {
    return this._baseMpCost;
  }

  public getPotency(): number {
    return this._skillMultiplier;
  }

  public getSkilltype(): SkillType {
    return this._skillType;
  }

  protected increaseEffectsDuration(duration: number = 1): void {
    if (!this._effect || this._effect.length == 0) return;
    this._effect.forEach(effect => effect.increaseDuration(duration));
  }

  protected decreaseEffectsDuration(duration: number = 1): void {
    if (!this._effect || this._effect.length == 0) return;
    this._effect.forEach(effect => effect.decreaseDuration(duration));
    this._effect = this._effect.filter(effect => !effect.isExpired());
  }

  protected preventCharacterTarget(target: GameEntityType): void {
    if (target instanceof CharacterEntity) throw new Error('Self attack is not allowed');
  }

  protected preventDeadTarget(target?: GameEntityType): void {
    if (target && target.isAlive === false) throw new Error('Target is dead');
  }

  protected preventFoeTarget(target: GameEntityType): void {
    if (target instanceof FoeEntity) throw new Error('Target is a foe');
  }
}
