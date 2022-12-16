import getUserCredits from '../utils/checkCredits';
import checkIMG from './checkImg';
import logOut from './logout';

const navBars = document.querySelectorAll('nav');

const userObject = JSON.parse(localStorage.getItem('user'));
const hamburgerMenu = document.querySelector('#hamburger');
function menuOpen(navElement) {
  const hamburgerLine = hamburgerMenu.querySelector('#hamburgerLine');
  hamburgerLine.classList.toggle('hamburger-line-active');
  const navOverlay = document.querySelector(`#${navElement}`);
  // const navOverlay = document.querySelector(`#mobileNav`);
  navOverlay.classList.toggle('mobile-nav-active');
  navOverlay.classList.toggle('h-0');
}

function mynav() {
  navBars.forEach(async (navBar) => {
    const logedInLink = navBar.querySelectorAll('.loggedInLink');
    const logedOutLink = navBar.querySelectorAll('.loggedOutLink');
    const userBtn = navBar.querySelectorAll('#userButton');
    if (localStorage.user) {
      const navUserCredits = navBar.querySelector('.navUserCredits');
      const logOutBtn = navBar.querySelector('.logOutBtn');
      const userCredits = await getUserCredits(userObject.name, userObject.accessToken);
      navUserCredits.innerHTML = `${userCredits.credits}c`;
      logOutBtn.onclick = () => {
        logOut();
      };
      logedOutLink.forEach((link) => {
        link.remove();
      });
      userBtn.forEach((btn) => {
        const profileBtn = btn;
        profileBtn.onclick = function openDropdown() {
          const dropDown = btn.querySelector('.dropDown');
          const chevron = btn.querySelector('.chevron');
          chevron.classList.toggle('rotate-180');
          dropDown.classList.toggle('h-0');
          dropDown.classList.toggle('h-40');
        };
        const profileAvatar = btn.querySelector('img');
        const profileName = btn.querySelector('.buttonName');
        const backupAvatar = btn.querySelector('#backupAvatar');
        profileAvatar.src = userObject.avatar;
        checkIMG(profileAvatar);
        profileName.innerHTML = userObject.name;
        // eslint-disable-next-line prefer-destructuring
        backupAvatar.innerHTML = userObject.name[0];
      });
    } else {
      logedInLink.forEach((link) => {
        link.remove();
      });
    }
  });
}

export { mynav, menuOpen };
