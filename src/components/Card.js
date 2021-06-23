class Card {

    constructor({ cardData, handleCardClick, handleDeleteCardClick }) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCardClick = handleDeleteCardClick;
        this._id = cardData._id;
        // this._user = userData._id;
        this._ownerId = cardData.owner._id;
        this._owner = cardData.owner;
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

    getId() {
        return this._id;
    }

    _handleLikeButton(evt) {
        evt.target.classList.toggle("elements__like_active");
    }

    handleTrashButton(evt) {
        evt.target.closest(".elements__item").remove();
    }

    _setEventListeners() {
        const likeButton = this._card.querySelector(".elements__like");
        const cardImage = this._card.querySelector(".elements__image");
        const trashButton = this._card.querySelector(".elements__delete-button");

        // if (!(this._user === this._ownerId)) {
        //     trashButton.remove();
        // } else {
        //     this._trashButton.addEventListener("click", evt => {
        //         this._handleDeleteCardClick(evt);
        //     });
        // }


        likeButton.addEventListener("click", this._handleLikeButton);
        trashButton.addEventListener("click", (evt) => this._handleDeleteCardClick(evt));
        cardImage.addEventListener("click", () => this._handleCardClick());
    }


    generateCard() {
        const cardTemplate = document.querySelector(".card-template").content.querySelector(".elements__item");
        this._card = cardTemplate.cloneNode(true);
        this._cardImage = this._card.querySelector(".elements__image");
        this._cardImageTitle = this._card.querySelector(".elements__title");
        
        this._cardImageTitle.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        this._setEventListeners();

        return this._card;

    }
}

export default Card;