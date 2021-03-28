class FormValidator {

  constructor(settings, formElement) {

    this._formSelector = settings.formSelector;
    this._inputSelector  = settings.inputSelector;
    this._submitButtonSelector  = settings.submitButtonSelector;
    this._inactiveButtonClass  = settings.inactiveButtonClass;
    this._inputErrorClass  = settings.inputErrorClass;
    this._errorClass  = settings.errorClass;
    this._form = formElement;
  }

  _showInputError(input) {
    const errorMessage = document.querySelector(`#${input.id}-error`); 
    errorMessage.textContent = input.validationMessage;
    errorMessage.classList.add(this._errorClass);
    input.classList.add(this._inputErrorClass);
  }

  _hideInputError(input) {
    const errorMessage = document.querySelector(`#${input.id}-error`); 
    errorMessage.textContent = ""
    errorMessage.classList.remove(this._errorClass);
    input.classList.remove(this._inputErrorClass);
  }

  _isValid(input) {
    if (input.validity.valid) {
        this._hideInputError(input);
      } else {
        this._showInputError(input);
      }
  }

  _hasInvalidInput(inputs) {
    return inputs.every(input => {
      return input.validity.valid;
    });
  }

  _toggleButtonState(inputs, button) {
    if (this._hasInvalidInput(inputs)) {
      button.classList.add(this._inactiveButtonClass);
      button.disabled = true;
    } else {
      button.classList.remove(this._inactiveButtonClass);
      bu.disabled = false;
    }     
}

  _setEventListeners() {
    const inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    const button = this._form.querySelector(this._submitButtonSelector);
    // this._toggleButtonState(button, inputs);

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._isValid(input);
        this._toggleButtonState(button, inputs);
      });
    });
  }

  enableValidation() {
    const button = this._form.querySelector(this._submitButtonSelector);

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      button.classList.add(this._inactiveButtonClass);
    });

    this._setEventListeners();
  }
}

export default FormValidator;