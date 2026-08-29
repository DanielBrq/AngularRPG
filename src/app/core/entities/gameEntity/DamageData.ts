import { DamageType } from "@app/shared";

export class DamageWeaknessData {
    constructor(
        public readonly _damageBasedOn: DamageType,                     // Original damage source
        private _innateExploitableWeakness: DamageType[] = [],          // Innate weaknesses
        private _extraExploitableWeakness: DamageType[] = []            // Granted by skills or effects.
    ) { }

    public setInnateExploit(wp: DamageType) {
        if (this.hasExploit(wp)) throw new Error("The entity already had this Weak Point: " + wp);
        this._innateExploitableWeakness.push(wp);
    }

    public setExtraExploit(wp: DamageType) {
        if (this.hasExploit(wp)) throw new Error("The entity already exploits " + wp);
        this._extraExploitableWeakness.push(wp);
    }

    public removeExtraExploit(wp: DamageType) {
        const index = this._extraExploitableWeakness.indexOf(wp);
        if (index === -1) throw new Error("The entity does not exploit " + wp);
        this._extraExploitableWeakness.splice(index, 1);
    }

    public hasExploit(wp: DamageType): boolean {
        return this._innateExploitableWeakness.includes(wp)
            || this._extraExploitableWeakness.includes(wp);
    }

    // Union of both sources, what DamageCalculator consumes
    public get exploitableWeaknesses(): DamageType[] {
        return [...new Set([...this._innateExploitableWeakness, ...this._extraExploitableWeakness])];
    }
}
