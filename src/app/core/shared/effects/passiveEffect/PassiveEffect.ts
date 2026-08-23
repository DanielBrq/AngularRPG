import { Effect } from "../Effect";
import { GameEntity } from "@app/core/entities";
import { PASSIVES_EFFECTS } from "@app/shared/types";

export abstract class PassiveEffect extends Effect {
    constructor(
        name: string,
        description: string,
        protected readonly _duration: number,
    ) {
        super(name, description)
    }



}