import { IQueryResult } from "@nestjs/cqrs";

export class GetOrderResult implements IQueryResult {
    readonly id: string = '';
    readonly userId: any = null;
    readonly buyerName: string = '';
    readonly buyerPhone: number = null;
    readonly buyerEmail: string = '';
    readonly shippingAddress: string = '';
    readonly shippingCity: string = '';
    readonly shippingRegion: string = '';
    readonly shippingCountry: string = '';
    readonly creationDate: string = '';
    readonly internalOrderNumber: number = null;
    readonly pack_promise_min: Date = null;
    readonly pack_promise_max: Date = null;
    readonly ship_promise_min: Date = null;
    readonly ship_promise_max: Date = null;
    readonly delivery_promise_min: Date = null;
    readonly delivery_promise_max: Date = null;
    readonly ready_pickup_promise_min: Date = null;
    readonly ready_pickup_promise_max: Date = null;
}