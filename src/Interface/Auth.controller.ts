import {
    Body,
    Controller,
    Get,
    Request,
    UseGuards,
    Post,
    Response,
    HttpStatus
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/Interface/Services/Jwt-Auth.guard';
import { LocalAuthGuard } from 'src/Interface/Services/Local-Auth.guard';

import { AuthUserBodyDTO } from 'src/Interface/DTOs/AuthUser.dto';
import { CreateUserBodyDTO } from 'src/Interface/DTOs/CreateUser.dto';

import { CreateUserCommand } from 'src/Application/Commands/Create-User.command';
import { GetUserQuery } from 'src/Application/Queries/Get-User.query';
import { GetUserResult } from 'src/Application/Queries/Get-User.result';

import { AuthService } from 'src/Interface/Services/Auth.service';
import { PartyRoles } from 'src/Domain/Aggregates/UserAggregate/PartyRole';




@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly commandBus: CommandBus, 
        private readonly queryBus: QueryBus,
        private readonly authService: AuthService) {}

    @Post('create')
    async createAccountAsync(@Body() body: CreateUserBodyDTO): Promise<void> {
        const command = new CreateUserCommand(body.email, body.password, body.name, body.role);
        await this.commandBus.execute(command);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async loginAsync(@Request() request: any, @Body() body: AuthUserBodyDTO): Promise<any> {
        return this.authService.login(request.user)
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('profile')
    async getProfile(@Request() req: any): Promise<GetUserResult> {
        const query = new GetUserQuery(req.user.id)
        return this.queryBus.execute(query)
    }

    @Get('roles')
    async getRoles() {
        return PartyRoles
    }
}