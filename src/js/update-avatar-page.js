const avatarIMG = document.querySelector('.avatarIMG');
const backupPic = document.querySelector('#backupPic');
const imgURLInput = document.querySelector('#imgURLInput');
const form = document.querySelector('#avatarForm');
const uploadBTN = document.querySelector('#uploadBTN');
const headingName = document.querySelector('#headingName');
const cancelLink = document.querySelector('#cancelLink');
const user = JSON.parse(localStorage.getItem('user'));

cancelLink.onclick = () => {
  window.history.back();
};
const userName = user.name;
const authToken = user.accessToken;

// eslint-disable-next-line prefer-destructuring
backupPic.innerHTML = userName[0];

headingName.innerHTML = userName;

// avatarIMG.onerror = function (e) {
//   e.target.className = 'avatarIMG w-full h-full object-cover hidden';
//   uploadBTN.disabled = true;
// };

if (user.avatar) {
  imgURLInput.src = user.avatar;
}

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
  if (response.ok) {
    user.avatar = data.avatar;
    localStorage.setItem('user', JSON.stringify(user));
    window.history.back();
  }
}

let isValid;

imgURLInput.onkeyup = function checkUrl() {
  avatarIMG.src = imgURLInput.value;
  avatarIMG.onload = function loadImg() {
    avatarIMG.className = 'duration-300 avatarIMG w-full h-full object-cover absolute top-0 left-0';
    uploadBTN.disabled = false;
    isValid = true;
  };
  avatarIMG.onerror = function errorImg() {
    avatarIMG.className = 'avatarIMG w-full h-full object-cover hidden';
    uploadBTN.disabled = true;
    isValid = false;
  };
  return isValid;
};

form.onsubmit = function submitAvatarForm(event) {
  event.preventDefault();
  if (isValid) {
    const avatarObject = { avatar: imgURLInput.value };
    updateAvatar(userName, avatarObject);
  }
};
