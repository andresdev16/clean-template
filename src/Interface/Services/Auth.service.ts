import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CommandBus } from '@nestjs/cqrs';
import { AuthUserCommand } from 'src/Application/Commands/Auth-User.command';

@Injectable()
export class AuthService {
    constructor (
        private readonly jwtService: JwtService,
        private readonly commandBus: CommandBus
        ) {}

    async validateUser(email: string, password) {
        const user = await this.commandBus.execute(new AuthUserCommand(email, password))
        if (!user) {
            return null
        }
        
        return user
    }

    async login(user: any) {
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        }
        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    async decodeToken(token: string) {
        return this.jwtService.decode(token, { json: true}) as { id: string }
    }
}