import { getCars, getWinners, SortModes } from '../api/api';
import store from '../store/store';
import { updateWinners } from './update';

const setSortOrder = async (sortBy: SortModes) => {
  store.sortBy = sortBy;
  store.sortOrder = store.sortOrder === 'asc' ? 'desc' : 'asc';
  await updateWinners();
};

export const updateGarageState = async () => {
  const { cars, carsNumber } = await getCars(store.carsPage, store.CARS_PER_PAGE);

  store.cars = cars;
  store.carsNumber = carsNumber;
};

export const updateWinnersState = async () => {
  const { winners, winnersNumber } = await getWinners(
    store.winnersPage,
    store.WINNERS_PER_PAGE,
    store.sortBy,
    store.sortOrder,
  );
  store.winners = winners;
  store.winnersNumber = winnersNumber;
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

export default handleTableEvent;
