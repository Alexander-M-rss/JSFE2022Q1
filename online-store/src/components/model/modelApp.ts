import { IItem } from '../data/data';

class AppModel {
  items: Array<IItem>;
  currentItems: Array<IItem>;

  constructor(items: IItem[]) {
    this.items = items;
    this.currentItems = [];
  }

  getItems(): Array<IItem> {
    this.currentItems = this.items.slice();
    return this.currentItems;
  }
}

export default AppModel;
