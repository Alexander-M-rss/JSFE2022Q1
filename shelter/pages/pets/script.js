const JSON_URL ='../../assets/pets.json';
const RES = await fetch(JSON_URL);
const DATA = await RES.json();
const petsArray = [];
const BLACKOUT = document.querySelector('.blackout');
const BURGER_ICON = document.querySelector('.burger-menu-icon');
const MENU = document.querySelector('.nav');
const BODY = document.querySelector('body');
const CONTENT_ITEMS = document.querySelector('.content-items');
const CONTENT_ITEM_LEFT = document.querySelector('.content-item.left');
const contentItemLeftCards = document.querySelectorAll('.content-item.left .card');
const contentItemLeftNames = document.querySelectorAll('.content-item.left .name');
const contentItemLeftPhotos = document.querySelectorAll('.content-item.left .photo');
const CONTENT_ITEM_CENTER = document.querySelector('.content-item.center');
let contentItemCenterCards = document.querySelectorAll('.content-item.center .card');
const contentItemCenterNames = document.querySelectorAll('.content-item.center .name');
const contentItemCenterPhotos = document.querySelectorAll('.content-item.center .photo');
const CONTENT_ITEM_RIGHT = document.querySelector('.content-item.right');
const contentItemRightCards = document.querySelectorAll('.content-item.right .card');
const contentItemRightNames = document.querySelectorAll('.content-item.right .name');
const contentItemRightPhotos = document.querySelectorAll('.content-item.right .photo');
const BUTTON_FIRST = document.querySelector('#first-page-button');
const BUTTON_LEFT = document.querySelector('#previous-page-button');
const BUTTON_RIGHT = document.querySelector('#next-page-button');
const BUTTON_LAST = document.querySelector('#last-page-button');
const CURRENT_PAGE = document.querySelector('#current-page');
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

const usedCount = 6;
let currentPage=0;
let pageNumber;
let pages = [];
let visibleCardsQuantity = 8;

await DATA.forEach(item => petsArray.push(item));

const shuffle = (array) => {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

const generatePages = (pagesNumber, pageSize, petsNumber) => {
  const result = [];
  let petsCount = Math.floor(Math.random() * petsNumber);

  for(let page = 0; page < pagesNumber; page++) {
    result.push([]);
    for(let i =0; i < pageSize; i++)
      result[page].push(petsCount++ % petsNumber);
    shuffle(result[page]);
  }

  return result;
}

const renderPage = (cards, photos, names, page) => {

  for(let i =0; i < page.length; i++) {
    cards[i].dataset.pid = page[i];
    photos[i].innerHTML = `<img src="${petsArray[page[i]]["img"]}" alt="pet">`;
    names[i].innerHTML = `${petsArray[page[i]]["name"]}`;
  }
}

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


const toggleNavigation = () => {
  MENU.classList.toggle('active');
  BURGER_ICON.classList.toggle('active');
  BLACKOUT.classList.toggle('active');
  BODY.classList.toggle('no-scroll');
}

BURGER_ICON.addEventListener('click', toggleNavigation);

MENU.addEventListener('click', () => {
  if (event.target.classList.contains('nav-menu-item'))
    toggleNavigation();
});

BLACKOUT.addEventListener('click', () => {
  if (MENU.classList.contains('active'))
    toggleNavigation();
});


const moveContentLeft = () => {
  BUTTON_LEFT.removeEventListener('click', moveContentLeft);
  BUTTON_RIGHT.removeEventListener('click', moveContentRight);
  BUTTON_FIRST.removeEventListener('click', moveContentFirst);
  BUTTON_FIRST.removeEventListener('click', moveContentLast);
  currentPage--;
  renderPage(contentItemLeftCards, contentItemLeftPhotos, contentItemLeftNames, pages[currentPage]);
  CONTENT_ITEMS.classList.add('transition-left');
};

const moveContentFirst = () => {
  BUTTON_LEFT.removeEventListener('click', moveContentLeft);
  BUTTON_RIGHT.removeEventListener('click', moveContentRight);
  BUTTON_FIRST.removeEventListener('click', moveContentFirst);
  BUTTON_LAST.removeEventListener('click', moveContentLast);
  currentPage = 0;
  renderPage(contentItemLeftCards, contentItemLeftPhotos, contentItemLeftNames, pages[currentPage]);
  CONTENT_ITEMS.classList.add('transition-left');
};

const moveContentRight = () => {
   BUTTON_RIGHT.removeEventListener('click', moveContentRight);
   BUTTON_LEFT.removeEventListener('click', moveContentLeft);
   BUTTON_FIRST.removeEventListener('click', moveContentFirst);
   BUTTON_LAST.removeEventListener('click', moveContentLast);
   currentPage++;
   renderPage(contentItemRightCards, contentItemRightPhotos, contentItemRightNames, pages[currentPage]);
   CONTENT_ITEMS.classList.add("transition-right");
};

const moveContentLast = () => {
   BUTTON_RIGHT.removeEventListener('click', moveContentRight);
   BUTTON_LEFT.removeEventListener('click', moveContentLeft);
   BUTTON_FIRST.removeEventListener('click', moveContentFirst);
   BUTTON_LAST.removeEventListener('click', moveContentLast);
   currentPage = pageNumber;
   renderPage(contentItemRightCards, contentItemRightPhotos, contentItemRightNames, pages[currentPage]);
   CONTENT_ITEMS.classList.add("transition-right");
};

const showPageNumber = () => {
  CURRENT_PAGE.innerHTML = `<span>${currentPage + 1}</span>`
}

BUTTON_LAST.addEventListener('click', moveContentLast);
BUTTON_RIGHT.addEventListener('click', moveContentRight);

CONTENT_ITEMS.addEventListener('animationend', (event) => {
  let changedContentItem;

  showPageNumber();
  if (event.animationName === 'move-left') {
    CONTENT_ITEMS.classList.remove('transition-left');
    changedContentItem = CONTENT_ITEM_LEFT;
  } else {
    CONTENT_ITEMS.classList.remove('transition-right');
    changedContentItem = CONTENT_ITEM_RIGHT;
  }
  CONTENT_ITEM_CENTER.innerHTML = changedContentItem.innerHTML;
  contentItemCenterCards = document.querySelectorAll('.content-item.center .card');
  console.log(contentItemCenterCards);
  contentItemCenterCards.forEach(card => card.addEventListener('click', showPopUp));
  switch(currentPage){
    case 0:
      BUTTON_FIRST.classList.add('button-disabled');
      BUTTON_LEFT.classList.add('button-disabled');
      BUTTON_LAST.classList.remove('button-disabled');
      BUTTON_RIGHT.classList.remove('button-disabled');
      BUTTON_RIGHT.addEventListener('click', moveContentRight);
      BUTTON_LAST.addEventListener('click', moveContentLast);
      break;
    case pageNumber :
      BUTTON_LAST.classList.add('button-disabled');
      BUTTON_RIGHT.classList.add('button-disabled');
      BUTTON_FIRST.classList.remove('button-disabled');
      BUTTON_LEFT.classList.remove('button-disabled');
      BUTTON_LEFT.addEventListener('click', moveContentLeft);
      BUTTON_FIRST.addEventListener('click', moveContentFirst);
      break;
    case 1:
      BUTTON_FIRST.classList.remove('button-disabled');
      BUTTON_LEFT.classList.remove('button-disabled');
    case pageNumber - 1:
      BUTTON_LAST.classList.remove('button-disabled');
      BUTTON_RIGHT.classList.remove('button-disabled');
    default:
      BUTTON_RIGHT.addEventListener('click', moveContentRight);
      BUTTON_LEFT.addEventListener('click', moveContentLeft);
      BUTTON_LAST.addEventListener('click', moveContentLast);
      BUTTON_FIRST.addEventListener('click', moveContentFirst);
  }
});

const initPage = () => {
  if(window.matchMedia("(max-width: 767px)").matches)
     visibleCardsQuantity = 3;
  else if(window.matchMedia("(max-width: 1279px)").matches)
     visibleCardsQuantity = 6;
  pageNumber = usedCount * petsArray.length / visibleCardsQuantity;
  pages = generatePages(pageNumber--, visibleCardsQuantity, petsArray.length);
  renderPage(contentItemCenterCards, contentItemCenterPhotos, contentItemCenterNames, pages[currentPage]);
  contentItemCenterCards.forEach(card => card.addEventListener('click', showPopUp));
}

initPage();
