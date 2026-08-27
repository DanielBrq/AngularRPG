import { Item, ItemStats } from "@app/core/items";
import { clamp } from "@app/shared/utils";

export class Consumable extends Item {
    constructor(
        id: string,
        name: string,
        private _amount: number,
        public readonly _itemStats: ItemStats,
    ) {
        super(
            id,
            name
        )
    }

    public get getId(): string {
        return this.id;
    }

    //TODO: get translated labels
    public get getName(): string {
        return this.name;
    }

    public get getAmount(): number {
        return this._amount;
    }

    public set increaseAmount(amount: number) {
        this._amount = clamp(this._amount + amount, 99);
    }

    public set removeAmount(amount: number) {
        if (this._amount < amount) throw new Error("Not enough amount");
        this._amount -= amount;
    }
}

