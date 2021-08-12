import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { CreateUserCommand } from 'src/Application/Commands/Create-User.command';

import { User } from 'src/Domain/Aggregates/UserAggregate/User';
import { UserRepository } from 'src/Domain/Aggregates/UserAggregate/User.repository';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand, void> {
    constructor(
        @Inject('UserRepositoryImplement')
        private readonly userRepository: UserRepository,
        private readonly eventPublisher: EventPublisher,
    ) {}

    async execute(command: CreateUserCommand): Promise<void> {
        const data = new User({
            id: await this.userRepository.newId(),
            email: command.email,
            password: '',
            name: command.name,
            role: command.role,
            orders: [],
            items: [],
        });

        const user = this.eventPublisher.mergeObjectContext(data);

        user.setPassword(command.password);

        await this.userRepository.save(user);

        user.commit
    }
}