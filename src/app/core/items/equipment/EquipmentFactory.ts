import { ItemStats } from "../ItemStats";
import { Equipment } from "./Equipment";
import { EquipmentType, WeaponType } from '@app/shared';

export interface EquipmentConfig {
    id: string;
    name: string;
    type: EquipmentType | WeaponType;
    stats?: Partial<ItemStats>;
}

export function createEquipment(config: EquipmentConfig): Equipment {
    const itemStats = Object.assign(new ItemStats(), config.stats);
    return new Equipment(config.id, config.name, config.type, itemStats);
}