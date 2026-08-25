import { BaseStats, BuildStats, GameEntity, BattleStats } from "@app/core/entities/gameEntity";
import { Skill } from '@app/core/battleSkills/Skill';
import { Item } from "@app/core/items";

export abstract class CharacterEntity extends GameEntity {
  constructor(
    readonly id: string,
    readonly name: string,
    isAlive: boolean = true,
    currentLvl: number,
    baseStats: BaseStats,
    battleStats: BattleStats,
    skills: Skill[] = [],

    protected _buildStats: BuildStats,
    protected _currentExp: number,
    protected _expToNextLevel: number,
    protected _equipment: Item[] = [],

  ) {
    super(
      id,
      name,
      isAlive,
      currentLvl,
      baseStats,
      battleStats,
      skills,
    )
  }

  public get buildStats(): BuildStats {
    return this.buildStats;
  }

}
