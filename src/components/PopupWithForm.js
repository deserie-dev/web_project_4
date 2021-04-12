import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._formElement = this._popupSelector.querySelector(".modal__form");
    this._inputs = Array.from(this._formElement.querySelectorAll(".modal__form-control"));
  }

  getInputValues() {
        const inputValues = {};
        this._inputs.forEach((input) => {
            const inputName = input.name;
            const inputValue = input.value;
            inputValues[inputName] = inputValue;
        });

        return (inputValues);
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
        super.setEventListeners();
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._formSubmit();
        });
    }
}  

export default PopupWithForm;