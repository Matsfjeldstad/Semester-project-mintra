import { singleProfileURL } from '../api/endpoints';

async function getProfile() {
  const userObject = JSON.parse(localStorage.getItem('user'));
  try {
    const response = await fetch(singleProfileURL(userObject.name), {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userObject.accessToken}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      const { errors } = data;
      console.log(data);
      return errors;
    }
    console.log(response);
    return response;
  } catch (err) {
    return err;
  }
}

export default getProfile;
