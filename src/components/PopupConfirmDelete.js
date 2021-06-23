import Popup from "./Popup.js";

class PopupConfirmDelete extends Popup {
  constructor({ popupSelector, formSubmit }) {
    super(popupSelector);
    this._button = this._popupSelector.querySelector(".modal__form-submit");
    this._form = this._popupSelector.querySelector(".modal__form");
    this._formSubmit = formSubmit;
  }

  openModal(evt, cardId) {
    super.openModal();
    this._cardId = cardId;
    this._button.textContent = "Yes";
    this._card = evt.target.parentElement;
  }

  // _handleSubmit(evt){
  //   evt.preventDefault();
  //   this._formSubmit(this._cardId, this._card);
  // }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", evt => {
      evt.preventDefault();
      this._button.textContent = "Deleting ...";
      this._formSubmit(this._card, this._cardId);
    });
  }

}

export default PopupConfirmDelete;