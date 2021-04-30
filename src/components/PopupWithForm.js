import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({popupSelector, formSubmit}) {
    super(popupSelector);
    this._formSubmit = formSubmit;
  }

  _getInputValues() {
    this._inputList = this._popupElement.querySelectorAll(".modal__form-control");
    this._formValues = {};

    this._inputList.forEach((input) => (this._formValues[input.name] = input.value));
    
    return this._formValues;
  }

  openModal() {
      super.openModal();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._formSubmit(this._getInputValues());
        this.closeModal();
    });
  }

  closeModal() {
    super.closeModal();
  }
}  

export default PopupWithForm;