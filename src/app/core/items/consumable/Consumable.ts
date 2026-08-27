import { Item, ItemStats } from "@app/core/items";

export class Consumable extends Item {
    constructor(
        id: string,
        name: string,
        public readonly itemStats: ItemStats,
    ) {
        super(
            id,
            name
        )
    }

    //TODO: get translated labels


}