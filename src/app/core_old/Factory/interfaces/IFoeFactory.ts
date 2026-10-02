import { DamageWeaknessData } from '@src/app/core_old/entities'
import { Skill } from '@src/app/core_old/skills';

export interface IFoeFactory {
    id: string,
    name: string,
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
}