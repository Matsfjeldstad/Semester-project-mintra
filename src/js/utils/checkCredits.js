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
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default getUserCredits;
