export class OrderInOrders {
    readonly id: string;
    readonly userId: any;
    readonly creationDate: string;
    readonly internalOrderNumber: number;
}

export class Order {
    readonly id: string;
    readonly userId: any;
    readonly buyerName: string;
    readonly buyerPhone: number;
    readonly buyerEmail: string;
    readonly shippingAddress: string;
    readonly shippingCity: string;
    readonly shippingRegion: string;
    readonly shippingCountry: string;
    readonly creationDate: string;
    readonly internalOrderNumber: number;
    readonly pack_promise_min: Date;
    readonly pack_promise_max: Date;
    readonly ship_promise_min: Date;
    readonly ship_promise_max: Date;
    readonly delivery_promise_min: Date;
    readonly delivery_promise_max: Date;
    readonly ready_pickup_promise_min: Date;
    readonly ready_pickup_promise_max: Date;
}

export class Orders extends Array<OrderInOrders> {}

export interface OrdersQuery {
    find: (userId: string, offset: number, limit: number) => Promise<Orders>;
    findById: (id: string) => Promise<Order>;
}