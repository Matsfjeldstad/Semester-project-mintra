import { loginURL } from '../api/endpoints';

async function loginUser(loginUserData, errorField, redirectLink = '/') {
  try {
    const response = await fetch(loginURL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(loginUserData),
    });
    const data = await response.json();
    if (!response.ok) {
      if (errorField) {
        const errorContainer = errorField;
        errorContainer.classList.remove('opacity-0');
        errorContainer.classList.add('opacity-1');
        errorContainer.innerHTML = data.errors[0].message
          ? data.errors[0].message : data.errors.status;
      }
    } else {
      localStorage.setItem('user', JSON.stringify(data));
      window.location.href = redirectLink;
    }
  } catch (e) {
    console.log(e);
    const errorContainer = errorField;
    errorContainer.classList.remove('opacity-0');
    errorContainer.classList.add('opacity-1');
    errorContainer.innerHTML = e;
  }
}

export default loginUser;
