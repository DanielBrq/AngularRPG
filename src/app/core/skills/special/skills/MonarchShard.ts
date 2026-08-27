import { SpecialSkill } from '../SpecialSkill';
import { CharacterEntity } from '@app/core/entities';
import { CharacterLabelType } from '@app/shared/types';
import { i18nTranslation } from '@app/shared/i18n/i18n';

export class MonarchShard extends SpecialSkill {
    constructor(
        target: CharacterEntity,
        public readonly _allStatsBonus: number = 0.2,
    ) {
        super(
            'Monarch Shard',
            'Raise all party members stats (+20%) (5 turns).',
            target,
            [],
            5,
        );
    }

    public apply(): void {
        if (!this.OwnerValidation()) throw new Error('Monarch Shard can only be applied by the Survivor.');

        this._target.battleStats.maxHp += this._allStatsBonus;
        this._target.battleStats.hp += Math.floor(this._target.battleStats.maxHp * this._allStatsBonus);
        this._target.battleStats.speed += this._allStatsBonus;
        this._target.battleStats.physAtk += this._allStatsBonus;
        this._target.battleStats.physDef += this._allStatsBonus;
        this._target.battleStats.critChance += this._allStatsBonus;
        this._target.battleStats.critDmg += this._allStatsBonus;
        this._target.battleStats.magAtk += this._allStatsBonus;
        this._target.battleStats.magDef += this._allStatsBonus;
        this._target.battleStats.maxMp += this._allStatsBonus;
        this._target.battleStats.mp += this._allStatsBonus;
        this._target.battleStats.swordDmg += this._allStatsBonus;
        this._target.battleStats.spearDmg += this._allStatsBonus;
        this._target.battleStats.axeDmg += this._allStatsBonus;
        this._target.battleStats.daggerDmg += this._allStatsBonus;
        this._target.battleStats.swordResistance += this._allStatsBonus;
        this._target.battleStats.spearResistance += this._allStatsBonus;
        this._target.battleStats.axeResistance += this._allStatsBonus;
        this._target.battleStats.daggerResistance += this._allStatsBonus;
        this._target.battleStats.heatDmg += this._allStatsBonus;
        this._target.battleStats.coldDmg += this._allStatsBonus;
        this._target.battleStats.lightningDmg += this._allStatsBonus;
        this._target.battleStats.toxinDmg += this._allStatsBonus;
        this._target.battleStats.darkDmg += this._allStatsBonus;
        this._target.battleStats.lightDmg += this._allStatsBonus;
        this._target.battleStats.heatResistance += this._allStatsBonus;
        this._target.battleStats.coldResistance += this._allStatsBonus;
        this._target.battleStats.lightningResistance += this._allStatsBonus;
        this._target.battleStats.toxinResistance += this._allStatsBonus;
        this._target.battleStats.darkResistance += this._allStatsBonus;
        this._target.battleStats.lightResistance += this._allStatsBonus;
    }

    public expire(): void {
        if (this._duration > 0) return;
        this._target.battleStats.maxHp -= this._allStatsBonus;
        this._target.battleStats.hp -= Math.floor(this._target.battleStats.maxHp * this._allStatsBonus);
        this._target.battleStats.speed -= this._allStatsBonus;
        this._target.battleStats.physAtk -= this._allStatsBonus;
        this._target.battleStats.physDef -= this._allStatsBonus;
        this._target.battleStats.critChance -= this._allStatsBonus;
        this._target.battleStats.critDmg -= this._allStatsBonus;
        this._target.battleStats.magAtk -= this._allStatsBonus;
        this._target.battleStats.magDef -= this._allStatsBonus;
        this._target.battleStats.maxMp -= this._allStatsBonus;
        this._target.battleStats.mp -= this._allStatsBonus;
        this._target.battleStats.swordDmg -= this._allStatsBonus;
        this._target.battleStats.spearDmg -= this._allStatsBonus;
        this._target.battleStats.axeDmg -= this._allStatsBonus;
        this._target.battleStats.daggerDmg -= this._allStatsBonus;
        this._target.battleStats.swordResistance -= this._allStatsBonus;
        this._target.battleStats.spearResistance -= this._allStatsBonus;
        this._target.battleStats.axeResistance -= this._allStatsBonus;
        this._target.battleStats.daggerResistance -= this._allStatsBonus;
        this._target.battleStats.heatDmg -= this._allStatsBonus;
        this._target.battleStats.coldDmg -= this._allStatsBonus;
        this._target.battleStats.lightningDmg -= this._allStatsBonus;
        this._target.battleStats.toxinDmg -= this._allStatsBonus;
        this._target.battleStats.darkDmg -= this._allStatsBonus;
        this._target.battleStats.lightDmg -= this._allStatsBonus;
        this._target.battleStats.heatResistance -= this._allStatsBonus;
        this._target.battleStats.coldResistance -= this._allStatsBonus;
        this._target.battleStats.lightningResistance -= this._allStatsBonus;
        this._target.battleStats.toxinResistance -= this._allStatsBonus;
        this._target.battleStats.darkResistance -= this._allStatsBonus;
        this._target.battleStats.lightResistance -= this._allStatsBonus;
    }

    public getName(): string {
        return i18nTranslation('skills.special.monarchShard.name', {});
    }

    public getDescription(): string {
        return i18nTranslation('skills.special.monarchShard.description', {
            bonus: () => this._allStatsBonus * 100,
            duration: () => this._duration,
        });
    }

    private OwnerValidation(): boolean {
        return this._target.id === CharacterLabelType.SURVIVOR.id;
    }
}
