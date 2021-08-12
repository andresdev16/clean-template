import { IEvent } from '@nestjs/cqrs';
import { UserProperties } from 'src/Domain/Aggregates/UserAggregate/User';

export class UserCreatedEvent implements IEvent, UserProperties {
   readonly id: string;
   readonly email: string;
   readonly password: string;
   readonly name: string;
   readonly role: string;
   readonly items: any;
   readonly orders: any;
}