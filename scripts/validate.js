//Show the error element in order to notify the user.
function showInputError(input, inputValidationMessage, form, settingObject){
    //// Find the error message element
    const error = form.querySelector(`#${input.id}-error`); 
    error.textContent = input.validationMessage;
    error.classList.add(settingObject.errorClass);
    input.classList.add(settingObject.inputErrorClass);
}

//Hide the error element
function hideInputError(input, form, settingObject){
    const error = form.querySelector(`#${input.id}-error`); 
    error.textContent = ""
    error.classList.remove(settingObject.errorClass);
    input.classList.remove(settingObject.inputErrorClass);
}
// The function takes an array of fields
function hasInvalidInput(inputList) {
    //Iterate over the array using the some() method. Takes an array of form fields and returns true if at least one field is invalid, and returns false if all of them are valid.
    return inputList.some(inputElement => !inputElement.validity.valid)
};
// The function takes an array of input fields and the button element, whose state you need to change
function toggleButtonState(inputList, buttonElement, settingObject) {
    // If there is at least one invalid input
    if (hasInvalidInput(inputList)) {
      // make the button inactive
      buttonElement.classList.add(settingObject.inactiveButtonClass);
      buttonElement.disabled = 'disabled';
    } else {
      // otherwise, make it active
      buttonElement.classList.remove(settingObject.inactiveButtonClass);
      buttonElement.disabled = '';
    }
  };

  //Check if the field is valid, and also calls either showInputError() or hideInputError()
function isValid (input, form, settingObject){
    if (input.validity.valid) {
        hideInputError(input, form, settingObject);
      } else {
        showInputError(input, input.ValidationMessage, form, settingObject);
      }
}


function enableValidation(settingObject){
    //Find all forms with the specified class in DOM, and make an array from them using the Array.from() method
    const forms = Array.from(document.querySelectorAll(settingObject.formSelector));
    forms.forEach((form) => {
        form.addEventListener("submit",((evt) =>{
            evt.preventDefault();
        }))
        // Find all fields inside the form, and make an array from them using the Array.from() method   
        const inputs = Array.from(form.querySelectorAll(settingObject.inputSelector));
        const button = form.querySelector(settingObject.submitButtonSelector);
        // Iterate over the resulting array
        inputs.forEach((input)=>{
            // add the input event handler to each field
            input.addEventListener("input", () =>{
                // Call the isValid() function inside the callback, and pass the form and the element to be checked to it
                isValid(input, form, settingObject) 
                toggleButtonState(inputs, button, settingObject);
            })

        })
    })
}

const settingObject = {
    formSelector: ".modal__form",
    inputSelector: ".modal__form-control",
    submitButtonSelector: ".modal__form-submit",
    inactiveButtonClass: "modal__form-submit_disabled",
    inputErrorClass: "modal__form-control_error",
    errorClass: "modal__error"
  };

enableValidation(settingObject);