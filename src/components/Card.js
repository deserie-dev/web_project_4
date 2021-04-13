import { imageModal, modalImage, modalImageCaption, openModal } from "../scripts/utils.js"

class Card {

    constructor(cardData, handleCardClick) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._handleCardClick = handleCardClick;
    }

    _handleImagePreview() {
        modalImage.src = this._link;
        modalImage.alt = this._name;
        modalImageCaption.textContent = this._name;
        openModal(imageModal);
    }

    _handleLikeButton (evt) {
        evt.target.classList.toggle("elements__like_active"); 
    }

    _handleTrashButton(evt) {
      evt.target.closest(".elements__item").remove();
    }

    _setEventListeners() {
      const likeButton = this._card.querySelector(".elements__like");
      const trashButton = this._card.querySelector(".elements__delete-button");
      const cardImage = this._card.querySelector(".elements__image");

      likeButton.addEventListener("click", this._handleLikeButton);
      trashButton.addEventListener("click", this._handleTrashButton);
      cardImage.addEventListener("click", () => this._handleCardClick());
    }

    
    generateCard() {
        const cardTemplate = document.querySelector(".card-template").content.querySelector(".elements__item");
        this._card = cardTemplate.cloneNode(true);
        this._cardImage = this._card.querySelector(".elements__image");
        this._cardImageTitle = this._card.querySelector(".elements__title");

        // fill each element with corresponding initial content
        this._cardImageTitle.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        this._setEventListeners();
        
        return this._card;

    }
}

export default Card;