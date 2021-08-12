import { Injectable, CanActivate, ExecutionContext, InternalServerErrorException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { PartyRoles } from 'src/Domain/Aggregates/UserAggregate/PartyRole';
import { ROLES_KEY } from 'src/Interface/Services/Roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector, private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<PartyRoles[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest()
        const auth = request.get('Authorization');
        if (!auth) {
            throw new InternalServerErrorException('Not access token provided')
        }
        const token = auth.replace('Bearer ', '')
        const user = this.jwtService.verify(token)
        return requiredRoles.some((role) => user.role.includes(role));
    }
}