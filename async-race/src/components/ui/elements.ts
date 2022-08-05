interface IElements {
  winnersView: HTMLDivElement | null;
  garageView: HTMLDivElement | null;
  garage: HTMLDivElement | null;
  prevBtn: HTMLButtonElement | null;
  nextBtn: HTMLButtonElement | null;
  updateName: HTMLInputElement | null;
  updateColor: HTMLInputElement | null;
  updateSubmit: HTMLButtonElement | null;
}

export const elements: IElements = {
  winnersView: null,
  garageView: null,
  garage: null,
  prevBtn: null,
  nextBtn: null,
  updateName: null,
  updateColor: null,
  updateSubmit: null,
};

const getHTMLElements = () => {
  elements.garageView = document.querySelector<HTMLDivElement>('#garage-view');
  elements.garage = document.querySelector<HTMLDivElement>('#garage');
  elements.winnersView = document.querySelector<HTMLDivElement>('#winners-view');
  elements.prevBtn = document.querySelector<HTMLButtonElement>('#prev');
  elements.nextBtn = document.querySelector<HTMLButtonElement>('#next');
  elements.updateName = document.querySelector<HTMLInputElement>('#update-name');
  elements.updateColor = document.querySelector<HTMLInputElement>('#update-color');
  elements.updateSubmit = document.querySelector<HTMLButtonElement>('#update-submit');
};

export default getHTMLElements;
