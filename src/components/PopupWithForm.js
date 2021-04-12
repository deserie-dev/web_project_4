import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({popupSelector, formSubmit}) {
    super(popupSelector);
    this._formSubmit = formSubmit;
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll(".modal__form-control");
    this._formValues = {};

    this._inputList.forEach((input) => (this._formValues[input.name] = input.value));

    return this._formValues;
  }

    resetInputValues() {
        this._inputs.forEach((input) => {
            input.value = "";
        });
    }

    openModal() {
        this.getInputValues();
        super.openModal();
    }

    setEventListeners() {
        this._form = document.querySelector(".modal__form");
        this._form.addEventListener("submit", () => {
            this._formSubmit(this._getInputValues);
        });
        super.setEventListeners();

    }
}  

export default PopupWithForm;