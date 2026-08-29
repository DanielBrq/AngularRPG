export interface ConsumableCatalog {
    [consumableKey: string]: IConsumable;
}

export interface IConsumable {
    stats: IConsumableStats;
}

export interface IConsumableStats {
    maxHp?: number;
    maxMp?: number;

    physAtk?: number;
    physDef?: number;

    magAtk?: number;
    magDef?: number;

    speed?: number;

    critChance?: number;
    critDmg?: number;
}
