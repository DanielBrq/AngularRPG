import { GameEntity } from "@app/core/entities";

export abstract class Effect {
    constructor(
        protected readonly _name: string,
        protected readonly _description: string,
        protected readonly _type: string,
    ) { }

    abstract apply(target: GameEntity, executor?: GameEntity): void;
}