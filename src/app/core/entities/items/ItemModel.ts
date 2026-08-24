import { EquipmentType, WeaponsType } from '@app/shared';

export class ItemModel {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly type: EquipmentType | WeaponsType,
    public readonly stats: Object,
    public readonly passiveSkills: string[],
  ) {}
}
