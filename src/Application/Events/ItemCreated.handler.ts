import { Inject, Logger } from "@nestjs/common";
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { EventStore, IntegrationEventPublisher } from 'src/Application/Events/Integration';

import { ItemCreatedEvent } from "src/Domain/Events/Item-Created.event";

@EventsHandler(ItemCreatedEvent)
export class ItemCreatedHandler implements IEventHandler<ItemCreatedEvent> {
  constructor(
    private readonly logger: Logger,
    @Inject('IntegrationEventPublisherImplement')
    private readonly publisher: IntegrationEventPublisher,
    @Inject('EventStoreImplement') private readonly eventStore: EventStore,
  ) {}

  async handle(event: ItemCreatedEvent): Promise<void> {
    this.logger.log(`item created: ${JSON.stringify(event)}`)
    await this.publisher.publish({
      subject: 'item.created',
      data: { id: event.id },
    });
    await this.eventStore.save({ subject: 'item.created', data: event})
  }
}