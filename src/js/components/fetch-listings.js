import { allListingURL, singleListingURL } from '../api/endpoints';

async function getListings(sortOrder, flag, flagParam, offset, tag, active) {
  try {
    const response = await fetch(allListingURL(sortOrder, flag, flagParam, offset, tag, active));
    const data = await response.json();
    return { response, data };
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
    return await { response, data };
  } catch (err) {
    return err;
  }
}

export { getListings, getSingleListing };
