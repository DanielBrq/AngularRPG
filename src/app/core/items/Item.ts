import { EquipmentType, WeaponsType } from '@app/shared';
import { ItemStats } from '@app/core/items';

export class Item {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly type: EquipmentType | WeaponsType,
    public readonly itemStats: ItemStats,
  ) { }
}
