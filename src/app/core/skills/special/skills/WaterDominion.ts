import { SpecialSkill } from '../SpecialSkill';
import { CharacterEntity } from '@app/core/entities';
import { CharacterLabelType } from '@app/shared/types';

export class WaterDominion extends SpecialSkill {
    constructor(
        target: CharacterEntity,
        duration: number = 5,
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
            target,
            [],
            duration,
        );
    }
    //TODO: Feature that exploit extra weakness points solution - Generic solution.

    public apply(): void {
        if (!this.OwnerValidation()) throw new Error('Survival Instinct can only be applied to the Survivor.');
        this._target.getBattleStats.coldDmg += this._coldDmgBonus;
        this._target.getBattleStats.heatResistance += this._heatResistanceBonus;

        //save speed bouns, avoid miss calc if speed changes during duration
        this._speedBonus = this.getSpeedBonus();
        this._target.getBattleStats.physAtk += this._speedBonus;
    }

    public expire(): void {
        this._target.getBattleStats.coldDmg -= this._coldDmgBonus;
        this._target.getBattleStats.heatResistance -= this._heatResistanceBonus;
        this._target.getBattleStats.physAtk -= this._speedBonus;
    }

    private OwnerValidation(): boolean {
        return this._target.id === CharacterLabelType.SURVIVOR.id;
    }

    private getSpeedBonus(): number {
        return Math.floor(this._target.getBattleStats.speed / 100) * 0.12;
    }
}
