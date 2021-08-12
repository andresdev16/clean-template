import { IQueryResult } from "@nestjs/cqrs";

export class GetItemResult implements IQueryResult {
    readonly id: string = '';
    readonly name: string = '';
    readonly qty: string = '';
    readonly weight: number = null;
}