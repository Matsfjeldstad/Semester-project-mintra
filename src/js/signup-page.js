// import errorHandler from './components/handlers';

const backButton = document.querySelector('#backButton');

backButton.onclick = function goBack() {
  window.history.back();
};
