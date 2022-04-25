const JSON_URL ='../../assets/pets.json';
const RES = await fetch(JSON_URL);
const DATA = await RES.json();
const petsArray = [];
let currentCardsArray = [];
const BLACKOUT = document.querySelector('.blackout');
const BUTTON_LEFT = document.querySelector('#button-left');
const BUTTON_RIGHT = document.querySelector('#button-right');
const BURGER_ICON = document.querySelector('.burger-menu-icon');
const MENU = document.querySelector('.nav');
const BODY = document.querySelector('body');
const SLIDER_ITEMS = document.querySelector('.slider-items');
const SLIDER_ITEM_LEFT = document.querySelector('.slider-item.left');
const SLIDER_ITEM_CENTER = document.querySelector('.slider-item.center');
let cards;
const SLIDER_ITEM_RIGHT = document.querySelector('.slider-item.right');
const MODAL_WINDOW = document.querySelector('.modal-overlay');
const MODAL_CLOSE_BUTTON = document.querySelector('.pop-up-close-button');
const POP_UP_IMAGE = document.querySelector('.pop-up-image');
const POP_UP_NAME = document.querySelector('.pop-up-name');
const POP_UP_TYPE = document.querySelector('.pop-up-type');
const POP_UP_TEXT = document.querySelector('.pop-up-text');
const POP_UP_AGE = document.querySelector('.pop-up-age');
const POP_UP_INOCULATIONS = document.querySelector('.pop-up-inoculations');
const POP_UP_DISEASES = document.querySelector('.pop-up-diseases');
const POP_UP_PARASITES = document.querySelector('.pop-up-parasites');
const CARDS_QUANTITY = 3;

// console.log(MODAL_WINDOW);

await DATA.forEach(item => petsArray.push(item));

const randomNumber = (number) => {return Math.floor(Math.random()*number)};

const generateSliderCardsNumbers = (quantity, currentCardsArray) => {
  const result = [];
  let number;

  for(let i = 0; i < quantity; i++) {
    number = randomNumber(petsArray.length);
    while(currentCardsArray.includes(number) || result.includes(number))
      number = randomNumber(petsArray.length);
    result.push(number);
  }
  return result;
}

const generateCard = (pid, imagePath, name) => {
  return `<div class="card" data-pid="${pid}">\n  <div class="photo">\n     <img src="${imagePath}" alt="pet">\n  </div>\n  <h4 class="name">${name}</h4>\n  <button class="button" >\n    <span>Learn more</span>\n  </button>\n</div>\n`;
}

const generateCards = (cardsNumbers) => {
  const result = [];

  for(let i of cardsNumbers)
    result.push(generateCard(i, petsArray[i]["img"], petsArray[i]["name"]));

  return result.join('');
}

const toggleNavigation = () => {
  MENU.classList.toggle('active');
  BURGER_ICON.classList.toggle('active');
  BLACKOUT.classList.toggle('active');
  BODY.classList.toggle('no-scroll');
}

BURGER_ICON.addEventListener('click', toggleNavigation);

MENU.addEventListener('click', () => {
  if (event.target.classList.contains('nav-menu-item') && MENU.classList.contains('active'))
    toggleNavigation();
});

BLACKOUT.addEventListener('click', () => {
  if (MENU.classList.contains('active'))
    toggleNavigation();
});

const moveSliderLeft = () => {
  BUTTON_LEFT.removeEventListener('click', moveSliderLeft);
  BUTTON_RIGHT.removeEventListener('click', moveSliderRight);
  currentCardsArray = generateSliderCardsNumbers(CARDS_QUANTITY, currentCardsArray);
  SLIDER_ITEM_LEFT.innerHTML = '';
  SLIDER_ITEM_LEFT.innerHTML = generateCards(currentCardsArray);
  SLIDER_ITEMS.classList.add('transition-left');
};

const moveSliderRight = () => {
   BUTTON_RIGHT.removeEventListener('click', moveSliderRight);
   BUTTON_LEFT.removeEventListener('click', moveSliderLeft);
   currentCardsArray = generateSliderCardsNumbers(CARDS_QUANTITY, currentCardsArray);
   SLIDER_ITEM_RIGHT.innerHTML = '';
   SLIDER_ITEM_RIGHT.innerHTML = generateCards(currentCardsArray);
   SLIDER_ITEMS.classList.add("transition-right");
};

const generatePopUp = (petId) => {
  POP_UP_IMAGE.innerHTML = `<img src="${petsArray[petId]["img"]}" alt="pet">\n`;
  POP_UP_NAME.innerHTML = `${petsArray[petId]["name"]}`;
  POP_UP_TYPE.innerHTML = `${petsArray[petId]["type"]} - ${petsArray[petId]["breed"]}`;
  POP_UP_TEXT.innerHTML = `${petsArray[petId]["description"]}`;
  POP_UP_AGE.innerHTML = `${petsArray[petId]["age"]}`;
  POP_UP_INOCULATIONS.innerHTML = `${petsArray[petId]["inoculations"].join(', ')}`;
  POP_UP_DISEASES.innerHTML = `${petsArray[petId]["diseases"].join(', ')}`;
  POP_UP_PARASITES.innerHTML = `${petsArray[petId]["parasites"].join(', ')}`;;
}

const showPopUp = (event) => {
  generatePopUp(event.currentTarget.dataset.pid);
  BODY.classList.add('no-scroll');
  MODAL_WINDOW.classList.add('active');
}

BUTTON_LEFT.addEventListener('click', moveSliderLeft);
BUTTON_RIGHT.addEventListener('click', moveSliderRight);

MODAL_WINDOW.addEventListener('click', (event) => {
  if(event.target === MODAL_WINDOW) {
    MODAL_WINDOW.classList.remove('active');
    BODY.classList.remove('no-scroll');
  }
});

MODAL_CLOSE_BUTTON.addEventListener('click', (event) => {
  MODAL_WINDOW.classList.remove('active');
  BODY.classList.remove('no-scroll');
});

SLIDER_ITEMS.addEventListener('animationend', (event) => {
 let changedSliderItem;
 if (event.animationName === 'move-left') {
   SLIDER_ITEMS.classList.remove('transition-left');
   changedSliderItem = SLIDER_ITEM_LEFT;
 } else {
   SLIDER_ITEMS.classList.remove('transition-right');
   changedSliderItem = SLIDER_ITEM_RIGHT;
 }
 SLIDER_ITEM_CENTER.innerHTML = changedSliderItem.innerHTML;
 cards = document.querySelectorAll('.slider-item.center .card');
 cards.forEach(card => card.addEventListener('click', showPopUp));
 BUTTON_LEFT.addEventListener('click', moveSliderLeft);
 BUTTON_RIGHT.addEventListener('click', moveSliderRight);
});

const initPage = () => {
  currentCardsArray = generateSliderCardsNumbers(CARDS_QUANTITY, [petsArray.length]);
  SLIDER_ITEM_CENTER.innerHTML = '';
  SLIDER_ITEM_CENTER.innerHTML = generateCards(currentCardsArray);
  cards = document.querySelectorAll('.slider-item.center .card');
  cards.forEach(card => card.addEventListener('click', showPopUp));
}

initPage();
