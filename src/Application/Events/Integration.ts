import { UserProperties } from 'src/Domain/Aggregates/UserAggregate/User';

export class Event {
  readonly subject: string;
  readonly data: any;
}

export class IntegrationEvent {
  readonly subject: string;
  readonly data: Record<string, string>;
}

export interface IntegrationEventPublisher {
  publish: (event: IntegrationEvent) => Promise<void>;
}

export interface EventStore {
  save: (event: Event) => Promise<void>;
}