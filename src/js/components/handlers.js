export function errorHandler(input, errorMsg) {
  input.classList.add('inputError');
  const inputParent = input.parentElement;
  const errorContainer = inputParent.querySelector('.errorContainer');
  errorContainer.classList.add('text-red-700', 'font-bold');
  errorContainer.innerHTML = errorMsg;
}

export function removeHandler(input) {
  const inputParent = input.parentElement;
  inputParent.querySelector('.errorContainer').innerHTML = '';
  input.classList.remove('inputError');
}
// export default { errorHandler, removeHandler };
