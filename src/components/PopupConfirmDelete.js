import Popup from "./Popup.js";

class PopupConfirmDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._button = this._popupSelector.querySelector(".form__submit");
  }

  deleteConfirmation(confirm) {
    this._confirm = confirm;
  }

  openModal() {
    this._modaldelete = this._popupSelector.querySelector(".elements__delete-button");

    super.openModal();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._confirm();
    })
  }

}

export default PopupConfirmDelete;