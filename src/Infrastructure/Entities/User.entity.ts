import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { OrderEntity } from './Order.entity';
import { ItemEntity } from './Item.entity';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({unique: true})
    email!: string;

    @Column()
    password!: string;

    @Column()
    name!: string;

    @Column()
    role!: string;
    
    @OneToMany(type => OrderEntity, order => order.userId, {cascade: true})
    orders!: OrderEntity[];

    @OneToMany(type => ItemEntity, item => item.userId, {cascade: true})
    items!: ItemEntity[];
}