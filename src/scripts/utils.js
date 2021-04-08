export const imageModal = document.querySelector(".modal_type_preview");
export const modalImage = imageModal.querySelector(".modal__image");
export const modalImageCaption = imageModal.querySelector(".modal__image-title");

//Open a modal
export function openModal(modalWindow) {
  modalWindow.classList.add("modal_opened");
 document.addEventListener("keydown", escapeToCloseModal);
 disableButton(modalWindow);
}

function disableButton() {
  const button = document.querySelector(".modal__form-submit");
  button.classList.add("modal__form-submit_disabled");
  button.disabled = true;
}

//Close a modal
export function closeModal(modalWindow) {
  modalWindow.classList.remove("modal_opened");
  document.removeEventListener("keydown", escapeToCloseModal);
}

// Allow users to close the modal by pressing the Esc key
export function escapeToCloseModal(evt) {
    const modals = document.querySelector(".modal_opened");
    if (evt.key === "Escape") {
      closeModal(modals);
    }
  }