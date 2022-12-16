import { signupURL } from '../api/endpoints';
import loginUser from './login-Function';

async function signUpUser(signUpUserData, errorField) {
  try {
    const response = await fetch(signupURL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(signUpUserData),
    });
    const data = await response.json();
    if (!response.ok) {
      const errorContainer = errorField;
      errorContainer.classList.remove('opacity-0');
      errorContainer.classList.add('opacity-1');
      errorContainer.innerHTML = data.errors[0].message
        ? data.errors[0].message : data.errors.status;
    } else {
      const loginBody = {
        email: signUpUserData.email,
        password: signUpUserData.password,
      };
      loginUser(loginBody, '', 'dashboard/add-profile-pic.html');
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}

export default signUpUser;
