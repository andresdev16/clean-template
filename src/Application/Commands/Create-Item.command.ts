import { ICommand } from '@nestjs/cqrs';

export class CreateItemCommand implements ICommand {
    constructor(readonly userId: string, readonly name: string, readonly qty: string, readonly weight: number, readonly orders?: any[]) {}
}