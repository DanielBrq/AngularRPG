import { PassiveEffect } from '@app/core/effects/passiveEffect/PassiveEffect';
import { GameEntity } from '@app/core/entities';
import { PASSIVE_EFFECTS } from '@app/shared/types';

export class SurvivalInstinct extends PassiveEffect {
  constructor(name: string, description: string, type: PASSIVE_EFFECTS) {
    super(
      'Survival Instinct',
      `Increase Physical Damage (25%), Critical Chance (70%), \n
             Critical Damage (30%) and Speed (30%) \n
             while HP is lower than 30%`,
      PASSIVE_EFFECTS.SURVIVAL_INSTINCT,
    );
  }

  override apply(target: GameEntity, executor: GameEntity): void {}
  //TODO: Events system pub, sub
}
