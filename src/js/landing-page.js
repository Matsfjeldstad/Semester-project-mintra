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
  console.log(navTest);
};
