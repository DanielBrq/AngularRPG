import { Effect } from "@app/core/effects/Effect";
import { Skill } from "../Skill";
import { GameEntityType } from '@app/core/entities';
import { SkillType, SKILL } from '@app/shared/types';

export abstract class OfensiveSkill extends Skill {
    constructor(
        protected readonly name: string,
        protected target: GameEntityType,
        protected skillType: SkillType,

        protected readonly _baseMpCost: number,
        protected _basePotency: number,                 // Effect Multiplier
        protected _internalDmgMultiplier: number = 2,
        protected _maxBoostLevel: number = 3,           // From 1-7 levels
        protected _currentBoostLevel: number = 0,       // (0-[maxBoostLevel])

        //Status Effects
        protected _statusEffects?: Effect[],             // Status Effects
        protected _duration?: number,                   // Skills turns Duration
    ) {
        super(
            name,
            '',
            target,
            SKILL.OFENSIVE
        )
    }

    // Getters
    protected get getCurrentBoostLevel(): number {
        return this._currentBoostLevel;
    }

    protected get mpCost(): number {
        this.isNegativeValue(this._baseMpCost);
        return this._baseMpCost * (this._currentBoostLevel * 0.25);
    }

    // Actions
    protected boostSkill(boostLevel: number): void {
        if (boostLevel > this._maxBoostLevel) throw new Error('Skill cannot be boosted further');
        this._currentBoostLevel = boostLevel;
    }

    protected resetBoost(): void {
        this._currentBoostLevel = 0;
    }

    protected get PotencyCalcMultiplier(): number {
        this.isNegativeValue(this._basePotency);
        if (this.getCurrentBoostLevel > this._maxBoostLevel) throw new Error('Skill cannot be boosted further');
        switch (this.getCurrentBoostLevel) {
            case 0:
                return this._basePotency * 1;
            case 1:
                return this._basePotency * 1.25;
            case 2:
                return this._basePotency * 1.5;
            case 3:
                return this._basePotency * 1.75;
            case 4:
                return this._basePotency * 2;
            case 5:
                return this._basePotency * 2.25;
            case 6:
                return this._basePotency * 2.5;
            case 7:
                return this._basePotency * 2.75;
            default:
                return this._basePotency * 1;
        }
    }

}
