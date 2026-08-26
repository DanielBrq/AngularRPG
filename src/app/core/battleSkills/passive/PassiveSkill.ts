import { Effect } from "@app/core/effects/Effect";
import { Skill } from "../Skill";
import { GameEntityType } from '@app/core/entities';
import { SkillType, SKILL } from '@app/shared/types';

export abstract class PassiveSkill extends Skill {
    constructor(
        protected readonly name: string,
        protected target: GameEntityType,
        protected skillType: SkillType,

        protected _statusEffects: Effect[],
    ) {
        super(
            name,
            '',
            target,
            SKILL.PASSIVE
        )
    }

}
