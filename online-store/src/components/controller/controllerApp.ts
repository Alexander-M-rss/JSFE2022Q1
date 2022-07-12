import { IItem } from '../data/data';
import AppModel from '../model/modelApp';
import AppView from '../view/viewApp';

class AppController {
  model;
  view;
  selectedItems;
  constructor(data: Array<IItem>, view: HTMLDivElement) {
    this.model = new AppModel(data);
    this.view = new AppView(view);
    this.selectedItems = new Set<number>();
  }

  start(): void {
    this.view.render(this.model.getItems(), this.selectedItems);
  }
}

export default AppController;
