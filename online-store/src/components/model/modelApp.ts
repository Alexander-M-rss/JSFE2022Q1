import { IItem } from '../data/data';

export interface IItemsRequest {
  manufacturers: Set<string>;
  cams: Set<number>;
  colors: Set<string>;
  favorite: boolean;
  qty: { min: number; max: number };
  years: { min: number; max: number };
}

export class AppModel {
  items: Array<IItem>;
  currentItems: Array<IItem>;

  constructor(items: IItem[]) {
    this.items = items;
    this.currentItems = [];
  }

  getItems(request: IItemsRequest): Array<IItem> {
    this.currentItems = AppModel.applyRangeFilters(this.items, request.qty, request.years);
    return this.currentItems;
  }

  static applyRangeFilters(
    array: Array<IItem>,
    qty: { min: number; max: number },
    years: { min: number; max: number }
  ): Array<IItem> {
    return array.filter(
      (item) => item.quantity >= qty.min && item.quantity <= qty.max && item.year >= years.min && item.year <= years.max
    );
  }
}

export default AppModel;
