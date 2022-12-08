const avatarIMG = document.querySelector('.avatarIMG');
const backupPic = document.querySelector('#backupPic');
const imgURLInput = document.querySelector('#imgURLInput');
const form = document.querySelector('#avatarForm');
const uploadBTN = document.querySelector('#uploadBTN');
const headingName = document.querySelector('#headingName');
const paragraphName = document.querySelector('#paragraphName');

const userName = JSON.parse(localStorage.getItem('user')).name;
const authToken = JSON.parse(localStorage.getItem('user')).accessToken;

// eslint-disable-next-line prefer-destructuring
backupPic.innerHTML = userName[0];

headingName.innerHTML = userName;
paragraphName.innerHTML = userName;
// avatarIMG.onerror = function (e) {
//   e.target.className = 'avatarIMG w-full h-full object-cover hidden';
//   uploadBTN.disabled = true;
// };

async function updateAvatar(name, url) {
  const putData = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(url),
  };
  const response = await fetch(`https://nf-api.onrender.com/api/v1/auction/profiles/${name}/media`, putData);
  const data = await response.json();
  console.log(data);
  if (response.ok) {
    const updatedUser = JSON.parse(localStorage.getItem('user'));
    updatedUser.avatar = data.avatar;
    localStorage.setItem('user', JSON.stringify(updatedUser));
    window.location.href = '/';
  }
}

let isValid;
imgURLInput.onkeyup = function checkUrl() {
  avatarIMG.onload = function loadImg() {
    avatarIMG.className = 'duration-300 avatarIMG w-full h-full object-cover absolute top-0 left-0';
    uploadBTN.disabled = false;
    isValid = true;
  };
  avatarIMG.onerror = function errorImg(e) {
    e.target.className = 'avatarIMG w-full h-full object-cover hidden';
    uploadBTN.disabled = true;
    isValid = false;
  };
  avatarIMG.src = imgURLInput.value;

  return isValid;
};

form.onsubmit = function submitAvatarForm(event) {
  event.preventDefault();
  if (isValid) {
    const avatarObject = { avatar: imgURLInput.value };
    updateAvatar(userName, avatarObject);
  }
};
