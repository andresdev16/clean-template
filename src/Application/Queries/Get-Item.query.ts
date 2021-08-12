import { IQuery } from "@nestjs/cqrs";

export class GetItemQuery implements IQuery {
    constructor(readonly id: string) {}
}