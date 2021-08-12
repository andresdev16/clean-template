import { getRepository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { OrderEntity } from 'src/Infrastructure/Entities/Order.entity';
import { Orders, OrdersQuery, Order } from "src/application/Queries/Orders.query";

@Injectable()
export class OrdersQueryImplement implements OrdersQuery {
    async find(id: string, offset: number, limit: number): Promise<Orders> {
        return this.convertOrdersFromEntities(
            await getRepository(OrderEntity).find({
                where: [{ id: id }],
                skip: offset,
                take: limit
            })
        )
    }

    async findById(id: string): Promise<Order | undefined> {
        return this.convertOrderFromEntity(
            await getRepository(OrderEntity).findOne(id)
        )
    }

    private convertOrderFromEntity(entity: OrderEntity): undefined | Order {
        return entity
            ? { ...entity }
            : undefined;
    }

    private convertOrdersFromEntities(entities: OrderEntity[]): Orders {
        return entities.map((entity) => ({ ...entity }));
    }
}

