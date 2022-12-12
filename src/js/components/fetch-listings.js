import { allListingURL, singleListingURL } from '../api/endpoints';

async function getListings(flag, flagParam) {
  try {
    const response = await fetch(allListingURL(flag, flagParam));
    const data = await response.json();
    if (!response.ok) {
      const { errors } = data;
      return errors;
    }
    return data;
  } catch (err) {
    return err;
  }
}

async function getSingleListing(id, flag, flagParam) {
  try {
    const response = await fetch(singleListingURL(id, flag, flagParam));
    const data = await response.json();
    if (!response.ok) {
      const { errors } = data;
      return errors;
    }
    return data;
  } catch (err) {
    return err;
  }
}

export { getListings, getSingleListing };
