import {
  emailValidation, passwordValidation,
} from './components/formValidation';
import loginUser from './components/login-Function';

const backButton = document.querySelector('#backButton');

backButton.onclick = function goBack() {
  window.history.back();
};

const loginForm = document.querySelector('#loginForm');

const loginEmail = document.querySelector('#loginEmail');
const loginPassword = document.querySelector('#loginPassword');
const errorField = document.querySelector('.responseErrorField');

loginForm.onsubmit = function submit(Event) {
  Event.preventDefault();
  const emailCheck = emailValidation(loginEmail);
  const passwordCheck = passwordValidation(loginPassword);
  if (emailCheck && passwordCheck) {
    console.log(true);
    const formBody = {
      email: loginEmail.value.trim(),
      password: loginPassword.value.trim(),
    };
    loginUser(formBody, errorField);
  }
};
