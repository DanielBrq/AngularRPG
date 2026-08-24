import { BaseStats, BuildStats, DynamicsStats, GameEntity } from "@app/core/entities/gameEntity";

export abstract class CharacterEntity extends GameEntity {
  constructor(
    readonly id: string,
    readonly name: string,
    isAlive: boolean = true,
    currentLvl: number,
    baseStats: BaseStats,
    dynamicStats: DynamicsStats,

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
      dynamicStats,
    )
  }

  public get buildStats(): BuildStats {
    return this.buildStats;
  }

}
