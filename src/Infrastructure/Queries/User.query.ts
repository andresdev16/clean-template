import { getRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { UserEntity } from 'src/Infrastructure/Entities/User.entity';

import { User, UserQuery } from 'src/Application/Queries/User.query';

@Injectable()
export class UserQueryImplement implements UserQuery {

    async findById(id: string): Promise<User | undefined> {
        return this.convertAccountFromEntity(await getRepository(UserEntity).findOne(id))
    }

    private convertAccountFromEntity(entity?: UserEntity): User | undefined {
        return entity
            ? { ...entity }
            : undefined
    }
}