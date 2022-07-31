import './style.css';

import * as api from './components/api/api';

(async = () => {
  console.log(await api.getCars(1, 7));
  console.log(await api.createCar('red car', 'red'));
  console.log(await api.getCar(6));
  console.log(await api.updateCar(6, 'white car', 'white'));
  console.log(await api.getCar(6));
  console.log(await api.deleteCar(5));
  console.log(await api.getCars(1, 7));
})();
