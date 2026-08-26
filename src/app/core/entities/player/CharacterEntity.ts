import { BaseStats, BuildStats, GameEntity, BattleStats } from "@app/core/entities/gameEntity";
import { Skill } from '@app/core/battleSkills/Skill';
import { Item } from "@app/core/items";
import { Effect } from "@app/core/effects/Effect";

export abstract class CharacterEntity extends GameEntity {
  constructor(
    readonly id: string,
    readonly name: string,
    isAlive: boolean = true,
    currentLvl: number,
    baseStats: BaseStats,
    battleStats: BattleStats,
    skills: Skill[] = [],
    effects: Effect[],

    protected _buildStats: BuildStats,
    protected _currentExp: number,
    protected _expToNextLevel: number,
    protected _weapon: Item,
    protected _helmet: Item,
    protected _chest: Item,
    protected _ring: Item,
    protected _belt: Item,
    protected _boots: Item,

  ) {
    super(
      id,
      name,
      isAlive,
      currentLvl,
      baseStats,
      battleStats,
      skills,
      effects,
    )
  }

  public get buildStats(): BuildStats { return this.buildStats }

  // Getters
  get helmet(): Item { return this._helmet }
  get chest(): Item { return this._chest }
  get ring(): Item { return this._ring }
  get belt(): Item { return this._belt }
  get boots(): Item { return this._boots }
  get weapon(): Item { return this._weapon }
}
