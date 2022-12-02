// base Url for the Noroff API
const BASE_API_URL = 'https://nf-api.onrender.com/api/v1/auction/';

// auth endpoints
const loginURL = `${BASE_API_URL}login`;
const signupURL = `${BASE_API_URL}signup`;
// profiles endpoints
const allProfileURL = `${BASE_API_URL}profiles/`;
// listing endpoints
const allListingURL = `${BASE_API_URL}listings/`;

export default {
  loginURL, signupURL, allProfileURL, allListingURL,
};
