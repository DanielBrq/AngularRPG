import { BaseStats, BuildStats, GameEntity, BattleStats, DamageWeaknessData } from "@app/core/entities/gameEntity";
import { Skill } from '@app/core/skills/';
import { Equipment } from "@app/core/items";
import { Effect } from "@app/core/effects/Effect";
import { clamp, EQUIPMENT, WEAPONS } from '@app/shared';

export class CharacterEntity extends GameEntity {
  constructor(
    readonly id: string,
    readonly name: string,
    isAlive: boolean = true,
    currentLvl: number,
    baseStats: BaseStats,
    battleStats: BattleStats,
    skills: Skill[] = [],
    effects: Effect[] = [],
    damageData: DamageWeaknessData,
    private _bp: number = 2,
    private _buildStats: BuildStats,
    private _weapon?: Equipment,
    private _helmet?: Equipment,
    private _chest?: Equipment,
    private _ring?: Equipment,
    private _belt?: Equipment,
    private _boots?: Equipment,
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
      damageData,
    )
  }

  //#region getters
  public get buildStats(): BuildStats { return this._buildStats }

  public get helmet(): Equipment {
    if (!this._helmet) throw new Error("There's not any helmet equiped");
    return this._helmet
  }
  public get chest(): Equipment {
    if (!this._chest) throw new Error("There's not any chest equiped");
    return this._chest
  }
  public get ring(): Equipment {
    if (!this._ring) throw new Error("There's not any ring equiped");
    return this._ring
  }
  public get belt(): Equipment {
    if (!this._belt) throw new Error("There's not any belt equiped");
    return this._belt
  }
  public get boots(): Equipment {
    if (!this._boots) throw new Error("There's not any boots equiped");
    return this._boots
  }
  public get weapon(): Equipment {
    if (!this._weapon) throw new Error("There's not any Weapon equiped");
    return this._weapon
  }
  //#endregion

  public set setPlayerWeapon(weapon: Equipment) {
    if (weapon.type === WEAPONS.SWORD || weapon.type === WEAPONS.SPEAR || weapon.type === WEAPONS.AXE ||
      weapon.type === WEAPONS.DAGGER || weapon.type === WEAPONS.GRIMOIRE) {

      weapon.setOwner = this._id;
      if (this._weapon) this._weapon.removeOwner = this._id;
      this._weapon = weapon

    } else { throw new Error("Equip Weapon only") }
  }

  public set setHelmet(equipment: Equipment) {
    if (equipment.type != EQUIPMENT.HELMET) throw new Error("Equip helmet only");
    this._helmet = this.equipSlot(equipment, this._helmet)
  }

  public set setChest(equipment: Equipment) {
    if (equipment.type != EQUIPMENT.CHEST) throw new Error("Equip chest only");
    this._chest = this.equipSlot(equipment, this._chest)
  }

  public set setRing(equipment: Equipment) {
    if (equipment.type != EQUIPMENT.RING) throw new Error("Equip ring only");
    this._ring = this.equipSlot(equipment, this._ring)
  }

  public set setBelt(equipment: Equipment) {
    if (equipment.type != EQUIPMENT.BELT) throw new Error("Equip belt only");
    this._belt = this.equipSlot(equipment, this._belt)
  }

  public set setBoots(equipment: Equipment) {
    if (equipment.type != EQUIPMENT.BOOTS) throw new Error("Equip boots only");
    this._boots = this.equipSlot(equipment, this._boots)
  }

  public removePlayerWeapon(): void {
    const req = this._weapon;
    if (!req) throw new Error("Not found");
    req.removeOwner = this._id;
    this._weapon = undefined;
  }

  public get getBP(): number { return this._bp; }

  public addBP(value: number, maxLimit: number = 7) {
    if (value <= 0) throw new Error("BP must be greater than 0");
    this._bp += clamp(value, maxLimit);
  }

  private equipSlot(equipment: Equipment, current?: Equipment): Equipment {
    equipment.setOwner = this._id;
    if (current) current.removeOwner = this._id;
    return equipment;
  }

}
