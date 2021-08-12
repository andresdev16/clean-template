import { Inject, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { AuthUserCommand } from 'src/Application/Commands/Auth-User.command';

import { UserRepository } from 'src/Domain/Aggregates/UserAggregate/User.repository';

@CommandHandler(AuthUserCommand)
export class AuthUserHandler implements ICommandHandler<AuthUserCommand, any> {
    constructor(
        @Inject('UserRepositoryImplement')
        private readonly userRepository: UserRepository,
        private readonly eventPublisher: EventPublisher,
    ) {}

    async execute(command: AuthUserCommand): Promise<any> {
        const data = await this.userRepository.findByEmail(command.email);
        if (!data) {
            throw new InternalServerErrorException('Email does not exists on the database')
        }
        
        const user = this.eventPublisher.mergeObjectContext(data);

        if (user.comparePassword(command.password) === true) {
            return data
        }

        return null
    }
}