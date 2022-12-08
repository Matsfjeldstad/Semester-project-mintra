import getListings from './components/fetch-listings';
import newCard, { lazyLoadCard } from './components/productCard';

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

if (localStorage.user) {
  const btns = document.querySelectorAll('.btn');
  const h1 = document.querySelector('h1');
  const h2 = document.querySelector('h2');
  h1.innerHTML = 'Find your next treasure at Mintra';
  h2.remove();
  btns.forEach((btn) => {
    const button = btn;
    button.innerHTML = 'Make a listing';
    button.parentElement.href = '/make-listing/';
  });
}

// const card = newCard('https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg', 'a new rock', 20, '1h 13m 14s', 'abcdefg');
const listingGrid = document.querySelector('#listingGrid');

const countdown = (time) => {
  const countDate = Date.parse(time);
  const now = new Date().getTime();
  const gap = countDate - now;
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const textDay = Math.floor(gap / day);
  const textHour = Math.floor((gap % day) / hour);
  const textMinute = Math.floor((gap % hour) / minute);
  const textSecond = Math.floor((gap % minute) / second);
  const countdownString = `${textDay}d ${textHour}h ${textMinute}m ${textSecond}s`;
  if (gap < 0) {
    return 'auction ended';
  }
  return countdownString;
};

for (let i = 0; i < 24; i += 1) {
  listingGrid.innerHTML += lazyLoadCard().outerHTML;
}

const allListings = async () => {
  const listings = await getListings('limit', 24);
  listingGrid.innerText = '';
  await listings.forEach((listing) => {
    let bid;

    if (listing.bids.length === 0) {
      bid = 'no bids';
    } else {
      bid = `${listing.bids[listing.bids.length - 1].amount}c`;
    }
    const cards = newCard(listing.media, listing.title, bid, listing.id);
    listingGrid.innerHTML += cards.outerHTML;
    const allCards = listingGrid.querySelectorAll('.card');
    const timeLeftElements = new Map();
    const endsAtValues = new Map();

    allCards.forEach((card) => {
      const timeLeft = card.querySelector('.timeLeft');
      timeLeftElements.set(card.id, timeLeft);
      // Find the correct listing object for this card
      const currentListing = listings.find((thisListing) => thisListing.id === card.id);
      if (currentListing) {
        endsAtValues.set(card.id, currentListing.endsAt);
      }
    });
    let rafId;
    const updateTimeLeft = () => {
      // Check if the page is visible and the auction is active
      if (document.visibilityState === 'visible' && !listing.isEnded) {
        timeLeftElements.forEach((timeLeft, id) => {
          const endsAt = endsAtValues.get(id);
          if (endsAt) {
            const time = countdown(endsAt);
            const proxy = timeLeft;
            proxy.innerText = time;
          }
        });

        // Request another animation frame to update the time left
        rafId = requestAnimationFrame(updateTimeLeft);
      }
    };

    // Start the update loop by requesting an animation frame
    // eslint-disable-next-line no-unused-vars
    rafId = requestAnimationFrame(updateTimeLeft);
  });

  // setInterval(() => {
  //   timeLeftElements.forEach((timeLeft, id) => {
  //     const endsAt = endsAtValues.get(id);
  //     if (endsAt) {
  //       const time = countdown(endsAt);
  //       timeLeft.innerText = time;
  //     }
  //   });
  // }, 1000);

  // setInterval(function (){
  //   console.log(countdown(listing.endsAt) );
  // }, 1000);
};
await allListings();
