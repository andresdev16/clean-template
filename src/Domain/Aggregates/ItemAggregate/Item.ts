import { AggregateRoot } from '@nestjs/cqrs';

export interface ItemProperties {
    readonly id: string;
    readonly userId: any;
    readonly orders: any;
    readonly name: string;
    readonly qty: string;
    readonly weight: number;
}

export class Item extends AggregateRoot {
    private readonly id: string;
    private readonly userId: any;
    private orders?: any;
    private name: string;
    private qty: string;
    private weight: number;

    constructor(properties: ItemProperties) {
        super()
        this.id = properties.id;
        this.userId = properties.userId;
        this.orders = properties.orders;
        this.name = properties.name;
        this.qty = properties.qty;
        this.weight = properties.weight;
    }

    properties(): ItemProperties {
        return {
            id: this.id,
            userId: this.userId,
            orders: this.orders,
            name: this.name,
            qty: this.qty,
            weight: this.weight,
        };
    }

    rename(name: string): void {
        this.name = name;
    }
}