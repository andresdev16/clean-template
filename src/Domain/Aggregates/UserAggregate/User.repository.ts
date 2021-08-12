import { User } from 'src/Domain/Aggregates/UserAggregate/User';


export interface UserRepository {
    newId: () => Promise<string>;
    save: (user: User | User[]) => Promise<void>;
    findById: (id: string) => Promise<User | undefined>;
    findByEmail: (email: string) => Promise<User | undefined>;
}