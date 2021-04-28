import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupConfirmDelete from "../components/PopupConfirmDelete.js";


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
// const avatarForm = document.querySelector(".modal__form_type_avatar");

const editFormValidator = new FormValidator(settings, editForm);
const addNewFormValidator = new FormValidator(settings, addNewForm);
// const avatarFormValidator = new FormValidator(settings, avatarForm);

editFormValidator.enableValidation();
addNewFormValidator.enableValidation();
// avatarFormValidator.enableValidation();

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

const updateProfileInputs = () => {
  const user = profileInfo.getUserInfo();
      formName.value = user.name,
      formOccupation.value = user.about
}

const handleCardClick = (link, name) => {
  imagePopup.openModal(link, name);
};

//Render user profile information  
const profileInfo = new UserInfo({
  name: profileName,
  occupation: profileOccupation
});

      

api.getUserInfo()
.then((res) => {
  profileInfo.setUserInfo({name: res.name, about: res.about});
  return profileInfo;
})
.then((profileInfo) => {
  api.getInitialCards()
  .then((data) => {
    const user = profileInfo.getUserInfo();

    //new Card
    const createCard = (cardData) => {
      const newCard = new Card(
        cardData, 
        handleCardClick,
      );
      return newCard
    // const cardElement = newCard.generateCard();
    // return cardElement;
    }

    //new Section
    const cards = new Section ({
      items: data,
      renderer: (item) => {
        const cardElement = createCard(item);
        cards.addItem(cardElement.generateCard(user.id))
      }
      },
      ".elements__container",
      );
      cards.renderer();

    //New Place modal for creating a new card using addcard api
    const editImageForm = new PopupWithForm(
      ".modal_type_create",
      ({ "imageLinkInput": link, "titleInput": name }) => {
        api.addCard({ name, link })
        .then((data) => {
          const cardElement = createCard(data);
          cards.addItem(cardElement.generateCard(user.id))
        })
        .catch((err) => {
          console.log(err);
        });
      }
    );
  
    editImageForm.setEventListeners();
    addButton.addEventListener("click", function() {
    updateProfileInputs();
    editImageForm.openModal();
    });

  })
  .catch((err) => {
    console.log(err);
  });

})
.catch((err) => {
  console.log(err);
});


    //Preview card modal
    const imagePopup = new PopupWithImage(".modal_type_preview");
    imagePopup.setEventListeners();


    //Edit profile information using updateUserInfo api
    // const editProfileForm = new PopupWithForm(
    //   ".modal_type_edit",
    //    ({ "profileNameInput": name, "profileOccupationInput": about }) => {
    //   api.updateProfile({ name, about })
    //     .then((data) => {
    //       profileInfo.setUserInfo(data);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     })
    // },
    // )
    const editProfileForm = new PopupWithForm(
      ".modal_type_edit",
      (values) => {
      api.updateProfile(values)
        .then((res) => {
          profileInfo.setUserInfo(res);
        })
        .catch((err) => {
          console.log(err);
        })
    },
    )
editProfileForm.setEventListeners();


export { profileName,profileOccupation };