
type EntityId = number; // semantic sugar
type ComponentClass<T> = new (...args: any[]) => T;

export class World {

    private nextEntityId: EntityId = 0;
    private componentStores = new Map<any, Map<EntityId, any>>

    public createEntity(): EntityId {
        return this.nextEntityId++;
    }

    public destroyEntity(entity: EntityId): void {
        // cascade delete all the related components
        for (const store of this.componentStores.values()) {
            store.delete(entity);
        }
    }

    public addComponent<T>(entity: EntityId, componentClass: ComponentClass<T>, data: T): void {
        // Create component if not exist
        if (!this.componentStores.has(componentClass)) {
            this.componentStores.set(componentClass, new Map<EntityId, any>)
        }
        this.componentStores.get(componentClass)!.set(entity, data) // Save
    }

    public getComponent<T>(entity: EntityId, componentClass: ComponentClass<T>): T | undefined {
        const store = this.componentStores.get(componentClass);
        return store ? store.get(entity) : undefined
    }

    public getEntitiesWith<T>(componentClass: ComponentClass<T>): EntityId[] {
        const store = this.componentStores.get(componentClass);
        if (!store) return [];
        return Array.from(store.keys());
    }
}