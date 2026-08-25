import { BaseStats, BuildStats, GameEntity, BattleStats } from "@app/core/entities/gameEntity";

export abstract class CharacterEntity extends GameEntity {
  constructor(
    readonly id: string,
    readonly name: string,
    isAlive: boolean = true,
    currentLvl: number,
    baseStats: BaseStats,
    battleStats: BattleStats,

    protected _buildStats: BuildStats,
    protected _currentExp: number,
    protected _expToNextLevel: number,
  ) {
    super(
      id,
      name,
      isAlive,
      currentLvl,
      baseStats,
      battleStats,
    )
  }

  public get buildStats(): BuildStats {
    return this.buildStats;
  }

}
