export class Item {
    readonly id: string;
    readonly name: string;
    readonly qty: string;
    readonly weight: number;
}

export class ItemInItems {
    readonly id: string;
    readonly name: string;
    readonly qty: string;
    readonly weight: number;
}

export class Items extends Array<ItemInItems> {}

export interface ItemQuery {
    findById: (id: string) => Promise<Item>;
    find: (userId: string, offset: number, limit: number) => Promise<Items>;
}