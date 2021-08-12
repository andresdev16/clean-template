import { IQueryResult } from "@nestjs/cqrs";

export class OrderInGetOrdersResult implements IQueryResult {
    readonly id: string = '';
    readonly userId: any;
    readonly creationDate: string = '';
    readonly internalOrderNumber: number = 0;
}

export class GetAllOrdersResult extends Array<OrderInGetOrdersResult> implements IQueryResult {}
