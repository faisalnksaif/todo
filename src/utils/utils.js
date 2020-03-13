export const validateInput = (element, formElements = null) => {
  const rules = element.validations;
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (rules.required && element.value.trim() === "") {
    return `${element.name} is required`;
  } else if (rules.minLength && element.value.trim().length < 6) {
    return `Minimum 6 characters is required`;
  } else if (
    rules.email &&
    !emailRegex.test(String(element.value).toLowerCase())
  ) {
    return "Email is not valid";
  }

  //Confirm Password & Password equal check
  if (element.name === "Confirm Password" && formElements) {
    const passwordElement = formElements.find(
      formElement => formElement.name === "Password"
    );
    return passwordElement.value !== element.value
      ? "Password not matching"
      : "";
  }
  return "";
};

export const inputChangeHandler = (input, elementForUpdate, state) => {
  const elements = [...state];
  const indexOfElementToUpdate = elements.findIndex(
    element => element.name === elementForUpdate.name
  );
  elements[indexOfElementToUpdate].value = input;
  elements[indexOfElementToUpdate].errorMessage = validateInput(
    elements[indexOfElementToUpdate],
    state
  );

  return elements;
};

export const validateForm = formElements => {
  formElements.forEach(element => {
    element.errorMessage = validateInput(element);
  });

  return formElements;
};

export const isFormValid = formElements => {
  const errorIndex = formElements.findIndex(element => element.errorMessage);
  return errorIndex < 0 ? true : false;
};
