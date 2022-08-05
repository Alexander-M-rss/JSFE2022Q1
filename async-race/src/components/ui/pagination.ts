import store from '../store/store';
import { updateGarage, updateWinners } from './update';

const handlePaginationEvent = async (event: MouseEvent) => {
  const target = event.target as Element;

  if (!target) throw new Error('Error in HTML');
  if (target.classList.contains('next-btn')) {
    switch (store.view) {
      case 'garage': {
        store.carsPage += 1;
        await updateGarage();
        break;
      }
      case 'winners': {
        store.winnersPage += 1;
        await updateWinners();
        break;
      }
      default: return false;
    }
    return true;
  }
  if (target.classList.contains('prev-btn')) {
    switch (store.view) {
      case 'garage': {
        store.carsPage -= 1;
        await updateGarage();
        break;
      }
      case 'winners': {
        store.winnersPage -= 1;
        await updateWinners();
        break;
      }
      default: return false;
    }
    return true;
  }
  return false;
};

export default handlePaginationEvent;
