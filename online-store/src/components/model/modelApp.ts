import { IItem } from '../data/data';

export interface IItemsRequest {
  manufacturers: Set<string>;
  cams: Set<number>;
  colors: Set<string>;
  favorite: boolean;
  qty: { min: number, max: number };
  years: { min: number, max: number };
}

export class AppModel {
  items: Array<IItem>;
  currentItems: Array<IItem>;

  constructor(items: IItem[]) {
    this.items = items;
    this.currentItems = [];
  }

  getItems(request: IItemsRequest): Array<IItem> {
    this.currentItems = this.items.slice();
    return this.currentItems;
  }
}

export default AppModel;
