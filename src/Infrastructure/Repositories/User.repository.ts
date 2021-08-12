import { getRepository } from 'typeorm';

import { UserEntity } from 'src/Infrastructure/Entities/User.entity';

import { UserRepository } from 'src/Domain/Aggregates/UserAggregate/User.repository';
import { User } from 'src/Domain/Aggregates/UserAggregate/User';

export class UserRepositoryImplement implements UserRepository {
    async newId(): Promise<string> {
        const emptyEntity = new UserEntity();
        emptyEntity.email = '';
        emptyEntity.password = '';
        emptyEntity.name = '';
        emptyEntity.role = '';
        emptyEntity.orders = [];
        const entity = await getRepository(UserEntity).save(emptyEntity);
        return entity.id;
    }

    async save(data: User | User[]): Promise<void> {
        const models = Array.isArray(data)
                                ? data 
                                : [data];
        const entities = models.map((model) => this.modelToEntity(model));
        await getRepository(UserEntity).save(entities);
    }

    async findById(id: string): Promise<User | undefined> {
        const entity = await getRepository(UserEntity).findOne({ id });
        return entity
            ? this.entityToModel(entity)
            : undefined;
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const entity = await getRepository(UserEntity).findOne({ email });
        return entity
            ? this.entityToModel(entity)
            : undefined;
    }

    private modelToEntity(model: User): UserEntity {
        const properties = model.properties();
        return { ...properties };
    }

    private entityToModel(entity: UserEntity): User {
        return new User(entity);
    }
}