import { EquipmentType, WeaponsType } from '@app/shared';
import { ItemStats } from '@app/core/items';
import { Skill } from '@app/core/battleSkills';

export class Item {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly type: EquipmentType | WeaponsType,
    public readonly itemStats: ItemStats,
    public readonly passiveSkills?: Skill[],
  ) { }
}
