import { SpecialSkill } from '../SpecialSkill';
import { CharacterEntity } from '@app/core/entities';
import { CharacterLabelType } from '@app/shared/types';
import { i18nTranslation } from '@app/shared/i18n/i18n';

export class VulnerableShard extends SpecialSkill {
    constructor(
        target: CharacterEntity,
        private readonly _physDefPenalty: number = 0.4,
        private readonly _magDefPenalty: number = 0.4,
        private readonly _speedBonus: number = 1.2,
    ) {
        super(
            'Vulnerable Shard',
            `Lower self Physical and Magic Defence (-40%) and raise Speed (+120%) (5 turns).`,
            target,
            [],
            5,
        );
    }

    public apply(): void {
        if (!this.OwnerValidation()) throw new Error('Vulnerable Shard can only be applied to the Survivor.');

        this._target.getBattleStats.physDef -= this._physDefPenalty;
        this._target.getBattleStats.magDef -= this._magDefPenalty;
        this._target.getBattleStats.speed += this._speedBonus;
    }

    public expire(): void {
        if (this._duration > 0) return;
        this._target.getBattleStats.physDef += this._physDefPenalty;
        this._target.getBattleStats.magDef += this._magDefPenalty;
        this._target.getBattleStats.speed -= this._speedBonus;
    }

    private OwnerValidation(): boolean {
        return this._target.id === CharacterLabelType.SURVIVOR.id;
    }
    public getName(): string { return i18nTranslation('skills.special.vulnerableShard.name', {}); }
    public getDescription(): string { return i18nTranslation('skills.special.vulnerableShard.description', { defence: () => this._physDefPenalty * 100, speed: () => this._speedBonus * 100, duration: () => this._duration }); }
}
