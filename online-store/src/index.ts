import './style.css';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

const qtySlider = document.querySelector<HTMLElement>('.quantity-slider');
const yearSlider = document.querySelector<HTMLElement>('.year-slider');

if (!qtySlider || !yearSlider) throw new Error('index.html is damaged');

noUiSlider.create(qtySlider, {
  range: {
    min: 1,
    max: 12,
  },
  step: 1,
  start: ['1', '12'],
  connect: true,
  tooltips: { to: (x) => Math.trunc(x) },
});

noUiSlider.create(yearSlider, {
  range: {
    min: 2000,
    max: 2022,
  },
  step: 1,
  start: ['2000', '2022'],
  connect: true,
  tooltips: { to: (x) => Math.trunc(x) },
});
