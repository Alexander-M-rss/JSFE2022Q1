import render, { renderWinnersViewContent } from './render';
import store, { updateWinnersState } from '../store/store';

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

export const setPanginationBtnsState = (
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

const updateWinners = async () => {
  if (!winnersView) throw new Error('Error in HTML');
  await updateWinnersState();
  setPanginationBtnsState(store.winnersPage, store.WINNERS_PER_PAGE, store.winnersNumber);
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

const setEventsHandlers = () => {
  document.body.addEventListener('click', async (event) => {
    await handleMenuEvent(event);
  });
};

const start = () => {
  render();
  getHTMLElements();
  setEventsHandlers();
};

export default start;
