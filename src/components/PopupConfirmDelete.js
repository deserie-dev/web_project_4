import Popup from "./Popup.js"

class PopupConfirmDelete extends Popup {
  constructor(popupSelector, formSubmit, card, cardId){
    super(popupSelector)
    this._formSubmit = formSubmit; 
    this._card = card;
    this._cardId = cardId;
  }

  openModal(cardId, card) {
    super.openModal();
    this._cardId = cardId;
    this._card = card;
  }

  closeModal(){
    super.closeModal();
  }

  _handleSubmit(evt){
    evt.preventDefault();
    this._formSubmit(this._id, this._card);
  }

  _closeEnter(evt){
    if (evt.key === "Enter") {
      this._handleSubmit(evt);
    }
  }

  _escapeToCloseModal(evt) {
        if (evt.key === "Escape") {
            this.closeModal();
        }
    }

  setEventListeners(){
    super.setEventListeners();
    this._form = this._popupSelector.querySelector(".modal__form");
    this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._handleSubmit(evt);
        this.closeModal();
    });
  }
}

export default PopupConfirmDelete;
