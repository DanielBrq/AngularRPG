import { SkillType } from '@app/shared/types';
import { CharacterEntity, FoeEntity, GameEntityType } from '@app/core/entities';

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
    protected _speed: number,
    protected _skillType: SkillType,
    protected readonly _maxBoostLevel: number = 2,

    protected readonly _baseMpCostOriginal: number = 0,
    protected readonly _skillMultiplierOriginal: number = 1,
    protected readonly _currentBoostLevelOriginal: number = 1,

    protected _baseMpCost: number = 0,
    protected _skillMultiplier: number = 1,
  ) { }

  protected execute(target: GameEntityType): void { }

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

  protected preventCharacterTarget(target: GameEntityType): void {
    if (target instanceof CharacterEntity) throw new Error('Self attack is not allowed');
  }

  protected preventDeadTarget(target: GameEntityType): void {
    if (target.isAlive === false) throw new Error('Target is dead');
  }

  protected preventFoeTarget(target: GameEntityType): void {
    if (target instanceof FoeEntity) throw new Error('Target is a foe');
  }

}
