import { SpecialSkill } from '../SpecialSkill';
import { CharacterEntity } from '@app/core/entities';
import { CharactersMetadata } from '@app/shared/types';

export class MercylessShard extends SpecialSkill {
    constructor(
        target: CharacterEntity,
        private readonly _physAtkBonus: number = 1.0,
    ) {
        super(
            'Mercyless Shard',
            `Raise self Physical Damage (+100%) (5 turns).`,
            target,
            [],
            5,
        );
    }

    public apply(): void {
        if (!this.OwnerValidation()) throw new Error('Mercyless Shard can only be applied to the Survivor.');

        this._target.getBattleStats.physAtk += this._physAtkBonus;
    }

    public expire(): void {
        if (this._duration > 0) return;
        this._target.getBattleStats.physAtk -= this._physAtkBonus;
    }

    private OwnerValidation(): boolean {
        return this._target.id === CharactersMetadata.SURVIVOR.id;
    }
}
