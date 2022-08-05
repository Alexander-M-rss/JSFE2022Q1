const BASE_URL = 'http://127.0.0.1:3000';
const GARAGE_URL = `${BASE_URL}/garage`;
const ENGINE_URL = `${BASE_URL}/engine`;
const WINNERS_URL = `${BASE_URL}/winners`;

export interface ICar {
  name: string;
  color: string;
  id: number;
}

export interface IWinner extends ICar {
  wins: number;
  time: number;
}

export interface IMoveParams {
  velocity: number;
  distance: number;
}

export type EngineStatus = 'started' | 'stopped' | 'drive';
export type SortModes = 'id' | 'wins' | 'time' | null;
export type SortOrders = 'asc' | 'desc' | null;

export const getCars = async (page: number, limit: number) => {
  const response = await fetch(`${GARAGE_URL}?_page=${page}&_limit=${limit}`);
  const cars = (await response.json()) as Array<ICar>;

  return {
    cars,
    carsNumber: +(response.headers.get('X-Total-Count') || cars.length),
  };
};

export const getCar = async (id: number) => {
  const response = await fetch(`${GARAGE_URL}/${id}`);
  const car = (await response.json()) as ICar;

  return car;
};

export const createCar = async (data: Omit<ICar, 'id'>) => {
  const response = await fetch(`${GARAGE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.status;
};

export const deleteCar = async (id: number) => {
  const response = await fetch(`${GARAGE_URL}/${id}`, { method: 'DELETE' });

  return response.status;
};

export const updateCar = async (id: number, name: string, color: string) => {
  const data = { name, color };
  const response = await fetch(`${GARAGE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.status;
};

export const changeEngineStatus = async (id: number, status: EngineStatus) => {
  const response = await fetch(`${ENGINE_URL}?id=${id}&status=${status}`, {
    method: 'PATCH',
  });

  if (status === 'drive') {
    return response.status;
  }
  return (await response.json()) as IMoveParams;
};

export const getWinners = async (
  page: number,
  limit: number,
  sort?: SortModes,
  order?: SortOrders,
) => {
  const sortParams = sort && order ? `&_sort=${sort}&_order=${order}` : '';
  const response = await fetch(`${WINNERS_URL}?_page=${page}&_limit=${limit}${sortParams}`);
  let winners = (await response.json()) as Array<IWinner>;

  winners = await Promise.all(
    winners.map(async (winner) => {
      const car = await getCar(winner.id);

      return {
        ...winner,
        name: car.name,
        color: car.color,
      };
    }),
  );

  return {
    winners,
    winnersNumber: +(response.headers.get('X-Total-Count') || winners.length),
  };
};

export const getWinner = async (id: number) => {
  const response = await fetch(`${WINNERS_URL}/${id}`);
  const winner = (await response.json()) as IWinner;

  return winner;
};

export const createWinner = async (id: number, time: number, wins = 1) => {
  const data = { id, time, wins };

  return (
    await fetch(`${WINNERS_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  ).status;
};

export const deleteWinner = async (id: number) => {
  const respone = await fetch(`${WINNERS_URL}/${id}`, {
    method: 'DELETE',
  });

  return respone.status;
};

export const updateWinner = async (id: number, time: number, wins = 1) => {
  const data = { id, time, wins };

  return (
    await fetch(`${WINNERS_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  ).status;
};
