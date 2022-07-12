import { IItem } from '../data/data';

class AppView {
  itemsMap: Map<number, number>;
  items: Array<IItem>;
  itemsHTML: Array<string>;
  itemsList: HTMLDivElement;
  constructor(itemsList: HTMLDivElement) {
    this.itemsMap = new Map<number, number>();
    this.items = [];
    this.itemsHTML = [];
    this.itemsList = itemsList;
  }

  static renderItem = (
    { id, name, quantity, year, manufacturer, color, cams, favorite }: IItem,
    selected = false
  ): string => {
    const fav = favorite ? 'да' : 'нет';
    const marker = selected ? '<div class="ribbon" title="Товар добавлен в корзину"></div>' : '';

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
        ${marker}
      </div>`;
  };

  render(items: Array<IItem>, selected: Set<number>): void {
    this.itemsMap.clear();
    this.items = items;
    if (items.length) {
      this.itemsHTML = items.map((item, index) => {
        this.itemsMap.set(item.id, index);
        return AppView.renderItem(item);
      });

      for (const i of selected) {
        const index = this.itemsMap.get(i);
        if (index) this.itemsHTML[index] = AppView.renderItem(items[index], true);
      }

      this.itemsList.innerHTML = this.itemsHTML.join('');
    } else this.itemsList.innerHTML = '<h1 class="no-result">Извините, совпадений не обнаружено</h1>';
  }
}

export default AppView;
