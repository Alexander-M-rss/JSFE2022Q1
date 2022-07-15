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
    this.currentItems = this.items.slice();

    if (request.manufacturers.size)
      this.currentItems = AppModel.applyFilterByManufacturers(this.currentItems, request.manufacturers);
    if (request.cams.size) this.currentItems = AppModel.applyFilterByCams(this.currentItems, request.cams);
    this.currentItems = AppModel.applyRangeFilters(this.currentItems, request.qty, request.years);
    if (request.colors.size) this.currentItems = AppModel.applyFilterByColors(this.currentItems, request.colors);
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

  static applyFilterByManufacturers(array: Array<IItem>, manufacturers: Set<string>): Array<IItem> {
    return array.filter((item) => manufacturers.has(item.manufacturer.toLocaleLowerCase()));
  }

  static applyFilterByCams(array: Array<IItem>, cams: Set<number>): Array<IItem> {
    return array.filter((item) => cams.has(item.cams));
  }

  static applyFilterByColors(array: Array<IItem>, colors: Set<string>): Array<IItem> {
    return array.filter((item) => colors.has(item.color.toLocaleLowerCase()));
  }
}

export default AppModel;
