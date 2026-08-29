export class Timing {

    /**
     * Returns a promise that resolves after a specified number of milliseconds.
     * @param ms The number of milliseconds to wait. Defaults to 500ms.
     * @returns A promise that resolves after the specified delay.
     */
    public static delayMs(ms: number = 500): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}