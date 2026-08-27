import { Item, ItemStats } from "@app/core/items";
import { WeaponType } from '@app/shared';

export class Eeapons extends Item {
    constructor(
        id: string,
        name: string,
        type: WeaponType,
        public readonly itemStats: ItemStats,
    ) {
        super(
            id,
            name
        )
    }

    //TODO: get translated labels


}