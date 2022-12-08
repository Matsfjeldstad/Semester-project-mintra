// base Url for the Noroff API
const BASE_API_URL = 'https://nf-api.onrender.com/api/v1/auction/';

// auth endpoints
const loginURL = `${BASE_API_URL}auth/login`;
const signupURL = `${BASE_API_URL}auth/register`;

// profiles endpoints
export function allProfileURL(flag, flagParam = true) {
  const profileURL = `${BASE_API_URL}profiles${flag ? `?${flag}=${flagParam}` : ''}`;
  return profileURL;
}

// listing endpoints¨
export function allListingURL(flag, flagParam = true) {
  const listingURL = `${BASE_API_URL}listings?_bids=true${flag ? `&${flag}=${flagParam}` : ''}`;
  return listingURL;
}

export { loginURL, signupURL };
