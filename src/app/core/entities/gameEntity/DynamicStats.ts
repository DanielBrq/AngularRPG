/* Real-time stats modifier (while in battle)*/
export class DynamicsStats {
    constructor(
        public _maxHp: number = 0,
        public _speed: number = 0,

        public _physAtk: number = 0,
        public _physDef: number = 0,

        public _critChance: number = 0,
        public _critDmg: number = 0,

        public _magAtk: number = 0,
        public _magDef: number = 0,
        public _mp: number = 0,

        public _swordDmg: number = 0,
        public _spearDmg: number = 0,
        public _axeDmg: number = 0,
        public _daggerDmg: number = 0,

        public _swordResistance: number = 0,
        public _spearResistance: number = 0,
        public _axeResistance: number = 0,
        public _daggerResistance: number = 0,

        public _heatDmg: number = 0,
        public _coldDmg: number = 0,
        public _lightningDmg: number = 0,
        public _toxinDmg: number = 0,
        public _darkDmg: number = 0,
        public _lightDmg: number = 0,

        public _heatResistance: number = 0,
        public _coldResistance: number = 0,
        public _lightningResistance: number = 0,
        public _toxinResistance: number = 0,
        public _darkResistance: number = 0,
        public _lightResistance: number = 0,
    ) { }

}