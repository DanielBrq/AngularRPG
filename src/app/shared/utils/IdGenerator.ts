import { v7 as uuidv7 } from "uuid";

export function GenerateID(): string {
    return uuidv7();
}