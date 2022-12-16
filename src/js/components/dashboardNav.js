import checkIMG from './checkImg';

const userObject = JSON.parse(localStorage.getItem('user'));

const profileAvatar = document.querySelector('#dashboardAvatar');
const profileName = document.querySelector('#dashboardName');
const backupAvatar = document.querySelector('#backupAvatar');

function dashboardNav() {
  profileAvatar.src = userObject.avatar;
  checkIMG(profileAvatar);
  profileName.innerHTML = userObject.name;
  // eslint-disable-next-line prefer-destructuring
  backupAvatar.innerHTML = userObject.name[0];
}
export default dashboardNav;
