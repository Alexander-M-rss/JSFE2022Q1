import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import AppController from '../controller/controllerApp';
import data from '../data/data';

const BASKET_COUNTER_MAX = 20;

class App {
  controller;

  constructor() {
    const itemsList = document.querySelector<HTMLDivElement>('.items-list');
    const basketCounter = document.querySelector<HTMLSpanElement>('.quantity');
    const popup = document.querySelector<HTMLDivElement>('.popup');
    const popupCloseBtn = document.querySelector<HTMLButtonElement>('.popup');

    if (!itemsList || !basketCounter || !popup || !popupCloseBtn) throw new Error('index.html is damaged');

    this.controller = new AppController(data, itemsList, basketCounter, BASKET_COUNTER_MAX, popup, popupCloseBtn);
  }
  start() {
    const qtySlider = document.querySelector<HTMLElement>('.quantity-slider');
    const yearSlider = document.querySelector<HTMLElement>('.year-slider');
    const itemsList = document.querySelector<HTMLDivElement>('.items-list');
    const selectSorting = document.querySelector<HTMLSelectElement>('.sorting-type-select');

    if (!qtySlider || !yearSlider || !itemsList || !selectSorting) throw new Error('index.html is damaged');

    const [qtySliderMin, qtySliderMax] = [1, 12];
    const [yearSliderMin, yearSliderMax] = [2000, 2022];

    noUiSlider.create(qtySlider, {
      range: {
        min: qtySliderMin,
        max: qtySliderMax,
      },
      step: 1,
      start: [1, 12],
      connect: true,
      tooltips: { to: (x) => Math.trunc(x) },
    });

    noUiSlider.create(yearSlider, {
      range: {
        min: yearSliderMin,
        max: yearSliderMax,
      },
      step: 1,
      start: [2000, 2022],
      connect: true,
      tooltips: { to: (x) => Math.trunc(x) },
    });

    itemsList.addEventListener('click', (event) => this.controller.selectItem(event));
    selectSorting.addEventListener('input', (event) => {
      if (event.target) this.controller.selectSorting(selectSorting);
    });

    this.controller.start();
  }
}

export default App;
