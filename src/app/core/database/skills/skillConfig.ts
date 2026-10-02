import { statusEffectId } from '@src/app/core/database/effects';

export type BP = {
    efficiency: number;
    strength: number;
    speed: number;
}

export interface BoostModifier {
    readonly descriptionPerLevel?: string;
    readonly baseMpCost?: number; // 0
    readonly maxBoostLevel?: number; // 2
    readonly skillMultiplier?: number, // 1
    readonly extraHit?: number // 0
}

export interface SkillEffectRecipe {
    readonly effectId: statusEffectId;
    readonly durationTurns: number;
    readonly target: 'self' | 'target' | 'all_party' | 'all_enemies';

    // Posible Boost Modification 
    readonly increaseDurationPerBoost?: number;
    readonly increasePotencyPerBoost?: number;
}

export interface SkillConfig {
    readonly name: string;
    readonly description: string;
    readonly baseMpCost: number; //0
    readonly maxBoostLevel: number; //2
    readonly skillMultiplier: number, //1
    readonly damageType?: 'physical' | 'magical';

    readonly boost: BoostModifier;
    readonly effectsToApply?: SkillEffectRecipe[];

}