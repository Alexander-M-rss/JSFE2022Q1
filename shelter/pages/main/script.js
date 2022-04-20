const blackout = document.querySelector('.blackout');
const burgerIcon = document.querySelector('.burger-menu-icon');
const menu = document.querySelector('.nav');
const body = document.querySelector('body');


const toggleNavigation = () => {
  menu.classList.toggle('active');
  burgerIcon.classList.toggle('active');
  blackout.classList.toggle('active');
  body.classList.toggle('no-scroll');
}

burgerIcon.addEventListener('click', toggleNavigation);

menu.addEventListener('click', () => {
  if (event.target.classList.contains('nav-menu-item'))
    toggleNavigation();
});

blackout.addEventListener('click', () => {
  // if (menu.classList.contains('active'))
    toggleNavigation();
});
