import { Effect } from "../Effect";
import { GameEntity } from "@app/core/entities";
import { MODIFIERS_EFFECTS } from "@app/shared/types";

export abstract class ModifierEffect extends Effect {
    constructor(
        name: string,
        description: string,
        protected readonly _duration: number,
    ) {
        super(name, description)
    }

    abstract remove(target: GameEntity): void;

}