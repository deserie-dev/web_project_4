//Show the error element in order to notify the user.
function showInputError(input, inputValidationMessage, form, settingsObject){
    // Find the error message element
    const errorMessage = form.querySelector(`#${input.id}-error`); 
    errorMessage.textContent = input.validationMessage;
    errorMessage.classList.add(settingsObject.errorClass);
    input.classList.add(settingsObject.inputErrorClass);
}

//Hide the error element
function hideInputError(input, form, settingsObject){
    const errorMessage = form.querySelector(`#${input.id}-error`); 
    errorMessage.textContent = ""
    errorMessage.classList.remove(settingsObject.errorClass);
    input.classList.remove(settingsObject.inputErrorClass);
}
// The function takes an array of fields
function hasInvalidInput(inputList) {
    //Iterate over the array using the some() method. Takes an array of form fields and returns true if at least one field is invalid, and returns false if all of them are valid.
    return inputList.some(inputElement => !inputElement.validity.valid)
};
// The function takes an array of input fields and the button element, whose state you need to change
function toggleButtonState(inputList, buttonElement, settingsObject) {
    // If there is at least one invalid input
    if (hasInvalidInput(inputList)) {
      // make the button inactive
      buttonElement.classList.add(settingsObject.inactiveButtonClass);
      buttonElement.disabled = 'disabled';
    } else {
      // otherwise, make it active
      buttonElement.classList.remove(settingsObject.inactiveButtonClass);
      buttonElement.disabled = '';
    }
  };

  //Check if the field is valid, and also calls either showInputError() or hideInputError()
function isValid (input, form, settingsObject){
    if (input.validity.valid) {
        hideInputError(input, form, settingsObject);
      } else {
        showInputError(input, input.ValidationMessage, form, settingsObject);
      }
}


function enableValidation(settingsObject){
    //Find all forms with the specified class in DOM, and make an array from them using the Array.from() method
    const forms = Array.from(document.querySelectorAll(settingsObject.formSelector));
    forms.forEach((form) => {
        form.addEventListener("submit",((evt) =>{
            evt.preventDefault();
        }))
        // Find all fields inside the form, and make an array from them using the Array.from() method   
        const inputs = Array.from(form.querySelectorAll(settingsObject.inputSelector));
        const button = form.querySelector(settingsObject.submitButtonSelector);
        // Iterate over the resulting array
        inputs.forEach((input)=>{
            // add the input event handler to each field
            input.addEventListener("input", () =>{
                // Call the isValid() function inside the callback, and pass the form and the element to be checked to it
                isValid(input, form, settingsObject) 
                toggleButtonState(inputs, button, settingsObject);
            })

        })
    })
}

const settingsObject = {
    formSelector: ".modal__form",
    inputSelector: ".modal__form-control",
    submitButtonSelector: ".modal__form-submit",
    inactiveButtonClass: "modal__form-submit_disabled",
    inputErrorClass: "modal__form-control_error",
    errorClass: "modal__error"
  };

enableValidation(settingsObject);

//Settings objects are a common way of passing multiple recurring parameters to functions in JavaScript.