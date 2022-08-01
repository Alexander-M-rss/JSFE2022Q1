import './style.css';

import * as api from './components/api/api';

(async () => {
  api.createCar('honda', 'blue');
  api.createCar('toyota', 'red');
  console.log(await api.getWinners(1, 7));
  console.log(await api.getWinner(3));
  console.log(await api.createWinner(6, 5.5, 2));
  console.log(await api.getWinners(1, 7));
  console.log(await api.updateWinner(6, 5, 4));
  console.log(await api.getWinners(1, 7));
  console.log(await api.deleteWinner(6));
  console.log(await api.getWinners(1, 7));
})();
