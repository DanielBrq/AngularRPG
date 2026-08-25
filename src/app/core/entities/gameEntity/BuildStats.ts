/* Extra Stats comming from
team composition buffs, equipment: Items, Weapons and Armor. (static values, no realtime)*/
export class BuildStats {
    constructor(
        public hp: number = 0,
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
    ) { }
}