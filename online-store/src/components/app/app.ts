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
    const btns = document.querySelectorAll<HTMLButtonElement>('.btn');
    const checkbox = document.querySelector<HTMLInputElement>('.favorite-input');

    if (!itemsList || !basketCounter || !popup || !popupCloseBtn || !btns || !checkbox)
      throw new Error('index.html is damaged');

    this.controller = new AppController(
      data,
      itemsList,
      basketCounter,
      BASKET_COUNTER_MAX,
      QTY_MIN,
      QTY_MAX,
      YEAR_MIN,
      YEAR_MAX,
      popup,
      popupCloseBtn,
      btns,
      checkbox
    );
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
    const filtersByValues = document.querySelector<HTMLDivElement>('.filters-by-values');
    const resetFiltersBtn = document.querySelector<HTMLButtonElement>('.filter-reset');
    const resetSettingsBtn = document.querySelector<HTMLButtonElement>('.settings-reset');

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
      !searchClearBtn ||
      !filtersByValues ||
      !resetFiltersBtn ||
      !resetSettingsBtn
    )
      throw new Error('index.html is damaged');

    noUiSlider.create(qtySlider, {
      range: {
        min: QTY_MIN,
        max: QTY_MAX,
      },
      step: 1,
      start: [this.controller.itemsRequest.qty.min, this.controller.itemsRequest.qty.max],
      connect: true,
      tooltips: { to: (x) => Math.trunc(x) },
    });

    noUiSlider.create(yearSlider, {
      range: {
        min: YEAR_MIN,
        max: YEAR_MAX,
      },
      step: 1,
      start: [this.controller.itemsRequest.years.min, this.controller.itemsRequest.years.max],
      connect: true,
      tooltips: { to: (x) => Math.trunc(x) },
    });

    const setSettings = (): void => {
      qtyLow.innerText = this.controller.itemsRequest.qty.min.toString();
      qtyHi.innerText = this.controller.itemsRequest.qty.max.toString();
      yearLow.innerText = this.controller.itemsRequest.years.min.toString();
      yearHi.innerText = this.controller.itemsRequest.years.max.toString();
      selectSorting.value = this.controller.sortingMode.toString();
      if (this.controller.searchString.length) {
        searchClearBtn.classList.remove('hidden');
        searchInput.classList.add('not-empty');
      } else {
        searchClearBtn.classList.add('hidden');
        searchInput.classList.remove('not-empty');
      }
      searchInput.value = this.controller.searchString;
    };

    const setSlidersHandles = (): void => {
      (qtySlider as noUiSlider.target).noUiSlider?.set([
        this.controller.itemsRequest.qty.min,
        this.controller.itemsRequest.qty.max,
      ]);
      (yearSlider as noUiSlider.target).noUiSlider?.set([
        this.controller.itemsRequest.years.min,
        this.controller.itemsRequest.years.max,
      ]);
    };

    setSettings();
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

    filtersByValues.addEventListener('click', (event) => this.controller.applyFilter(event));

    resetFiltersBtn.addEventListener('click', () => {
      this.controller.resetFilters();
      setSettings();
      setSlidersHandles();
      this.controller.start();
    });

    resetSettingsBtn.addEventListener('click', () => {
      this.controller.resetSettings();
      setSettings();
      setSlidersHandles();
      this.controller.start();
    });

    window.onbeforeunload = () => this.controller.saveSettings();
  }
}

export default App;
