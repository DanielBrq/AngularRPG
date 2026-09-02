import { BaseStats, BuildStats } from "@src/app/core/entities";

export class BattleStats {
    constructor(
        public maxHp: number = 0,
        public hp: number = 0,
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

        public dmgLimit: number = 99999,
    ) { }

    public static calculate(baseStats: BaseStats): BattleStats;

    public static calculate(baseStats: BaseStats, buildStats: BuildStats): BattleStats;

    public static calculate(baseStats: BaseStats, buildStats?: BuildStats): BattleStats {
        const initBattleStats: BattleStats = new BattleStats(
            baseStats._maxHp,
            baseStats._maxHp,
            baseStats._speed,
            baseStats._physAtk,
            baseStats._physDef,
            baseStats._critChance,
            baseStats._critDmg,
            baseStats._magAtk,
            baseStats._magDef,
            baseStats._maxMp,
            baseStats._maxMp,
            baseStats._swordDmg,
            baseStats._spearDmg,
            baseStats._axeDmg,
            baseStats._daggerDmg,
            baseStats._swordResistance,
            baseStats._spearResistance,
            baseStats._axeResistance,
            baseStats._daggerResistance,
            baseStats._heatDmg,
            baseStats._coldDmg,
            baseStats._lightningDmg,
            baseStats._toxinDmg,
            baseStats._darkDmg,
            baseStats._lightDmg,
            baseStats._heatResistance,
            baseStats._coldResistance,
            baseStats._lightningResistance,
            baseStats._toxinResistance,
            baseStats._darkResistance,
            baseStats._lightResistance);

        if (buildStats) {
            initBattleStats.maxHp *= buildStats.maxHp;
            initBattleStats.speed *= buildStats.speed;
            initBattleStats.physAtk *= buildStats.physAtk;
            initBattleStats.physDef *= buildStats.physDef;
            initBattleStats.critChance *= buildStats.critChance;
            initBattleStats.critDmg *= buildStats.critDmg;
            initBattleStats.magAtk *= buildStats.magAtk;
            initBattleStats.magDef *= buildStats.magDef;
            initBattleStats.maxMp *= buildStats.maxMp;
            initBattleStats.swordDmg *= buildStats.swordDmg;
            initBattleStats.spearDmg *= buildStats.speed;
            initBattleStats.axeDmg *= buildStats.axeDmg;
            initBattleStats.daggerDmg *= buildStats.daggerDmg;
            initBattleStats.swordResistance *= buildStats.swordResistance;
            initBattleStats.spearDmg *= buildStats.spearResistance;
            initBattleStats.axeResistance *= buildStats.axeResistance;
            initBattleStats.daggerDmg *= buildStats.daggerResistance;
            initBattleStats.heatDmg *= buildStats.heatDmg;
            initBattleStats.coldDmg *= buildStats.coldDmg;
            initBattleStats.lightningDmg *= buildStats.lightningDmg;
            initBattleStats.toxinDmg *= buildStats.toxinDmg;
            initBattleStats.darkDmg *= buildStats.darkDmg;
            initBattleStats.lightDmg *= buildStats.lightDmg;
            initBattleStats.heatResistance *= buildStats.heatResistance;
            initBattleStats.coldResistance *= buildStats.coldResistance;
            initBattleStats.lightningResistance *= buildStats.lightningResistance;
            initBattleStats.toxinResistance *= buildStats.toxinResistance;
            initBattleStats.darkResistance *= buildStats.darkResistance;
            initBattleStats.lightResistance *= buildStats.lightResistance;
            initBattleStats.dmgLimit += buildStats.dmgLimit;
        }

        // Fill hp and mg to top
        initBattleStats.hp = initBattleStats.maxHp;
        initBattleStats.mp = initBattleStats.maxMp;

        //init battle real-time stats
        return initBattleStats;
    }

    public static build = BattleStats.calculate;
}