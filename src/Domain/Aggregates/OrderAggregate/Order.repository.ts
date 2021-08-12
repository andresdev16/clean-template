import { Order } from "./Order";

export interface OrderRepository {
    newId: () => Promise<string>;
    save: (order: Order | Order[]) => Promise<void>;
    findById: (id: string) => Promise<Order | undefined>;
}