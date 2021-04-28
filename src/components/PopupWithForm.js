import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popupSelector.querySelector(".modal__form");
  }

  // renderLoading(isLoading){
  //   this._saveButton = this._form.querySelector(".save-btn")
  //   const buttonText = this._saveButton.textContent;
  //   if(isLoading){
  //     buttonText = "Saving...";
  //   } else {
  //     buttonText = "Save";
  //   }
  // }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll(".modal__form-control");
    this._formValues = {};

    this._inputList.forEach((input) => (this._formValues[input.name] = input.value));
    
    return this._formValues;
  }

  openModal() {
      super.openModal();
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._formSubmit(this._getInputValues());
        this.closeModal();
    });

    super.setEventListeners();
  }

  closeModal() {
    super.closeModal();
  }
}  

export default PopupWithForm;