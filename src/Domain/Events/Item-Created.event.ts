import { IEvent } from "@nestjs/cqrs";
import { ItemProperties } from "../Aggregates/ItemAggregate/Item";

export class ItemCreatedEvent implements IEvent, ItemProperties {
    readonly id: string;
    readonly userId: any;
    readonly orders: any;
    readonly name: string;
    readonly qty: string;
    readonly weight: number;
}