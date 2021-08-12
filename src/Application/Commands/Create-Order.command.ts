import { ICommand } from '@nestjs/cqrs';

export class CreateOrderCommand implements ICommand {
    constructor(
        readonly userId: any,
        readonly buyerName: string,
        readonly buyerPhone: number,
        readonly buyerEmail: string,
        readonly shippingMethod: number,
        readonly shippingAddress: string,
        readonly shippingCity: string,
        readonly shippingRegion: string,
        readonly shippingCountry: string,
        readonly items: any[] | any,
    ) {}
}