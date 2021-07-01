class FormValidator {

  constructor(settings, formElement) {

    this._formSelector = settings.formSelector;
    this._inputSelector  = settings.inputSelector;
    this._submitButtonSelector  = settings.submitButtonSelector;
    this._inactiveButtonClass  = settings.inactiveButtonClass;
    this._inputErrorClass  = settings.inputErrorClass;
    this._errorClass  = settings.errorClass;
    this._formElement = formElement;
    this._inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._button = this._formElement.querySelector(this._submitButtonSelector);
  }

  _showInputError(input, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass); 
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`); 
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _isValid(input) {
    if (input.validity.valid) {
        this._hideInputError(input);
      } else {
        this._showInputError(input, input.validationMessage);
      }
  }

  _hasInvalidInput(inputs) {
      return inputs.some((input) => {
          return !input.validity.valid;
      });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputs)) {
      this._button.classList.add(this._inactiveButtonClass);
      this._button.disabled = true;
    } else {
      this._button.classList.remove(this._inactiveButtonClass);
      this._button.disabled = false;
    }
  }

  resetValidation() {
        this._toggleButtonState();
        this._inputs.forEach((input) => {
            this._hideInputError(input)
        });
    }

  _setEventListeners() {
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._isValid(input);
        this._toggleButtonState();
      });
    });

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export default FormValidator;