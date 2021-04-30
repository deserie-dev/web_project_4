class Card {

    constructor(cardData, handleCardClick, handleDeleteClick) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._id = cardData.id;
    }


    _handleImagePreview() {
        const imageModal = document.querySelector(".modal_type_preview");
        const modalImage = imageModal.querySelector(".modal__image");
        const modalImageCaption = imageModal.querySelector(".modal__image-title"); 
        modalImage.src = this._link;
        modalImage.alt = this._name;
        modalImageCaption.textContent = this._name;
        openModal(imageModal);
    }

    _handleTrashButton(evt) {
      evt.target.closest(".elements__item").remove();
    }

    _setEventListeners() {
      const likeButton = this._card.querySelector(".elements__like");
      const trashButton = this._card.querySelector(".elements__delete-button");
      const cardImage = this._card.querySelector(".elements__image");

      // likeButton.addEventListener("click", () => this._handleLikeButton());
      // trashButton.addEventListener("click", () => this._handleDeleteClick(this.id()));
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