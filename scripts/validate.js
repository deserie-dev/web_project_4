function showErrorMessage(input, errorClass, inputErrorClass) {
    const errorMessage = document.querySelector("#" + input.id + "-error");
    errorMessage.textContent = input.validationMessage;
    errorMessage.classList.add(errorClass);
    input.classList.add(inputErrorClass);
}

function hideErrorMesssage(input, errorClass, inputErrorClass) {
  const errorMessage = document.querySelector("#" + input.id + "-error");
  errorMessage.textContent = "";
  errorMessage.classList.remove(errorClass);
  input.classList.remove(inputErrorClass);
}

function isValid(input, errorClass, inputErrorClass) {
    if (input.validity.valid) {
        hideErrorMessage(input, errorClass, inputErrorClass);
    } else {
        showErrorMessage(input, errorClass, inputErrorClass);
    }
}

function toggleSubmitButton(inputs, submitButton, inactiveButtonClass) {
  const isValid = inputs.every(function (input) {
      return input.validity.valid;
  });
  if (isValid) {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = "disabled";
  } else {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = "";
  }
}

function enableValidation({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
}) {
    const forms = Array.from(document.querySelectorAll(formSelector));

    forms.forEach(function (form) {
        form.addEventListener("submit", function (evt) {
            evt.preventDefault();
            // button.classList.add(inactiveButtonClass);
        });

        const inputs = Array.from(form.querySelectorAll(inputSelector));
        const button = form.querySelector(submitButtonSelector);

        inputs.forEach(function (input) {
            input.addEventListener("input", function () {
                isValid(input, errorClass, inputErrorClass);
                toggleSubmitButton(inputs, button, inactiveButtonClass);
            });
        });
    });
}

enableValidation({
    formSelector: ".modal__form",
    inputSelector: ".modal__form-control",
    submitButtonSelector: ".modal__form-submit",
    inactiveButtonClass: "modal__form-submit_disabled",
    inputErrorClass: "modal__form-control_error",
    errorClass: "modal__error"
});