import { SpecialEffect } from '@app/core/effects/';
import { CharacterEntity } from '@app/core/entities';
import { SPECIAL_EFFECTS } from '@app/shared/types';
import { CharacterLabelType } from '@app/shared/types';
import { i18nTranslation } from '@app/shared/i18n/i18n';

export class MercylessShard extends SpecialEffect {
    constructor(
        target: CharacterEntity,
        private readonly _physAtkBonus: number = 1.0,
    ) {
        super(
            'Mercyless Shard',
            `Raise self Physical Damage (+100%) (5 turns).`,
            SPECIAL_EFFECTS.MERCYLESS_SHARD,
            target,
            1,
            5,
        );
    }

    public override apply(): void {
        if (!this.OwnerValidation()) throw new Error('Mercyless Shard can only be applied to the Survivor.');

        this._target.battleStats.physAtk += this._physAtkBonus;
    }

    public override expire(): void {
        if (this._duration > 0) return;
        this._target.battleStats.physAtk -= this._physAtkBonus;
    }

    private OwnerValidation(): boolean {
        return this._target.id === CharacterLabelType.SURVIVOR.id;
    }
    public getName(): string { return i18nTranslation('effects.special.mercylessShard.name', {}); }
    public getDescription(): string { return i18nTranslation('effects.special.mercylessShard.description', { attack: () => this._physAtkBonus * 100, duration: () => this.duration }); }
}
