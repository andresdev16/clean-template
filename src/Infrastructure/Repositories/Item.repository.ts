import { getRepository } from 'typeorm';

import { ItemEntity } from 'src/Infrastructure/Entities/Item.entity';

import { ItemRepository } from 'src/Domain/Aggregates/ItemAggregate/Item.repository';
import { Item } from 'src/Domain/Aggregates/ItemAggregate/Item';

export class ItemRepositoryImplement implements ItemRepository {
    async newId(): Promise<string> {
        const emptyEntity = new ItemEntity();
        emptyEntity.orders = [];
        emptyEntity.name = '';
        emptyEntity.qty = '';
        emptyEntity.weight = 0;
        const entity = await getRepository(ItemEntity).save(emptyEntity);
        return entity.id;
    }

    async save(data: Item | Item[]): Promise<void>{
        const models = Array.isArray(data)
                                ? data
                                : [data];
        const entities = models.map((model) => this.modelToEntity(model));
        await getRepository(ItemEntity).save(entities);
    }
    
    async findById(id: string) :Promise<Item> {
        const entity = await getRepository(ItemEntity).findOne({ id });
        return entity
            ? this.entityToModel(entity)
            : undefined;
    }

    private modelToEntity(model: Item): ItemEntity {
        const properties = model.properties();
        return { ...properties };
    }

    private entityToModel(entity: ItemEntity): Item {
        return new Item(entity);
    }
    
}