import { IQuery } from "@nestjs/cqrs";

export class GetOrderQuery implements IQuery {
    constructor(readonly id: string) {}
}