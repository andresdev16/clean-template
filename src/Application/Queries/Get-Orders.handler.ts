import { Inject, InternalServerErrorException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllOrdersQuery } from './Get-Orders.query';
import { GetAllOrdersResult, OrderInGetOrdersResult } from './Get-Orders.result';
import { OrderInOrders, OrdersQuery } from './Orders.query';

@QueryHandler(GetAllOrdersQuery)
export class GetAllOrdersHandler implements IQueryHandler<GetAllOrdersQuery, GetAllOrdersResult> {
    constructor(
        @Inject('OrdersQueryImplement')
        private readonly ordersQuery: OrdersQuery
    ) {}

    async execute(query: GetAllOrdersQuery): Promise<GetAllOrdersResult> {
        return (await this.ordersQuery.find(query.userId, query.offset, query.limit)).map(
                this.filterResultProperties,
            )       
    }

    private filterResultProperties(data: OrderInOrders): OrderInGetOrdersResult {
        const dataKeys = Object.keys(data)
        const resultKeys = Object.keys(new GetAllOrdersResult())

        if (dataKeys.length < resultKeys.length) {
            throw new InternalServerErrorException();
        }

        if (resultKeys.find((resultKey) => !dataKeys.includes(resultKey))){
            throw new InternalServerErrorException();
        }

        dataKeys
            .filter((dataKey) => !resultKeys.includes(dataKey))
            .forEach((dataKey) => delete data[dataKey]);

        return data
    }
}