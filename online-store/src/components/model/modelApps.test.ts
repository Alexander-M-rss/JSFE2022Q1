import { IItem } from '../data/data';
import AppModel from './modelApp';

const data: IItem[] = [
  {
    id: 1,
    name: 'Samsung Galaxy S21',
    quantity: 2,
    year: 2019,
    manufacturer: 'Samsung',
    color: 'белый',
    cams: 3,
    favorite: false,
  },
  {
    id: 2,
    name: 'Samsung Galaxy A03',
    quantity: 5,
    year: 2000,
    manufacturer: 'Samsung',
    color: 'красный',
    cams: 2,
    favorite: false,
  },
  {
    id: 4,
    name: 'Xiaomi Poco X4 pro',
    quantity: 1,
    year: 2022,
    manufacturer: 'Xiaomi',
    color: 'желтый',
    cams: 3,
    favorite: false,
  },
  {
    id: 5,
    name: 'Xiaomi Redmi Note 11',
    quantity: 4,
    year: 2022,
    manufacturer: 'Xiaomi',
    color: 'белый',
    cams: 3,
    favorite: true,
  },
  {
    id: 7,
    name: 'Apple iPhone 11',
    quantity: 12,
    year: 2018,
    manufacturer: 'Apple',
    color: 'белый',
    cams: 3,
    favorite: true,
  },
  {
    id: 8,
    name: 'Apple iPhone 13',
    quantity: 10,
    year: 2020,
    manufacturer: 'Apple',
    color: 'красный',
    cams: 2,
    favorite: false,
  },
];

const dataFilteredByXiaomi: IItem[] = [
  {
    id: 4,
    name: 'Xiaomi Poco X4 pro',
    quantity: 1,
    year: 2022,
    manufacturer: 'Xiaomi',
    color: 'желтый',
    cams: 3,
    favorite: false,
  },
  {
    id: 5,
    name: 'Xiaomi Redmi Note 11',
    quantity: 4,
    year: 2022,
    manufacturer: 'Xiaomi',
    color: 'белый',
    cams: 3,
    favorite: true,
  },
];

const dataFilteredBy2Cams: IItem[] = [
  {
    id: 2,
    name: 'Samsung Galaxy A03',
    quantity: 5,
    year: 2000,
    manufacturer: 'Samsung',
    color: 'красный',
    cams: 2,
    favorite: false,
  },
  {
    id: 8,
    name: 'Apple iPhone 13',
    quantity: 10,
    year: 2020,
    manufacturer: 'Apple',
    color: 'красный',
    cams: 2,
    favorite: false,
  },
];

const dataFilteredByRedYellowColors: IItem[] = [
  {
    id: 2,
    name: 'Samsung Galaxy A03',
    quantity: 5,
    year: 2000,
    manufacturer: 'Samsung',
    color: 'красный',
    cams: 2,
    favorite: false,
  },
  {
    id: 4,
    name: 'Xiaomi Poco X4 pro',
    quantity: 1,
    year: 2022,
    manufacturer: 'Xiaomi',
    color: 'желтый',
    cams: 3,
    favorite: false,
  },
  {
    id: 8,
    name: 'Apple iPhone 13',
    quantity: 10,
    year: 2020,
    manufacturer: 'Apple',
    color: 'красный',
    cams: 2,
    favorite: false,
  },
];

const manufacturers = new Set(['xiaomi']);
const cams = new Set([2]);
const colors = new Set(['красный', 'желтый']);

describe('AppModel.applyFilterByManufacturers', () => {
  it('Should be an instance of Function', () => {
    expect(AppModel.applyFilterByManufacturers).toBeInstanceOf(Function);
  });

  it('Should return array of items manufactured by Xiaomi', () => {
    expect(AppModel.applyFilterByManufacturers(data.slice(), manufacturers)).toEqual(dataFilteredByXiaomi);
  });
});

describe('AppModel.applyFilterByCams', () => {
  it('Should be an instance of Function', () => {
    expect(AppModel.applyFilterByManufacturers).toBeInstanceOf(Function);
  });

  it('Should return array of items manufactured by Xiaomi', () => {
    expect(AppModel.applyFilterByCams(data.slice(), cams)).toEqual(dataFilteredBy2Cams);
  });
});

describe('AppModel.applyFilterByColors', () => {
  it('Should be an instance of Function', () => {
    expect(AppModel.applyFilterByManufacturers).toBeInstanceOf(Function);
  });

  it('Should return array of red and yellow items', () => {
    expect(AppModel.applyFilterByColors(data.slice(), colors)).toEqual(dataFilteredByRedYellowColors);
  });
});
