import "./index.css";
import Api from "../components/Api.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";


//Modals
const profileModal = document.querySelector(".modal_type_edit");
const createForm = document.querySelector(".modal_type_create");
const imageModalWindow = document.querySelector(".modal_type_preview");

//Buttons
const profileEditButton = document.querySelector(".profile__edit");
const addButton = document.querySelector(".profile__add");
const editAvatarButton = document.querySelector(".profile__image-edit");
const profileCloseButton = profileModal.querySelector(".modal__close-button_profile");
const imageCloseButton = document.querySelector(".modal__close-button_preview");


const placeCloseButton = document.querySelector(".modal__close-button_place");

//Forms
const profileForm = document.querySelector(".modal__form_type_profile");
const addForm = document.querySelector(".addCard-form");

//Form Inputs
const formName = profileForm.querySelector(".modal__form-control_input_name");
const formAbout = profileForm.querySelector(".modal__form-control_input_occupation");
const formTitle = document.querySelector(".modal__form-control_input_title");
const formImage = document.querySelector(".modal__form-control_input_image");

//Profile Section Info
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__occupation");

const profileAvatarInput = document.querySelector(".profile__image");

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

const imagePopup = new PopupWithImage(".modal_type_preview");

const profileInfo = new UserInfo({
        name: ".profile__name",
        about: ".profile__occupation",
        avatar: ".profile__image"
      });      



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
const avatarForm = document.querySelector(".modal__form_type_avatar");

const editFormValidator = new FormValidator(settings, editForm);
const addNewFormValidator = new FormValidator(settings, addNewForm);
const avatarFormValidator = new FormValidator(settings, avatarForm);

editFormValidator.enableValidation();
addNewFormValidator.enableValidation();
avatarFormValidator .enableValidation();

///////////////////////////////////////////////////////////////////////////

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-10",
  headers: {
    authorization: "3e6a2d00-5fce-4033-96ec-e7320045c084",
    "Content-Type": "application/json"
  }
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userInfo, initialCards]) => {
         profileInfo.setUserInfo(userInfo);
         profileInfo.setUserInfo({name: userInfo.name, about: userInfo.about});
         profileInfo.setAvatarInfo({avatar: userInfo.avatar});
  
      

      const cards = new Section ({
        items: initialCards,
        renderer: (cardData) => {
          cards.addItem(createCard(cardData));
        },
      },
      ".elements__container",
      );
      cards.renderer();


      // Create a new card
      const editImageForm = new PopupWithForm({
        popupSelector: ".modal_type_create",
        formSubmit: (values) => {
          api.addCard({name: values.titleInput, link: values.imageLinkInput})
            .then(cardData => {
              const cardElement = createCard(cardData);
              cards.addItem(cardElement);
            })  
            .catch((err) => {
              console.log(err);
            });
        }
      });



      const editProfileForm = new PopupWithForm({
        popupSelector: ".modal_type_edit",
        formSubmit: (values) => {
          api.editProfile({name: values.profileNameInput, about: values.profileOccupationInput})
          .then((values) => {
            profileInfo.setUserInfo(values);
          })
          .catch((err) => {
              console.log(err);
          });
        }
      });

      function createCard(cardData) {
        const newCard = new Card(cardData, () => {
          imagePopup.openModal(cardData.name, cardData.link);
        });
      const cardElement = newCard.generateCard();
      return cardElement;
      }

      

      //EDIT PROFILE PIC/AVATAR
      const editAvatarModal = new PopupWithForm({
        popupSelector: ".modal_type_avatar",
        formSubmit: (values) => {
          api.editAvatar({avatar: values.avatarInput})
          .then((values) => {
            profileInfo.setAvatarInfo(values);
          })
          .catch((err) => {
              console.log(err);
          });
        }    
      });

      
      //Event listeners
      imagePopup.setEventListeners();
      editImageForm.setEventListeners();
      editProfileForm.setEventListeners();
      editAvatarModal.setEventListeners();

      editAvatarButton.addEventListener("click", function() {
        editAvatarModal.openModal();
      });

      addButton.addEventListener("click", function() {
        editImageForm.openModal();
      });

      profileEditButton.addEventListener("click", function() {
        editProfileForm.openModal();
        const {name, about} = profileInfo.getUserInfo();
        formName.value = name;
        formAbout.value = about;
      })
    }) 
    .catch((err) => {
          console.log(err);
    })



export { profileName,profileAbout };