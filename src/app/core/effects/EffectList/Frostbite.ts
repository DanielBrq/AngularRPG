import { Effect } from '@app/core/effects/Effect';
import { STATUS_EFFECTS } from '@app/shared/types';
import { GameEntityType } from '@app/core/entities';
import { i18nTranslation } from '@app/shared/i18n/i18n';

export class Frostbite extends Effect {
  constructor(
    duration: number = 2,
    stack: number = 1,
    target: GameEntityType,
  ) {
    super(
      'Frostbite',
      `Reduces target speed by 5% (max 30%) \n
            Increases damage by 5% per 5 frostbite stacks`,
      STATUS_EFFECTS.FROSTBITE,
      target,
      stack,
      duration,
    );
  }

  override apply(target: GameEntityType): void {
    // Lower target speed by 20%
  }

  override expire(): void { }

  public getName(): string { return i18nTranslation('effects.status.frostbite.name', {}); }
  public getDescription(): string { return i18nTranslation('effects.status.frostbite.description', {}); }
}
