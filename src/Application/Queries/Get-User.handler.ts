import { Inject, InternalServerErrorException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetUserQuery } from 'src/Application/Queries/Get-User.query';
import { UserQuery } from 'src/Application/Queries/User.query';
import { GetUserResult } from 'src/Application/Queries/Get-User.result';


@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
    constructor(
        @Inject('UserQueryImplement') readonly userQuery: UserQuery,
    ) {}

    async execute(query: GetUserQuery): Promise<GetUserResult> {
        const data = await this.userQuery.findById(query.id);
        const dataKeys = Object.keys(data);
        const resultKeys = Object.keys(new GetUserResult());

        if (dataKeys.length < resultKeys.length) {
            throw new InternalServerErrorException();
        }

        if (resultKeys.find((resultKey) => !dataKeys.includes(resultKey))){
            throw new InternalServerErrorException();
        }

        dataKeys
            .filter((dataKey) => !resultKeys.includes(dataKey))
            .forEach((dataKey) => delete data[dataKey]);
        
        return data;
    }
}