import { Inject, InternalServerErrorException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetItemQuery } from './Get-Item.query';
import { ItemQuery } from './Items.query';
import { GetItemResult } from './Get-Item.result';

@QueryHandler(GetItemQuery)
export class GetItemHandler implements IQueryHandler<GetItemQuery> {
    constructor(
        @Inject('ItemQueryImplement') readonly itemQuery: ItemQuery,
    ) {}

    async execute(query: GetItemQuery): Promise<GetItemResult> {
        const data = await this.itemQuery.findById(query.id);
        const dataKeys = Object.keys(data);
        const resultKeys = Object.keys(new GetItemResult());

        if (dataKeys.length < resultKeys.length) {
            throw new InternalServerErrorException();
        }

        if (resultKeys.find((resultKey) => !dataKeys.includes(resultKey))){
            throw new InternalServerErrorException();
        }

        dataKeys
            .filter((dataKey) => !resultKeys.includes(dataKey))
            .forEach((dataKey) => delete data[dataKey])

        return data;
    }
}