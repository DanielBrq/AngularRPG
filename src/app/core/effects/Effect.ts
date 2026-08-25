import { GameEntityType } from '@app/core/entities';

export abstract class Effect {
  constructor(
    protected readonly _name: string,
    protected readonly _description: string,
    protected readonly _effect: string,
    protected _target: GameEntityType,
  ) { }

  abstract apply(target: GameEntityType): void;
}
