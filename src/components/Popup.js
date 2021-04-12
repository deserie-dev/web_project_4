class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._closeBtn = document.querySelector(".modal__close-button");
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

        this._popupSelector.addEventListener("click", (evt) => {
            if (evt.target.classList.contains("modal")) {
            this.closeModal();
            }
        });
    }
}

export default Popup;