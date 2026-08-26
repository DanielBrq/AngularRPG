import { SpecialEffect } from '@app/core/effects/';
import { CharacterEntity } from '@app/core/entities';
import { SPECIAL_EFFECTS } from '@app/shared/types';
import { CharacterLabelType } from '@app/shared/types';

export class WaterDominion extends SpecialEffect {
    constructor(
        target: CharacterEntity,
        private readonly duration: number = 5,
        private readonly _coldDmgBonus: number = 0.6,
        private readonly _heatResistanceBonus: number = 0.3,
        private _speedBonus: number = 0,

    ) {
        super(
            'Water Dominion',
            `Grant self the ability to exploit cold weakness with any attack (based on Physical Damage). \n
            Raise Cold Damage (+60%), Heat Resistance (+30%). \n
            Raise self Physical Damage based on speed (+12% per 100 Speed points).\n
            (5 turns).`,
            SPECIAL_EFFECTS.WATER_DOMINION,
            target,
            1,
            duration,
        );
    }

    public override apply(): void {
        if (!this.OwnerValidation()) throw new Error('Survival Instinct can only be applied to the Survivor.');
        this._target.battleStats.coldDmg += this._coldDmgBonus;
        this._target.battleStats.heatResistance += this._heatResistanceBonus;

        //save speed bouns, avoid miss calc if speed changes during duration
        this._speedBonus = this.getSpeedBonus();
        this._target.battleStats.physAtk += this._speedBonus;
    }

    public override expire(): void {
        this._target.battleStats.coldDmg -= this._coldDmgBonus;
        this._target.battleStats.heatResistance -= this._heatResistanceBonus;
        this._target.battleStats.physAtk -= this._speedBonus;
    }

    private OwnerValidation(): boolean {
        return this._target.id === CharacterLabelType.SURVIVOR.id;
    }

    private getSpeedBonus(): number {
        return Math.floor(this._target.battleStats.speed / 100) * 0.12;
    }
}