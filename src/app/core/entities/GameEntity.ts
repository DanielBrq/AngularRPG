import { clamp } from '@app/shared/utils';

export abstract class GameEntity {
    constructor(
        //Base properties
        protected readonly _id: string,
        protected readonly _name: string,

        //level
        protected _currentLvl: number,

        //stats
        protected _hp: number,
        protected _maxHp: number,
        protected _isAlive: boolean = true,
        protected _speed: number,

        protected _physAtk: number,
        protected _physDef: number,

        protected _critChance: number = 0.1,
        protected _critDmg: number = 0.2,

        protected _magAtk: number,
        protected _magDef: number,
        protected _mp: number,

        // Special ATK Stats
        // Positive values = extra dmg
        // Negative values = reduced dmg
        protected _heatDmg: number = 0,
        protected _coldDmg: number = 0,
        protected _lightningDmg: number = 0,
        protected _toxinDmg: number = 0,
        protected _darkDmg: number = 0,
        protected _lightDmg: number = 0,

        protected _swordDmg: number = 0,
        protected _spearDmg: number = 0,
        protected _axeDmg: number = 0,
        protected _bowDmg: number = 0,
        protected _daggerDmg: number = 0,
        protected _grimoireDmg: number = 0,

        // Special def Stats
        // Positive values = extra resistant
        // Negative values = extra dmg taken
        protected _heatResistance: number = 0,
        protected _coldResistance: number = 0,
        protected _lightningResistance: number = 0,
        protected _toxinResistance: number = 0,
        protected _darkResistance: number = 0,
        protected _lightResistance: number = 0,

        protected _swordResistance: number = 0,
        protected _spearResistance: number = 0,
        protected _axeResistance: number = 0,
        protected _bowResistance: number = 0,
        protected _daggerResistance: number = 0,
        protected _grimoireResistance: number = 0,

    ) { }
    // Base
    get id(): string { return this._id; }
    get name(): string { return this._name; }

    // Level
    get currentLvl(): number { return this._currentLvl; }
    set currentLvl(value: number) { this._currentLvl = value; }

    // Stats
    get hp(): number { return this._hp; }
    set hp(value: number) { this._hp = value; }
    get maxHp(): number { return this._maxHp; }
    set maxHp(value: number) { this._maxHp = value; }
    get isAlive(): boolean { return this._isAlive; }
    set isAlive(value: boolean) { this._isAlive = value; }
    get speed(): number { return this._speed; }
    set speed(value: number) { this._speed = value; }

    get physAtk(): number { return this._physAtk; }
    set physAtk(value: number) { this._physAtk = value; }
    get physDef(): number { return this._physDef; }
    set physDef(value: number) { this._physDef = value; }

    get critChance(): number { return this._critChance; }
    set critChance(value: number) { this._critChance = value; }
    get critDmg(): number { return this._critDmg; }
    set critDmg(value: number) { this._critDmg = value; }

    get magAtk(): number { return this._magAtk; }
    set magAtk(value: number) { this._magAtk = value; }
    get magDef(): number { return this._magDef; }
    set magDef(value: number) { this._magDef = value; }
    get mp(): number { return this._mp; }
    set mp(value: number) { this._mp = value; }

    // Element ATK
    get heatDmg(): number { return this._heatDmg; }
    set heatDmg(value: number) { this._heatDmg = value; }
    get coldDmg(): number { return this._coldDmg; }
    set coldDmg(value: number) { this._coldDmg = value; }
    get lightningDmg(): number { return this._lightningDmg; }
    set lightningDmg(value: number) { this._lightningDmg = value; }
    get toxinDmg(): number { return this._toxinDmg; }
    set toxinDmg(value: number) { this._toxinDmg = value; }
    get darkDmg(): number { return this._darkDmg; }
    set darkDmg(value: number) { this._darkDmg = value; }
    get lightDmg(): number { return this._lightDmg; }
    set lightDmg(value: number) { this._lightDmg = value; }

    // Weapon ATK
    get swordDmg(): number { return this._swordDmg; }
    set swordDmg(value: number) { this._swordDmg = value; }
    get spearDmg(): number { return this._spearDmg; }
    set spearDmg(value: number) { this._spearDmg = value; }
    get axeDmg(): number { return this._axeDmg; }
    set axeDmg(value: number) { this._axeDmg = value; }
    get bowDmg(): number { return this._bowDmg; }
    set bowDmg(value: number) { this._bowDmg = value; }
    get daggerDmg(): number { return this._daggerDmg; }
    set daggerDmg(value: number) { this._daggerDmg = value; }
    get grimoireDmg(): number { return this._grimoireDmg; }
    set grimoireDmg(value: number) { this._grimoireDmg = value; }

    // Element DEF
    get heatResistance(): number { return this._heatResistance; }
    set heatResistance(value: number) { this._heatResistance = value; }
    get coldResistance(): number { return this._coldResistance; }
    set coldResistance(value: number) { this._coldResistance = value; }
    get lightningResistance(): number { return this._lightningResistance; }
    set lightningResistance(value: number) { this._lightningResistance = value; }
    get toxinResistance(): number { return this._toxinResistance; }
    set toxinResistance(value: number) { this._toxinResistance = value; }
    get darkResistance(): number { return this._darkResistance; }
    set darkResistance(value: number) { this._darkResistance = value; }
    get lightResistance(): number { return this._lightResistance; }
    set lightResistance(value: number) { this._lightResistance = value; }

    // Weapon DEF
    get swordResistance(): number { return this._swordResistance; }
    set swordResistance(value: number) { this._swordResistance = value; }
    get spearResistance(): number { return this._spearResistance; }
    set spearResistance(value: number) { this._spearResistance = value; }
    get axeResistance(): number { return this._axeResistance; }
    set axeResistance(value: number) { this._axeResistance = value; }
    get bowResistance(): number { return this._bowResistance; }
    set bowResistance(value: number) { this._bowResistance = value; }
    get daggerResistance(): number { return this._daggerResistance; }
    set daggerResistance(value: number) { this._daggerResistance = value; }
    get grimoireResistance(): number { return this._grimoireResistance; }
    set grimoireResistance(value: number) { this._grimoireResistance = value; }


    attack(): void {
        console.log("Attack during action")
    }

    useSkill(): void {
        if (!this.hasEnoughMP(this._mp)) throw new Error("Not enough magic points");

        console.log("Entity Skill action during own turn")
    }

    public takeDamage(amount: number): void {
        if (this.isPositiveValue(amount)) throw new Error("Value must be negative");
        if (this._isAlive && amount >= this._hp) {
            this._isAlive = false
        } else if (this._isAlive && amount < this._hp) {
            this._hp = clamp(this._hp + amount, this._maxHp)
        }
    }

    public heal(amount: number): void {
        if (!this.isPositiveValue(amount)) throw new Error("Value must be positive");
        if (this._isAlive && amount < this._hp) {
            this._hp = clamp(this._hp + amount, this._maxHp)
        }
    }

    public mpRecover(amount: number): void {
        if (this._isAlive && !this.isPositiveValue(amount)) throw new Error("Value must be positive");
    }

    private isPositiveValue(value: number): boolean {
        if (value > 0) {
            return true
        } else {
            return false
        }
    }

    private hasEnoughMP(mp: number): boolean {
        if (mp >= this._mp) {
            return true;
        } else {
            return false;
        }
    }

}