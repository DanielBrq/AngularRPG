import { GameEntity } from "@app/core/entities";

export abstract class Effect {
    constructor(
        protected readonly _name: string,
        protected readonly _description: string,
    ) { }
    
    abstract apply(target: GameEntity): void;
}