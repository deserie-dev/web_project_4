import { imageModal, modalImage, modalImageCaption, openModal, closeModal, escapeToCloseModal } from "./utils.js";

class Card {

    constructor(cardData, templateSelector) {

        this._name = cardData.name;
        this._link = cardData.link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardTemplate = document.querySelector(this._templateSelector).content.querySelector(".elements__item");
        return cardTemplate;
    }

    _handleLikeButton (evt) {
        evt.target.classList.toggle("elements__like_active"); 
    }

    _handleTrashButton(evt) {
      evt.target.closest(".elements__item").remove();
    }

    _handlePreviewModal(){

    modalImage.src = this._link;
    modalImage.alt = this._name;
    modalImageCaption.textContent = this._name;
    openModal(imageModal);
    }

    _setEventListeners() {
      const likeButton = this._card.querySelector(".elements__like");
      const trashButton = this._card.querySelector(".elements__delete-button");
      const cardImage = this._card.querySelector(".elements__image");

      likeButton.addEventListener("click", this._handleLikeButton);
      trashButton.addEventListener("click", this._handleTrashButton);
      cardImage.addEventListener("click", () => this._handlePreviewModal());
    }

    
    generateCard() {

        this._card = this._getTemplate().cloneNode(true);
        const cardImage = this._card.querySelector(".elements__image");
        const cardImageTitle = this._card.querySelector(".elements__title");

        // fill each element with corresponding initial content
        cardImageTitle.textContent = this._name;
        cardImage.src = this._link;
        cardImage.alt = this._name;

        this._setEventListeners();
        
        return this._card;

    }
}

export default Card;