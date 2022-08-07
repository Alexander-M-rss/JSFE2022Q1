interface IElements {
  winnersView: HTMLDivElement | null;
  garageView: HTMLDivElement | null;
  garage: HTMLDivElement | null;
  prevBtn: HTMLButtonElement | null;
  nextBtn: HTMLButtonElement | null;
  createName: HTMLInputElement | null;
  createColor: HTMLInputElement | null;
  createSubmit: HTMLButtonElement | null;
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
  createName: null,
  createColor: null,
  createSubmit: null,
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
  elements.createName = document.querySelector<HTMLInputElement>('#create-name');
  elements.createColor = document.querySelector<HTMLInputElement>('#create-color');
  elements.createSubmit = document.querySelector<HTMLButtonElement>('#create-submit');
  elements.updateName = document.querySelector<HTMLInputElement>('#update-name');
  elements.updateColor = document.querySelector<HTMLInputElement>('#update-color');
  elements.updateSubmit = document.querySelector<HTMLButtonElement>('#update-submit');
};

export default getHTMLElements;
