import { allListingURL } from '../api/endpoints';

export default async function getListings(flag, flagParam) {
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
