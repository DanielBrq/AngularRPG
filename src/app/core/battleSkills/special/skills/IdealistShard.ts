import { SpecialSkill } from '../SpecialSkill';
import { CharacterEntity } from '@app/core/entities';
import { i18nTranslation } from '@app/shared/i18n/i18n';

export class IdealistShard extends SpecialSkill {
    constructor(
        target: CharacterEntity,
        private readonly _isSelfTarget: boolean = false,
        private readonly _physAtkPenalty: number = 0.9,
        private readonly _magAtkPenalty: number = 0.9,
        private readonly _speedBonus: number = 2.0,
    ) {
        super(
            'Idealist Shard',
            `Lower self Phys and Mag Damage (-90%) (5 turns).\n
            Raise all group members Speed (+200%) (5 turns).`,
            target,
            [],
            5,
        );
    }

    public getName(): string {
        return i18nTranslation('skills.special.idealistShard.name', {});
    }

    public getDescription(): string {
        return i18nTranslation('skills.special.idealistShard.description', {
            penalty: () => (1 - this._physAtkPenalty) * 100,
            speed: () => this._speedBonus * 100,
            duration: () => this._duration,
        });
    }

    public apply(): void {
        if (this._isSelfTarget) {
            this._target.battleStats.physAtk -= this._physAtkPenalty;
            this._target.battleStats.magAtk -= this._magAtkPenalty;
        }
        this._target.battleStats.speed += this._speedBonus;
    }

    public expire(): void {
        if (this._duration > 0) return;
        if (this._isSelfTarget) {
            this._target.battleStats.physAtk += this._physAtkPenalty;
            this._target.battleStats.magAtk += this._magAtkPenalty;
        }
        this._target.battleStats.speed -= this._speedBonus;
    }
}
