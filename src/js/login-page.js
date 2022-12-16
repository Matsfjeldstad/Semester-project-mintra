import formSubmit from './components/formSumbit';

const backButton = document.querySelector('#backButton');

function goBack() {
  window.history.back();
}

backButton.onclick = () => {
  goBack();
};

const loginForm = document.querySelector('#loginForm');

const loginEmail = document.querySelector('#loginEmail');
const loginPassword = document.querySelector('#loginPassword');

loginForm.onsubmit = function submit(Event) {
  Event.preventDefault();
  formSubmit(loginEmail, loginPassword);
};
