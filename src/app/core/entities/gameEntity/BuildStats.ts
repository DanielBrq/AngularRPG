/* Extra Stats comming from
team composition buffs, equipment: Items, Weapons and Armor. (static values, no realtime)*/
export class BuildStats {
    constructor(
        protected _maxHp: number = 0,
        protected _speed: number = 0,

        protected _physAtk: number = 0,
        protected _physDef: number = 0,

        protected _critChance: number = 0,
        protected _critDmg: number = 0,

        protected _magAtk: number = 0,
        protected _magDef: number = 0,
        protected _mp: number = 0,

        protected _swordDmg: number = 0,
        protected _spearDmg: number = 0,
        protected _axeDmg: number = 0,
        protected _daggerDmg: number = 0,

        protected _swordResistance: number = 0,
        protected _spearResistance: number = 0,
        protected _axeResistance: number = 0,
        protected _daggerResistance: number = 0,

        protected _heatDmg: number = 0,
        protected _coldDmg: number = 0,
        protected _lightningDmg: number = 0,
        protected _toxinDmg: number = 0,
        protected _darkDmg: number = 0,
        protected _lightDmg: number = 0,

        protected _heatResistance: number = 0,
        protected _coldResistance: number = 0,
        protected _lightningResistance: number = 0,
        protected _toxinResistance: number = 0,
        protected _darkResistance: number = 0,
        protected _lightResistance: number = 0,
    ) { }
}