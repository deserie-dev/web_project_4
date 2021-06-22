import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, formSubmit }) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popupSelector.querySelector(".modal__form");
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll(".modal__form-control");
    this._formValues = {};

    this._inputList.forEach((input) => (this._formValues[input.name] = input.value));

    return this._formValues;
  }

  // renderLoading(buttonText = "Saving...") {
  //   const saveButton = this._form.querySelector(".modal__form-submit");
  //   saveButton.textContent = buttonText;
  // }

  // setButtonText(buttonText = "Save") {
  //   const saveButton = this._form.querySelector(".modal__form-submit");
  //   saveButton.textContent = buttonText;
  // }


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
    this.setButtonText();
  }

  setSubmitAction(action) {
    this._formSubmit = action;
  }
}

export default PopupWithForm;