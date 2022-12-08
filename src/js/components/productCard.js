const card = document.createElement('a');
card.className = 'card';

const cardImgContainer = document.createElement('div');
cardImgContainer.className = 'h-[70%] w-full object-cover overflow-hidden';

const cardImg = document.createElement('img');
cardImg.className = 'w-full h-full object-cover';

const cardInfo = document.createElement('div');
cardInfo.className = 'p-4 flex flex-col';

const listingTitle = document.createElement('h4');
listingTitle.className = 'font-bebas-neue text-3xl w-full truncate';

const listingInfoContainer = document.createElement('div');
listingInfoContainer.className = 'flex gap-4 text-sm';

const listingBidContainer = document.createElement('div');
listingBidContainer.innerHTML = '<p class = "text-[#898888]" >Current bid</p>';

const highestBid = document.createElement('p');
highestBid.className = 'font-bold text-[#242424]';

const listingTimeContainer = document.createElement('div');
listingTimeContainer.innerHTML = '<p class = "text-[#898888]" >Time left</p>';
const timeLeft = document.createElement('p');
timeLeft.className = 'font-bold text-[#242424]';

cardImgContainer.append(cardImg);
listingTimeContainer.append(timeLeft);
listingBidContainer.append(highestBid);
listingInfoContainer.append(listingBidContainer, listingTimeContainer);

cardInfo.append(listingTitle, listingInfoContainer);

card.append(cardImgContainer, cardInfo);

export function lazyLoadCard() {
  const testCard = document.createElement('div');
  testCard.className = 'animate-pulse card bg-gray-300';
  return testCard;
}

export default function newCard(imgLink, listingName, listingBid, listingTime, listingId) {
  cardImg.src = imgLink.length > 0 ? imgLink[0] : '../../img/mintra.jpg';
  listingTitle.innerHTML = listingName;
  // eslint-disable-next-line quotes
  card.href = `./spesific-listing.html?id=${listingId}`;
  highestBid.innerHTML = listingBid ? `${listingBid}c` : '-c';
  timeLeft.innerHTML = listingTime;
  return card;
}
