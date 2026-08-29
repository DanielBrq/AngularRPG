import { ConsumableCatalog } from "@app/core/items/interfaces/ConsumableCatalog";
import basicPotionsCatalog from "@app/core/items/catalog/consumable/BasicPotions.json";

export class ConsumableCatalogProvider {
    public static getBasicPotions(): ConsumableCatalog { return basicPotionsCatalog as ConsumableCatalog }
}
