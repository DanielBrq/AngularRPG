import { StatusEffect } from "@app/core/effects/statusEffect/StatusEffect";
import { STATUS_EFFECTS } from "@app/shared/types";
import { GameEntity } from "@app/core/entities";
import { DamageCalculator } from "@app/core/combat";

export class Burn extends StatusEffect {
    constructor(
        _dmg: number = 100,
        duration: number = 3,
        stack: number = 1,
    ) {
        super(
            "Burn",
            `Deals Heat damage each turn \n
            Stacks: Increases damage by 10% per 5 burn stacks \n`,
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