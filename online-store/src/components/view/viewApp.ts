import { IItem } from '../data/data';

export enum SORTING_TYPE {
  BY_NAME_ASC = 1,
  BY_NAME_DESC,
  BY_YEAR_ASC,
  BY_YEAR_DESC,
  BY_QTY_ASC,
  BY_QTY_DESC,
}

export class AppView {
  itemsMap: Map<number, number>;
  items: Array<IItem>;
  itemMarkers: Array<HTMLDivElement>;
  itemCards: Array<HTMLDivElement>;
  itemsList: HTMLDivElement;
  basketCounter: HTMLSpanElement;
  popup: HTMLDivElement;
  popupCloseBtn: HTMLButtonElement;
  btns: NodeListOf<HTMLButtonElement>;
  checkbox: HTMLInputElement;
  constructor(
    itemsList: HTMLDivElement,
    basketCounter: HTMLSpanElement,
    popup: HTMLDivElement,
    popupCloseBtn: HTMLButtonElement,
    btns: NodeListOf<HTMLButtonElement>,
    checkbox: HTMLInputElement
  ) {
    this.itemsMap = new Map<number, number>();
    this.items = [];
    this.itemCards = [];
    this.itemMarkers = [];
    this.itemsList = itemsList;
    this.basketCounter = basketCounter;
    this.popup = popup;
    this.popupCloseBtn = popupCloseBtn;
    this.popupCloseBtn.addEventListener('click', () => this.popup.classList.add('hidden'));
    this.btns = btns;
    this.checkbox = checkbox;
  }

  static renderItem = (
    { id, name, quantity, year, manufacturer, color, cams, favorite }: IItem,
    selected = false
  ): string => {
    const fav = favorite ? 'да' : 'нет';
    const hidden = selected ? '' : ' hidden';

    return `
      <div class="item" data-item-id="${id}">
        <h4 class="item-title">${name}</h4><div class="item-img-container">
          <img src="./img/items/${id}.jpg" alt="${name}" class="item-img">
        </div>
        <ul class="item-props">
          <li>Количество: ${quantity}</li>
          <li>Год выхода: ${year}</li>
          <li>Производитель: ${manufacturer}</li>
          <li>Цвет: ${color}</li>
          <li>Количество камер: ${cams}</li>
          <li>Популярный: ${fav}</li>
        </ul>
        <div class="marker${hidden}" title="Товар добавлен в корзину"></div>
      </div>`;
  };

  render(items: Array<IItem>, selected: Set<number>, sorting: SORTING_TYPE, searchString: string): void {
    let itemsHTML: Array<string> = [];

    this.itemsMap.clear();
    this.items = AppView.applySorting(items, sorting);
    if (this.items.length) {
      itemsHTML = items.map((item, index) => {
        this.itemsMap.set(item.id, index);
        return AppView.renderItem(item);
      });

      for (const i of selected) {
        const index = this.itemsMap.get(i);
        if (index) itemsHTML[index] = AppView.renderItem(items[index], true);
      }
      document.body.classList.remove('body-no-result');
      this.basketCounter.innerHTML = selected.size.toString();
      this.itemsList.innerHTML = itemsHTML.join('');
      this.itemCards = Array.from(document.querySelectorAll('.item'));
      if (searchString.length) this.applySearch(searchString);
      this.itemMarkers = Array.from(document.querySelectorAll('.marker'));
    } else {
      document.body.classList.add('body-no-result');
      this.itemsList.innerHTML = '<h1 class="no-result">Извините, совпадений не обнаружено</h1>';
      this.itemCards = [];
      this.itemMarkers = [];
    }
  }

  selectItem(itemId: number, isSelected = true): void {
    const index = this.itemsMap.get(itemId);

    if (index !== undefined)
      if (isSelected) this.itemMarkers[index].classList.remove('hidden');
      else this.itemMarkers[index].classList.add('hidden');
  }

  updateBasketCounter(n: number): void {
    this.basketCounter.innerHTML = n.toString();
  }

  showBasketOverflowPopup(): void {
    if (!this.popup.classList.contains('hidden')) return;

    this.popup.classList.remove('hidden');
    setTimeout(() => this.popupCloseBtn.click(), 2500);
  }

  static sortByNameAsc(array: Array<IItem>): Array<IItem> {
    return array.sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  static sortByNameDesc(array: Array<IItem>): Array<IItem> {
    return array.sort((a, b) => (a.name <= b.name ? 1 : -1));
  }

  static sortByYearAsc(array: Array<IItem>): Array<IItem> {
    return array.sort((a, b) => (a.year > b.year ? 1 : -1));
  }

  static sortByYearDesc(array: Array<IItem>): Array<IItem> {
    return array.sort((a, b) => (a.year <= b.year ? 1 : -1));
  }

  static sortByQtyAsc(array: Array<IItem>): Array<IItem> {
    return array.sort((a, b) => (a.quantity > b.quantity ? 1 : -1));
  }

  static sortByQtyDesc(array: Array<IItem>): Array<IItem> {
    return array.sort((a, b) => (a.quantity <= b.quantity ? 1 : -1));
  }

  static applySorting(array: Array<IItem>, sorting: number): Array<IItem> {
    switch (sorting) {
      case SORTING_TYPE.BY_NAME_ASC:
        return this.sortByNameAsc(array);
      case SORTING_TYPE.BY_NAME_DESC:
        return this.sortByNameDesc(array);
      case SORTING_TYPE.BY_YEAR_ASC:
        return this.sortByYearAsc(array);
      case SORTING_TYPE.BY_YEAR_DESC:
        return this.sortByYearDesc(array);
      case SORTING_TYPE.BY_QTY_ASC:
        return this.sortByQtyAsc(array);
      case SORTING_TYPE.BY_QTY_DESC:
        return this.sortByQtyDesc(array);
      default:
        return array;
    }
  }

  static filterByName(array: Array<IItem>, search: string): Array<number> {
    const visibleItemsId: Array<number> = [];

    array.forEach((item) => {
      if (item.name.toLowerCase().includes(search)) visibleItemsId.push(item.id);
    });
    return visibleItemsId;
  }

  applySearch(search: string): void {
    const noResultMsg = document.querySelector<HTMLHeadingElement>('.no-result');

    if (!this.items.length) return;

    if (!search.length) {
      if (noResultMsg) {
        noResultMsg.remove();
        document.body.classList.remove('body-no-result');
      }
      this.itemCards.forEach((item) => item.classList.remove('hidden'));
      return;
    }

    const visibleItemsId: Array<number> = AppView.filterByName(this.items, search.toLowerCase());

    this.itemCards.forEach((item) => item.classList.add('hidden'));
    if (visibleItemsId.length) {
      if (noResultMsg) {
        noResultMsg.remove();
        document.body.classList.remove('body-no-result');
      }
      visibleItemsId.forEach((itemId) => {
        const index = this.itemsMap.get(itemId);
        if (index !== undefined) this.itemCards[index].classList.remove('hidden');
      });
    } else if (noResultMsg === null) {
      const newMsg = document.createElement('h1');

      newMsg.classList.add('no-result');
      document.body.classList.add('body-no-result');
      newMsg.innerHTML = 'Извините, совпадений не обнаружено';
      this.itemsList.append(newMsg);
    }
  }

  setButtonState(manufacturers: Set<string>, cams: Set<number>, colors: Set<string>, favorite: boolean): void {
    this.checkbox.checked = favorite;
    this.btns.forEach((btn) => {
      const filterType = btn.dataset.type || '';
      let active = false;
      switch (filterType) {
        case 'manufacturer':
          if (manufacturers.has(btn.innerText.toLowerCase())) active = true;
          break;
        case 'cams':
          if (cams.has(parseInt(btn.innerText.toLowerCase()))) active = true;
          break;
        case 'colors':
          if (colors.has(btn.innerText.toLowerCase())) active = true;
          break;
      }
      if (active) btn.classList.add('active');
      else btn.classList.remove('active');
    });
  }
}

export default AppView;
