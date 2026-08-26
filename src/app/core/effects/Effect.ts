import { GameEntityType } from '@app/core/entities/gameEntity';
import { clamp } from '@app/shared/utils';
import { STATUS_EFFECTS, MODIFIERS_EFFECTS, PASSIVE_EFFECTS, SPECIAL_EFFECTS } from '@app/shared/types/EffectTypes';

export type EffectType = STATUS_EFFECTS | MODIFIERS_EFFECTS | PASSIVE_EFFECTS | SPECIAL_EFFECTS;

export abstract class Effect {
  constructor(
    protected readonly _name: string,
    protected readonly _description: string,
    protected readonly _effect: EffectType,
    protected _target: GameEntityType,
    protected _stack: number,
    protected _duration: number,
  ) { }

  abstract apply(target: GameEntityType): void;
  abstract expire(): void;

  public get getEffect(): EffectType {
    return this._effect;
  }

  public increaseDuration(turns: number = 1): void {
    this._duration = clamp(this._duration + turns, 9);
  }

  public decreaseDuration(turns: number = 1): void {
    this._duration = clamp(this._duration - turns, 9);
  }

  public isExpired(): boolean {
    if (this._duration > 0) {
      return false;
    } else {
      return true;
    }
  }

}
