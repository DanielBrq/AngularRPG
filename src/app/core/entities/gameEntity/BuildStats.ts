import { Equipment } from "@src/app/core/items";

/* Extra Stats comming from
team composition buffs, equipment: Items, Weapons and Armor. (static values, no realtime)*/
export class BuildStats {
    constructor(
        public maxHp: number = 0,
        public speed: number = 0,

        public physAtk: number = 0,
        public physDef: number = 0,

        public critChance: number = 0,
        public critDmg: number = 0,

        public magAtk: number = 0,
        public magDef: number = 0,
        public maxMp: number = 0,
        public mp: number = 0,

        public swordDmg: number = 0,
        public spearDmg: number = 0,
        public axeDmg: number = 0,
        public daggerDmg: number = 0,

        public swordResistance: number = 0,
        public spearResistance: number = 0,
        public axeResistance: number = 0,
        public daggerResistance: number = 0,

        public heatDmg: number = 0,
        public coldDmg: number = 0,
        public lightningDmg: number = 0,
        public toxinDmg: number = 0,
        public darkDmg: number = 0,
        public lightDmg: number = 0,

        public heatResistance: number = 0,
        public coldResistance: number = 0,
        public lightningResistance: number = 0,
        public toxinResistance: number = 0,
        public darkResistance: number = 0,
        public lightResistance: number = 0,

        public dmgLimit: number = 0,
    ) { }

    static build(equipment: (Equipment | undefined)[] = []): BuildStats {
        const stats = new BuildStats();

        for (const item of equipment) {
            if (!item || !item.itemStats) continue;

            stats.maxHp += item.itemStats._maxHp;
            stats.speed += item.itemStats._speed;
            stats.physAtk += item.itemStats._physAtk;
            stats.physDef += item.itemStats._physDef;
            stats.critChance += item.itemStats._critChance;
            stats.critDmg += item.itemStats._critDmg;
            stats.magAtk += item.itemStats._magAtk;
            stats.magDef += item.itemStats._magDef;
            stats.maxMp += item.itemStats._maxMp;
            stats.mp += item.itemStats._mp;
            stats.swordDmg += item.itemStats._swordDmg;
            stats.spearDmg += item.itemStats._spearDmg;
            stats.axeDmg += item.itemStats._axeDmg;
            stats.daggerDmg += item.itemStats._daggerDmg;
            stats.swordResistance += item.itemStats._swordResistance;
            stats.spearResistance += item.itemStats._spearResistance;
            stats.axeResistance += item.itemStats._axeResistance;
            stats.daggerResistance += item.itemStats._daggerResistance;
            stats.heatDmg += item.itemStats._heatDmg;
            stats.coldDmg += item.itemStats._coldDmg;
            stats.lightningDmg += item.itemStats._lightningDmg;
            stats.toxinDmg += item.itemStats._toxinDmg;
            stats.darkDmg += item.itemStats._darkDmg;
            stats.lightDmg += item.itemStats._lightDmg;
            stats.heatResistance += item.itemStats._heatResistance;
            stats.coldResistance += item.itemStats._coldResistance;
            stats.lightningResistance += item.itemStats._lightningResistance;
            stats.toxinResistance += item.itemStats._toxinResistance;
            stats.darkResistance += item.itemStats._darkResistance;
            stats.lightResistance += item.itemStats._lightResistance;
            stats.dmgLimit += item.itemStats._dmgLimit;
        }
        return stats;
    }
}