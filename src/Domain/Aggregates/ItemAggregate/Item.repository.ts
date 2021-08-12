import { Item } from './Item';

export interface ItemRepository {
    newId: () => Promise<string>;
    save: (item: Item | Item[]) => Promise<void>;
    findById: (id: string) => Promise<Item | undefined>;
}