const validator = (inputValidation, input) => {
  inputValidation.hasError = !input.validity.valid ? true : false;
  inputValidation.showError = inputValidation.hasError ? true : false;
  inputValidation.errorMessage = input.validationMessage;
  return inputValidation;
};

export default validator;
