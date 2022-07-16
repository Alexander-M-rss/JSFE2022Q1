import { IItem } from '../data/data';
import AppView from './viewApp';

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

const dataSortedByNameAsc: IItem[] = [
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

const dataSortedByYearAsc: IItem[] = [
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
    id: 8,
    name: 'Apple iPhone 13',
    quantity: 10,
    year: 2020,
    manufacturer: 'Apple',
    color: 'красный',
    cams: 2,
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
    id: 4,
    name: 'Xiaomi Poco X4 pro',
    quantity: 1,
    year: 2022,
    manufacturer: 'Xiaomi',
    color: 'желтый',
    cams: 3,
    favorite: false,
  },
];

const dataSortedByQtyAsc: IItem[] = [
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
];

describe('AppView.renderItem', () => {
  it('Should be an instance of Function', () => {
    expect(AppView.renderItem).toBeInstanceOf(Function);
  });

  it('Should return rendered unselected item', () => {
    //
    expect(AppView.renderItem(data[0])).toMatchSnapshot();
  });

  it('Should return rendered selected item', () => {
    expect(AppView.renderItem(data[0], true)).toMatchSnapshot();
  });
});

describe('AppView.sortByNameAsc', () => {
  it('Should be an instance of Function', () => {
    expect(AppView.sortByNameAsc).toBeInstanceOf(Function);
  });

  it('Should return sorted by ascending name array of items', () => {
    expect(AppView.sortByNameAsc(data.slice())).toEqual(dataSortedByNameAsc);
  });
});

describe('AppView.sortByNameDesc', () => {
  it('Should be an instance of Function', () => {
    expect(AppView.sortByNameDesc).toBeInstanceOf(Function);
  });

  it('Should return sorted by ascending name array of items', () => {
    expect(AppView.sortByNameDesc(data.slice())).toEqual(dataSortedByNameAsc.reverse());
  });
});

describe('AppView.sortByYearAsc', () => {
  it('Should be an instance of Function', () => {
    expect(AppView.sortByYearAsc).toBeInstanceOf(Function);
  });

  it('Should return sorted by descending year array of items', () => {
    expect(AppView.sortByYearAsc(data.slice())).toEqual(dataSortedByYearAsc);
  });
});

describe('AppView.sortByYearDesc', () => {
  it('Should be an instance of Function', () => {
    expect(AppView.sortByYearDesc).toBeInstanceOf(Function);
  });

  it('Should return sorted by descending year array of items', () => {
    expect(AppView.sortByYearDesc(data.slice())).toEqual(dataSortedByYearAsc.reverse());
  });
});

describe('AppView.sortByQtyAsc', () => {
  it('Should be an instance of Function', () => {
    expect(AppView.sortByQtyAsc).toBeInstanceOf(Function);
  });

  it('Should return sorted by ascending quantity array of items', () => {
    expect(AppView.sortByQtyAsc(data.slice())).toEqual(dataSortedByQtyAsc);
  });
});

describe('AppView.sortByQtyDesc', () => {
  it('Should be an instance of Function', () => {
    expect(AppView.sortByQtyDesc).toBeInstanceOf(Function);
  });

  it('Should return sorted by ascending quantity array of items', () => {
    expect(AppView.sortByQtyDesc(data.slice())).toEqual(dataSortedByQtyAsc.reverse());
  });
});

describe('AppView.filterByName', () => {
  it('Should be an instance of Function', () => {
    expect(AppView.filterByName).toBeInstanceOf(Function);
  });

  it('Should return array of visible items Ids filtered by names containing "aom" substring', () => {
    expect(AppView.filterByName(data, 'aom')).toEqual([4, 5]);
  });
});
