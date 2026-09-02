import { Skill, BP } from '@src/app/core/skills/Skill';
import { GameEntityType } from '@src/app/core/entities';
import { CharactersMetadata, SKILL } from '@src/app/shared/types';
import { IdealistShardEffect } from '@src/app/core/effects';

export class IdealistShard extends Skill {
    private readonly _effectInstance: IdealistShardEffect;
    constructor(
        target: GameEntityType,
        skillOwner: GameEntityType,
        isSelfTarget: boolean = false,
        duration: number = 5,
        maxBoostLevel: number = 2,
        baseMpCost: number = 0,
        skillMultiplier: number = 1,
    ) {
        const idealistShardEffect = new IdealistShardEffect(
            target,
            duration,
            1,
            isSelfTarget,
        );
        super(
            'Idealist Shard',
            'Lower self Phys and Mag Damage (-50%) (3 turns).\nRaise all group members Speed (+150%) (5 turns).',
            target,
            skillOwner,
            SKILL.SPECIAL,
            [idealistShardEffect],
            maxBoostLevel,
            baseMpCost,
            skillMultiplier,
        );
        this._effectInstance = idealistShardEffect;
    }

    public override getDescription(efficiencyBP: number = 0, strengthBP: number = 0, speedBP: number = 0): string {
        const boost = this.calculateBoost(efficiencyBP, strengthBP, speedBP);

        return `Raise all group members Speed (+${boost.speedBonus * 100}%) (${boost.duration} turns).\n
          Lower self Phys defense (${100 - (boost.physDefPenalty * 100)}%) and Mag defense (${100 - (boost.magDefPenalty * 100)}%) (${boost.duration} turns).\n
          Mp cost: ${boost.mpCost}`;
    }

    private calculateBoost(efficiencyBP: number, strengthBP: number, speedBP: number): {
        physDefPenalty: number;
        magDefPenalty: number;
        speedBonus: number;
        mpCost: number;
        duration: number;
    } {
        const boost = this.previewSkillBoostResult(efficiencyBP, strengthBP, speedBP);
        const effects = this._effectInstance.getBaseEffects();

        const physDefPenalty = effects.physDefPenalty + boost.skillMultiplier;
        const magDefPenalty = effects.magDefPenalty + boost.skillMultiplier;
        const speedBonus = effects.speedBonus + boost.speedMultiplier;
        const mpCost = Math.round(this._baseMpCost / (1 - boost.mpCostMultiplier));

        let duration: number = effects.duration;
        if (strengthBP > 0) { duration += strengthBP }

        return {
            physDefPenalty,
            magDefPenalty,
            speedBonus,
            mpCost,
            duration
        };
    }

    private isSpendingBoost(efficiencyBP: number, strengthBP: number, speedBP: number): boolean {
        if (efficiencyBP && efficiencyBP > 0) return true;
        if (strengthBP && strengthBP > 0) return true;
        if (speedBP && speedBP > 0) return true;

        return false;
    }

    public override execute(team: GameEntityType[], bp?: BP): void {
        //filter dead allies
        const aliveTeam: GameEntityType[] = team.filter(entity => entity.isAlive);
        this.preventDeadTarget(team.find(entity => !entity.isAlive));

        //Avoid stack same effect
        const hasEffect = aliveTeam.some(entity => entity.getEntityEffects.some(effect => effect.getEffect === this._effectInstance.getEffect));
        if (hasEffect) throw new Error('Idealist Shard is already applied to the team');

        if (this._skillOwner.getId !== CharactersMetadata.SURVIVOR.id) throw new Error('Idealist Shard can only be applied by the Survivor.');

        //If boost, apply boost
        const isSpendingBoost = bp && this.isSpendingBoost(bp.efficiency, bp.strength, bp.speed);
        if (isSpendingBoost && bp) this._effectInstance.applyBoost(bp.efficiency, bp.strength, bp.speed)
        const finalMpCost = this.calculateBoost(bp?.efficiency ?? 0, bp?.strength ?? 0, bp?.speed ?? 0).mpCost;

        if (this._skillOwner.getBattleStats.mp < finalMpCost) throw new Error('Not enough MP');
        this._skillOwner.getBattleStats.mp -= finalMpCost;

        aliveTeam.forEach((aliveTeam) => {
            aliveTeam.setEntityEffects = this._effectInstance;
            this._effectInstance.apply(aliveTeam);
        });
    }
}
