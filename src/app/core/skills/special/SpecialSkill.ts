import { Effect } from "@app/core/effects/Effect";
import { Skill } from "../Skill";
import { GameEntityType } from '@app/core/entities';
import { SKILL } from '@app/shared/types';

export abstract class SpecialSkill extends Skill {
    protected _statusEffects: Effect[];
    protected _duration: number;

    constructor(
        protected readonly name: string,
        protected description: string,
        protected target: GameEntityType,
        statusEffects: Effect[],
        duration: number,
    ) {
        super(
            name,
            description,
            target,
            SKILL.SPECIAL
        );
        this._statusEffects = statusEffects;
        this._duration = duration;
    }
}
