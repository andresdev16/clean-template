import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, JoinTable, ManyToMany } from 'typeorm';
import { UserEntity } from './User.entity';
import { OrderEntity } from './Order.entity';

@Entity()
export class ItemEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(type => UserEntity, user => user.items)
    @JoinColumn({name: 'product_owner'})
    userId!: UserEntity;

    @ManyToMany((type => OrderEntity))
    @JoinTable({ 
        name: 'item_orders',
        joinColumn: {
            name: 'item',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'order',
            referencedColumnName: 'id'
        }
    })
    orders!: OrderEntity[];

    @Column()
    name!: string;

    @Column()
    qty!: string;

    @Column()
    weight!: number;

}