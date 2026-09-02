import { Item, ItemStats } from "@src/app/core/items";
import { EquipmentType, WeaponType } from '@src/app/shared';

export class Equipment extends Item {
    constructor(
        id: string,
        name: string,
        public readonly type: EquipmentType | WeaponType,
        public readonly itemStats: ItemStats,
        private _equipedByCharacterId?: string,
    ) {
        super(
            id,
            name
        )
    }

    public get getId(): string {
        return this.id;
    }

    public get getCurrentOwner(): string {
        if (!this.getEquipedBy) throw new Error("Not found");
        return this.getEquipedBy;
    }

    public set setOwner(newOwnerId: string) {
        if (this.getEquipedBy === newOwnerId) throw new Error("Cannot link to the same owner");
        this._equipedByCharacterId = newOwnerId;
    }

    public set removeOwner(ownerId: string) {
        if (this.getEquipedBy !== ownerId) throw new Error("Cannot remove a different owner");
        this._equipedByCharacterId = undefined;
    }

    //TODO: get translated labels
    public get getName(): string {
        return this.name;
    }

    public get isEquiped(): boolean {
        return this.getEquipedBy !== undefined;
    }

    private get getEquipedBy() {
        return this._equipedByCharacterId;
    }

}
