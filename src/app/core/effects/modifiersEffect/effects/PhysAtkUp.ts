import { GameEntity } from "@app/core/entities";
import { MODIFIERS_EFFECTS } from "@app/shared/types";
import { ModifierEffect } from "@app/core/effects/modifiersEffect/ModifierEffect";

export class PhysAtkUp extends ModifierEffect {
    constructor(
        name: string,
        description: string,
        type: MODIFIERS_EFFECTS,
    ) {
        super(name, description, type)
    }

    override apply(target: GameEntity, executor: GameEntity): void { }
}