import "./index.css";
import Api from "../components/Api.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupConfirmDelete from "../components/PopupConfirmDelete";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";


//Buttons
const profileEditButton = document.querySelector(".profile__edit");
const addButton = document.querySelector(".profile__add");
const editAvatarButton = document.querySelector(".profile__image-edit");

//Forms
const profileForm = document.querySelector(".modal__form_type_profile");

//Form Inputs
const formName = profileForm.querySelector(".modal__form-control_input_name");
const formAbout = profileForm.querySelector(".modal__form-control_input_occupation");

//Profile Section Info
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__occupation");

//Modal to preview images
const imagePopup = new PopupWithImage(".modal_type_preview");
imagePopup.setEventListeners();

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
avatarFormValidator.enableValidation();

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

    const profileInfo = new UserInfo({
      name: ".profile__name",
      about: ".profile__occupation",
      avatar: ".profile__image"
    });
    profileInfo.setUserInfo({ name: userInfo.name, about: userInfo.about, avatar: userInfo.avatar });
    profileInfo.userId = userInfo._id;

    const cards = new Section({
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
        api.addCard({ name: values.titleInput, link: values.imageLinkInput })
          .then(cardData => {
            const cardElement = createCard(cardData);
            cards.addItem(cardElement);
            editImageForm.closeModal();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

    const editProfileForm = new PopupWithForm({
      popupSelector: ".modal_type_edit",
      formSubmit: (values) => {
        api.editProfile({ name: values.profileNameInput, about: values.profileOccupationInput })
          .then((values) => {
            profileInfo.setUserInfo(values);
            editProfileForm.closeModal();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

    //Modal to confirm before deleting image
    const confirmDeleteModal = new PopupConfirmDelete({
      popupSelector: ".modal_type_delete",
      formSubmit: (card, cardId) => {
        api.deleteCard(cardId).then(() => {
          card.remove(cardId);
          confirmDeleteModal.closeModal();
        })
      }
    });

       

    function createCard(cardData) {
      const newCard = new Card({
        cardData,
        handleCardClick: () => {
          imagePopup.openModal(cardData.name, cardData.link);
        },
        handleDeleteCardClick: (evt) => {
            confirmDeleteModal.openModal(evt, newCard._id);
        },
        handleLikeCardClick: (likeButton, cardId) => {
          if(likeButton.classList.contains("elements__like_active")) {
            api.removeLike(cardId)
              .then(res => {
                newCard.displayTotalLikes(res.likes.length);
                newCard.toggleLikeButton(likeButton);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            api.addLike(cardId)
              .then(res => {
                newCard.displayTotalLikes(res.likes.length);
                newCard.toggleLikeButton(likeButton);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        },
        userId: profileInfo.userId,
      })
      const cardElement = newCard.generateCard();
      return cardElement;
    }


    //EDIT PROFILE PIC/AVATAR
    const editAvatarModal = new PopupWithForm({
      popupSelector: ".modal_type_avatar",
      formSubmit: (values) => {
        api.editAvatar({ avatar: values.avatarInput })
          .then((values) => {
            profileInfo.setUserInfo({ name: values.name, about: values.about, avatar: values.avatar });
            editAvatarModal.closeModal();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

    //Event listeners
    editImageForm.setEventListeners();
    editProfileForm.setEventListeners();
    editAvatarModal.setEventListeners();
    confirmDeleteModal.setEventListeners();
    

    editAvatarButton.addEventListener("click", function () {
      editAvatarModal.openModal();
    });

    addButton.addEventListener("click", function () {
      editImageForm.openModal();
    });

    profileEditButton.addEventListener("click", function () {
      editProfileForm.openModal();
      const { name, about } = profileInfo.getUserInfo();
      formName.value = name;
      formAbout.value = about;
    })
  })
  .catch((err) => {
    console.log(err);
  })

  



export { profileName, profileAbout };