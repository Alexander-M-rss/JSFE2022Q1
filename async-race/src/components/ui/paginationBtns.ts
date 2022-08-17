import { elements } from './elements';

const setPaginationBtnsState = (
  page: number,
  itemsPerPage: number,
  itemsNumber: number,
) => {
  if (!elements.prevBtn || !elements.nextBtn) throw new Error('Error in HTML');

  if (page * itemsPerPage < itemsNumber) {
    elements.nextBtn.disabled = false;
  } else {
    elements.nextBtn.disabled = true;
  }
  if (page > 1) {
    elements.prevBtn.disabled = false;
  } else {
    elements.prevBtn.disabled = true;
  }
};

export default setPaginationBtnsState;
