import { SpecialSkill } from '../SpecialSkill';
import { CharacterEntity } from '@app/core/entities';
import { CharactersMetadata } from '@app/shared/types';

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

        this._target.getBattleStats.maxHp += this._allStatsBonus;
        this._target.getBattleStats.hp += Math.floor(this._target.getBattleStats.maxHp * this._allStatsBonus);
        this._target.getBattleStats.speed += this._allStatsBonus;
        this._target.getBattleStats.physAtk += this._allStatsBonus;
        this._target.getBattleStats.physDef += this._allStatsBonus;
        this._target.getBattleStats.critChance += this._allStatsBonus;
        this._target.getBattleStats.critDmg += this._allStatsBonus;
        this._target.getBattleStats.magAtk += this._allStatsBonus;
        this._target.getBattleStats.magDef += this._allStatsBonus;
        this._target.getBattleStats.maxMp += this._allStatsBonus;
        this._target.getBattleStats.mp += this._allStatsBonus;
        this._target.getBattleStats.swordDmg += this._allStatsBonus;
        this._target.getBattleStats.spearDmg += this._allStatsBonus;
        this._target.getBattleStats.axeDmg += this._allStatsBonus;
        this._target.getBattleStats.daggerDmg += this._allStatsBonus;
        this._target.getBattleStats.swordResistance += this._allStatsBonus;
        this._target.getBattleStats.spearResistance += this._allStatsBonus;
        this._target.getBattleStats.axeResistance += this._allStatsBonus;
        this._target.getBattleStats.daggerResistance += this._allStatsBonus;
        this._target.getBattleStats.heatDmg += this._allStatsBonus;
        this._target.getBattleStats.coldDmg += this._allStatsBonus;
        this._target.getBattleStats.lightningDmg += this._allStatsBonus;
        this._target.getBattleStats.toxinDmg += this._allStatsBonus;
        this._target.getBattleStats.darkDmg += this._allStatsBonus;
        this._target.getBattleStats.lightDmg += this._allStatsBonus;
        this._target.getBattleStats.heatResistance += this._allStatsBonus;
        this._target.getBattleStats.coldResistance += this._allStatsBonus;
        this._target.getBattleStats.lightningResistance += this._allStatsBonus;
        this._target.getBattleStats.toxinResistance += this._allStatsBonus;
        this._target.getBattleStats.darkResistance += this._allStatsBonus;
        this._target.getBattleStats.lightResistance += this._allStatsBonus;
    }

    public expire(): void {
        if (this._duration > 0) return;
        this._target.getBattleStats.maxHp -= this._allStatsBonus;
        this._target.getBattleStats.hp -= Math.floor(this._target.getBattleStats.maxHp * this._allStatsBonus);
        this._target.getBattleStats.speed -= this._allStatsBonus;
        this._target.getBattleStats.physAtk -= this._allStatsBonus;
        this._target.getBattleStats.physDef -= this._allStatsBonus;
        this._target.getBattleStats.critChance -= this._allStatsBonus;
        this._target.getBattleStats.critDmg -= this._allStatsBonus;
        this._target.getBattleStats.magAtk -= this._allStatsBonus;
        this._target.getBattleStats.magDef -= this._allStatsBonus;
        this._target.getBattleStats.maxMp -= this._allStatsBonus;
        this._target.getBattleStats.mp -= this._allStatsBonus;
        this._target.getBattleStats.swordDmg -= this._allStatsBonus;
        this._target.getBattleStats.spearDmg -= this._allStatsBonus;
        this._target.getBattleStats.axeDmg -= this._allStatsBonus;
        this._target.getBattleStats.daggerDmg -= this._allStatsBonus;
        this._target.getBattleStats.swordResistance -= this._allStatsBonus;
        this._target.getBattleStats.spearResistance -= this._allStatsBonus;
        this._target.getBattleStats.axeResistance -= this._allStatsBonus;
        this._target.getBattleStats.daggerResistance -= this._allStatsBonus;
        this._target.getBattleStats.heatDmg -= this._allStatsBonus;
        this._target.getBattleStats.coldDmg -= this._allStatsBonus;
        this._target.getBattleStats.lightningDmg -= this._allStatsBonus;
        this._target.getBattleStats.toxinDmg -= this._allStatsBonus;
        this._target.getBattleStats.darkDmg -= this._allStatsBonus;
        this._target.getBattleStats.lightDmg -= this._allStatsBonus;
        this._target.getBattleStats.heatResistance -= this._allStatsBonus;
        this._target.getBattleStats.coldResistance -= this._allStatsBonus;
        this._target.getBattleStats.lightningResistance -= this._allStatsBonus;
        this._target.getBattleStats.toxinResistance -= this._allStatsBonus;
        this._target.getBattleStats.darkResistance -= this._allStatsBonus;
        this._target.getBattleStats.lightResistance -= this._allStatsBonus;
    }

    private OwnerValidation(): boolean {
        return this._target.id === CharactersMetadata.SURVIVOR.id;
    }
}
