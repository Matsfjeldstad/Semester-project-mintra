import { DateTime } from 'luxon';
import checkIMG from './components/checkImg';
import countdown from './components/countdown';
import { getSingleListing } from './components/fetch-listings';
import loginModal from './components/login-modal';
import makeBid from './components/makeBid';
import getUserCredits from './utils/checkCredits';

const productTitle = document.querySelector('h1');
const productTitleMobile = document.querySelector('h2');
const timeLeft = document.querySelector('#timeLeft');
const currentBid = document.querySelector('#currentBid');
const description = document.querySelector('#description');
const tableBody = document.querySelector('tbody');
const noBidsContainer = document.querySelector('#noBids');
const bidInput = document.querySelector('#bidInput');
const bidFormBtn = document.querySelector('#bidBtn');
const makeBidForm = document.querySelector('#makeBidForm');
const img = document.querySelector('#listingImg');
const highestBidHandler = document.querySelector('#highestBidHandler');
const userCredits = document.querySelector('#userCredits');

const url = new URL(document.location);
const searchParams = new URLSearchParams(url.search);
const paramId = searchParams.get('id');
const listing = await getSingleListing(paramId);

productTitle.innerHTML = listing.title;
productTitle.title = listing.title;
productTitleMobile.innerHTML = listing.title;

timeLeft.innerHTML = countdown(listing.endsAt);
setInterval(() => {
  timeLeft.innerHTML = countdown(listing.endsAt);
}, 1000);

const lastBid = listing.bids[listing.bids.length - 1];

currentBid.innerHTML = listing.bids.length > 0 ? `${lastBid.amount}c` : 'no bids';

description.innerHTML = listing.description;

if (listing.bids.length > 0) {
  noBidsContainer.remove();
  listing.bids.forEach((bid) => {
    const tableRow = document.createElement('tr');
    tableRow.className = 'bg-white border-b';
    const bidName = document.createElement('td');
    bidName.scope = 'row';
    bidName.className = 'py-4 px-6 font-medium text-gray-900 whitespace-nowrap';
    bidName.innerText = bid.bidderName;

    const bidTime = document.createElement('td');
    bidTime.className = 'py-4 px-6';

    const dateTime = DateTime.fromISO(bid.created).toFormat('dd.MM.yy HH:mm');// format the DateTime object as a string in the format "dd:mm:yy hh:mm"
    bidTime.innerHTML = dateTime;

    const bidAmount = document.createElement('td');
    bidAmount.className = 'py-4 px-6';
    bidAmount.innerText = bid.amount;

    tableRow.append(bidName, bidTime, bidAmount);
    tableBody.prepend(tableRow);

    bidInput.value = listing.bids[listing.bids.length - 1].amount + 1;
    bidInput.min = listing.bids[listing.bids.length - 1].amount + 1;
  });
}

const mainImgLink = listing.media.length > 0 ? listing.media[0] : 'img/mintra.jpg';
img.classList.remove('animate-pulse');
img.src = mainImgLink;

const profileAvatar = document.querySelector('#listingCreatorAvatar');
const profileName = document.querySelector('#listingCreatorName');
const backupAvatar = document.querySelector('#listingCreatorBackupAvatar');
profileAvatar.src = listing.seller.avatar;
checkIMG(profileAvatar);
profileName.innerHTML = listing.seller.name;
// eslint-disable-next-line prefer-destructuring
backupAvatar.innerHTML = listing.seller.name[0];
let curentUser = '';

async function updateUserbalance(name, token) {
  const userCreditsData = await getUserCredits(name, token);
  userCredits.innerHTML = `${userCreditsData.credits}c`;
}
if (!localStorage.user) {
  userCredits.parentElement.parentElement.remove();
} else {
  curentUser = JSON.parse(localStorage.getItem('user')).name;
  const usertoken = JSON.parse(localStorage.user).accessToken;
  const userName = JSON.parse(localStorage.user).name;
  updateUserbalance(userName, usertoken);
}

if (listing.bids.length > 0 && lastBid.bidderName === curentUser) {
  bidFormBtn.disabled = true;
  highestBidHandler.classList.remove('hidden');
}

makeBidForm.onsubmit = async function (event) {
  event.preventDefault();
  if (!localStorage.user) {
    loginModal(window.location.href);
  } else {
    const bidData = await makeBid(bidInput.value, listing.id);
    highestBidHandler.classList.remove('hidden');
    bidFormBtn.disabled = true;
    currentBid.innerHTML = `${bidData.bids[bidData.bids.length - 1].amount}c`;
    const usertoken = JSON.parse(localStorage.user).accessToken;
    const userName = JSON.parse(localStorage.user).name;
    updateUserbalance(userName, usertoken);
  }
};
