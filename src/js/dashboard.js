import checkIMG from './components/checkImg';
import { getSingleListing } from './components/fetch-listings';
import { singleProfileURL } from './api/endpoints';
// import getProfile from './utils/fetchProfile';

const userObject = JSON.parse(localStorage.getItem('user'));

const profileAvatar = document.querySelector('#dashboardAvatar');
const profileName = document.querySelector('#dashboardName');
const backupAvatar = document.querySelector('#backupAvatar');
const totalBalance = document.querySelector('#totalBalance');
const totalWins = document.querySelector('#totalWins');
const totalActiveListing = document.querySelector('#totalActiveListing');
const averageSpending = document.querySelector('#averageSpending');

function dashboardNav() {
  profileAvatar.src = userObject.avatar;
  checkIMG(profileAvatar);
  profileName.innerHTML = userObject.name;
  // eslint-disable-next-line prefer-destructuring
  backupAvatar.innerHTML = userObject.name[0];
}

dashboardNav();
async function getProfile() {
  try {
    const response = await fetch(singleProfileURL(userObject.name), {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userObject.accessToken}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      console.log(data);
    }
    console.log(data);
    totalBalance.innerHTML = data.credits;
    const allWins = data.wins;
    totalWins.innerHTML = allWins.length;
    const totalWinArray = [];
    allWins.forEach(async (win) => {
      const singleListing = await getSingleListing(win);
      const highestbid = await singleListing.bids.reduce(
        (prev, current) => ((prev.amount > current.amount) ? prev.amount : current.amount),
      );
      totalWinArray.push(highestbid);
      const costOfWins = totalWinArray.reduce((p, c, i) => p + (c - p) / (i + 1), 0);
      averageSpending.innerHTML = costOfWins;
    });
    // const costOfWins = totalWinArray.reduce((partialSum, a) => partialSum + a, 0);
  } catch (err) {
    console.log(err);
  }
}

getProfile();

async function getProfileActiveListings() {
  try {
    const response = await fetch(`https://nf-api.onrender.com/api/v1/auction/profiles/${userObject.name}/listings?_active=true`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userObject.accessToken}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      const { errors } = data;
      console.log(errors);
    }
    console.log(data);
    totalActiveListing.innerHTML = data.length;
  } catch (err) {
    console.log(err);
  }
}
getProfileActiveListings();

export default dashboardNav;
