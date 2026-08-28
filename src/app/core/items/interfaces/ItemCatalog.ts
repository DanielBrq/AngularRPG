import { EquipmentType, WeaponType } from "@app/shared";

export interface ItemCatalog {
    [pieceKey: string]: IPiece;
}

export interface IPiece {
    type: EquipmentType | WeaponType;
    stats: IItemStats;
}

export interface IItemStats {
    maxHp?: number;
    speed?: number;

    physAtk?: number;
    physDef?: number;

    critChance?: number;
    critDmg?: number;

    magAtk?: number;
    magDef?: number;
    maxMp?: number;
    mp?: number;

    swordDmg?: number;
    spearDmg?: number;
    axeDmg?: number;
    daggerDmg?: number;

    swordResistance?: number;
    spearResistance?: number;
    axeResistance?: number;
    daggerResistance?: number;

    heatDmg?: number;
    coldDmg?: number;
    lightningDmg?: number;
    toxinDmg?: number;
    darkDmg?: number;
    lightDmg?: number;

    heatResistance?: number;
    coldResistance?: number;
    lightningResistance?: number;
    toxinResistance?: number;
    darkResistance?: number;
    lightResistance?: number;
}
