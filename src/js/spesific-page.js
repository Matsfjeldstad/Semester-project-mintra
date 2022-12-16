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
const bidErrorHandler = document.querySelector('.bidErrorHandler');
const img = document.querySelector('#listingImg');
const highestBidHandler = document.querySelector('#highestBidHandler');
const userCredits = document.querySelector('#userCredits');
const main = document.querySelector('main');

const url = new URL(document.location);
const searchParams = new URLSearchParams(url.search);
const paramId = searchParams.get('id');

const getListing = getSingleListing(paramId);

function openImgModal(array) {
  const imgModal = document.createElement('div');
  imgModal.className = 'fixed top-0 left-0 bg-black/70 backdrop-blur-md h-full w-full z-[20] flex flex-col gap-3 justify-center items-center min-h-screen p-6';
  imgModal.innerHTML = `
            <div class="left-0 h-full w-[800px] flex gap-2 w-fit max-w-full overflow-scroll">
            <div id="imgContainer" class="relative flex gap-4">
            </div>
            </div>
            <button id="closeimgModal" class ='btn-ghost'>Close</button>
            `;

  const imgContainer = imgModal.querySelector('#imgContainer');
  array.forEach((mediaLink) => {
    const imgElementContainer = document.createElement('div');
    imgElementContainer.className = 'h-full w-[800px] bg-lime-300 rounded-xl overflow-hidden relative';
    const imgElement = document.createElement('img');
    imgElement.className = 'relative w-full h-full top-0 left-0 z-[30] object-cover';
    imgElement.src = mediaLink;
    imgElementContainer.append(imgElement);
    imgContainer.appendChild(imgElementContainer);
  });

  function closeimgModal() {
    imgModal.remove();
  }
  main.prepend(imgModal);
  const closeimgModalBtn = imgModal.querySelector('#closeimgModal');
  closeimgModalBtn.onclick = () => { closeimgModal(); };
}

(async function getListingResponse() {
  const response = await getListing;
  const listing = response.data;

  productTitle.innerHTML = listing.title;
  productTitle.title = listing.title;
  productTitleMobile.innerHTML = listing.title;

  timeLeft.innerHTML = countdown(listing.endsAt);
  setInterval(() => {
    timeLeft.innerHTML = countdown(listing.endsAt);
  }, 1000);

  if (countdown(listing.endsAt) === 'Auction Ended') {
    makeBidForm.remove();
  }

  const sortedBids = listing.bids.sort((a, b) => b.amount - a.amount);
  const lastBid = sortedBids[0];

  currentBid.innerHTML = listing.bids.length > 0 ? `${lastBid.amount}c` : 'no bids';

  description.innerHTML = listing.description;

  if (listing.bids.length > 0) {
    noBidsContainer.remove();
    sortedBids.forEach((bid) => {
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
      tableBody.append(tableRow);

      bidInput.value = sortedBids[0].amount + 1;
      bidInput.min = sortedBids[0].amount + 1;
    });
  }

  const mainImgLink = listing.media.length > 0 ? listing.media[0] : '/mintra.jpg';
  img.classList.remove('animate-pulse');
  img.src = mainImgLink;

  img.onclick = () => {
    openImgModal(listing.media);
  };

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

  if (curentUser === listing.seller.name) {
    bidFormBtn.disabled = true;
    bidErrorHandler.innerHTML = 'This is your listing, and you can bid on this';
    bidErrorHandler.classList.remove('hidden');
    makeBidForm.remove();
  }

  makeBidForm.onsubmit = async (event) => {
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
}());
