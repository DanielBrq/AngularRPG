import { Effect } from '@app/core/effects/Effect';
import { GameEntityType } from '@app/core/entities';
import { MODIFIERS_EFFECTS, EFFECT_SOURCE } from '@app/shared/types';

export abstract class ModifierEffect extends Effect {
  constructor(
    name: string,
    description: string,
    effect: MODIFIERS_EFFECTS,
    target: GameEntityType,
    source: EFFECT_SOURCE,
    percentValue: number,
  ) {
    super(name, description, effect, target);
  }

  override apply(executor: GameEntityType): void { }

  public modify(target: GameEntityType): void {
  }

  

  //source (trigger) -> ModifierEffect (bridge) -> Entity (character / foe)
}
