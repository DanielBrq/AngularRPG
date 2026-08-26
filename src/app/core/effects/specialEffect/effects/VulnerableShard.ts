import { SpecialEffect } from '@app/core/effects/';
import { CharacterEntity } from '@app/core/entities';
import { SPECIAL_EFFECTS } from '@app/shared/types';
import { CharacterLabelType } from '@app/shared/types';
import { i18nTranslation } from '@app/shared/i18n/i18n';

export class VulnerableShard extends SpecialEffect {
    constructor(
        target: CharacterEntity,
        private readonly _physDefPenalty: number = 0.4,
        private readonly _magDefPenalty: number = 0.4,
        private readonly _speedBonus: number = 1.2,
    ) {
        super(
            'Vulnerable Shard',
            `Lower self Physical and Magic Defence (-40%) and raise Speed (+120%) (5 turns).`,
            SPECIAL_EFFECTS.VULNERABLE_SHARD,
            target,
            1,
            5,
        );
    }

    public override apply(): void {
        if (!this.OwnerValidation()) throw new Error('Vulnerable Shard can only be applied to the Survivor.');

        this._target.battleStats.physDef -= this._physDefPenalty;
        this._target.battleStats.magDef -= this._magDefPenalty;
        this._target.battleStats.speed += this._speedBonus;
    }

    public override expire(): void {
        if (this._duration > 0) return;
        this._target.battleStats.physDef += this._physDefPenalty;
        this._target.battleStats.magDef += this._magDefPenalty;
        this._target.battleStats.speed -= this._speedBonus;
    }

    private OwnerValidation(): boolean {
        return this._target.id === CharacterLabelType.SURVIVOR.id;
    }
    public getName(): string { return i18nTranslation('effects.special.vulnerableShard.name', {}); }
    public getDescription(): string { return i18nTranslation('effects.special.vulnerableShard.description', { defence: () => this._physDefPenalty * 100, speed: () => this._speedBonus * 100, duration: () => this.duration }); }
}
