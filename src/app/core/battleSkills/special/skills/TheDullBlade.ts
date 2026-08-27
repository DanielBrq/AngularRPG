import { SpecialSkill } from '../SpecialSkill';
import { GameEntityType } from "@app/core/entities";
import { CharacterLabelType } from "@app/shared/types";
import { i18nTranslation } from '@app/shared/i18n/i18n';

export class TheDullBlade extends SpecialSkill {
    constructor(
        target: GameEntityType,
        stack: number,
        duration: number,
        private readonly _physDefPenalty: number = 0.6,
        private readonly _magDefPenalty: number = 0.6,
        private readonly _physAtkBonus: number = 0.8,
        private readonly _critChanceBonus: number = 0.5,
        private readonly _critDmgBonus: number = 0.3,
        private readonly _speedBonus: number = 0.4,
    ) {
        super(
            'The Dull Blade',
            `Low self Physical and Magic Defence (-60%). \n
            Raise self Physical Atk (+80%), Critical Prob (+50%), Critical Dmg (+30%), and Speed (+40%) \n
            (3 turns).`,
            target,
            [],
            duration,
        );
    }

    public apply(): void {
        if (!this.OwnerValidation()) throw new Error('The Dull Blade can only be applied to the Warrior.');
        this._target.battleStats.physDef -= this._physDefPenalty;
        this._target.battleStats.magDef -= this._magDefPenalty;
        this._target.battleStats.physAtk += this._physAtkBonus;
        this._target.battleStats.critChance += this._critChanceBonus;
        this._target.battleStats.critDmg += this._critDmgBonus;
        this._target.battleStats.speed += this._speedBonus;
    }

    public expire(): void {
        if (!this.OwnerValidation()) throw new Error('The Dull Blade can only be applied to the Warrior.');
        if (this._duration > 0) return;
        this._target.battleStats.physDef += this._physDefPenalty;
        this._target.battleStats.magDef += this._magDefPenalty;
        this._target.battleStats.physAtk -= this._physAtkBonus;
        this._target.battleStats.critChance -= this._critChanceBonus;
        this._target.battleStats.critDmg -= this._critDmgBonus;
        this._target.battleStats.speed -= this._speedBonus;
    }

    private OwnerValidation(): boolean {
        return this._target.id === CharacterLabelType.WARRIOR.id;
    }
    public getName(): string { return i18nTranslation('skills.special.theDullBlade.name', {}); }
    public getDescription(): string { return i18nTranslation('skills.special.theDullBlade.description', { defence: () => this._physDefPenalty * 100, attack: () => this._physAtkBonus * 100, critChance: () => this._critChanceBonus * 100, critDamage: () => this._critDmgBonus * 100, speed: () => this._speedBonus * 100, duration: () => this._duration }); }
}
