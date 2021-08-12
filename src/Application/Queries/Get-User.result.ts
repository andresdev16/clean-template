import { IQueryResult } from '@nestjs/cqrs';

export class GetUserResult implements IQueryResult {
    readonly id: string = '';
    readonly email: string = '';
    readonly name: string = '';
    readonly role: string = '';
}