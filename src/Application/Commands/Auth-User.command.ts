import { ICommand } from '@nestjs/cqrs';


export class AuthUserCommand implements ICommand {
    constructor(readonly email: string, readonly password: string) {}
}