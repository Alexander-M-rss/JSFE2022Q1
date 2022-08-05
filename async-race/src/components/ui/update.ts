import store, { updateGarageState, updateWinnersState } from '../store/store';
import { elements } from './elements';
import setPaginationBtnsState from './paginationBtns';
import { renderGarage, renderWinnersViewContent } from './render';

export const updateGarage = async () => {
  if (!elements.garage) throw new Error('Error in HTML');
  await updateGarageState();
  setPaginationBtnsState(store.carsPage, store.CARS_PER_PAGE, store.carsNumber);
  elements.garage.innerHTML = renderGarage();
};

export const updateWinners = async () => {
  if (!elements.winnersView) throw new Error('Error in HTML');
  await updateWinnersState();
  setPaginationBtnsState(store.winnersPage, store.WINNERS_PER_PAGE, store.winnersNumber);
  elements.winnersView.innerHTML = renderWinnersViewContent();
};

export default {
  updateGarage,
  updateWinners,
};
