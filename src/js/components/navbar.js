import checkIMG from './checkImg';

const navBars = document.querySelectorAll('nav');
const userObject = JSON.parse(localStorage.getItem('user'));

export default function mynav() {
  navBars.forEach((navBar) => {
    const logedInLink = navBar.querySelectorAll('.loggedInLink');
    const logedOutLink = navBar.querySelectorAll('.loggedOutLink');
    const userBtn = navBar.querySelectorAll('#userButton');
    if (localStorage.user) {
      logedOutLink.forEach((link) => {
        link.remove();
      });
      userBtn.forEach((btn) => {
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
