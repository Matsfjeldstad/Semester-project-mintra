const card = document.createElement('a');
card.className = 'card';

const cardImg = document.createElement('img');
cardImg.className = 'h-[70%] w-full object-cover';

const cardInfo = document.createElement('div');
cardInfo.className = 'p-4 flex flex-col';

const listingTitle = document.createElement('h4');
listingTitle.className = 'font-bebas-neue text-3xl';

const listingInfoContainer = document.createElement('div');
listingInfoContainer.className = 'flex gap-4 text-sm';

const listingBidContainer = document.createElement('div');
listingBidContainer.innerHTML = '<p class = "text-[#898888]" >Current bid</p>';

const highestBid = document.createElement('p');
highestBid.className = 'font-bold text-[#242424]';

listingBidContainer.append(highestBid);

const listingTimeContainer = document.createElement('div');
listingTimeContainer.innerHTML = '<p class = "text-[#898888]" >Time left</p>';
const timeLeft = document.createElement('p');
timeLeft.className = 'font-bold text-[#242424]';
listingTimeContainer.append(timeLeft);
listingInfoContainer.append(listingBidContainer, listingTimeContainer);

cardInfo.append(listingTitle, listingInfoContainer);

card.append(cardImg, cardInfo);

function newCard(imgLink, listingName, listingBid, listingTime) {
  cardImg.src = imgLink;
  listingTitle.innerHTML = listingName;
  // eslint-disable-next-line quotes
  highestBid.innerHTML = listingBid ? `${listingBid}c` : `-c`;
  timeLeft.innerHTML = listingTime;
  return card;
}

export default newCard;
