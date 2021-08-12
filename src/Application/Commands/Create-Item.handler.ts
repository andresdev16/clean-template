import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { CreateItemCommand } from './Create-Item.command';

import { Item } from 'src/Domain/Aggregates/ItemAggregate/Item';
import { ItemRepository } from 'src/Domain/Aggregates/ItemAggregate/Item.repository';

@CommandHandler(CreateItemCommand)
export class CreateItemHandler implements ICommandHandler<CreateItemCommand> {
    constructor(
        @Inject('ItemRepositoryImplement')
        private readonly itemRepository: ItemRepository,
        private readonly eventPublisher: EventPublisher,
    ) {}

    async execute(command: CreateItemCommand): Promise<any> {
        const data = new Item({
            id: await this.itemRepository.newId(),
            userId: command.userId,
            orders: [command.orders],
            name: command.name,
            qty: command.qty,
            weight: command.weight,
        });

        const item = this.eventPublisher.mergeObjectContext(data);

        await this.itemRepository.save(item);

        item.commit();
    }
}