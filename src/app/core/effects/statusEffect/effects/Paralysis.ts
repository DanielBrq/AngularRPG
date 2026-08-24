import { StatusEffect } from "@app/core/effects/statusEffect/StatusEffect";
import { STATUS_EFFECTS } from "@app/shared/types";
import { GameEntity } from "@app/core/entities";

export class Paralysis extends StatusEffect {
    constructor(
        duration: number = 2,
        stack: number = 1,
    ) {
        super(
            "Paralysis",
            'Chance to make target unable to act',
            STATUS_EFFECTS.PARALYSIS,
            stack,
            duration
        )
    }

    override apply(target: GameEntity, executor: GameEntity): void {
        // 30% Skip turn action
    }
}