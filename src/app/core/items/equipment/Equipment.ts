import { Item, ItemStats } from "@app/core/items";
import { EquipmentType } from '@app/shared';

export class Equipment extends Item {
    constructor(
        id: string,
        name: string,
        type: EquipmentType,
        public readonly itemStats: ItemStats,
    ) {
        super(
            id,
            name
        )
    }

    //TODO: get translated labels


}