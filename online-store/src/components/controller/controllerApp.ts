import { IItem } from '../data/data';
import { AppModel, IItemsRequest } from '../model/modelApp';
import { AppView, SORTING_TYPE } from '../view/viewApp';

class AppController {
  model;
  view;
  itemsRequest: IItemsRequest;
  selectedItems;
  searchString;
  sortingMode: SORTING_TYPE;
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
    this.itemsRequest = {
      manufacturers: new Set<string>(null),
      cams: new Set<number>(null),
      colors: new Set<string>(null),
      favorite: false,
      qty: { min: 1, max: 12 },
      years: { min: 2000, max: 2022 },
    };

    this.selectedItems = new Set<number>(null);
    this.sortingMode = 1;
    this.searchString = '';
    this.basketCounterMax = basketCounterMax;
  }

  start(): void {
    this.view.render(this.model.getItems(this.itemsRequest), this.selectedItems, this.sortingMode, this.searchString);
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

  selectSorting(element: HTMLSelectElement): void {
    const sortingMode = parseInt(element.value);
    if (sortingMode in SORTING_TYPE) this.sortingMode = sortingMode;
    this.view.render(this.view.items, this.selectedItems, this.sortingMode, this.searchString);
  }

  applySearch(searchString: string): void {
    this.searchString = searchString;
    this.view.applySearch(searchString);
  }

  applyQtyRange(min: number, max: number): void {
    this.itemsRequest.qty = { min, max };
    this.view.render(this.model.getItems(this.itemsRequest), this.selectedItems, this.sortingMode, this.searchString);
  }

  applyYearsRange(min: number, max: number): void {
    this.itemsRequest.years = { min, max };
    this.view.render(this.model.getItems(this.itemsRequest), this.selectedItems, this.sortingMode, this.searchString);
  }
}

export default AppController;
