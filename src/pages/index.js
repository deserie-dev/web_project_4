import "./index.css";
import initialCards from "../scripts/initialcards.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { openModal, closeModal, } from "../scripts/utils.js";


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

const editForm = document.querySelector(".modal__form_type_profile");
const addNewForm = document.querySelector(".addCard-form");

const editFormValidator = new FormValidator(settings, editForm);

const addNewFormValidator = new FormValidator(settings, addNewForm);

editFormValidator.enableValidation();
addNewFormValidator.enableValidation();

/////////////////////////////////
//// Sprint 8 Functions
/////////////////////////////////


// function to submit profile form and update profile 

function saveNewProfile(evt) {
  profileName.textContent = formName.value;
  profileOccupation.textContent = formOccupation.value;
  closeModal(profileModal)
  evt.preventDefault();
}

// profileForm.addEventListener("submit", function(evt) {
//   profileName.textContent = formName.value;
//   profileOccupation.textContent = formOccupation.value;
//   closeModal(profileModal)
//   evt.preventDefault();
// })

// to submit new Place form and create a new place

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

// create picture popup

const picturePopUp = new PopupWithImage(".modal_type_preview");

picturePopUp.setEventListeners();

// function to open picture on click

function openPopUpOnClick(link, name) {
    picturePopUp.openModal(link, name);
}


const cardList = new Section({
    items: initialCards,
    renderer: (card) => {
        const newCard = new Card(
            card,
            ".card-template",
            openPopUpOnClick
        );
        const newCreatedCard = newCard.createCard();
        cardList.addCard(newCreatedCard);
      },
    },
    ".elements__container"
  );
  
cardList.renderItems();

// instructions to create form popups

const profilePopUp = new PopupWithForm(".modal_type_edit", saveNewProfile);

const newPlacePopUp = new PopupWithForm(".modal_type_create", saveNewPlace);


// set event listeners

profilePopUp.setEventListeners();

newPlacePopUp.setEventListeners();


//////////////////
//Event Handlers
//////////////////

profileEditButton.addEventListener("click", () => openModal(profileModal));

addButton.addEventListener("click", () => openModal(createForm));

profileCloseButton.addEventListener("click", () => closeModal(profileModal));

placeCloseButton.addEventListener("click", () => closeModal(createForm));

imageCloseButton.addEventListener("click", () => closeModal(imageModalWindow));













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

// profileEditButton.addEventListener("click", function() {
//   formName.value = profileName.textContent;
//   formOccupation.value = profileOccupation.textContent;
//   openModal(profileModal);
// });



// initialCards.forEach((card) => {
//     const placeCard = new Card(card, ".card-template");
//     const newPlaceCard = placeCard.generateCard();
//     list.prepend(newPlaceCard);    
// });







export { profileName,profileOccupation };