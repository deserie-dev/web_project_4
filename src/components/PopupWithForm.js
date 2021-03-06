import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, formSubmit }) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popup.querySelector(".modal__form");
    this._saveButton = this._popup.querySelector(".modal__form-submit");
    this._buttonText = this._saveButton.textContent;
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll(".modal__form-control");
    this._formValues = {};

    this._inputList.forEach((input) => (this._formValues[input.name] = input.value));

    return this._formValues;
  }


  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._saveButton.textContent = "Saving...";
      this._formSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  closeModal() {
    this._saveButton.textContent = this._buttonText;
    this._form.reset();
    super.closeModal();
  }

  setSubmitAction(action) {
    this._formSubmit = action;
  }
}

export default PopupWithForm;