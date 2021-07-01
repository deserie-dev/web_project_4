class FormValidator {

  constructor(settings, formElement) {

    this._formSelector = settings.formSelector;
    this._inputSelector  = settings.inputSelector;
    this._submitButtonSelector  = settings.submitButtonSelector;
    this._inactiveButtonClass  = settings.inactiveButtonClass;
    this._inputErrorClass  = settings.inputErrorClass;
    this._errorClass  = settings.errorClass;
    this._formElement = formElement;
  }

  _showInputError(input) {
    const errorMessage = this._formElement.querySelector(`#${input.id}-error`); 
    errorMessage.textContent = input.validationMessage;
    errorMessage.classList.add(this._errorClass);
    input.classList.add(this._inputErrorClass);
  }

  _hideInputError(input) {
    const errorMessage = this._formElement.querySelector(`#${input.id}-error`); 
    errorMessage.textContent = ""
    errorMessage.classList.remove(this._errorClass);
    input.classList.remove(this._inputErrorClass);
  }

  _isValid(input) {
    if (input.validity.valid) {
        this._hideInputError(input);
      } else {
        this._showInputError(input, input.validationMessage);
      }
  }

  _toggleButtonState(inputs, button) {
    const valid = inputs.every((input) => {
      return input.validity.valid;
    });
    if (valid) {
      button.classList.remove(this._inactiveButtonClass);
      button.disabled = false;
    } else {
      button.classList.add(this._inactiveButtonClass);
      button.disabled = true;
    }
  }

  resetValidation() {
        this._toggleButtonState();
        this._inputs.forEach((input) => {
            this._hideInputError(input)
        });
    }

  _setEventListeners() {
    const inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const button = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState(inputs, button);
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._isValid(input);
        this._toggleButtonState(inputs, button);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    this._setEventListeners();
  }
}

export default FormValidator;