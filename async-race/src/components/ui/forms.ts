import { elements } from './elements';
import { createCar, updateCar } from '../api/api';
import { updateGarage } from './update';
import { selectedCar } from './car';

export const handleUpdateSubmit = async () => {
  if (!elements.updateName || !elements.updateColor || !elements.updateSubmit) throw new Error('Error in HTML');

  elements.updateSubmit.disabled = true;

  await updateCar(selectedCar.id, elements.updateName.value, elements.updateColor.value);
  await updateGarage();
  elements.updateName.value = '';
  elements.updateName.disabled = true;
  elements.updateColor.disabled = true;
};

const handleCreateSubmit = async () => {
  if (!elements.createName || !elements.createColor) throw new Error('Error in HTML');

  await createCar({ name: elements.createName.value, color: elements.createColor.value });
  await updateGarage();
  elements.createName.value = '';
};

export default handleCreateSubmit;
