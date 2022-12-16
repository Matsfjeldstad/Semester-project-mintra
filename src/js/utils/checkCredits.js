import { checkCreditURL } from '../api/endpoints';

async function getUserCredits(name, token) {
  try {
    const response = await fetch(checkCreditURL(name), {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export default getUserCredits;
