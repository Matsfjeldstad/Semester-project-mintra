import { DateTime } from 'luxon';
import { getSingleListing } from './components/fetch-listings';
import { getProfileActiveListings } from './utils/profileListings';
import getProfile from './utils/fetchProfile';
import dashboardNav from './components/dashboardNav';

dashboardNav();

const totalBalance = document.querySelector('#totalBalance');
const totalWins = document.querySelectorAll('.totalWins');
const totalActiveListingsDisplays = document.querySelectorAll('.totalActiveListing');
const averageSpending = document.querySelector('#averageSpending');

const winsTable = document.querySelector('#winsTable');
const winsTableBody = winsTable.querySelector('#winsTableBody');

(async () => {
  const profileData = await getProfile();
  const { data } = profileData;

  if (profileData.response.ok) {
    totalBalance.innerHTML = data.credits;
    const allWins = data.wins;
    totalWins.forEach((totalWin) => {
      const winElements = totalWin;
      winElements.innerHTML = allWins.length;
    });
    const totalWinArray = [];
    const winsArray = [];
    allWins.forEach(async (win) => {
      const singleListingResponse = await getSingleListing(win);
      const singleListing = singleListingResponse.data;
      winsArray.push(singleListing);
      let highestbid;
      if (singleListing.bids.length > 1) {
        highestbid = await singleListing.bids.reduce(
          (prev, current) => ((prev.amount > current.amount) ? prev.amount : current.amount),
        );
      } else {
        highestbid = singleListing.bids[0].amount;
      }
      totalWinArray.push(highestbid);
      const costOfWins = totalWinArray.reduce((a, b, i) => a + (b - a) / (i + 1), 0);
      averageSpending.innerHTML = costOfWins.toFixed(2);
      const tableRow = document.createElement('tr');
      singleListing.endsAt = DateTime.fromISO(singleListing.endsAt).toFormat('dd.MM.yy HH:mm');
      tableRow.innerHTML = `
    <th scope="row" class="py-4 font-medium text-gray-100 whitespace-nowrap">
    <a href="/spesific-listing.html?id=${singleListing.id}" class="font-medium hover:underline">${singleListing.title}</a>
    </th>
    <td class="py-4 px-6 text-right">
    ${highestbid}
    </td>
    <td id="endsAt" class="py-4 px-6 text-right">
    ${singleListing.endsAt}
    </td>
    `;
      tableRow.className = 'border-b border-gray-700 text-gray-100';
      if (winsArray.length < 4) {
        winsTableBody.append(tableRow);
      }
    });
  }
  const activeListings = await getProfileActiveListings();
  const activeListingsTable = document.querySelector('#activeListingsTable');
  const activeListingsTableBody = activeListingsTable.querySelector('#activeListingsTableBody');

  if (activeListings.response.ok) {
    const allListings = activeListings.data;
    totalActiveListingsDisplays.forEach((display) => {
      const displayElement = display;
      displayElement.innerHTML = allListings.length;
    });
    activeListingsTableBody.innerHTML = '';
    if (allListings.length > 0) {
      for (let i = 0; i < allListings.length; i += 1) {
        if (i === 3) {
          break;
        }
        const listing = allListings[i];
        const tableRow = document.createElement('tr');
        const { bids } = listing;
        const bidsSorted = bids.sort((a, b) => b.amount - a.amount);
        const highestBid = bidsSorted[0] ? `${bidsSorted[0].amount}c` : '-';
        listing.endsAt = DateTime.fromISO(listing.endsAt).toFormat('dd.MM.yy HH:mm');
        tableRow.innerHTML = `
      <th scope="row" class="py-4 font-medium text-gray-100 whitespace-nowrap">
      <a href="/spesific-listing.html?id=${listing.id}" class="font-medium hover:underline">${listing.title}</a>
      </th>
      <td class="py-4 px-6 text-right">
          ${highestBid}
      </td>
      <td id="endsAt" class="py-4 px-6 text-right">
          ${listing.endsAt}
      </td>
    `;
        tableRow.className = 'border-b border-gray-700 text-gray-100';
        activeListingsTableBody.append(tableRow);
      }
    } else {
      activeListingsTable.innerHTML = `
  <div class="h-full w-full flex flex-col gap-5 justify-center items-center">
    <div>
    You currently dont have any active listings
    </div>
    <a href="./make-listing.html">
    <button class='btn-ghost'>Make a listing</button>
    </a>
  </div>`;
      activeListingsTable.classList.add('h-full');
    }
  }
})();
