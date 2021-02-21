const modal = document.querySelector(".modal");
const edit = document.querySelector(".profile__edit");
const form = document.querySelector(".modal__form");
const closeForm = modal.querySelector(".modal__close-button");
const imageModalWindow = document.querySelector(".modal_type_image");
const imageCloseButton = document.querySelector("modal__close-button_image");


//Variables for the edit profile section
const formName = form.querySelector(".modal__form-control_input_name");
const formOccupation = form.querySelector(".modal__form-control_input_occupation");
const editForm = document.querySelector(".edit-form");
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");


//Variables for the add new card/place section
const addButton = document.querySelector(".profile__add");
const createForm = document.querySelector(".create-form");
const formTitle = form.querySelector(".modal__form-control_input_title");
const formImage = form.querySelector(".modal__form-control_input_image");
const placeCloseButton = document.querySelector(".modal__close-button_place");

//The six cards rendered by JavaScript when page is loaded
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

//On each iteration of the above array, add a card. Data refers to each object in the array, comprising name and link
const cardTemplate = document.querySelector(".card-template").content.querySelector(".elements__item");

const list = document.querySelector(".elements__container");

initialCards.forEach(data => {
  //Clone the content of the template tag 
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".elements__image");
  const cardTitle = cardElement.querySelector(".elements__title");
  const cardLikeButton = cardElement.querySelector(".elements__like");
  const cardDeleteButton = cardElement.querySelector(".elements__delete-button");
  // add content
  cardTitle.textContent = data.name;
  cardImage.src = data.link;

  cardLikeButton.addEventListener("click", () => {    
  });
//Functionality for the delete button using closest() method
  cardDeleteButton.addEventListener("click", () => {
     const deleteCard = cardDeleteButton.closest(".elements__item");
     deleteCard.remove(); 
  });

  cardImage.addEventListener("click", () => {
    const modalImage = imageModalWindow.querySelector(".modal__image");
    const modalImageTitle = imageModalWindow.querySelector(".modal__image-title");

    imageModalWindow.classList.add("modal_opened"); 
    modalImage.src = data.link;
    modalImageTitle.textContent = data.name;
  });

  // make it appear on the page
  list.prepend(cardElement);
});

//Function to open modal
function openModal() {
  modal.classList.add("modal_opened");
}


//Function to close modal
function closeModal() {
  modal.classList.remove("modal_opened");
}

//When edit button clicked, open "Edit Profile" modal. Values for each input field.
edit.addEventListener("click", function() {
  openModal();
  editForm.classList.add("modal_opened");
  formName.value = profileName.textContent;
  formOccupation.value = profileOccupation.textContent;
});

// Close the modal when the close button is clicked.
closeForm.addEventListener("click", closeModal);


//Update site when text entered into input fields then close the popup.
function saveProfile() {
  profileName.textContent = formName.value;
  profileOccupation.textContent = formOccupation.value;
  closeModal();
  event.preventDefault();
}

form.addEventListener("submit", saveProfile);


//Create new place functionality
addButton.addEventListener("click", function() {
  createForm.classList.add("modal_opened");  
  formTitle.value = "";
  formImage.value = "";
});

placeCloseButton.addEventListener("click", () => {
  createForm.classList.remove("modal_opened");
});

//Create new place based on user input
function createNewPlace() {
  newPlace.name = formTitle.value;
  newPlace.link = formImage.value;
  closeModal();
  evt.preventDefault();
  cardElement.prepend(list);
}
form.addEventListener("submit", createNewPlace);

