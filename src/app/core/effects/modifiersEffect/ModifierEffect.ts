import { Effect } from "../Effect";
import { GameEntity } from "@app/core/entities";
import { MODIFIERS_EFFECTS } from "@app/shared/types";

export abstract class ModifierEffect extends Effect {
    constructor(
        name: string, description: string, type: MODIFIERS_EFFECTS,
    ) {
        super(name, description, type)
    }

    override apply(starget: GameEntity, executor: GameEntity): void { }
}