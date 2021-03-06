import Popup from "./Popup.js";

class PopupConfirmDelete extends Popup {
  constructor({ popupSelector, formSubmit }) {
    super(popupSelector);
    this._form = this._popup.querySelector(".modal__form");
    this._formSubmit = formSubmit;
  }

  openModal(evt, cardId) {
    super.openModal();
    this._cardId = cardId;
    this._card = evt.target.parentElement;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", evt => {
      evt.preventDefault();
      this._formSubmit(this._card, this._cardId);
    });
  }

}

export default PopupConfirmDelete;