const userObject = JSON.parse(localStorage.getItem('user'));

async function getProfileListings() {
  try {
    const response = await fetch(`https://nf-api.onrender.com/api/v1/auction/profiles/${userObject.name}/listings?_bids=true`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userObject.accessToken}`,
      },
    });
    const data = await response.json();
    return { response, data };
  } catch (err) {
    return err;
  }
}

async function getProfileActiveListings() {
  try {
    const response = await fetch(`https://nf-api.onrender.com/api/v1/auction/profiles/${userObject.name}/listings?_active=true&_bids=true&_limit=25`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userObject.accessToken}`,
      },
    });
    const data = await response.json();
    return { response, data };
  } catch (err) {
    return err;
  }
}

export { getProfileListings, getProfileActiveListings };
