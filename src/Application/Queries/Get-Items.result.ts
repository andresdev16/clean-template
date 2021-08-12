import { IQueryResult } from '@nestjs/cqrs';

export class ItemInGetItemsResult implements IQueryResult {
    readonly id: string = '';
    readonly name: string = '';
}

export class GetAllItemsResult extends Array<ItemInGetItemsResult> implements IQueryResult {}