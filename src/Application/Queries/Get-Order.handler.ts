import { Inject, InternalServerErrorException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetOrderQuery } from "./Get-Order.query";
import { GetOrderResult } from "./Get-Order.result";
import { OrdersQuery } from "./Orders.query";

@QueryHandler(GetOrderQuery)
export class GetOrderHandler implements IQueryHandler<GetOrderQuery> {
    constructor (
        @Inject('OrdersQueryImplement')
        readonly orderQuery: OrdersQuery
    ) {}

    async execute(query: GetOrderQuery): Promise<GetOrderResult> {
        const data = await this.orderQuery.findById(query.id)
        const dataKeys = Object.keys(data)
        const resultKeys = Object.keys(new GetOrderResult())

        if (dataKeys.length < resultKeys.length) {
            throw new InternalServerErrorException();
        }

        if (resultKeys.find((resultKey) => !dataKeys.includes(resultKey))){
            throw new InternalServerErrorException();
        }

        dataKeys
            .filter((dataKey) => !resultKeys.includes(dataKey))
            .forEach((dataKey) => delete data[dataKey])

        return data
    }
}