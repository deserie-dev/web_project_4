const modal = document.querySelector(".modal_type_edit");
const edit = document.querySelector(".profile__edit");
const form = document.querySelector(".modal__form");
const closeForm = modal.querySelector(".modal__close-button");
const imageModalWindow = document.querySelector(".modal_type_preview");
const imageCloseButton = document.querySelector(".modal__close-button_preview");


//Variables for the edit profile section
const formName = form.querySelector(".modal__form-control_input_name");
const formOccupation = form.querySelector(".modal__form-control_input_occupation");
const editForm = document.querySelector(".edit-form");
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");


//Variables for the add new card/place section
const cardTemplate = document.querySelector(".card-template").content.querySelector(".elements__item");
const addButton = document.querySelector(".profile__add");
const createForm = document.querySelector(".modal_type_create");
const addForm = document.querySelector(".addCard-form");
const formTitle = form.querySelector(".modal__form-control_input_title");
const formImage = form.querySelector(".modal__form-control_input_image");
const placeCloseButton = document.querySelector(".modal__close-button_place");
const list = document.querySelector(".elements__container");

//Function to open modal
function openModal(modalWindow) {
  modalWindow.classList.add("modal_opened");
}

//Function to close modal
function closeModal(modalWindow) {
  modalWindow.classList.remove("modal_opened");
}

//When edit button clicked, open "Edit Profile" modal. Values for each input field.
edit.addEventListener("click", function() {
  formName.value = profileName.textContent;
  formOccupation.value = profileOccupation.textContent;
  openModal(modal);
});

//Close the modal when the close button is clicked.
closeForm.addEventListener("click", function(){
  closeModal(modal)
});

//Update Profile section based on user input then close the popup.
form.addEventListener("submit", function(evt) {
  profileName.textContent = formName.value;
  profileOccupation.textContent = formOccupation.value;
  closeModal(modal)
  evt.preventDefault();
})

//Create functionality for the add button
addButton.addEventListener("click", function(evt) {
  createForm.classList.add("modal_opened");  
  // formTitle.value = "";
  // formImage.value = "";
  // evt.preventDefault
});

placeCloseButton.addEventListener("click", () => {
  createForm.classList.remove("modal_opened");
});

// addForm.addEventListener("submit", function(evt) {
//   evt.preventDefault();
//   const newPlaceTitle = formTitle.value;
//   const newPlaceImage = formImage.value;

//   const newPlaceCard ={
//     name: `${newPlaceTitle}`,
//     link: `${newPlaceImage}`
//   };
//   const newCardElement = addNewPlace(newPlaceCard);
//   list.prepend(newCardElement);
//   closeModal(imageModalWindow);
// });

//The six cards rendered by JavaScript when page is first loaded
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

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

  const cardDeleteButton = cardElement.querySelector(".elements__delete-button");
  cardDeleteButton.addEventListener("click", () => cardElement.remove());

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

addForm.addEventListener("submit", function(evt) {
  addNewPlace(formTitle.value, formImage.value);
  createForm.classList.remove("modal_opened");

  const newPlaceTitle = formTitle.value;
  const newPlaceImage = formImage.value;

  evt.preventDefault();

  const newPlaceCard ={
    name: `${newPlaceTitle}`,
    link: `${newPlaceImage}`
  };
  const newCardElement = addNewPlace(newPlaceCard);
  list.prepend(newCardElement);
  closeModal(imageModalWindow);
});
