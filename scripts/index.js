import initialCards from "./initialcards.js";
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import { openModal, closeModal, escapeToCloseModal } from "./utils.js";

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

//Image Preview modal
const imagePreviewModal = imageModalWindow.querySelector(".modal__image");
const imagePreviewModalText = imageModalWindow.querySelector(".modal__image-title");

//Elements/cards section in HTML where card template is appended to.
const list = document.querySelector(".elements__container");

//Variable for modal overlays. Used with forEach method to enable users to close modals by clicking anywhere outside a modal
const modalOverlays = Array.from(document.getElementsByClassName("modal"));

///////////////////
//FormValidator
///////////////////

const defaultConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible"
};

const editFormValidator = new FormValidator(defaultConfig, profileForm);

const addFormValidator = new FormValidator(defaultConfig, addForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

////////////////
//Functions
///////////////

//Render initial cards using JS
function addNewPlace(cardLink, cardName) {
  const cardElement = cardTemplate.cloneNode(true);

  const modalImage = cardElement.querySelector(".elements__image");
  const cardImage = cardElement.querySelector(".elements__image");
  const cardTitle = cardElement.querySelector(".elements__title");
  cardTitle.textContent = cardName;
  cardImage.src = cardLink;
  cardImage.alt = cardName
    
//Functionality for the like button
  // const cardLikeButton = cardElement.querySelector(".elements__like");
  // cardLikeButton.addEventListener("click", likeButtonEnabled);
//Functionality for the trash button
  // const cardDeleteButton = cardElement.querySelector(".elements__delete-button");
  // cardDeleteButton.addEventListener("click", () => cardElement.remove());

//Preview modal  
  modalImage.addEventListener("click", () => {
    imagePreviewModal.src = cardLink;
    imagePreviewModal.alt = cardName;
    imagePreviewModalText.textContent = cardName;
    openModal(imageModalWindow);
  });

  return cardElement;
};

//Open a modal
// function openModal(modalWindow) {
//   modalWindow.classList.add("modal_opened");
//  document.addEventListener("keydown", escapeToCloseModal);
// }

//Close a modal
// function closeModal(modalWindow) {
//   modalWindow.classList.remove("modal_opened");
//   document.removeEventListener("keydown", escapeToCloseModal);
// }

// Allow users to close the modal by pressing the Esc key
// function escapeToCloseModal(evt) {
//     const modals = document.querySelector(".modal_opened");
//     if (evt.key === "Escape") {
//       closeModal(modals);
//     }
//   }

// Allow users to close modals by clicking on the overlay, i.e. anywhere outside the modal's borders:
modalOverlays.forEach(modal => {
  modal.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});


//When the button is clicked, the target property gets the button element
// function likeButtonEnabled (evt) {
//   evt.target.classList.toggle("elements__like_active"); 
// }

//When edit button clicked, open "Edit Profile" modal. Values for each input field.
profileEditButton.addEventListener("click", function() {
  formName.value = profileName.textContent;
  formOccupation.value = profileOccupation.textContent;
  openModal(profileModal);
});

//Update Profile section based on user input then close the popup.
profileForm.addEventListener("submit", function(evt) {
  profileName.textContent = formName.value;
  profileOccupation.textContent = formOccupation.value;
  closeModal(profileModal)
  evt.preventDefault();
})

// Code responsible for the initial display of the cards.

initialCards.forEach((card) => {
    const placeCard = new Card(card, ".card-template");
    const newPlaceCard = placeCard.generateCard();
    list.prepend(newPlaceCard);    
});

//Create new Place Card based on user input
function saveNewPlace(evt) {
  evt.preventDefault();
  const newPlace = {};
  newPlace.name = formTitle.value;
  newPlace.link = formImage.value;
  const addNewPlace = new Card(newPlace, ".card-template");
  const createNewPlaceCard = addNewPlace.generateCard();
  list.prepend(createNewPlaceCard);
  closeModal(createForm);
}

//////////////////
//Event Handlers
//////////////////

addForm.addEventListener("submit", saveNewPlace);

addButton.addEventListener("click", () => openModal(createForm));

profileCloseButton.addEventListener("click", () => closeModal(profileModal));

placeCloseButton.addEventListener("click", () => closeModal(createForm));

imageCloseButton.addEventListener("click", () => closeModal(imageModalWindow));