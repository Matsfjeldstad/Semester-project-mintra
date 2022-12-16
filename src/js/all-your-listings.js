import { DateTime } from 'luxon';
import dashboardNav from './components/dashboardNav';
import deleteForm from './utils/deletePost';
import getProfile from './utils/fetchProfile';
import { getProfileListings, getProfileActiveListings } from './utils/profileListings';

dashboardNav();

const userObject = JSON.parse(localStorage.getItem('user'));
const main = document.querySelector('main');

function openDeleteModule(id, tableRow) {
  const deleteModal = document.createElement('div');
  deleteModal.className = 'absolute top-0 left-0 bg-black/50 backdrop-blur-md h-full w-full z-100 flex flex-col gap-3 justify-center items-center';
  deleteModal.innerHTML = `
            <h3 class="text-white font-bold text-2xl">
              You are about to delete this Listing
            </h3>
            <p class="text-gray-300">Are you sure you want to delete this?</p>
            <div class="flex gap-2">
              <button id='deleteListingBTN' class="btn-danger">Delete</button>
              <button id='closeDeleteModal' class="btn-ghost">Cancle</button>
            </div>
    `;
  main.prepend(deleteModal);
  const closeDeleteModal = deleteModal.querySelector('#closeDeleteModal');
  closeDeleteModal.onclick = () => { deleteModal.remove(); };

  const deleteListingBTN = deleteModal.querySelector('#deleteListingBTN');
  deleteListingBTN.onclick = () => {
    deleteForm(id);
    deleteModal.remove();
    tableRow.remove();
  };
}

(async () => {
  const profileListingsData = await getProfileListings();
  const activeListingsData = await getProfileActiveListings();

  const listingsTableBody = document.querySelector('#listingTableBody');
  const listingsLength = document.querySelectorAll('.listings-length');
  const userName = document.querySelector('#userName');

  userName.innerHTML = userObject.name;

  const profileData = await getProfile();

  if (profileData.response.ok) {
    listingsLength.forEach((listing) => {
      const element = listing;
      // eslint-disable-next-line no-underscore-dangle
      element.innerHTML = profileData.data._count.listings;
    });
  } else {
    listingsLength.forEach((listing) => {
      const element = listing;
      element.innerHTML = 'oh no';
    });
  }

  if (profileListingsData.response.ok) {
    let allListings = profileListingsData.data;
    if (activeListingsData.response.ok) {
      const activeListings = activeListingsData.data;
      allListings = allListings.map((listing) => ({
        ...listing,
        active: activeListings.some((activeListingItem) => activeListingItem.id === listing.id),
      }));
    }
    listingsTableBody.innerHTML = '';
    allListings.forEach((currentListing) => {
      const listing = currentListing;
      const tableRow = document.createElement('tr');
      const { bids } = listing;
      const bidsSorted = bids.sort((a, b) => b.amount - a.amount);
      listing.created = DateTime.fromISO(listing.created).toFormat('dd.MM.yy HH:mm');
      const highestBid = bidsSorted[0] ? `${bidsSorted[0].amount}c` : '-';
      listing.endsAt = listing.active ? DateTime.fromISO(listing.endsAt).toFormat('dd.MM.yy HH:mm') : 'Auction Ended';
      tableRow.innerHTML = `
    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
    <a href="/spesific-listing.html?id=${listing.id}" class="font-medium hover:underline">${listing.title}</a>
    </th>
    <td class="py-4 px-6">
        ${bids.length}
    </td>
    <td class="py-4 px-6">
        ${highestBid}
    </td>
    <td class="py-4 px-6 ${listing.active ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}">
        ${listing.active}
    </td>
    <td id="" class="py-4 px-6 text-right">
        ${listing.created}
    </td>
    <td id="endsAt" class="py-4 px-6 text-right">
        ${listing.endsAt}
    </td>
    <td class="py-4 px-6 text-right">
        <a href="./edit-listing.html?id=${listing.id}" class="font-medium text-blue-600 hover:underline">Edit</a>
    </td>
    <td class="py-4 px-6 text-right">    
    <button id="deleteButton" class="font-medium text-red-600 hover:underline flex items-end gap-1">
    <svg width="18" height="20" viewBox="0 0 18 20" xmlns="http://www.w3.org/2000/svg" class="w-3 fill-red-700">
        <path d="M17.25 3.5H13.5V2.75C13.4975 2.15402 13.2597 1.58316 12.8383 1.16174C12.4168 0.740313 11.846 0.502468 11.25 0.5H6.75C6.15402 0.502468 5.58316 0.740313 5.16174 1.16174C4.74031 1.58316 4.50247 2.15402 4.5 2.75V3.5H0.75C0.551088 3.5 0.360322 3.57902 0.21967 3.71967C0.0790178 3.86032 0 4.05109 0 4.25C0 4.44891 0.0790178 4.63968 0.21967 4.78033C0.360322 4.92098 0.551088 5 0.75 5H1.5V18.5C1.5 18.8978 1.65804 19.2794 1.93934 19.5607C2.22064 19.842 2.60218 20 3 20H15C15.3978 20 15.7794 19.842 16.0607 19.5607C16.342 19.2794 16.5 18.8978 16.5 18.5V5H17.25C17.4489 5 17.6397 4.92098 17.7803 4.78033C17.921 4.63968 18 4.44891 18 4.25C18 4.05109 17.921 3.86032 17.7803 3.71967C17.6397 3.57902 17.4489 3.5 17.25 3.5ZM7.5 14.75C7.5 14.9489 7.42098 15.1397 7.28033 15.2803C7.13968 15.421 6.94891 15.5 6.75 15.5C6.55109 15.5 6.36032 15.421 6.21967 15.2803C6.07902 15.1397 6 14.9489 6 14.75V8.75C6 8.55109 6.07902 8.36032 6.21967 8.21967C6.36032 8.07902 6.55109 8 6.75 8C6.94891 8 7.13968 8.07902 7.28033 8.21967C7.42098 8.36032 7.5 8.55109 7.5 8.75V14.75ZM12 14.75C12 14.9489 11.921 15.1397 11.7803 15.2803C11.6397 15.421 11.4489 15.5 11.25 15.5C11.0511 15.5 10.8603 15.421 10.7197 15.2803C10.579 15.1397 10.5 14.9489 10.5 14.75V8.75C10.5 8.55109 10.579 8.36032 10.7197 8.21967C10.8603 8.07902 11.0511 8 11.25 8C11.4489 8 11.6397 8.07902 11.7803 8.21967C11.921 8.36032 12 8.55109 12 8.75V14.75ZM12 3.5H6V2.75C6 2.55109 6.07902 2.36032 6.21967 2.21967C6.36032 2.07902 6.55109 2 6.75 2H11.25C11.4489 2 11.6397 2.07902 11.7803 2.21967C11.921 2.36032 12 2.55109 12 2.75V3.5Z"/>
    </svg>
    Delete</button>
    </td>
  `;
      tableRow.className = 'bg-white border-t border-gray-300 hover:bg-gray-50';
      const deleteButton = tableRow.querySelector('#deleteButton');
      deleteButton.onclick = function openDeleteModal() {
        openDeleteModule(listing.id, tableRow);
      };
      listingsTableBody.append(tableRow);
    });
  } else {
    main.innerHTML = 'onNo';
  }
})();
