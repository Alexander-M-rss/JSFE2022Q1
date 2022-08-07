import { startRide, stopRide } from './ride';
import { saveWinner } from '../api/api';
import store from '../store/store';
import { disableForms, enableForms } from './forms';

export const raceAll = async (
  promises: Promise<{ success: boolean, id: number, duration: number }>[],
  ids: number[],
): Promise<{ name: string, color: string, id: number, time: number }> => {
  const {
    success,
    id,
    duration,
  }: { success: boolean, id: number, duration: number } = await Promise.race(promises);

  if (!success) {
    if (ids.length === 1) {
      return {
        name: '', color: '', id: 0, time: 0,
      };
    }

    const failedIndex = ids.findIndex((i) => i === id);
    const restPromises = [...promises.slice(0, failedIndex), ...promises.slice(failedIndex + 1)];
    const restIds = [...ids.slice(0, failedIndex), ...ids.slice(failedIndex + 1)];

    return raceAll(restPromises, restIds);
  }

  const winner = store.cars.find((car) => car.id === id);

  if (!winner) {
    return {
      name: '', color: '', id: 0, time: 0,
    };
  }

  return { ...winner, time: +(duration / 1000).toFixed(2) };
};

export const runRace = async () => {
  const promises = store.cars.map(({ id }) => startRide(id));
  return raceAll(promises, store.cars.map((car) => car.id));
};

const handleRaceBtnEvent = async (btn: HTMLButtonElement, msg: Element) => {
  const generateBtn = document.querySelector<HTMLButtonElement>('.generate-btn');

  if (!generateBtn) throw new Error('Error in HTML');

  const raceBtn = btn;
  const message = msg;

  raceBtn.disabled = true;
  disableForms();
  generateBtn.disabled = true;

  const winner = await runRace();

  if (winner.time > 0) {
    await saveWinner(winner.id, winner.time);
    message.innerHTML = `${winner.name} has won in ${winner.time} s`;
  } else {
    message.innerHTML = 'No winner';
  }
  message.classList.add('visible');
  const resetBtn = document.querySelector<HTMLButtonElement>('#reset-race');

  if (!resetBtn) throw new Error('Error in HTML');

  resetBtn.disabled = false;
  enableForms();
  generateBtn.disabled = false;
};

const handleResetBtnEvent = async (btn: HTMLButtonElement, msg: Element) => {
  const resetBtn = btn;
  const message = msg;

  resetBtn.disabled = true;
  store.cars.map(({ id }) => stopRide(id));
  message.classList.remove('visible');

  const raceBtn = document.querySelector<HTMLButtonElement>('#race-start');
  if (!raceBtn) throw new Error('Error in HTML');

  raceBtn.disabled = false;
};

const handleRaceBtnsEvent = async (event: MouseEvent) => {
  const target = event.target as HTMLButtonElement;
  const message = document.querySelector('#message');

  if (!target || !message) throw new Error('Error in HTML');

  if (target.classList.contains('race-btn')) {
    await handleRaceBtnEvent(target, message);
    return true;
  }
  if (target.classList.contains('reset-btn')) {
    await handleResetBtnEvent(target, message);
    return true;
  }
  return false;
};

export default handleRaceBtnsEvent;
