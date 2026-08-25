import { Skill } from "../Skill";
import { GameEntityType } from '@app/core/entities';
import { SkillType, SKILL } from '@app/shared/types';
import { Effect } from "@app/core/effects/Effect";

export abstract class SupportSkill extends Skill {
    constructor(
        protected readonly name: string,
        protected target: GameEntityType,
        protected skillType: SkillType,

        protected _maxBoostLevel: number = 3,
        protected _basePotency: number,                 // Effect Multiplier
        protected _baseMpCost: number,                  // SKills Cost
        protected _currentBoostLevel: number = 0,       // Current Boost Level (0-[maxBoostLevel])

        //Status Effects
        protected _statusEffects: Effect[],       // Status Effects
        protected _duration: number,                   // Skills turns Duration
    ) {
        super(
            name,
            target,
            SKILL.SUPPORT
        )
    }
}