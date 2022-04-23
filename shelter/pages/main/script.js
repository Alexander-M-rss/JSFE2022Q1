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
const SLIDER_ITEM_RIGHT = document.querySelector('.slider-item.right');
const CARDS_QUANTITY = 3;

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

const initPage = () => {
  currentCardsArray = generateSliderCardsNumbers(CARDS_QUANTITY, [petsArray.length]);
  SLIDER_ITEM_CENTER.innerHTML = '';
  SLIDER_ITEM_CENTER.innerHTML = generateCards(currentCardsArray);
}

BURGER_ICON.addEventListener('click', toggleNavigation);

MENU.addEventListener('click', () => {
  if (event.target.classList.contains('nav-menu-item'))
    toggleNavigation();
});

BLACKOUT.addEventListener('click', () => {
  if (menu.classList.contains('active'))
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

BUTTON_LEFT.addEventListener('click', moveSliderLeft);
BUTTON_RIGHT.addEventListener('click', moveSliderRight);

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
 BUTTON_LEFT.addEventListener('click', moveSliderLeft);
 BUTTON_RIGHT.addEventListener('click', moveSliderRight);
});

initPage();
