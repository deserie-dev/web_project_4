import initialCards from "../scripts/initialcards.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { openModal, closeModal, } from "../scripts/utils.js";
import "./index.css";

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

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-control",
  submitButtonSelector: ".modal__form-submit",
  inactiveButtonClass: "modal__form-submit_disabled",
  inputErrorClass: "modal__form-control_error",
  errorClass: "modal__error"
};

////////////////
//Functions
///////////////

modalOverlays.forEach(modal => {
  modal.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});

profileEditButton.addEventListener("click", function() {
  formName.value = profileName.textContent;
  formOccupation.value = profileOccupation.textContent;
  openModal(profileModal);
});

profileForm.addEventListener("submit", function(evt) {
  profileName.textContent = formName.value;
  profileOccupation.textContent = formOccupation.value;
  closeModal(profileModal)
  evt.preventDefault();
})

initialCards.forEach((card) => {
    const placeCard = new Card(card, ".card-template");
    const newPlaceCard = placeCard.generateCard();
    list.prepend(newPlaceCard);    
});

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

const editForm = document.querySelector(".modal__form_type_profile");
const addNewForm = document.querySelector(".addCard-form");

const editFormValidator = new FormValidator(settings, editForm);

const addNewFormValidator = new FormValidator(settings, addNewForm);

editFormValidator.enableValidation();
addNewFormValidator.enableValidation();

export { profileName,profileOccupation };