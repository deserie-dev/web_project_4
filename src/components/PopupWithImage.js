import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  openModal(name, link) {
    this._modalPicture = this._popupSelector.querySelector(".modal__image");
    this._modalCaption = this._popupSelector.querySelector(".modal__image-title");
    this._modalPicture.src = link;
    this._modalPicture.alt = name;
    this._modalCaption.textContent = name;

    super.openModal();
  }
}

export default PopupWithImage;
