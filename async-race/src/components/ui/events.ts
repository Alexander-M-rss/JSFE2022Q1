import render from './render';
import store from '../store/store';
import getHTMLElements from './elements';
import handleMenuEvent from './menu';
import handleCarBtnsEvent from './car';
import handlePaginationEvent from './pagination';
import setPaginationBtnsState from './paginationBtns';
import handleTableEvent from './table';

const setEventsHandlers = () => {
  document.body.addEventListener('click', async (event) => {
    if (await handleMenuEvent(event)
      || await handleCarBtnsEvent(event)
      || await handlePaginationEvent(event)
    ) return;
    await handleTableEvent(event);
  });
};

const start = () => {
  render();
  getHTMLElements();
  setPaginationBtnsState(store.carsPage, store.CARS_PER_PAGE, store.carsNumber);
  setEventsHandlers();
};

export default start;
