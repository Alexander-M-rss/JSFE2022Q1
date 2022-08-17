const COLOR_LENGTH = 6;
const brands = ['Acura', 'Aston-Martin', 'Audi', 'BMW', 'Cadillac', 'Chevrolet',
  'Chrysler', 'Citroen', 'Dodge', 'Ferrari', 'Fiat', 'Ford', 'Honda', 'Hyundai',
  'Infiniti', 'Jaguar', 'Jeep', 'Kia', 'Lexus', 'Lincoln', 'Mazda', 'Mercedes',
  'Mitsubishi', 'Nissan', 'Skoda', 'Subaru', 'Suzuki', 'Tesla', 'Toyota',
  'Volkswagen', 'Volvo',
];
const models = ['MDX', 'DB9', 'A8L', 'i10', 'Escalade', 'Impala', 'C300', 'C4',
  'Caliber', 'Portofino', 'Doblo', 'Mustang', 'Accord', 'Elantra', 'QX70', 'Type X',
  'Cherokee', 'Ceed', 'LX470', 'Navigator', 'CX-7', 'GL350', 'Lancer', 'Murano',
  'Superb', 'Impreza', 'Swift', 'Model S', 'Venza', 'Passat', 'XC90',
];

const getRandomIndex = (length: number) => Math.floor(Math.random() * length);

const getRandomName = () => {
  const brand = brands[getRandomIndex(brands.length)];
  const model = models[getRandomIndex(models.length)];

  return `${brand} ${model}`;
};

const getRandomColor = () => {
  const chars = '0123456789abcdef';
  let color = '#';

  for (let i = 0; i < COLOR_LENGTH; i += 1) {
    color += chars[getRandomIndex(chars.length)];
  }

  return color;
};

const generateRandomCars = (number: number) => new Array(number).fill(0)
  .map(() => ({ name: getRandomName(), color: getRandomColor() }));

export default generateRandomCars;
