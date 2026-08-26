import { GameEntityType } from "@app/core/entities";
import { SpecialEffect } from "../SpecialEffects";
import { CharacterLabelType, SPECIAL_EFFECTS } from "@app/shared/types";

export class TheDullBlade extends SpecialEffect {
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
            SPECIAL_EFFECTS.THE_DULL_BLADE,
            target,
            stack,
            duration
        );
    }

    public override apply(): void {
        if (!this.OwnerValidation()) throw new Error('The Dull Blade can only be applied to the Warrior.');
        this._target.battleStats.physDef -= this._physDefPenalty;
        this._target.battleStats.magDef -= this._magDefPenalty;
        this._target.battleStats.physAtk += this._physAtkBonus;
        this._target.battleStats.critChance += this._critChanceBonus;
        this._target.battleStats.critDmg += this._critDmgBonus;
        this._target.battleStats.speed += this._speedBonus;
    }

    public override expire(): void {
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
}