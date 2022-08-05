import { createCar } from '../api/api';
import { updateGarage } from './update';
import generateRandomCars from '../generator/generator';

const RANDOM_CARS_NUMBER = 100;

const handleGeneratorEvent = async (event: MouseEvent) => {
  const target = event.target as HTMLButtonElement;
  if (!target) throw new Error('Error in HTML');

  if (target.classList.contains('generate-btn')) {
    target.disabled = true;
    await Promise.allSettled(generateRandomCars(RANDOM_CARS_NUMBER)
      .map((car) => createCar(car)));
    await updateGarage();
    target.disabled = false;
    return true;
  }
  return false;
};

export default handleGeneratorEvent;
