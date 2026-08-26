import { StatusEffect } from '@app/core/effects/statusEffect/StatusEffect';
import { STATUS_EFFECTS } from '@app/shared/types';
import { GameEntityType } from '@app/core/entities';
import { i18nTranslation } from '@app/shared/i18n/i18n';

export class Paralysis extends StatusEffect {
  constructor(
    duration: number = 2,
    stack: number = 1,
    entity: GameEntityType
  ) {
    super(
      'Paralysis',
      'Chance to make target unable to act',
      STATUS_EFFECTS.PARALYSIS,
      entity,
      stack,
      duration,
    );
  }

  override apply(target: GameEntityType): void {
    // 30% Skip turn action
  }

  override expire(): void { }

  public getName(): string { return i18nTranslation('effects.status.paralysis.name', {}); }
  public getDescription(): string { return i18nTranslation('effects.status.paralysis.description', {}); }
}
