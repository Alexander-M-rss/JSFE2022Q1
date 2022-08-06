import {
  getCar, deleteCar, deleteWinner, ICar,
} from '../api/api';
import { elements } from './elements';
import { updateGarage } from './update';

export const selectedCar: ICar = { name: '', color: '', id: 0 };

const handleCarBtnsEvent = async (event: MouseEvent) => {
  const target = event.target as Element;

  if (!target || !elements.updateName || !elements.updateColor || !elements.updateSubmit) throw new Error('Error in HTML');

  if (target.classList.contains('select-btn')) {
    const id = +target.id.split('select-car-')[1];
    const car = await getCar(id);
    selectedCar.id = car.id;
    elements.updateName.value = car.name;
    elements.updateColor.value = car.color;
    elements.updateName.disabled = false;
    elements.updateColor.disabled = false;
    elements.updateSubmit.disabled = false;
    return true;
  }
  if (target.classList.contains('remove-btn')) {
    const id = +target.id.split('remove-car-')[1];
    await deleteCar(id);
    await deleteWinner(id);
    await updateGarage();
    return true;
  }
  return false;
};

export default handleCarBtnsEvent;
