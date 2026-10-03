import { statusEffectId } from '@src/app/core/effects/databases/effectDatabase';
import { World } from '@src/app/core/World';

export type BP = {
    efficiency: number,
    strength: number,
    speed: number
}

export interface SkillBoostModifier {
    readonly MpCost?: number;
    readonly maxBoostLevel?: number;
    readonly skillMultiplier?: number,
    readonly extraHit?: number
}

export interface SkillContext {
    world: World,
    skillId: string,
    casterId: number,
    targets: number[],
    bp: BP
}

export interface SkillEffectRecipe {
    readonly effectId: statusEffectId;
    readonly durationTurns: number;
    readonly target: 'self' | 'target' | 'all_party' | 'all_enemies';
    // Posible Boost Modification 
    readonly increaseDurationPerBoost?: number;
    readonly increasePotencyPerBoost?: number;
}

export interface SkillData {
    readonly name: string;
    readonly description: string;
    readonly baseMpCost: number;
    readonly baseMaxBoostLevel: number; // Max BP point can be spended
    readonly baseSkillMultiplier: number, // 1 = base damage / potency
    readonly skillSpeedMultiplier: number, // 1 = base speed
    readonly damageType?: 'physical' | 'magical';

    readonly boost: SkillBoostModifier;
    readonly effectsToApply?: SkillEffectRecipe[];

}