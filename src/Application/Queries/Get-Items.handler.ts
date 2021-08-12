import { Inject, InternalServerErrorException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ItemQuery, ItemInItems } from './Items.query';
import { GetAllItemsQuery } from './Get-Items.query';
import { GetAllItemsResult, ItemInGetItemsResult } from './Get-Items.result';

@QueryHandler(GetAllItemsQuery)
export class GetAllItemsHandler implements IQueryHandler<GetAllItemsQuery, GetAllItemsResult> {
    constructor(
        @Inject('ItemQueryImplement') private readonly itemQuery: ItemQuery,
    ) {}

    async execute(query: GetAllItemsQuery): Promise<GetAllItemsResult> {
        return (await this.itemQuery.find(query.userId, query.offset, query.limit)).map(
            this.filterResultProperties,
        )
    }

    private filterResultProperties(data: ItemInItems): ItemInGetItemsResult {
        const dataKeys = Object.keys(data);
        const resultKeys = Object.keys(new ItemInGetItemsResult());

        if (dataKeys.length < resultKeys.length) {
            throw new InternalServerErrorException();
        }

        if (resultKeys.find((resultKey) => !dataKeys.includes(resultKey))) {
            throw new InternalServerErrorException();
        }

        dataKeys
            .filter((dataKey) => !resultKeys.includes(dataKey))
            .forEach((dataKey) => delete data[dataKey]);
        
        return data;
    }
}