import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import AppController from '../controller/controllerApp';
import data from '../data/data';

const BASKET_COUNTER_MAX = 20;
const [QTY_MIN, QTY_MAX] = [1, 12];
const [YEAR_MIN, YEAR_MAX] = [2000, 2022];

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
    const qtySlider = document.querySelector<HTMLDivElement>('.quantity-slider');
    const qtyLow = document.querySelector<HTMLDivElement>('.quantity-low');
    const qtyHi = document.querySelector<HTMLDivElement>('.quantity-hi');
    const yearSlider = document.querySelector<HTMLDivElement>('.year-slider');
    const yearLow = document.querySelector<HTMLDivElement>('.year-low');
    const yearHi = document.querySelector<HTMLDivElement>('.year-hi');
    const itemsList = document.querySelector<HTMLDivElement>('.items-list');
    const selectSorting = document.querySelector<HTMLSelectElement>('.sorting-type-select');
    const searchInput = document.querySelector<HTMLInputElement>('.search');
    const searchClearBtn = document.querySelector<HTMLButtonElement>('.clear');

    if (
      !qtySlider ||
      !qtyLow ||
      !qtyHi ||
      !yearSlider ||
      !yearLow ||
      !yearHi ||
      !itemsList ||
      !selectSorting ||
      !searchInput ||
      !searchClearBtn
    )
      throw new Error('index.html is damaged');

    const [qtySliderStart, qtySliderEnd] = [1, 12];
    const [yearSliderStart, yearSliderEnd] = [2000, 2022];

    noUiSlider.create(qtySlider, {
      range: {
        min: QTY_MIN,
        max: QTY_MAX,
      },
      step: 1,
      start: [qtySliderStart, qtySliderEnd],
      connect: true,
      tooltips: { to: (x) => Math.trunc(x) },
    });

    noUiSlider.create(yearSlider, {
      range: {
        min: YEAR_MIN,
        max: YEAR_MAX,
      },
      step: 1,
      start: [yearSliderStart, yearSliderEnd],
      connect: true,
      tooltips: { to: (x) => Math.trunc(x) },
    });

    this.controller.start();

    (qtySlider as noUiSlider.target).noUiSlider?.on('set', () => {
      const range = (qtySlider as noUiSlider.target).noUiSlider?.get(true) || [QTY_MIN, QTY_MAX];
      const values = (range as Array<number>).map((x) => Math.trunc(x));
      if (values.length > 0) {
        qtyLow.innerText = values[0].toString();
        qtyHi.innerText = values[1].toString();
        this.controller.applyQtyRange(values[0], values[1]);
      } else throw new Error('noUiSliderError');
    });

    (yearSlider as noUiSlider.target).noUiSlider?.on('set', () => {
      const range = (yearSlider as noUiSlider.target).noUiSlider?.get(true) || [YEAR_MIN, YEAR_MAX];
      const values = (range as Array<number>).map((x) => Math.trunc(x));
      if (values.length > 0) {
        yearLow.innerText = values[0].toString();
        yearHi.innerText = values[1].toString();
        this.controller.applyYearsRange(values[0], values[1]);
      } else throw new Error('noUiSliderError');
    });

    itemsList.addEventListener('click', (event) => this.controller.selectItem(event));
    selectSorting.addEventListener('input', (event) => {
      if (event.target) this.controller.selectSorting(selectSorting);
    });

    searchClearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchClearBtn.classList.add('hidden');
      searchInput.classList.remove('not-empty');
      this.controller.applySearch(searchInput.value);
    });

    searchInput.addEventListener('input', () => {
      if (searchInput.value.length === 0) {
        searchClearBtn.classList.add('hidden');
        searchInput.classList.remove('not-empty');
      } else if (searchInput.value.length === 1) {
        searchClearBtn.classList.remove('hidden');
        searchInput.classList.add('not-empty');
      }
      this.controller.applySearch(searchInput.value);
    });
  }
}

export default App;
