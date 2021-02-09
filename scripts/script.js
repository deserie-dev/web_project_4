const modal = document.querySelector(".modal");
const edit = document.querySelector(".profile__edit");
const form = document.querySelector(".modal__form");
const closeForm = modal.querySelector(".modal__close-button");

const formName = form.querySelector(".modal__form-control_input_name");
const formOccupation = form.querySelector(".modal__form-control_input_occupation");
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");

function openModal() {
  modal.classList.add("modal_opened");
  formName.value = profileName.textContent;
  formOccupation.value = profileOccupation.textContent;
}

function closeModal() {
  modal.classList.remove("modal_opened");
}

edit.addEventListener("click", openModal);
closeForm.addEventListener("click", closeModal);

function saveProfile() {
  profileName.textContent = formName.value;
  profileOccupation.textContent = formOccupation.value;
  closeModal();
  event.preventDefault();
}

form.addEventListener("submit", saveProfile);