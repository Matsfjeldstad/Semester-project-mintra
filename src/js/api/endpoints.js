// base Url for the Noroff API
const BASE_API_URL = 'https://nf-api.onrender.com/api/v1/auction/';

// auth endpoints
const loginURL = `${BASE_API_URL}auth/login`;
const signupURL = `${BASE_API_URL}auth/register`;

// profiles endpoints
export function allProfileURL(flag, flagParam = true) {
  const profileURL = `${BASE_API_URL}profiles?_listings=true${flag ? `&${flag}=${flagParam}` : ''}`;
  return profileURL;
}
function singleProfileURL(name) {
  const profileURL = `${BASE_API_URL}profiles/${name}?_bids=true&_listings=true`;
  return profileURL;
}

// listing endpoints¨
// eslint-disable-next-line default-param-last
function allListingURL(sortOrder, flag, flagParam = true, offset = 0, tag, active) {
  const listingURL = `${BASE_API_URL}listings?_bids=true&sort=created&sortOrder=${sortOrder}${flag ? `&${flag}=${flagParam}` : ''}&offset=${offset}${tag ? `&_tag=${tag}` : ''}${active ? `&_active=${active}` : ''}`;
  return listingURL;
}
function singleListingURL(id) {
  const URL = `${BASE_API_URL}listings/${id}/?_seller=true&_bids=true`;
  return URL;
}
function makeBidURL(id) {
  const URL = `${BASE_API_URL}listings/${id}/bids?_bids=true`;
  return URL;
}
function checkCreditURL(userName) {
  const URL = `${BASE_API_URL}profiles/${userName}/credits`;
  return URL;
}

export {
  loginURL, signupURL, allListingURL, singleListingURL, makeBidURL, checkCreditURL,
  singleProfileURL,
};
