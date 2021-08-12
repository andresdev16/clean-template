import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { subDays } from "date-fns";

import { CreateOrderCommand } from './Create-Order.command';

import { Order } from 'src/Domain/Aggregates/OrderAggregate/Order';
import { OrderRepository } from 'src/Domain/Aggregates/OrderAggregate/Order.repository';
import { DateManager } from 'src/Domain/Services/DateManager.service';
import { WeightManager } from 'src/Domain/Services/WeightManager.service';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
    constructor(
        @Inject('OrderRepositoryImplement')
        private readonly orderRepository: OrderRepository,
        private readonly eventPublisher: EventPublisher,
        private readonly dateManager: DateManager,
        private readonly weightManager: WeightManager,
    ) {}

    async execute(command: CreateOrderCommand): Promise<void> {
        const data = new Order({
            id: await this.orderRepository.newId(),
            userId: command.userId,
            buyerName: command.buyerName,
            buyerPhone: command.buyerPhone,
            buyerEmail: command.buyerEmail,
            shippingMethod: command.shippingMethod,
            shippingAddress: command.shippingAddress,
            shippingCity: command.shippingCity,
            shippingRegion: command.shippingRegion,
            shippingCountry: command.shippingCountry,
            items: [command.items],
            creationDate: new Date(),
            internalOrderNumber: 0,
            pack_promise_min: null,
            pack_promise_max: null,
            ship_promise_min: null,
            ship_promise_max: null,
            delivery_promise_min: null,
            delivery_promise_max: null,
            ready_pickup_promise_min: null,
            ready_pickup_promise_max: null,
            status: '',
            deliveredDate: null,
        });

        const order = this.eventPublisher.mergeObjectContext(data);

        order.setCreationDate()
        order.setInternalOrderNumber()
        order.setStatusOnQueue()

        await this.orderRepository.save(order)

        order.commit()
    }
}