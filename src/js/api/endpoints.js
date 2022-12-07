// base Url for the Noroff API
const BASE_API_URL = 'https://nf-api.onrender.com/api/v1/auction/';

// auth endpoints
const loginURL = `${BASE_API_URL}auth/login`;
const signupURL = `${BASE_API_URL}auth/register`;

// profiles endpoints
export function allProfileURL(flag, flagBoolean = true) {
  const profileURL = `${BASE_API_URL}profiles/profiles${flag ? `?${flag}=${flagBoolean}` : ''}`;
  return profileURL;
}

// listing endpoints¨
export function allListingURL(flag, flagBoolean = true) {
  const listingURL = `${BASE_API_URL}listings/profiles${flag ? `?${flag}=${flagBoolean}` : ''}`;
  return listingURL;
}

export { loginURL, signupURL };
