import { Effect } from '@app/core/effects/Effect';
import { GameEntityType } from '@app/core/entities';
import { MODIFIERS_EFFECTS, EFFECT_SOURCE } from '@app/shared/types';

// From Equipment
export abstract class ModifierEffect extends Effect {
  constructor(
    name: string,
    description: string,
    effect: MODIFIERS_EFFECTS,
    target: GameEntityType,
    stack: number,
    duration: number,
    protected source: EFFECT_SOURCE,
    protected percentValue: number,
  ) {
    super(
      name,
      description,
      effect,
      target,
      stack,
      duration,
    );
  }

  override apply(executor: GameEntityType): void { }

  public modify(target: GameEntityType): void {
  }



  //source (trigger) -> ModifierEffect (bridge) -> Entity (character / foe)
}
