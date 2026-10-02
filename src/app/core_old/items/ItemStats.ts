export class ItemStats {
    constructor(
        public readonly _maxHp: number = 0,
        public readonly _speed: number = 0,

        public readonly _physAtk: number = 0,
        public readonly _physDef: number = 0,

        public readonly _critChance: number = 0,
        public readonly _critDmg: number = 0,

        public readonly _magAtk: number = 0,
        public readonly _magDef: number = 0,
        public readonly _maxMp: number = 0,
        public readonly _mp: number = 0,

        public readonly _swordDmg: number = 0,
        public readonly _spearDmg: number = 0,
        public readonly _axeDmg: number = 0,
        public readonly _daggerDmg: number = 0,

        public readonly _swordResistance: number = 0,
        public readonly _spearResistance: number = 0,
        public readonly _axeResistance: number = 0,
        public readonly _daggerResistance: number = 0,

        public readonly _heatDmg: number = 0,
        public readonly _coldDmg: number = 0,
        public readonly _lightningDmg: number = 0,
        public readonly _toxinDmg: number = 0,
        public readonly _darkDmg: number = 0,
        public readonly _lightDmg: number = 0,

        public readonly _heatResistance: number = 0,
        public readonly _coldResistance: number = 0,
        public readonly _lightningResistance: number = 0,
        public readonly _toxinResistance: number = 0,
        public readonly _darkResistance: number = 0,
        public readonly _lightResistance: number = 0,

        public readonly _dmgLimit: number = 0,
    ) { }
}