import { Effect } from '@app/core/effects/Effect';
import { CharacterEntity, GameEntity } from '@app/core/entities';
import { MODIFIERS_EFFECTS, EFFECT_SOURCE } from '@app/shared/types';

export type modifierOperationType = 'add' | 'multiply';

export abstract class ModifierEffect extends Effect {
  constructor(
    name: string,
    description: string,
    effect: MODIFIERS_EFFECTS,
    source: EFFECT_SOURCE,
    value: number,
    operation: modifierOperationType,
  ) {
    super(name, description, effect);
  }

  override apply(target: GameEntity, executor: GameEntity): void { }

  public modify(target: CharacterEntity): void {
    
  }

  //source (trigger) -> ModifierEffect (bridge) -> Entity (character / foe)
}
