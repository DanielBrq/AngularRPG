import { Equipment } from "@src/app/core_old/items";
import { EquipmentType } from "@src/app/shared";
import { ItemStats } from "@src/app/core_old/items";

export class EquipmentFactory {

    public static create(
        id: string,
        name: string,
        type: EquipmentType,
        stats = {
            maxHp: 0,
            speed: 0,
            physAtk: 0,
            physDef: 0,
            critChance: 0,
            critDmg: 0,
            magAtk: 0,
            magDef: 0,
            maxMp: 0,
            mp: 0,
            heatDmg: 0,
            coldDmg: 0,
            lightningDmg: 0,
            toxinDmg: 0,
            darkDmg: 0,
            lightDmg: 0,
            heatResistance: 0,
            coldResistance: 0,
            lightningResistance: 0,
            toxinResistance: 0,
            darkResistance: 0,
            lightResistance: 0,
        },
    ): Equipment {
        const _itemStat = new ItemStats(
            stats.maxHp, stats.speed, stats.physAtk,
            stats.physDef, stats.critChance, stats.critDmg,
            stats.magAtk, stats.magDef, stats.maxMp,
            stats.mp, stats.heatDmg, stats.coldDmg, stats.lightningDmg,
            stats.toxinDmg, stats.darkDmg, stats.lightDmg,
            stats.heatResistance, stats.coldResistance, stats.lightningResistance,
            stats.toxinResistance, stats.darkResistance, stats.lightResistance,
        );
        return new Equipment(id, name, type, _itemStat);
    }
}