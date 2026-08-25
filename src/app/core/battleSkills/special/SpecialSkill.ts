import { Effect } from "@app/core/effects/Effect";
import { Skill } from "../Skill";
import { GameEntityType } from '@app/core/entities';
import { SkillType, SKILL } from '@app/shared/types';

export abstract class SpecialSkill extends Skill {
    constructor(
        protected readonly name: string,
        protected target: GameEntityType,
        protected skillType: SkillType,

        //Status Effects
        protected _statusEffects: Effect[],
        protected _duration: number,
    ) {
        super(
            name,
            target,
            SKILL.SPECIAL
        )
    }
}