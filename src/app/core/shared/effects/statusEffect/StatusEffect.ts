import { Effect } from "../Effect";
import { GameEntity } from "@app/core/entities";
import { STATUS_EFFECTS } from "@app/shared/types";

export abstract class StatusEffect extends Effect {
    constructor(
        name: string,
        description: string,
        protected readonly _duration: number,
    ) {
        super(name, description)
    }

    abstract update(target: GameEntity): void;
    abstract isExpired(): boolean;

}