class FormValidator {

  constructor(settings, formElement) {

    this._formSelector = settings.formSelector;
    this._inputSelector  = settings._inputSelector;
    this._submitButtonSelector  = settings._submitButtonSelector;
    this._inactiveButtonClass  = settings._inactiveButtonClass;
    this._inputErrorClass  = settings._inputErrorClass;
    this._errorClass  = settings._errorClass;
    this._form = formElement;
  }

  _showInputError(input) {
    // Find the error message element
    const errorMessage = form.querySelector(`#${input.id}-error`); 
    errorMessage.textContent = input.validationMessage;
    errorMessage.classList.add(this._errorClass);
    input.classList.add(this._inputErrorClass);
  }

  _hideInputError(input) {
    const errorMessage = form.querySelector(`#${input.id}-error`); 
    errorMessage.textContent = ""
    errorMessage.classList.remove(this._errorClass);
    input.classList.remove(this._inputErrorClass);
  }

  _hasInvalidInput(inputList) {
    //Iterate over the array using the some() method. Takes an array of form fields and returns true if at least one field is invalid, and returns false if all of them are valid.
    return inputList.some(inputElement => !inputElement.validity.valid)
  }

  _toggleButtonState(buttonElement) {
    // If there is at least one invalid input
    if (this._hasInvalidInput(inputList)) {
      // make the button inactive
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = 'disabled';
    } else {
      // otherwise, make it active
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = '';
    }
  }

  _isValid(input) {
    if (input.validity.valid) {
        this._hideInputError(input);
      } else {
        this._showInputError(input);
      }}

  enableValidation()  {
    
        this._form.addEventListener("submit",((evt) =>{
            evt.preventDefault();
        }))
  
        const inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
        const button = this._form.querySelector(this._submitButtonSelector);
        // Iterate over the resulting array
        inputs.forEach((input)=>{
            // add the input event handler to each field
            input.addEventListener("input", () =>{
                // Call the isValid() function inside the callback, and pass the form and the element to be checked to it
                this._isValid(input) 
                this._toggleButtonState(button);
            })

        })
  }

}

export default FormValidator;