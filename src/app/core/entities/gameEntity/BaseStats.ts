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
        public readonly _maxMp: number,

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

    public static build(
        level: number,
        maxHp: number,
        speed: number,
        physAtk: number,
        physDef: number,
        critChance: number,
        critDmg: number,
        magAtk: number,
        magDef: number,
        maxMp: number,
    ): BaseStats {
        return new BaseStats(
            BaseStats.scaleByLevelCalculator(maxHp, level),
            BaseStats.scaleByLevelCalculator(speed, level),
            BaseStats.scaleByLevelCalculator(physAtk, level),
            BaseStats.scaleByLevelCalculator(physDef, level),
            critChance,
            critDmg,
            BaseStats.scaleByLevelCalculator(magAtk, level),
            BaseStats.scaleByLevelCalculator(magDef, level),
            BaseStats.scaleByLevelCalculator(maxMp, level),
        );
    }

    private static scaleByLevelCalculator(attributeValue: number, level: number): number {
        const multiplier = (0.1 * level + 1)
        return (attributeValue * multiplier);
    }

}