import {
  emailValidation, passwordValidation,
} from './formValidation';

import loginUser from './login-Function';

const errorField = document.querySelector('.responseErrorField');
export default function formSubmit(loginEmailInput, loginPasswordInput, redirectLink = '/') {
  const emailCheck = emailValidation(loginEmailInput);
  const passwordCheck = passwordValidation(loginPasswordInput);
  if (emailCheck && passwordCheck) {
    const formBody = {
      email: loginEmailInput.value.trim(),
      password: loginPasswordInput.value.trim(),
    };
    loginUser(formBody, errorField, redirectLink);
  }
}
