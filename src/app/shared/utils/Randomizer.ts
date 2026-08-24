export function randomizer(chance: number): boolean {
    if (chance <= 0) return false;
    if (chance >= 100) return true;
    return Math.random() * 100 < chance;
}