import formSubmit from './formSumbit';

const modal = document.createElement('div');
modal.className = 'w-screen h-screen fixed top-0 left-0 bg-[#FBFAFA] z-[1000]';

const modalInner = document.createElement('div');
modalInner.className = 'inner p-4 h-full';
const closeModal = document.createElement('button');
closeModal.id = 'closeModal';
closeModal.className = 'duration-150 bg-black w-10 h-10 rounded-full text-white flex justify-center items-center hover:scale-105';
closeModal.innerHTML = `
<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-3 h-3">
<path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="white"/>
</svg> 
`;
const modalFormContainer = document.createElement('div');
modalFormContainer.className = 'p-6 h-full w-full flex justify-center';
modalFormContainer.innerHTML = `
<div class="h-full w-full flex flex-col justify-center items-center gap-4">
  <div class="flex flex-col items-center text-3xl">Welcome to <span class="font-poppins text-18 font-extrabold text-[#E1CC0B] text-6xl">MINTRA</span></div>
  <form id="loginForm" action="" class="flex flex-col gap-4 w-full max-w-md">
    <div class="flex flex-col">
      <label for="loginEmail" class="font-bold">Your Email</label>
      <input id="loginEmail" type="text" class="form-input" placeholder="Your Email">
      <label for="loginEmail" class="errorContainer"></label>
    </div>
    <div class="flex flex-col">
      <label for="loginPassword" class="font-bold">Your Password</label>
      <input id="loginPassword" type="password" class="form-input" placeholder="Your password">
      <label for="loginPassword" class="errorContainer"></label>
    </div>
    <span class="responseErrorField duration-300 p-4 bg-red-300 text-red-900 opacity-0"></span>
    <button class="btn"> Login </button>
  </form>
  <div>Don’t have an account?<a href="./signup.html" class="font-bold underline">Sign Up!</a></div>
</div>`;
modalInner.append(closeModal, modalFormContainer);
modal.append(modalInner);
const modalForm = modalFormContainer.querySelector('form');
const loginEmail = modalForm.querySelector('#loginEmail');
const loginPassword = modalForm.querySelector('#loginPassword');

closeModal.onclick = function close() {
  modal.remove();
};

function loginModal(link = '') {
  const body = document.querySelector('body');
  body.prepend(modal);
  console.log(loginEmail);
  modalForm.onsubmit = function modalSumbit(event) {
    event.preventDefault();
    formSubmit(loginEmail, loginPassword, link);
  };
}

export default loginModal;
