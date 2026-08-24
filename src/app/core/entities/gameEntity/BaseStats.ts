export class BaseStats {
    constructor(
        public readonly _maxHp: number,
        public readonly _speed: number,

        public readonly _physAtk: number,
        public readonly _physDef: number,

        public readonly _critChance: number = 0.15,
        public readonly _critDmg: number = 0.30,

        public readonly _magAtk: number,
        public readonly _magDef: number,
        public readonly _mp: number,

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
    ) { }

    scaleByLevel(level: number): BaseStats {
        return new BaseStats(
            this.scaleByLevelCalculator(this._maxHp, level),
            this.scaleByLevelCalculator(this._speed, level),
            this.scaleByLevelCalculator(this._physAtk, level),
            this.scaleByLevelCalculator(this._physDef, level),
            this._critChance,
            this._critDmg,
            this.scaleByLevelCalculator(this._magAtk, level),
            this.scaleByLevelCalculator(this._magDef, level),
            this.scaleByLevelCalculator(this._mp, level),
            this._swordDmg,
            this._spearDmg,
            this._axeDmg,
            this._daggerDmg,
            this._swordResistance,
            this._spearResistance,
            this._axeResistance,
            this._daggerResistance,
            this._heatDmg,
            this._coldDmg,
            this._lightningDmg,
            this._toxinDmg,
            this._darkDmg,
            this._lightDmg,
            this._heatResistance,
            this._coldResistance,
            this._lightningResistance,
            this._toxinResistance,
            this._darkResistance,
            this._lightResistance,
        );
    }

    private scaleByLevelCalculator(attributeValue: number, level: number): number {
        const multiplier = (0.1 * level + 1)
        return (attributeValue * multiplier);
    }

}