import { errorHandler, removeHandler } from './handlers';

function emailValidation(emailInput) {
  const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(stud.noroff.no|noroff.no)$/;
  if (!emailInput.value) {
    errorHandler(emailInput, 'This field is required');
    return false;
  }
  if (!emailInput.value.match(regEx)) {
    errorHandler(emailInput, 'Your email needs to be a @noroff.no or @stud.noroff.no email.');
    return false;
  }
  if (emailInput.classList.contains('inputError')) {
    removeHandler(emailInput);
    return true;
  }
  return true;
}

function passwordValidation(passwordInput) {
  const passwordValue = passwordInput.value;
  if (!passwordValue.trim()) {
    errorHandler(passwordInput, 'This field is required');
    return false;
  }
  if (passwordValue.trim().length < 8) {
    errorHandler(passwordInput, 'Password needs to be atleast 8 characters ');
    return false;
  }
  if (passwordValue.trim() && passwordInput.classList.contains('inputError')) {
    removeHandler(passwordInput);
  }
  return true;
}
function nameValidation(nameInput) {
  const re = /^\w+$/;
  const nameValue = nameInput.value;
  if (!nameValue.trim()) {
    errorHandler(nameInput, 'This field is required');
    return false;
  }
  if (!nameValue.match(re)) {
    errorHandler(nameInput, 'Must not contain spaces or special characters except " _ "');
    return false;
  }
  if (nameValue.trim() && nameValue.match(re) && nameInput.classList.contains('inputError')) {
    removeHandler(nameInput);
  }
  return true;
}

function confirmPasswordValidation(passwordInput, confirmPasswordInput) {
  const passwordValue = passwordInput.value;
  const confirmPasswordValue = confirmPasswordInput.value;
  if (!confirmPasswordValue.trim()) {
    errorHandler(confirmPasswordInput, 'This field is required');
    return false;
  }
  if (confirmPasswordValue !== passwordValue) {
    errorHandler(confirmPasswordInput, 'Passwords do not match');
    return false;
  }
  if (confirmPasswordValue === passwordValue && confirmPasswordValue.trim()) {
    if (confirmPasswordInput.classList.contains('inputError')) {
      removeHandler(confirmPasswordInput);
    }
  }
  return true;
}

// function postValidation(title, body, errorContainer) {
//   const titleValue = '';
//   let postBodyValue = '';
//   const postData = {
//     title: titleValue,
//     body: postBodyValue,
//   };
//   if (!title.value.trim()) {
//     errorContainer.classList.remove('hidden');
//     errorContainer.innerHTML = 'Title is required';
//   } else if (!body.value.trim()) {
//     errorContainer.classList.remove('hidden');
//     errorContainer.innerHTML = 'Post content is required';
//   } else {
//     errorContainer.classList.add('hidden');
//     errorContainer.innerHTML = '';
//     postBodyValue = body.value.trim();
//   }
//   if (!body.value.trim() && !title.value.trim()) {
//     errorContainer.classList.remove('hidden');
//     errorContainer.innerHTML = 'Title and Post content is required';
//   }
//   if (body.value.trim() && title.value.trim()) {
//     postData.title = title.value.trim();
//     postData.body = body.value.trim();
//     return postData;
//   }
// }

export {
  emailValidation, passwordValidation, confirmPasswordValidation, nameValidation,
};
