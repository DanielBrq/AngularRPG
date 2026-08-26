import { BaseStats, GameEntity, BattleStats } from "@app/core/entities/gameEntity";

export class FoeEntity extends GameEntity {
  constructor(
    readonly id: string,
    readonly name: string,
    isAlive: boolean = true,
    currentLvl: number,

    baseStats: BaseStats,
    battleStats: BattleStats,
  ) {
    super(
      id,
      name,
      isAlive,
      currentLvl,
      baseStats,
      battleStats,
      [],
      [],
    )
  }

  override attack(): void { }

}
