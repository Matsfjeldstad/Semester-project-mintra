import { makeBidURL } from '../api/endpoints';

async function makeBid(bid, listingId) {
  const userToken = JSON.parse(localStorage.getItem('user')).accessToken;
  try {
    const response = await fetch(makeBidURL(listingId), {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({ amount: Number(bid) }),
    });
    const data = await response.json();
    return await data;
  } catch (error) {
    return error;
  }
}

export default makeBid;
