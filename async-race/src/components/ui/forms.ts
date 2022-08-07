import { elements } from './elements';
import { createCar, updateCar } from '../api/api';
import { updateGarage } from './update';
import { selectedCar } from './car';

export const handleUpdateSubmit = async () => {
  if (!elements.updateName || !elements.updateColor || !elements.updateSubmit) throw new Error('Error in HTML');

  elements.updateSubmit.disabled = true;

  await updateCar(selectedCar.id, elements.updateName.value, elements.updateColor.value);
  await updateGarage();
  selectedCar.color = '';
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

export const disableForms = () => {
  if (!elements.createName || !elements.createColor || !elements.createSubmit || !elements.updateName || !elements.updateColor || !elements.updateSubmit) throw new Error('Error in HTML');

  elements.createSubmit.disabled = true;
  elements.createName.disabled = true;
  elements.createColor.disabled = true;
  elements.updateSubmit.disabled = true;
  elements.updateName.disabled = true;
  elements.updateColor.disabled = true;
};

export const enableForms = () => {
  if (!elements.createName || !elements.createColor || !elements.createSubmit) throw new Error('Error in HTML');

  elements.createSubmit.disabled = false;
  elements.createName.disabled = false;
  elements.createColor.disabled = false;
  if (selectedCar.color) {
    if (!elements.updateName || !elements.updateColor || !elements.updateSubmit) throw new Error('Error in HTML');

    elements.updateSubmit.disabled = false;
    elements.updateName.disabled = false;
    elements.updateColor.disabled = false;
  }
};

export default handleCreateSubmit;
