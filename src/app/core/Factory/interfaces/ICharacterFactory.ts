import { DamageWeaknessData } from '@app/core/entities'
import { Equipment } from '@app/core/items';
import { Skill } from '@app/core/skills';

export interface ICharacterFactory {
    id: string,
    currentLvl: number,
    baseStats: {
        level: number,
        maxHp: number,
        speed: number,
        physAtk: number,
        physDef: number,
        critChance: number,
        critDmg: number,
        magAtk: number,
        magDef: number,
        maxMp: number,
    },
    skills: Skill[],
    damageData: DamageWeaknessData,
    weapon?: Equipment,
    helmet?: Equipment,
    chest?: Equipment,
    ring?: Equipment,
    belt?: Equipment,
    boots?: Equipment,
}