import { initialCards } from "./initialcards.js";

//Modals
const profileModal = document.querySelector(".modal_type_edit");
const createForm = document.querySelector(".modal_type_create");
const imageModalWindow = document.querySelector(".modal_type_preview");

//Buttons
const profileEditButton = document.querySelector(".profile__edit");
const addButton = document.querySelector(".profile__add");
const profileCloseButton = profileModal.querySelector(".modal__close-button_profile");
const imageCloseButton = document.querySelector(".modal__close-button_preview");
const placeCloseButton = document.querySelector(".modal__close-button_place");

//Forms
const profileForm = document.querySelector(".modal__form_type_profile");
const addForm = document.querySelector(".addCard-form");

//Form Inputs
const formName = profileForm.querySelector(".modal__form-control_input_name");
const formOccupation = profileForm.querySelector(".modal__form-control_input_occupation");
const formTitle = document.querySelector(".modal__form-control_input_title");
const formImage = document.querySelector(".modal__form-control_input_image");

//Profile Section Info
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");

//Variables for the add new card/place section
const cardTemplate = document.querySelector(".card-template").content.querySelector(".elements__item");

//Elements/cards section in HTML where card template is appended to.
const list = document.querySelector(".elements__container");

////////////////
//Functions
///////////////

//Open modal
function openModal(modalWindow) {
  modalWindow.classList.add("modal_opened");
}

//Close modal
function closeModal(modalWindow) {
  modalWindow.classList.remove("modal_opened");
}

//When edit button clicked, open "Edit Profile" modal. Values for each input field.
profileEditButton.addEventListener("click", function() {
  formName.value = profileName.textContent;
  formOccupation.value = profileOccupation.textContent;
  openModal(profileModal);
});

//Close the modal when the close button is clicked.
profileCloseButton.addEventListener("click", function(){
  closeModal(profileModal)
});

//Update Profile section based on user input then close the popup.
profileForm.addEventListener("submit", function(evt) {
  profileName.textContent = formName.value;
  profileOccupation.textContent = formOccupation.value;
  closeModal(profileModal)
  evt.preventDefault();
})

//Create functionality for the add button
addButton.addEventListener("click", function(evt) {
  createForm.classList.add("modal_opened");  
});

placeCloseButton.addEventListener("click", () => {
  createForm.classList.remove("modal_opened");
});


//Render initial cards using JS
function addNewPlace(cardLink, cardName) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".elements__image");
  const cardTitle = cardElement.querySelector(".elements__title");
  cardTitle.textContent = cardName;
  cardImage.src = cardLink;
  list.prepend(cardElement);  

  const cardLikeButton = cardElement.querySelector(".elements__like");
  cardLikeButton.addEventListener("click", function () {  
    cardLikeButton.classList.add("elements__like_active") 
  });
//Functionality for the trash button
  const cardDeleteButton = cardElement.querySelector(".elements__delete-button");
  cardDeleteButton.addEventListener("click", () => cardElement.remove());
//Preview modal
  const modalImage = document.querySelector(".elements__image");
  modalImage.addEventListener("click", () => {
    imageModalWindow.querySelector(".modal__image").src = cardLink;
    imageModalWindow.querySelector(".modal__image-title").textContent = cardName;
    openModal(imageModalWindow);
  });

  imageCloseButton.addEventListener("click", function() {
    closeModal(imageModalWindow);
  });

  return cardElement;
};

initialCards.forEach(card => {
    addNewPlace(card.link, card.name);
});

//Create new Place Card based on user input
function saveNewPlace() {
  list.prepend(addNewPlace(formImage.value, formTitle.value));
  formImage.value = "";
  formTitle.value = "";
}

addForm.addEventListener("submit", function(evt) {
  closeModal(createForm);
  saveNewPlace();
  evt.preventDefault();
});
