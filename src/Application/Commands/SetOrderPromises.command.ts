import { ICommand } from '@nestjs/cqrs';

export class SetOrderPromisesCommand implements ICommand {
    constructor(
        readonly orderId: string,
        readonly packMin: Date,
        readonly packMax: Date,
        readonly shipMin: Date,
        readonly shipMax: Date,
        readonly deliveryMin: Date,
        readonly deliveryMax: Date,
        readonly readyMin: Date,
        readonly readyMax: Date,
    ) {}
}