import { IQuery } from "@nestjs/cqrs";

export class GetAllOrdersQuery implements IQuery {
    constructor(readonly userId: string, readonly offset: number, readonly limit: number) {}
}