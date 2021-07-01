class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._escapeToCloseModal = this._escapeToCloseModal.bind(this);
  }

  openModal() {
        this._popup.classList.add("modal_opened");
        document.addEventListener("keydown", this._escapeToCloseModal);
    }

    closeModal() {
        this._popup.classList.remove("modal_opened");
        document.removeEventListener("keydown", this._escapeToCloseModal);
    }

    _escapeToCloseModal(evt) {
        if (evt.key === "Escape") {
            this.closeModal();
        }
    }

    setEventListeners() {
        const closeButton = this._popup.querySelector(".modal__close-button");
        closeButton.addEventListener("click", () => {
            this.closeModal();
        });

        this._popup.addEventListener("click", (evt) => {
            if (evt.target.classList.contains("modal")) {
            this.closeModal();
            }
        });
    }
}

export default Popup;

