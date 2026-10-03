import { Skills } from "@src/app/core/skills/components/Skills";
import { World } from "@src/app/core/World";
import { SkillContext, SkillData } from "../databases";
import { MAGICAL_SKILLS } from "@src/app/core/skills/databases/magicalSkill";
import { PHYSICAL_SKILLS } from "@src/app/core/skills/databases/physicalSkill";

export class SkillsSystem {

    public static calculateBoost(ctx: SkillContext)
        : { finalMpCost: number, finalSkillMultiplier: number, finalSpeedMultiplier: number } {

        const { skillId, bp } = ctx;
        const skillData: SkillData = MAGICAL_SKILLS[skillId] ?? PHYSICAL_SKILLS[skillId];

        const verifySpendedBP = bp.efficiency + bp.strength + bp.speed;
        if (verifySpendedBP > skillData.baseMaxBoostLevel && skillData.baseMaxBoostLevel < 1) throw new Error('maxBoostLevel must be between 1 and ' + skillData.baseMaxBoostLevel);

        let RemainingBP: number = verifySpendedBP;
        let mpCostMultiplier: number = 1; // Lower is better
        let skillMultiplier: number = 1; // Higher is better
        let speedMultiplier: number = 1; // Higher is better

        if (bp.efficiency && bp.efficiency <= RemainingBP) {
            mpCostMultiplier -= bp.efficiency * 0.1; // Save 10% mp cost per BP
            skillMultiplier -= bp.efficiency * 0.1; // Trade off: Reduce skill multiplier 10% per BP
            speedMultiplier -= bp.efficiency * 0.1; // Trade off: Reduce speed multiplier 10% per BP
            RemainingBP -= bp.efficiency;   // Remove BP spended
        }
        if (bp.strength && bp.strength <= RemainingBP) {
            skillMultiplier += bp.strength * 0.1; // Increase 10% skill multiplier per BP
            mpCostMultiplier += bp.strength * 0.1; // Trade off: Increase mp cost 10% per BP
            speedMultiplier -= bp.strength * 0.1; // Trade off: Reduce speed multiplier 10% per BP
            RemainingBP -= bp.strength;   // Remove BP spended
        }
        if (bp.speed && bp.speed <= RemainingBP) {
            speedMultiplier += bp.speed * 0.1; // Increase 10% speed multiplier per BP
            mpCostMultiplier += bp.speed * 0.1; // Trade off: Increase mp cost 10% per BP
            skillMultiplier -= bp.speed * 0.1; // Trade off: Reduce skill multiplier 10% per BP
            RemainingBP -= bp.speed;   // Remove BP spended
        }

        return {
            finalMpCost: skillData.baseMpCost * mpCostMultiplier,
            finalSkillMultiplier: skillData.baseSkillMultiplier * skillMultiplier,
            finalSpeedMultiplier: skillData.skillSpeedMultiplier * speedMultiplier
        }
    }

    public static addSkill(world: World, entityId: number, skillId: string): void {
        const skills = world.getComponent(entityId, Skills);

        if (!skills) return;

        if (!skills.skillsRepository.includes(skillId)) {
            skills.skillsRepository.push(skillId);
        }
    }

    public static removeSkill(world: World, entityId: number, skillId: string): void {
        const skills = world.getComponent(entityId, Skills);

        if (!skills) return;

        skills.skillsRepository =
            skills.skillsRepository.filter(id => id !== skillId);

        skills.equippedSkills =
            skills.equippedSkills.filter(id => id !== skillId);

        skills.passiveSkills =
            skills.passiveSkills.filter(id => id !== skillId);
    }

    public static equipSkill(world: World, entityId: number, skillId: string): void {
        const skills = world.getComponent(entityId, Skills);

        if (!skills) return;

        if (
            skills.skillsRepository.includes(skillId) &&
            !skills.equippedSkills.includes(skillId)
        ) {
            skills.equippedSkills.push(skillId);
        }
    }

    public static unequipSkill(world: World, entityId: number, skillId: string): void {
        const skills = world.getComponent(entityId, Skills);

        if (!skills) return;

        skills.equippedSkills =
            skills.equippedSkills.filter(id => id !== skillId);
    }

    public static equipPassiveSkill(world: World, entityId: number, skillId: string): void {
        const skills = world.getComponent(entityId, Skills);

        if (!skills) return;

        if (
            skills.skillsRepository.includes(skillId) &&
            !skills.passiveSkills.includes(skillId)
        ) {
            skills.passiveSkills.push(skillId);
        }
    }

    public static unequipPassiveSkill(world: World, entityId: number, skillId: string): void {
        const skills = world.getComponent(entityId, Skills);

        if (!skills) return;

        skills.passiveSkills =
            skills.passiveSkills.filter(id => id !== skillId);
    }
}