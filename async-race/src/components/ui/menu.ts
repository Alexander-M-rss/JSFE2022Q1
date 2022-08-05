import store from '../store/store';
import { elements } from './elements';
import { updateWinners } from './update';
import setPaginationBtnsState from './paginationBtns';

const handleMenuEvent = async (event: MouseEvent) => {
  const target = event.target as Element;
  if (!elements.garageView || !elements.winnersView || !target) throw new Error('Error in HTML');

  if (target.classList.contains('garage-menu-btn')) {
    elements.garageView.style.display = 'block';
    elements.winnersView.style.display = 'none';
    store.view = 'garage';
    setPaginationBtnsState(store.carsPage, store.CARS_PER_PAGE, store.carsNumber);
    return true;
  }
  if (target.classList.contains('winners-menu-btn')) {
    elements.winnersView.style.display = 'block';
    elements.garageView.style.display = 'none';
    store.view = 'winners';
    await updateWinners();
    return true;
  }

  return false;
};

export default handleMenuEvent;
