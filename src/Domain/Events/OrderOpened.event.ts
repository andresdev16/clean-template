import { IEvent } from '@nestjs/cqrs';


export class OrderOpenedEvent implements IEvent {
    constructor(readonly id: number) {}
}