import { loginURL } from '../endpoints';

async function loginUser(loginUserData) {
  try {
    const response = await fetch(loginURL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(loginUserData),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(data));
    }
  } catch (e) {
    console.log(e);
  }
}

export default { loginUser };
