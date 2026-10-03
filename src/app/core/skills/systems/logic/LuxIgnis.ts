import { MAGICAL_SKILLS } from "@src/app/core/skills/databases/magicalSkill";
import { SkillContext } from "@src/app/core/skills/databases/skillConfig";
import { SkillsSystem } from "@src/app/core/skills/systems/SkillsSystem";

export class LuxIgnis {

    public static execute(ctx: SkillContext): void {
        const { world, casterId, targets, bp } = ctx;
        const skillData = MAGICAL_SKILLS['LUX_IGNIS'];

        // Load caster needed components
        //  #let var for caster dynamic stats (dynamic battle time) by entityId
        //  #let var for caster MP component


        // Load target needed components
        //  #let var for target dynamic stats (on battle time) by entityId
        //  #let var for target skills (dynamic battle time) by entityId





        //const sourceStats = world.getComponent(casterId, Stats);
        //const sourceSkills = world.getComponent(casterId, SkillsSystem);


        // Damage calculation, TODO: create or migrate the damage calculator later.

        //Apply effects



    }

    public static previewDescription(ctx: SkillContext): {
        skillDescription: string, finalMpCost: number, finalSkillMultiplier: number, finalSpeedMultiplier: number
    } {
        const { bp, casterId, skillId } = ctx;

        // In this case this skill doesn't have any special modifiers, so there is no need to modify the description.
        let skillDescription: string = MAGICAL_SKILLS[skillId].description;

        // This values will be use to display in the HUD before casting the skill.
        const { finalMpCost, finalSkillMultiplier, finalSpeedMultiplier } = SkillsSystem.calculateBoost(ctx);

        return { skillDescription, finalMpCost, finalSkillMultiplier, finalSpeedMultiplier };
    }

}