import {
  confirmPasswordValidation, emailValidation, nameValidation, passwordValidation,
} from './components/formValidation';
import signUpUser from './components/signup-function';

const backButton = document.querySelector('#backButton');

backButton.onclick = function goBack() {
  window.history.back();
};

const signupForm = document.querySelector('#signupForm');

const signupEmail = document.querySelector('#signupEmail');
const signupPassword = document.querySelector('#signupPassword');
const signupConfirmPassword = document.querySelector('#repeatPassword');
const signupName = document.querySelector('#signupName');
const errorField = document.querySelector('.responseErrorField');

signupForm.onsubmit = function submit(Event) {
  Event.preventDefault();
  const nameCheck = nameValidation(signupName);
  const emailCheck = emailValidation(signupEmail);
  const passwordCheck = passwordValidation(signupPassword);
  const confirmPasswordCheck = confirmPasswordValidation(signupPassword, signupConfirmPassword);
  if (nameCheck && emailCheck && passwordCheck && confirmPasswordCheck) {
    const formBody = {
      name: signupName.value.trim(),
      email: signupEmail.value.trim(),
      password: signupPassword.value.trim(),
    };
    signUpUser(formBody, errorField);
  }
};
