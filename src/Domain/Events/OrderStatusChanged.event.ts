import { IEvent } from '@nestjs/cqrs';


export class OrderStatusChangedEvent implements IEvent {
    constructor(readonly status: string) {}
}