import { IItem } from '../data/data';

class AppView {
  itemsMap: Map<number, number>;
  items: Array<IItem>;
  itemMarkers: Array<HTMLDivElement>;
  itemCards: Array<HTMLDivElement>;
  itemsList: HTMLDivElement;
  basketCounter: HTMLSpanElement;
  popup: HTMLDivElement;
  popupCloseBtn: HTMLButtonElement;
  constructor(
    itemsList: HTMLDivElement,
    basketCounter: HTMLSpanElement,
    popup: HTMLDivElement,
    popupCloseBtn: HTMLButtonElement
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

  render(items: Array<IItem>, selected: Set<number>): void {
    let itemsHTML: Array<string> = [];
    this.itemsMap.clear();
    this.items = items;
    if (items.length) {
      itemsHTML = items.map((item, index) => {
        this.itemsMap.set(item.id, index);
        return AppView.renderItem(item);
      });

      for (const i of selected) {
        const index = this.itemsMap.get(i);
        if (index) itemsHTML[index] = AppView.renderItem(items[index], true);
      }

      this.basketCounter.innerHTML = selected.size.toString();
      this.itemsList.innerHTML = itemsHTML.join('');
      this.itemCards = Array.from(document.querySelectorAll('.item'));
      this.itemMarkers = Array.from(document.querySelectorAll('.marker'));
    } else {
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
}

export default AppView;
