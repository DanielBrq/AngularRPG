import { Effect } from "@app/core/effects/Effect";
import { GameEntity } from "@app/core/entities";
import { MODIFIERS_EFFECTS, EFFECT_SOURCE } from "@app/shared/types";

export type modifierOperationType = 'add' | 'multiply';


export abstract class ModifierEffect extends Effect {
    constructor(
        name: string,
        description: string,
        source: EFFECT_SOURCE,
        effect: MODIFIERS_EFFECTS,
        value: number,
        operation: modifierOperationType,
    ) {
        super(name, description, effect)
    }

    override apply(starget: GameEntity, executor: GameEntity): void { }

    //source (trigger) -> ModifierEffect (bridge) -> Entity (character / foe)
}