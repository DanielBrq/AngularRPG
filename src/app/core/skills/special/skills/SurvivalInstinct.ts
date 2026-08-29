import { SpecialSkill } from '../SpecialSkill';
import { CharacterEntity } from '@app/core/entities';
import { CharacterLabelType } from '@app/shared/types';
import { i18nTranslation } from '@app/shared/i18n/i18n';

export class SurvivalInstinct extends SpecialSkill {
    constructor(
        target: CharacterEntity,
        private readonly _physAtkBonus: number = 0.5,
        private readonly _critChanceBonus: number = 1.5,
        private readonly _critDmgBonus: number = 0.3,
        private readonly _speedBonus: number = 0.4,
    ) {
        super(
            'Survival Instinct',
            `Increase self Physical Damage (50%), Critical Chance (150%), \n
            Critical Damage (30%) and Speed (40%) \n
            while HP is lower than 25%`,
            target,
            [],
            1,
        );
    }

    public apply(): void {
        if (!this.OwnerValidation()) throw new Error('Survival Instinct can only be applied to the Survivor.');
        if (this.hasLowHP()) {
            this._target.getBattleStats.physAtk += this._physAtkBonus;
            this._target.getBattleStats.critChance += this._critChanceBonus;
            this._target.getBattleStats.critDmg += this._critDmgBonus;
            this._target.getBattleStats.speed += this._speedBonus;
        } else {
            this.expire()
        }
    }

    public expire(): void {
        if (this._duration > 0) return;
        this._target.getBattleStats.physAtk -= this._physAtkBonus;
        this._target.getBattleStats.critChance -= this._critChanceBonus;
        this._target.getBattleStats.critDmg -= this._critDmgBonus;
        this._target.getBattleStats.speed -= this._speedBonus;
    }

    private hasLowHP(): boolean {
        return this._target.isAlive && (this._target.getBattleStats.hp / this._target.getBattleStats.maxHp <= 0.25);
    }

    private OwnerValidation(): boolean {
        return this._target.id === CharacterLabelType.SURVIVOR.id;
    }
    public getName(): string { return i18nTranslation('skills.special.survivalInstinct.name', {}); }
    public getDescription(): string { return i18nTranslation('skills.special.survivalInstinct.description', { attack: () => this._physAtkBonus * 100, critChance: () => this._critChanceBonus * 100, critDamage: () => this._critDmgBonus * 100, speed: () => this._speedBonus * 100 }); }

}
