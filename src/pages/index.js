import "./index.css";
import initialCards from "../scripts/initialcards.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";


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

//New Place Info
const placeTitle = document.querySelector(".placeTitle");
const placeLink = document.querySelector(".placeLink");

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

///////////
//API
///////////
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-10",
  headers: {
    authorization: "3e6a2d00-5fce-4033-96ec-e7320045c084",
    "Content-Type": "application/json"
  }
});

//Render Initial cards

api.getInitialCards()
.then(res => {
  const createCard = cardData => {
  const newCard = new Card({
    cardData, 
    handleCardClick: () => {
    imagePopup.openModal(cardData.name, cardData.link);
  },
  handleDeleteClick: (cardId) => {
    api.removeCard(cardId)
  }
});

    const cardElement = newCard.generateCard();

    return cardElement;

}

const cards = new Section (
  {
    items: res,
    renderer: (cardData) => {
      cards.addItem(createCard(cardData));
    },
  },
  ".elements__container",
);
cards.renderer();
})

//Get User Info

const profileInfo = new UserInfo({
  name:".profile__name",
  occupation: ".profile__occupation"
});

api.getUserInfo()
.then(res => {
  profileInfo.setUserInfo(name: res.name, occupation: res.about)
})

/////////////////
////Functions
////////////////



const imagePopup = new PopupWithImage(".modal_type_preview");
imagePopup.setEventListeners();


const editImageForm = new PopupWithForm({
  popupSelector: ".modal_type_create",
  formSubmit: (values) => {
    api.addCard(values)
    .then(res => {
      cards.addItem(createCard({name: values.titleInput, link: values.imageLinkInput}));
    });
  }
});
  
editImageForm.setEventListeners();
addButton.addEventListener("click", function() {
  editImageForm.openModal();
});


const editProfileForm = new PopupWithForm({
  popupSelector: ".modal_type_edit",
  formSubmit: (values) => {
    profileInfo.setUserInfo(values.profileNameInput, values.profileOccupationInput);
  }
});
editProfileForm.setEventListeners();


profileEditButton.addEventListener("click", function() {
  editProfileForm.openModal();
  const {name, occupation} = profileInfo.getUserInfo();
  formName.value = name;
  formOccupation.value = occupation;
})


export { profileName,profileOccupation };