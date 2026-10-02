import { Entity } from '@src/app/core/Entity';

type ComponentClass<T> = new (...args: any[]) => T;

export class World {

    private nextEntityId = 0;
    private componentStores = new Map<any, Map<Entity, any>>

    public createEntity(): Entity {
        return this.nextEntityId++;
    }

    public destroyEntity(entity: Entity): void {
        for (const store of this.componentStores.values()) {
            store.delete(entity);
        }
    }

    public addComponent<T>(entity: Entity, componentClass: ComponentClass<T>, data: T): void {
        // Create component if not exist
        if (!this.componentStores.has(componentClass)) {
            this.componentStores.set(componentClass, new Map<Entity, any>)
        }
        this.componentStores.get(componentClass)!.set(entity, data) // Save
    }

    public getComponent<T>(entity: Entity, componentClass: ComponentClass<T>): T | undefined {
        const store = this.componentStores.get(componentClass);
        return store ? store.get(entity) : undefined
    }

    public getEntitiesWith<T>(componentClass: ComponentClass<T>): Entity[] {
        const store = this.componentStores.get(componentClass);
        if (!store) return [];
        return Array.from(store.keys());
    }
}