import { SpecialSkill } from './SpecialSkill';
import { CharacterEntity } from '@app/core/entities';
import { SKILL } from '@app/shared/types';
import { MonarchShard } from '@app/core/effects/specialEffect/effects/MonarchShard';
import { MercylessShard } from '@app/core/effects/specialEffect/effects/MercylessShard';
import { VulnerableShard } from '@app/core/effects/specialEffect/effects/VulnerableShard';
import { IdealistShard } from '@app/core/effects/specialEffect/effects/IdealistShard';
import { CharacterLabelType } from '@app/shared/types';

export class ShardedSoul extends SpecialSkill {
    constructor(
        target: CharacterEntity,
    ) {
        super(
            'Sharded Soul',
            target,
            SKILL.SPECIAL,
            [],
            5,
        );
    }

    public activateMonarchMode(partyMembers: CharacterEntity[]): MonarchShard[] {
        this.validateOwner();
        const shards: MonarchShard[] = [];

        for (const member of partyMembers) {
            const shard = new MonarchShard(member);
            shard.apply();
            shards.push(shard);
        }
        return shards;
    }

    public activateMercylessMode(): MercylessShard {
        this.validateOwner();
        const shard = new MercylessShard(this._target as CharacterEntity);
        shard.apply();
        return shard;
    }

    public activateVulnerableMode(): VulnerableShard {
        this.validateOwner();
        const shard = new VulnerableShard(this._target as CharacterEntity);
        shard.apply();
        return shard;
    }

    public activateIdealistMode(partyMembers: CharacterEntity[]): IdealistShard[] {
        this.validateOwner();
        const shards: IdealistShard[] = [];

        for (const member of partyMembers) {
            const isSelf = member.id === CharacterLabelType.SURVIVOR.id;
            const shard = new IdealistShard(member, isSelf);
            shard.apply();
            shards.push(shard);
        }
        return shards;
    }

    private validateOwner(): void {
        if (this._target.id !== CharacterLabelType.SURVIVOR.id) {
            throw new Error('Sharded Soul can only be used by the Survivor.');
        }
    }
}
