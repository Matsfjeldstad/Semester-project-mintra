import newCard from './components/productCard';

const hamburgerMenu = document.querySelector('#hamburger');

hamburgerMenu.onclick = function menuOpen() {
  const hamburgerLine = hamburgerMenu.querySelector('#hamburgerLine');
  hamburgerLine.classList.toggle('hamburger-line-active');
  const navOverlay = document.querySelector('#mobileNav');
  navOverlay.classList.toggle('mobile-nav-active');
  navOverlay.classList.toggle('h-0');

  const navTest = document.querySelectorAll('.test');
  navTest.forEach((test) => {
    test.classList.toggle('animate-in');
  });
};

// const card = newCard('https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg', 'a new rock', 20, '1h 13m 14s', 'abcdefg');
const listingGrid = document.querySelector('#listingGrid');
const links = ['./img/no-internet.jpg', 'https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg', 'https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg'];

for (let i = 0; i < 24; i += 1) {
  listingGrid.innerHTML += newCard(links, 'a new rock', 20, '1h 13m 14s', `abcdefg${i}`).outerHTML;
}

// mynav();
