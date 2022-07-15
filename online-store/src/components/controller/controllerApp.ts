import { IItem } from '../data/data';
import { AppModel, IItemsRequest } from '../model/modelApp';
import { AppView, SORTING_TYPE } from '../view/viewApp';

type range = { min: string; max: string };

class AppController {
  model: AppModel;
  view: AppView;
  itemsRequest: IItemsRequest;
  selectedItems: Set<number>;
  searchString: string;
  sortingMode: SORTING_TYPE;
  basketCounterMax: number;
  settingsLoaded: boolean;

  constructor(
    data: Array<IItem>,
    view: HTMLDivElement,
    basketCounter: HTMLSpanElement,
    basketCounterMax: number,
    popup: HTMLDivElement,
    popupCloseBtn: HTMLButtonElement,
    btns: NodeListOf<HTMLButtonElement>,
    checkbox: HTMLInputElement
  ) {
    this.model = new AppModel(data);
    this.view = new AppView(view, basketCounter, popup, popupCloseBtn, btns, checkbox);
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

    this.settingsLoaded = this.loadSettings();
  }

  start(): void {
    if (this.settingsLoaded)
      this.view.setButtonState(
        this.itemsRequest.manufacturers,
        this.itemsRequest.cams,
        this.itemsRequest.colors,
        this.itemsRequest.favorite
      );
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

  applyFilter(event: MouseEvent): void {
    if (!event.target || !event.currentTarget) return;

    let target = event.target as HTMLElement;
    const filterGroup = event.currentTarget as HTMLElement;

    while (target !== filterGroup) {
      if (target.classList.contains('btn') || target.classList.contains('favorite-input')) {
        const filterType = target.dataset.type || '';

        if (filterType === 'manufacturer') {
          const manufacturer = target.innerText.toLowerCase();

          if (this.itemsRequest.manufacturers.has(manufacturer)) {
            this.itemsRequest.manufacturers.delete(manufacturer);
            target.classList.remove('active');
          } else {
            this.itemsRequest.manufacturers.add(manufacturer);
            target.classList.add('active');
          }
        } else if (filterType === 'cams') {
          const cams = parseInt(target.innerText);

          if (isNaN(cams)) return;

          if (this.itemsRequest.cams.has(cams)) {
            this.itemsRequest.cams.delete(cams);
            target.classList.remove('active');
          } else {
            this.itemsRequest.cams.add(cams);
            target.classList.add('active');
          }
        } else if (filterType === 'colors') {
          const color = target.innerText.toLowerCase();

          if (this.itemsRequest.colors.has(color)) {
            this.itemsRequest.colors.delete(color);
            target.classList.remove('active');
          } else {
            this.itemsRequest.colors.add(color);
            target.classList.add('active');
          }
        } else if (filterType === 'favorite') this.itemsRequest.favorite = (target as HTMLInputElement).checked;

        this.view.render(
          this.model.getItems(this.itemsRequest),
          this.selectedItems,
          this.sortingMode,
          this.searchString
        );

        return;
      }
      if (!target.parentNode) return;

      target = target.parentNode as HTMLElement;
    }
  }

  saveSettings(): void {
    localStorage.setItem('omrss_manufacturers', JSON.stringify(Array.from(this.itemsRequest.manufacturers)));
    localStorage.setItem('omrss_cams', JSON.stringify(Array.from(this.itemsRequest.cams)));
    localStorage.setItem('omrss_colors', JSON.stringify(Array.from(this.itemsRequest.colors)));
    localStorage.setItem('omrss_ranges', JSON.stringify([this.itemsRequest.qty, this.itemsRequest.years]));
    localStorage.setItem('omrss_favorite', JSON.stringify(this.itemsRequest.favorite));
    localStorage.setItem('omrss_selectedItems', JSON.stringify(Array.from(this.selectedItems)));
    localStorage.setItem('omrss_searchString', this.searchString);
    localStorage.setItem('omrss_sortingMode', JSON.stringify(this.sortingMode));
  }

  loadSettings(): boolean {
    const manufacturers: Array<string> = JSON.parse(localStorage.getItem('omrss_manufacturers') || '[]');
    const cams: Array<string> = JSON.parse(localStorage.getItem('omrss_cams') || '[]');
    const colors: Array<string> = JSON.parse(localStorage.getItem('omrss_colors') || '[]');
    const ranges: Array<range> = JSON.parse(localStorage.getItem('omrss_ranges') || '[]');
    const favorite: boolean = JSON.parse(localStorage.getItem('omrss_favorite') || 'false');
    const selectedItems: Array<string> = JSON.parse(localStorage.getItem('omrss_selectedItems') || '[]');
    const searchString = localStorage.getItem('omrss_searchString') || '';
    const sortingMode = parseInt(localStorage.getItem('omrss_sortingMode') || '1');

    let loaded = false;

    if (Array.isArray(manufacturers) && manufacturers.length) {
      manufacturers.forEach((item) => this.itemsRequest.manufacturers.add(item));
      loaded = true;
    }
    if (Array.isArray(cams) && cams.length) {
      cams.forEach((item) => {
        const x = parseInt(item);
        if (!isNaN(x)) this.itemsRequest.cams.add(x);
      });
      loaded = true;
    }
    if (Array.isArray(colors) && colors.length) {
      colors.forEach((item) => this.itemsRequest.colors.add(item));
      loaded = true;
    }
    if (Array.isArray(ranges) && ranges.length > 1) {
      const qtyMin = parseInt(ranges[0].min);
      const qtyMax = parseInt(ranges[0].max);
      if (!isNaN(qtyMin) && !isNaN(qtyMax)) {
        this.itemsRequest.qty.min = qtyMin;
        this.itemsRequest.qty.max = qtyMax;
        loaded = true;
      }
      const yearMin = parseInt(ranges[1].min);
      const yearMax = parseInt(ranges[1].max);
      if (!isNaN(qtyMin) && !isNaN(qtyMax)) {
        this.itemsRequest.years.min = yearMin;
        this.itemsRequest.years.max = yearMax;
        loaded = true;
      }
    }
    if (favorite) {
      this.itemsRequest.favorite = true;
      loaded = true;
    }
    if (Array.isArray(selectedItems) && selectedItems.length) {
      selectedItems.forEach((string) => {
        const item = parseInt(string);

        if (!isNaN(item)) this.selectedItems.add(item);
      });
    }
    if (searchString.length) {
      this.searchString = searchString;
      loaded = true;
    }
    if (!isNaN(sortingMode) && sortingMode > 1) {
      this.sortingMode = sortingMode;
      loaded = true;
    }

    return loaded;
  }
}

export default AppController;
