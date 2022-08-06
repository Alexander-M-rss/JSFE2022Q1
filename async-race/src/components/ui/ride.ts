import { changeEngineStatus } from '../api/api';
import store from '../store/store';
import getDistanceXBetweenElements from '../utils/utils';
import animation from './animation';

const OK = 200;
const DELTA = 35;

export const startRide = async (id: number) => {
  const startBtn = document.querySelector<HTMLButtonElement>(`#start-engine-car-${id}`);
  const stopBtn = document.querySelector<HTMLButtonElement>(`#stop-engine-car-${id}`);
  const selectBtn = document.querySelector<HTMLButtonElement>(`#select-car-${id}`);
  const removeBtn = document.querySelector<HTMLButtonElement>(`#remove-car-${id}`);
  const car = document.querySelector<HTMLElement>(`#car-${id}`);
  const flag = document.querySelector(`#flag-${id}`);

  if (!startBtn || !stopBtn || !selectBtn || !removeBtn || !car || !flag) throw new Error('Error in HTML');

  startBtn.disabled = true;
  startBtn.classList.add('changing-state');
  selectBtn.disabled = true;
  removeBtn.disabled = true;

  const result = await changeEngineStatus(id, 'started');

  startBtn.classList.remove('changing-state');

  if (typeof result === 'number') {
    startBtn.disabled = false;
    return { success: false, id: 0, duration: 0 };
  }

  stopBtn.disabled = false;

  const duration = Math.round(result.distance / result.velocity);
  const distanceX = getDistanceXBetweenElements(car, flag) + DELTA;

  store.animation[id] = animation(car, distanceX, duration);

  const response = await changeEngineStatus(id, 'drive');
  const success = typeof response === 'number' && response === OK;

  if (!success) window.cancelAnimationFrame(store.animation[id].id);

  return { success, id, duration };
};

export default { startRide };
