class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._closeBtn = this._popupSelector.querySelector(".modal__close-button");
    // this._overlay = Array.from(document.getElementsByClassName("modal"));
    this._escapeToCloseModal = this._escapeToCloseModal.bind(this);
  }

  openModal() {
        this._popupSelector.classList.add("modal_opened");
        document.addEventListener("keydown", this._escapeToCloseModal);
    }

    closeModal() {
        this._popupSelector.classList.remove("modal_opened");
        document.removeEventListener("keydown", this._escapeToCloseModal);
    }

    _escapeToCloseModal(evt) {
        if (evt.key === "Escape") {
            this.closeModal();
        }
    }

    setEventListeners() {
        this._closeBtn.addEventListener("click", () => {
            this.closeModal();
        });
        // this._overlay.addEventListener("click", () => {
        //     this.closeModal();
        // });
    }
}

export default Popup;