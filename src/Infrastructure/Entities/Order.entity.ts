import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable, RelationId } from 'typeorm';
import { UserEntity } from './User.entity';
import { ItemEntity } from './Item.entity';

@Entity()
export class OrderEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    buyerName!: string;

    @Column()
    buyerPhone!: number;

    @Column()
    buyerEmail!: string;

    @Column()
    shippingMethod!: number;

    @Column()
    shippingAddress!: string;

    @Column()
    shippingCity!: string;

    @Column()
    shippingRegion!: string;

    @Column()
    shippingCountry!: string;

    @Column()
    creationDate!: string;

    @Column()
    internalOrderNumber!: number;

    @Column({ type: 'datetime', nullable: true})
    pack_promise_min!: Date;

    @Column({ type: 'datetime', nullable: true})
    pack_promise_max!: Date;

    @Column({ type: 'datetime', nullable: true})
    ship_promise_min!: Date;

    @Column({ type: 'datetime', nullable: true})
    ship_promise_max!: Date;

    @Column({ type: 'datetime', nullable: true})
    delivery_promise_min!: Date;

    @Column({ type: 'datetime', nullable: true})
    delivery_promise_max!: Date;

    @Column({ type: 'datetime', nullable: true})
    ready_pickup_promise_min!: Date;

    @Column({ type: 'datetime', nullable: true})
    ready_pickup_promise_max!: Date;

    @Column({ type: 'datetime'})
    deliveredDate!: Date;

    @Column()
    status!: string;

    @ManyToOne(type => UserEntity, user => user.orders)
    @JoinColumn({name: 'order_owner'})
    userId!: UserEntity;

    @ManyToMany(() => ItemEntity, {cascade: true})
    @JoinTable({ 
        name: 'order_items',
        joinColumn: {
            name: 'order',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'item',
            referencedColumnName: 'id'
        }
    })
    items!: ItemEntity[];
}