import { SetMetadata } from '@nestjs/common';
import { PartyRoles } from 'src/Domain/Aggregates/UserAggregate/PartyRole';

export const ROLES_KEY = 'roles';
export const Roles = ( ...roles: PartyRoles[] ) => SetMetadata(ROLES_KEY, roles);