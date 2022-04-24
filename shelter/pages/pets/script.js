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
const contentItemCenterCards = document.querySelectorAll('.content-item.center .card');
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
  let petsCount = 0;

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

const initPage = () => {
  if(window.matchMedia("(max-width: 767px)").matches)
     visibleCardsQuantity = 3;
  else if(window.matchMedia("(max-width: 1279px)").matches)
     visibleCardsQuantity = 6;
  pageNumber = usedCount * petsArray.length / visibleCardsQuantity;
  pages = generatePages(pageNumber--, visibleCardsQuantity, petsArray.length);
  renderPage(contentItemCenterCards, contentItemCenterPhotos, contentItemCenterNames, pages[currentPage]);
}

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

initPage();
