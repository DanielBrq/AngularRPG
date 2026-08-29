import { SpecialSkill } from '../SpecialSkill';
import { CharacterEntity } from '@app/core/entities';

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

    public apply(): void {
        if (this._isSelfTarget) {
            this._target.getBattleStats.physAtk -= this._physAtkPenalty;
            this._target.getBattleStats.magAtk -= this._magAtkPenalty;
        }
        this._target.getBattleStats.speed += this._speedBonus;
    }

    public expire(): void {
        if (this._duration > 0) return;
        if (this._isSelfTarget) {
            this._target.getBattleStats.physAtk += this._physAtkPenalty;
            this._target.getBattleStats.magAtk += this._magAtkPenalty;
        }
        this._target.getBattleStats.speed -= this._speedBonus;
    }
}
