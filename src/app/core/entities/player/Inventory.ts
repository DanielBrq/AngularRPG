import { Consumable, Equipment } from '@app/core/items';

export class Inventory {
    constructor(
        private _consumableItem: Consumable[] = [],
        private _equipment: Equipment[] = [],
    ) { }

    public getConsumableItem(consumable: Consumable): Consumable {
        const req = this._consumableItem.find(c => c.getId === consumable.getId);
        if (!req) throw new Error("Not found");
        return req;
    }

    public get getConsumableItemList() {
        return this._consumableItem;
    }

    public set saveConsumableItem(consumable: Consumable) {
        this._consumableItem?.push(consumable)
    }

    public set removeConsumableItem(consumable: Consumable) {
        const index = this._consumableItem?.findIndex(c => c.getId === consumable.getId);
        if (index === undefined || index === -1) throw new Error("Consumable item not found");
        this._consumableItem?.splice(index, 1);
    }

    public getEquipment(equipment: Equipment): Equipment {
        const req = this._equipment.find(c => c.getId === equipment.getId);
        if (!req) throw new Error("Not found");
        return req;
    }

    public get getEquipmentList() {
        return this._equipment;
    }

    public set saveEquipment(equipment: Equipment) {
        this._equipment.push(equipment)
    }

    public set removeEquipment(equipment: Equipment) {
        if (equipment.isEquiped) throw new Error("Cannot remove an equiped item");
        const index = this._equipment.findIndex(c => c.getId === equipment.getId);
        if (index === -1) throw new Error("Equipment not found");
        this._equipment.splice(index, 1);
    }
}
