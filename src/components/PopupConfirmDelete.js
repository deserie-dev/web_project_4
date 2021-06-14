import Popup from "./Popup.js";

class PopupConfirmDelete extends Popup {
  constructor({popupSelector, popupConfirmation}) {
    super(popupSelector);
    this._popupConfirmation = popupConfirmation;
    this.deletePermission();
  }

  deletePermission() {
    const deleteConfirmation = document.querySelector(
      ".modal__close-button_delete"
    );
    deleteConfirmation.addEventListener("click", this._popupConfirmation);
  }
}  

export default PopupConfirmDelete;