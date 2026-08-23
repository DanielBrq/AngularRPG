import { clamp } from '@app/core/entities/utils';

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

        protected _critProb: number = 0.1,
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

    // public modifyStat(): void {
        
    // }

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