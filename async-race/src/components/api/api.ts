const BASE_URL = 'http://127.0.0.1:3000';
const GARAGE_URL = `${BASE_URL}/garage`;
const ENGINE_URL = `${BASE_URL}/engine`;
// const WINNERS_URL = `${BASE_URL}/winners`;

export interface Car {
  name: string;
  color: string;
  id: number;
}

export interface MoveParams {
  velocity: number;
  distance: number;
}

export type EngineStatus = 'started' | 'stopped' | 'drive';

export const getCars = async (page: number, limit: number) => {
  const response = await fetch(`${GARAGE_URL}?_page=${page}&_limit=${limit}`);
  const cars = (await response.json()) as Array<Car>;

  return {
    cars,
    carsNumber: +(response.headers.get('X-Total-Count') || cars.length),
  };
};

export const getCar = async (id: number) => {
  const response = await fetch(`${GARAGE_URL}/${id}`);
  const car = (await response.json()) as Car;

  return car;
};

export const createCar = async (name: string, color: string) => {
  const data = { name, color };
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
  return (await response.json()) as MoveParams;
};
