function errorHandler(input, errorMsg) {
  input.classList.add('inputError');
  const inputParent = input.parentElement;
  const errorContainer = document.createElement('span');
  errorContainer.classList.add('text-red-700', 'font-bold');
  errorContainer.innerHTML = errorMsg;
  inputParent.append(errorContainer);
}

export default errorHandler;
