import { Effect } from '@app/core/effects/Effect';
import { clamp, GameEntity, CharacterEntity, FoeEntity, GameEntityType } from '@app/core/entities';
import { STATUS_EFFECTS } from '@app/shared/types';

export abstract class StatusEffect extends Effect {
  constructor(
    name: string,
    description: string,
    effect: STATUS_EFFECTS,
    target: GameEntityType,
    protected _stack: number,
    protected _duration: number,
  ) {
    super(name, description, effect, target);
  }

  override apply(target: GameEntity | CharacterEntity | FoeEntity): void { }

  increaseDuration(turns: number = 1): void {
    this._duration = clamp(this._duration + turns, 9);
  }

  decreaseDuration(turns: number = 1): void {
    this._duration = clamp(this._duration - turns, 9);
  }

  expire(): void { }

  isExpired(): boolean {
    if (this._duration > 0) {
      return false;
    } else {
      return true;
    }
  }
}
