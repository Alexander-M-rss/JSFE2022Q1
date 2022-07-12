import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import AppController from '../controller/controllerApp';
import data from '../data/data';

class App {
  controller;

  constructor() {
    const itemsList = document.querySelector<HTMLDivElement>('.items-list');
    if (!itemsList) throw new Error('index.html is damaged');

    this.controller = new AppController(data, itemsList);
  }
  start() {
    const qtySlider = document.querySelector<HTMLElement>('.quantity-slider');
    const yearSlider = document.querySelector<HTMLElement>('.year-slider');

    if (!qtySlider || !yearSlider) throw new Error('index.html is damaged');

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
    this.controller.start();
  }
}

export default App;
