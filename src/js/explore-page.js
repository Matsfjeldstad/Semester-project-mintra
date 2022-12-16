/* eslint-disable default-param-last */
import countdown from './components/countdown';
import { getListings } from './components/fetch-listings';
import newCard from './components/productCard';

const listingGrid = document.querySelector('#listingGrid');
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');
const searchBar = document.querySelector('#searchBar');
const searchBarBTN = document.querySelector('#searchBarBtn');
const filterOnSort = document.querySelector('#filterOnSort');
const filterOnActiveInput = document.querySelector('#filterOnActive');
const filterBtn = document.querySelector('#filterBtn');

async function getListingsData(offset, sortOrder = 'desc', tag, active) {
  const getAllListings = await getListings(sortOrder, 'limit', 24, offset, tag, active);
  if (getAllListings.response.ok) {
    if (getAllListings.data.length < 24) {
      nextBtn.disabled = true;
    }
    if (offset < 1) {
      prevBtn.disabled = true;
    } else {
      prevBtn.disabled = false;
    }
    nextBtn.onclick = () => {
      getListingsData(offset + 24);
    };
    prevBtn.onclick = () => {
      getListingsData(offset - 24);
    };
    const listings = getAllListings.data;
    listingGrid.innerText = '';
    listings.forEach((singleListing) => {
      const listing = singleListing;
      let bid;
      if (listing.bids.length === 0) {
        bid = 'no bids';
      } else {
        const sortedBids = listing.bids.sort((a, b) => b.amount - a.amount);
        bid = `${sortedBids[0].amount}c`;
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
    });
  } else {
    listingGrid.innerHTML = `Oh no somthing unexpected happend... (${getAllListings.data.statusCode}:${getAllListings.data.status}) Please try again later`;
  }
}

searchBarBTN.onclick = () => {
  getListingsData(0, 'desc', searchBar.value);
};

getListingsData(0, 'desc', '', true);

filterBtn.onclick = () => {
  getListingsData(0, filterOnSort.value, '', filterOnActiveInput.value);
};
