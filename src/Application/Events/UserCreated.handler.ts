import { Inject, Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { EventStore, IntegrationEventPublisher } from 'src/Application/Events/integration';

import { UserCreatedEvent } from 'src/Domain/Events/User-Created.event';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor(
    private readonly logger: Logger,
    @Inject('IntegrationEventPublisherImplement')
    private readonly publisher: IntegrationEventPublisher,
    @Inject('EventStoreImplement') private readonly eventStore: EventStore,
  ) {}

  async handle(event: UserCreatedEvent): Promise<void> {
    this.logger.log(`account opened: ${JSON.stringify(event)}`);
    await this.publisher.publish({
      subject: 'user.created',
      data: { id: event.id },
    });
    await this.eventStore.save({ subject: 'user.created', data: event });
  }
}