import render, { renderGarage, renderWinnersViewContent } from './render';
import store, { updateGarageState, updateWinnersState } from '../store/store';
import { SortModes } from '../api/api';

let winnersView: HTMLDivElement | null;
let garageView: HTMLDivElement | null;
let prevBtn: HTMLButtonElement | null;
let nextBtn: HTMLButtonElement | null;

const getHTMLElements = () => {
  garageView = document.querySelector<HTMLDivElement>('#garage-view');
  winnersView = document.querySelector<HTMLDivElement>('#winners-view');
  prevBtn = document.querySelector<HTMLButtonElement>('#prev');
  nextBtn = document.querySelector<HTMLButtonElement>('#next');
};

export const setPaginationBtnsState = (
  page: number,
  itemsPerPage: number,
  itemsNumber: number,
) => {
  if (!prevBtn || !nextBtn) throw new Error('Error in HTML');

  if (page * itemsPerPage < itemsNumber) {
    nextBtn.disabled = false;
  } else {
    nextBtn.disabled = true;
  }
  if (page > 1) {
    prevBtn.disabled = false;
  } else {
    prevBtn.disabled = true;
  }
};

const updateGarage = async () => {
  const garage = document.getElementById('garage') as HTMLDivElement;
  if (!garage) throw new Error('Error in HTML');
  await updateGarageState();
  setPaginationBtnsState(store.carsPage, store.CARS_PER_PAGE, store.carsNumber);
  garage.innerHTML = renderGarage();
};

const updateWinners = async () => {
  if (!winnersView) throw new Error('Error in HTML');
  await updateWinnersState();
  setPaginationBtnsState(store.winnersPage, store.WINNERS_PER_PAGE, store.winnersNumber);
  winnersView.innerHTML = renderWinnersViewContent();
};

const handleMenuEvent = async (event: MouseEvent) => {
  const target = event.target as Element;
  if (!garageView || !winnersView || !target) throw new Error('Error in HTML');

  if (target.classList.contains('garage-menu-btn')) {
    garageView.style.display = 'block';
    winnersView.style.display = 'none';
    store.view = 'garage';
    return true;
  }
  if (target.classList.contains('winners-menu-btn')) {
    winnersView.style.display = 'block';
    garageView.style.display = 'none';
    store.view = 'winners';
    await updateWinners();
    return true;
  }

  return false;
};

const handlePaginationEvent = async (event: MouseEvent) => {
  const target = event.target as Element;

  if (!target) throw new Error('Error in HTML');
  if (target.classList.contains('next-btn')) {
    switch (store.view) {
      case 'garage': {
        store.carsPage += 1;
        await updateGarage();
        break;
      }
      case 'winners': {
        store.winnersPage += 1;
        await updateWinners();
        break;
      }
      default: return false;
    }
    return true;
  }
  if (target.classList.contains('prev-btn')) {
    switch (store.view) {
      case 'garage': {
        store.carsPage -= 1;
        await updateGarage();
        break;
      }
      case 'winners': {
        store.winnersPage -= 1;
        await updateWinners();
        break;
      }
      default: return false;
    }
    return true;
  }
  return false;
};

const setSortOrder = async (sortBy: SortModes) => {
  store.sortBy = sortBy;
  store.sortOrder = store.sortOrder === 'asc' ? 'desc' : 'asc';
  await updateWinners();
};

const handleTableEvent = async (event: MouseEvent) => {
  const target = event.target as Element;

  if (!target) throw new Error('Error in HTML');

  if (target.classList.contains('table-wins')) {
    setSortOrder('wins');
    return true;
  }
  if (target.classList.contains('table-time')) {
    setSortOrder('time');
    return true;
  }
  return false;
};

const setEventsHandlers = () => {
  document.body.addEventListener('click', async (event) => {
    if (await handleMenuEvent(event)
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
