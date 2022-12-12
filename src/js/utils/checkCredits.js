import { checkCreditURL } from '../api/endpoints';
import { userToken } from './localStorageUser';

async function getUserCredits() {
  try {
    const response = await fetch(checkCreditURL, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default getUserCredits;
