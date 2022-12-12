import countdown from './components/countdown';
import { getListings } from './components/fetch-listings';
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
      const currentListing = listings.find((list) => list.id === card.id);
      if (currentListing) {
        endsAtValues.set(card.id, currentListing.endsAt);
      }
    });

    timeLeftElements.forEach((timeLeft, id) => {
      const endsAt = endsAtValues.get(id);
      if (endsAt) {
        const time = countdown(endsAt);
        const timeLeftContainer = timeLeft;
        timeLeftContainer.innerText = time;
      }
    });

    setInterval(() => {
      timeLeftElements.forEach((timeLeft, id) => {
        const endsAt = endsAtValues.get(id);
        if (endsAt) {
          const time = countdown(endsAt);
          const timeLeftContainer = timeLeft;
          timeLeftContainer.innerText = time;
        }
      });
    }, 1000);

    // setInterval(function (){
    //   console.log(countdown(listing.endsAt) );
    // }, 1000);
  });
};
await allListings();
