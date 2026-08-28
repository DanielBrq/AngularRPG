import { ItemCatalog } from "@app/core/items/interfaces/ItemCatalog";
import ironSetCatalog from "@app/core/items/catalog/equipment/IronSet.json";
import silverSetCatalog from "@app/core/items/catalog/equipment/SilverSet.json";

export class EquipmentCatalogProvider {
    public static getIronSet(): ItemCatalog { return ironSetCatalog as ItemCatalog }
    public static getSilverSet(): ItemCatalog { return silverSetCatalog as ItemCatalog }
}

