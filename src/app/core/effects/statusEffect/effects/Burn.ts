import { StatusEffect } from "../StatusEffect";
import { STATUS_EFFECTS } from "@app/shared/types";
import { GameEntity } from "@app/core/entities";
import { DamageCalculator } from "@app/core/system";

export class Burn extends StatusEffect {
    constructor(
        _dmg: number = 100,
        duration: number = 3,
        stack: number = 1,
    ) {
        super(
            "Burn",
            `Deals Heat damage each turn \n
            Stacks: Increase +10% of burn dmg per 5 status burn stack \n`,
            STATUS_EFFECTS.BURN,
            stack,
            duration
        )
    }

    override apply(target: GameEntity, executor: GameEntity): void {
        let dmg: number = this.calculateDmg(executor);

        //_dmg save the result of mag dmg calculator and apply for X turns
    }

    private calculateDmg(executor: GameEntity): number {
        //TODO: refactor create and use DamageCalculator.ts instead of getting base stats

        let mgDmg: number = (executor.magAtk) * 0.25;
        let heatDmg: number = executor.heatDmg;
        let stackMultiplier: number = DamageCalculator.getStackMultiplier(this._stack);
        let totalDmg = mgDmg * stackMultiplier * heatDmg;
        return totalDmg;
    }
}