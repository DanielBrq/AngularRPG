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
        statusEffects: Effect[] = [],
        duration: number = 1,
        skillOwner: GameEntityType = target,
        speed: number = 0,
        maxBoostLevel: number = 2,
        baseMpCostOriginal: number = 0,
        skillMultiplierOriginal: number = 1,
        currentBoostLevelOriginal: number = 1,
        baseMpCost: number = 0,
        skillMultiplier: number = 1,
        currentBoostLevel: number = 1,
    ) {
        super(
            name,
            description,
            target,
            skillOwner,
            speed,
            SKILL.SPECIAL,
            maxBoostLevel,
            baseMpCostOriginal,
            skillMultiplierOriginal,
            currentBoostLevelOriginal,
            baseMpCost,
            skillMultiplier,
            currentBoostLevel,
        );
        this._statusEffects = statusEffects;
        this._duration = duration;
    }
}
