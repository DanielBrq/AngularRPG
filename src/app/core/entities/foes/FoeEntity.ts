import { GameEntity } from '@app/core/entities/gameEntity/GameEntity';

export class FoeEntity extends GameEntity {
  constructor(
    id: string,
    name: string,
    currentLvl: number,

    hp: number,
    maxHp: number,
    isAlive: boolean,
    speed: number,

    physAtk: number,
    physDef: number,

    critChance: number,
    critDmg: number,

    magAtk: number,
    magDef: number,
    mp: number,

    heatAtk: number,
    coldAtk: number,
    lightningAtk: number,
    toxinAtk: number,
    darkAtk: number,
    lightAtk: number,

    heatResistance: number,
    coldResistance: number,
    lightningResistance: number,
    toxinResistance: number,
    darkResistance: number,
    lightResistance: number,

    swordDmg: number,
    spearDmg: number,
    axeDmg: number,
    daggerDmg: number,

    swordResistance: number,
    spearResistance: number,
    axeResistance: number,
    daggerResistance: number,
    grimoireResistance: number,
  ) {
    super(
      id,
      name,
      currentLvl,
      hp,
      maxHp,
      isAlive,
      speed,
      physAtk,
      physDef,
      critChance,
      critDmg,
      magAtk,
      magDef,
      mp,
      heatAtk,
      coldAtk,
      lightningAtk,
      toxinAtk,
      darkAtk,
      lightAtk,
      heatResistance,
      coldResistance,
      lightningResistance,
      toxinResistance,
      darkResistance,
      lightResistance,
      swordDmg,
      spearDmg,
      axeDmg,
      daggerDmg,
      swordResistance,
      spearResistance,
      axeResistance,
      daggerResistance,
      grimoireResistance,
    );
  }
}
