const profile = document.querySelector(".profile");
const edit = document.querySelector(".profile__edit");
const modal = document.querySelector(".modal");
const form = modal.querySelector(".modal__form");
const openModalButton = document.querySelector(".profile__edit");
const closeForm = modal.querySelector(".modal__close-button");

//Queries to modify content of profileName and profileOccupation// 
const formName = form.querySelector(".modal__form-control_input_name");
const formOccupation = form.querySelector(".modal__form-control_input_occupation");
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation')

function openModal() {
  modal.classList.add("modal_opened");
  formName.value = profileName.textContent;
  formOccupation.value = profileOccupation.textContent;
}

function closeModal(){
  modal.classList.remove("modal_closed");
}

//On click run the function openModal() to open the modal//
edit.addEventListener("click", openModal);
// On click run the function closeModal() to close the modal//
closeForm.addEventListener("click", closeModal);

function saveProfile(){
  profileName.textContent = formName.value;
  profileOccupation.textContent = formOccupation.value;
  closeModal();
  event.preventDefault();
}

form.addEventListener("submit", saveProfile);