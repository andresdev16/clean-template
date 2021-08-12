import { IQuery } from "@nestjs/cqrs";

export class GetAllItemsQuery implements IQuery {
    constructor(readonly userId: string, readonly offset: number, readonly limit: number) {}
}