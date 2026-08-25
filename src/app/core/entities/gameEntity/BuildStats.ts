import { CharacterEntity } from "@app/core/entities/player";

/* Extra Stats comming from
team composition buffs, equipment: Items, Weapons and Armor. (static values, no realtime)*/
export class BuildStats {
    constructor(
        public maxHp: number = 1,
        public speed: number = 1,

        public physAtk: number = 1,
        public physDef: number = 1,

        public critChance: number = 1,
        public critDmg: number = 1,

        public magAtk: number = 1,
        public magDef: number = 1,
        public maxMp: number = 1,
        public mp: number = 1,

        public swordDmg: number = 1,
        public spearDmg: number = 1,
        public axeDmg: number = 1,
        public daggerDmg: number = 1,

        public swordResistance: number = 1,
        public spearResistance: number = 1,
        public axeResistance: number = 1,
        public daggerResistance: number = 1,

        public heatDmg: number = 1,
        public coldDmg: number = 1,
        public lightningDmg: number = 1,
        public toxinDmg: number = 1,
        public darkDmg: number = 1,
        public lightDmg: number = 1,

        public heatResistance: number = 1,
        public coldResistance: number = 1,
        public lightningResistance: number = 1,
        public toxinResistance: number = 1,
        public darkResistance: number = 1,
        public lightResistance: number = 1,
    ) { }

    static build(c: CharacterEntity): BuildStats {
        const stats = new BuildStats();

        const equipment = [
            c.helmet,
            c.chest,
            c.ring,
            c.belt,
            c.boots,
            c.weapon
        ];

        for (const item of equipment) {
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
        }
        return stats;
    }

}