import { getRepository } from 'typeorm'
import { Injectable } from '@nestjs/common'

import { ItemEntity } from 'src/Infrastructure/Entities/Item.entity';

import { Item, ItemQuery, Items } from 'src/Application/Queries/Items.query';

@Injectable()
export class ItemQueryImplement implements ItemQuery {

    async findById(id: string): Promise<Item | undefined> {
        return this.convertItemFromEntity(await getRepository(ItemEntity).findOne(id))
    }

    async find(userId: string, offset: number, limit: number): Promise<Items> {
        return this.convertItemsFromEntities(
            await getRepository(ItemEntity).find({
                where: [{ userId: userId }],
                skip: offset,
                take: limit
            }),
        );
    }

    private convertItemFromEntity(entity: ItemEntity): undefined | Item {
        return entity
            ? { ...entity }
            : undefined;
    }

    private convertItemsFromEntities(entities: ItemEntity[]): Items {
        return entities.map((entity) => ({ ...entity }));
    }
}