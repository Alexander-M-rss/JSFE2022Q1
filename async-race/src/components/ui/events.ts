import render from './render';
import store from '../store/store';
import getHTMLElements from './elements';
import handleMenuEvent from './menu';
import handleGeneratorEvent from './generator';
import handleRaceBtnsEvent from './race';
import handleCarBtnsEvent from './car';
import handlePaginationEvent from './pagination';
import setPaginationBtnsState from './paginationBtns';
import handleTableEvent from './table';
import handleCreateSubmit, { handleUpdateSubmit } from './forms';

const setEventsHandlers = () => {
  document.body.addEventListener('click', async (event) => {
    if (await handleMenuEvent(event)
      || await handleRaceBtnsEvent(event)
      || await handleGeneratorEvent(event)
      || await handleCarBtnsEvent(event)
      || await handlePaginationEvent(event)
    ) return;
    await handleTableEvent(event);
  });

  const createForm = document.querySelector<HTMLFormElement>('#create');
  const updateForm = document.querySelector<HTMLFormElement>('#update');

  if (!createForm || !updateForm) throw new Error('Error in HTML');

  createForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    await handleCreateSubmit();
  });
  updateForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    await handleUpdateSubmit();
  });
};

const start = () => {
  render();
  getHTMLElements();
  setPaginationBtnsState(store.carsPage, store.CARS_PER_PAGE, store.carsNumber);
  setEventsHandlers();
};

export default start;
