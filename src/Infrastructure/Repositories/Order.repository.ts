import { getRepository } from 'typeorm';

import { OrderEntity } from 'src/Infrastructure/Entities/Order.entity';

import { OrderRepository } from 'src/Domain/Aggregates/OrderAggregate/Order.repository';
import { Order } from 'src/Domain/Aggregates/OrderAggregate/Order';

export class OrderRepositoryImplement implements OrderRepository {
    async newId(): Promise<string> {
        const emptyEntity = new OrderEntity();
        emptyEntity.buyerName = '';
        emptyEntity.buyerPhone = 0;
        emptyEntity.buyerEmail = '';
        emptyEntity.shippingMethod = 0;
        emptyEntity.shippingAddress = '';
        emptyEntity.shippingCity = '';
        emptyEntity.shippingRegion = '';
        emptyEntity.shippingCountry = '';
        emptyEntity.items = [];
        emptyEntity.creationDate = '';
        emptyEntity.internalOrderNumber = 0;
        emptyEntity.pack_promise_min = null;
        emptyEntity.pack_promise_max = null;
        emptyEntity.ship_promise_min = null;
        emptyEntity.ship_promise_max = null;
        emptyEntity.delivery_promise_min = null;
        emptyEntity.delivery_promise_max = null;
        emptyEntity.ready_pickup_promise_min = null;
        emptyEntity.ready_pickup_promise_max = null;
        emptyEntity.status = '';
        const entity = await getRepository(OrderEntity).save(emptyEntity);
        return entity.id;     
    }

    async save(data: Order | Order[]): Promise<void> {
        const models = Array.isArray(data)
                                ? data
                                : [data];
        const entities = models.map((model) => this.modelToEntity(model));
        await getRepository(OrderEntity).save(entities)
    }

    async findById(id: string): Promise<Order>{
        const entity = await getRepository(OrderEntity).findOne({ id });
        return entity
            ? this.entityToModel(entity)
            : undefined;
    }

    private modelToEntity(model: Order): OrderEntity {
        const properties = model.properties();
        return { ...properties };
    }

    private entityToModel(entity: OrderEntity): Order {
        return new Order(entity);
    }
}