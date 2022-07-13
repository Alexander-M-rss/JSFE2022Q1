import { IItem } from '../data/data';
import AppModel from '../model/modelApp';
import AppView from '../view/viewApp';

class AppController {
  model;
  view;
  selectedItems;
  basketCounterMax;

  constructor(
    data: Array<IItem>,
    view: HTMLDivElement,
    basketCounter: HTMLSpanElement,
    basketCounterMax: number,
    popup: HTMLDivElement,
    popupCloseBtn: HTMLButtonElement
  ) {
    this.model = new AppModel(data);
    this.view = new AppView(view, basketCounter, popup, popupCloseBtn);
    this.selectedItems = new Set<number>(null);
    this.basketCounterMax = basketCounterMax;
  }

  start(): void {
    this.view.render(this.model.getItems(), this.selectedItems);
  }

  selectItem(event: MouseEvent): void {
    if (!event.target || !event.currentTarget) return;

    let target = event.target as HTMLElement;
    const itemsList = event.currentTarget as HTMLElement;

    while (target !== itemsList) {
      if (target.classList.contains('item')) {
        const itemIdStr = target.dataset.itemId || '';
        const itemId = parseInt(itemIdStr);

        if (Number.isNaN(itemId)) return;

        if (this.selectedItems.has(itemId)) {
          this.selectedItems.delete(itemId);
          this.view.selectItem(itemId, false);
        } else if (this.selectedItems.size < this.basketCounterMax) {
          this.selectedItems.add(itemId);
          this.view.selectItem(itemId);
        } else this.view.showBasketOverflowPopup();
        this.view.updateBasketCounter(this.selectedItems.size);

        return;
      }
      if (!target.parentNode) return;

      target = target.parentNode as HTMLElement;
    }
  }
}

export default AppController;
