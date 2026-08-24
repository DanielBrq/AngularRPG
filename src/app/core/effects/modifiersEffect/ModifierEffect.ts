import { Effect } from "@app/core/effects/Effect";
import { GameEntity } from "@app/core/entities";
import { MODIFIERS_EFFECTS } from "@app/shared/types";

export abstract class ModifierEffect extends Effect {
    constructor(
        name: string,
        description: string,
        type: MODIFIERS_EFFECTS,
        intValue?: number,
        decimalValue?: number,
    ) {
        super(name, description, type)
    }

    override apply(starget: GameEntity, executor: GameEntity): void { }



}