import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SetOrderPromisesCommand } from './SetOrderPromises.command';
import { OrderRepository } from 'src/Domain/Aggregates/OrderAggregate/Order.repository';


@CommandHandler(SetOrderPromisesCommand)
export class SetOrderPromisesHandler implements ICommandHandler<SetOrderPromisesCommand, void> {
    constructor(
        @Inject("OrderRepositoryImplement")
        private readonly orderRepository: OrderRepository,
    ) {}

    async execute(command: SetOrderPromisesCommand): Promise<void> {
        const order = await this.orderRepository.findById(command.orderId);
        if (!order) {
            throw new NotFoundException("Order not found")
        }

        order.setPromisesMinMax(
            command.packMin,
            command.packMax,
            command.shipMin,
            command.shipMax,
            command.deliveryMin,
            command.deliveryMax,
            command.readyMin,
            command.readyMax,
        )

        await this.orderRepository.save(order);

        order.commit();
    }
}