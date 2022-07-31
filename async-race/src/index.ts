import './style.css';

import * as api from './components/api/api';

(async () => {
  console.log(await api.changeEngineStatus(1, 'started'));
  console.log(await api.changeEngineStatus(1, 'stopped'));
  console.log(await api.changeEngineStatus(1, 'drive'));
  console.log(await api.changeEngineStatus(1, 'stopped'));
  console.log(await api.changeEngineStatus(1, 'started'));
  console.log(await api.changeEngineStatus(1, 'drive'));
  console.log(await api.changeEngineStatus(1, 'stopped'));
})();
