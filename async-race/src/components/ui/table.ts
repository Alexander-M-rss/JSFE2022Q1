import { SortModes } from '../api/api';
import store from '../store/store';
import { updateWinners } from './update';

const setSortOrder = async (sortBy: SortModes) => {
  store.sortBy = sortBy;
  store.sortOrder = store.sortOrder === 'asc' ? 'desc' : 'asc';
  await updateWinners();
};

const handleTableEvent = async (event: MouseEvent) => {
  const target = event.target as Element;

  if (!target) throw new Error('Error in HTML');

  if (target.classList.contains('table-wins')) {
    setSortOrder('wins');
    return true;
  }
  if (target.classList.contains('table-time')) {
    setSortOrder('time');
    return true;
  }
  return false;
};

export default handleTableEvent;
