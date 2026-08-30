import { BaseStats, BattleStats, DamageWeaknessData } from "@app/core/entities";
import { FoeEntity } from "@app/core/entities/foes";
import { Skill } from "@app/core/skills";
import { DamageType } from "@app/shared";

export class FoeFactory {

    public static create(
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
        weakness: DamageType[],
        skills: Skill[] = [],
        damageData: DamageWeaknessData,
    ): FoeEntity {
        const _baseStats = BaseStats.build(
            baseStats.level,
            baseStats.maxHp,
            baseStats.speed,
            baseStats.physAtk,
            baseStats.physDef,
            baseStats.critChance,
            baseStats.critDmg,
            baseStats.magAtk,
            baseStats.magDef,
            baseStats.maxMp
        );
        const _battleStats = BattleStats.build(_baseStats);
        return new FoeEntity(
            id,
            name,
            true,
            currentLvl,
            _baseStats,
            _battleStats,
            skills,
            weakness,
            100,
            0,
            0.99,
            1,
            damageData
        );
    }

}