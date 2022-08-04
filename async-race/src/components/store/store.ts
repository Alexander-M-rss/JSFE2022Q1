import {
  getCars, getWinners, Car, Winner, SortModes, SortOrders,
} from '../api/api';

interface Storage {
  carsPage: number;
  cars: Array<Car>;
  carsNumber: number;
  winnersPage: number;
  winners: Array<Winner>;
  winnersNumber: number;
  animation: { [id: number]: number };
  view: 'garage' | 'winners';
  sortBy: SortModes;
  sortOrder: SortOrders;
  CARS_PER_PAGE: number;
  WINNERS_PER_PAGE: number;
}

const store: Storage = {
  carsPage: 1,
  cars: [],
  carsNumber: 0,
  winnersPage: 1,
  winners: [],
  winnersNumber: 0,
  animation: {},
  view: 'garage',
  sortBy: null,
  sortOrder: null,
  CARS_PER_PAGE: 7,
  WINNERS_PER_PAGE: 10,
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

await updateGarageState();

export default store;
