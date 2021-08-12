import { AggregateRoot } from '@nestjs/cqrs';

import { OrderStatusChangedEvent } from 'src/Domain/Events/OrderStatusChanged.event';

import { OrderStatus } from 'src/Domain/Aggregates/OrderAggregate/OrderStatus';
import * as DateTime from 'date-fns';

export interface OrderProperties {
    readonly id: string;
    readonly userId: any;
    readonly buyerName: string;
    readonly buyerPhone: number;
    readonly buyerEmail: string;
    readonly shippingMethod: number;
    readonly shippingAddress: string;
    readonly shippingCity: string;
    readonly shippingRegion: string;
    readonly shippingCountry: string;
    readonly items: any[] | any;
    readonly creationDate: any;
    readonly internalOrderNumber: number;
    readonly pack_promise_min: Date;
    readonly pack_promise_max: Date;
    readonly ship_promise_min: Date;
    readonly ship_promise_max: Date;
    readonly delivery_promise_min: Date;
    readonly delivery_promise_max: Date;
    readonly ready_pickup_promise_min: Date;
    readonly ready_pickup_promise_max: Date;
    readonly status: string;
    readonly deliveredDate: Date;
}

export class Order extends AggregateRoot {
    private readonly id: string;
    private readonly userId: any;
    private buyerName: string;
    private buyerPhone: number;
    private buyerEmail: string;
    private shippingMethod: number;
    private shippingAddress: string;
    private shippingCity: string;
    private shippingRegion: string;
    private shippingCountry: string;
    private items: any[] | any;
    private creationDate: any;
    private internalOrderNumber: number;
    private pack_promise_min?: Date;
    private pack_promise_max?: Date;
    private ship_promise_min?: Date;
    private ship_promise_max?: Date;
    private delivery_promise_min?: Date;
    private delivery_promise_max?: Date;
    private ready_pickup_promise_min?: Date;
    private ready_pickup_promise_max?: Date;
    private status: string;
    private deliveredDate: Date;

    constructor(properties: OrderProperties) {
        super()
        this.id = properties.id;
        this.userId = properties.userId;
        this.buyerName = properties.buyerName;
        this.buyerPhone = properties.buyerPhone;
        this.buyerEmail = properties.buyerEmail;
        this.shippingMethod = properties.shippingMethod;
        this.shippingAddress = properties.shippingAddress;
        this.shippingCity = properties.shippingCity;
        this.shippingRegion = properties.shippingRegion;
        this.shippingCountry = properties.shippingCountry;
        this.items = properties.items;
        this.creationDate = properties.creationDate;
        this.internalOrderNumber = properties.internalOrderNumber;
        this.pack_promise_min = properties.pack_promise_min;
        this.pack_promise_max = properties.pack_promise_max;    
        this.ship_promise_min = properties.ship_promise_min;    
        this.ship_promise_max = properties.ship_promise_max;    
        this.delivery_promise_min = properties.delivery_promise_min;    
        this.delivery_promise_max = properties.delivery_promise_max;    
        this.ready_pickup_promise_min = properties.ready_pickup_promise_min;
        this.ready_pickup_promise_max = properties.ready_pickup_promise_max;
        this.status = properties.status;
        this.deliveredDate = properties.deliveredDate
    }

    properties(): OrderProperties {
        return {
            id: this.id,
            userId: this.userId,
            buyerName: this.buyerName,
            buyerPhone: this.buyerPhone,
            buyerEmail: this.buyerEmail,
            shippingMethod: this.shippingMethod,
            shippingAddress: this.shippingAddress,
            shippingCity: this.shippingCity,
            shippingRegion: this.shippingRegion,
            shippingCountry: this.shippingCountry,
            items: this.items,
            creationDate: this.creationDate,
            internalOrderNumber: this.internalOrderNumber,
            pack_promise_min: this.pack_promise_min,
            pack_promise_max: this.pack_promise_max,    
            ship_promise_min: this.ship_promise_min,    
            ship_promise_max: this.ship_promise_max,    
            delivery_promise_min: this.delivery_promise_min,    
            delivery_promise_max: this.delivery_promise_max,    
            ready_pickup_promise_min: this.ready_pickup_promise_min,
            ready_pickup_promise_max: this.ready_pickup_promise_max,
            status: this.status,
            deliveredDate: this.deliveredDate,
        };
    }


    setCreationDate(): void {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear().toString();
        const currentMonth = currentDate.getMonth().toString().length === 1
            ? '0' + currentDate.getMonth().toString()
            : currentDate.getMonth().toString();
        const currentDay = currentDate.getDay().toString.length === 1
            ? '0' + currentDate.getDay().toString()
            : currentDate.getDay().toString();

        const formatedDate = [currentYear, currentMonth, currentDay].join('-');

        this.creationDate = formatedDate;
    }

    setPromisesMinMax(
        packMin: Date, 
        packMax: Date, 
        shipMin: Date, 
        shipMax: Date, 
        deliveryMin: Date, 
        deliveryMax: Date, 
        readyMin: Date, 
        readyMax: Date): void {
        
            this.pack_promise_min = packMin;
            this.pack_promise_max = packMax;
            this.ship_promise_min = shipMin;
            this.ship_promise_max = shipMax;
            this.delivery_promise_min = deliveryMin;
            this.delivery_promise_max = deliveryMax;
            this.ready_pickup_promise_min = readyMin;
            this.ready_pickup_promise_max = readyMax;
            this.setStatusOnShipping();
    }

    setInternalOrderNumber(): void {
        const rand = Math.floor(Math.random() * (101 - 0)) + 0; 
        const epoch = new Date().getTime()

        this.internalOrderNumber = epoch + rand
    }

    setStatusOnQueue(): void {
        this.status = OrderStatus.Queue;
    }
    
    setStatusOnShipping(): void {
        this.status = OrderStatus.Shipping;
        this.apply(new OrderStatusChangedEvent(this.status));
    }

    setStatusOnDelivered(): void {
        this.status = OrderStatus.Delivered;
        this.deliveredDate = new Date();
        this.apply(new OrderStatusChangedEvent(this.status));
    }

}