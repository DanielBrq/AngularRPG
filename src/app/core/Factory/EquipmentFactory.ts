import { Equipment } from "@app/core/items";
import { EquipmentType, WeaponType } from "@app/shared";
import { ItemStats } from "@app/core/items";

export class EquipmentFactory {

    public static create(
        id: string,
        name: string,
        type: EquipmentType | WeaponType,
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
            swordDmg: 0,
            spearDmg: 0,
            axeDmg: 0,
            daggerDmg: 0,
            swordResistance: 0,
            spearResistance: 0,
            axeResistance: 0,
            daggerResistance: 0,
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
            stats.mp, stats.swordDmg, stats.spearDmg,
            stats.axeDmg, stats.daggerDmg,
            stats.swordResistance, stats.spearResistance,
            stats.axeResistance, stats.daggerResistance,
            stats.heatDmg, stats.coldDmg, stats.lightningDmg,
            stats.toxinDmg, stats.darkDmg, stats.lightDmg,
            stats.heatResistance, stats.coldResistance, stats.lightningResistance,
            stats.toxinResistance, stats.darkResistance, stats.lightResistance,
        );
        return new Equipment(id, name, type, _itemStat);
    }
}