class Card {

    constructor({ cardData, handleCardClick, handleDeleteCardClick, handleLikeCardClick }, userId) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCardClick = handleDeleteCardClick;
        this._handleLikeCardClick = handleLikeCardClick;
        this._id = cardData._id;
        this._user = cardData._id;
        this._userId = userId; 
        this._ownerId = cardData.owner._id;
        this._owner = cardData.owner;
        this._likesTotal = cardData.likes.length;
        this._likesArray = cardData.likes;
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

    _getId() {
        return this._id;
    }

    // _handleLikeButton(evt) {
    //     evt.target.classList.toggle("elements__like_active");
    // }

    handleTrashButton(evt) {
        evt.target.closest(".elements__item").remove();
    }


    _showTrashIcon() {
        if (!(this._userId === this._ownerId)) {
            this._card.querySelector(".elements__delete-button").classList.add("elements__delete-button_visible");
        }
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    toggleLikeButton(likeButton) {
        likeButton.classList.toggle("elements__like_active");
    } 
  
    displayTotalLikes(totalLikes) { 
        this._card.querySelector(".elements__like-counter").textContent = totalLikes; 
    } 
 

    _handleCardLikes() { 
        const cardLikeButton = this._card.querySelector(".elements__like"); 
        
        const cardLikes = Array.from(this._likesArray); 
         
        cardLikes.forEach(element => { 
            if (element._id === this._userId) { 
                cardLikeButton.classList.add("elements__like_active"); 
            } 
        }) 
    } 
    
    _setEventListeners() {
        const likeButton = this._card.querySelector(".elements__like");
        const cardImage = this._card.querySelector(".elements__image");
        const trashButton = this._card.querySelector(".elements__delete-button");

        likeButton.addEventListener("click", () => this._handleLikeCardClick(likeButton, this._getId()));
        // likeButton.addEventListener("click", (evt) => this._handleLikeCardClick(evt));
        trashButton.addEventListener("click", (evt) => this._handleDeleteCardClick(evt));
        cardImage.addEventListener("click", () => this._handleCardClick());
    }


    generateCard() {
        const cardTemplate = document.querySelector(".card-template").content.querySelector(".elements__item");
        this._card = cardTemplate.cloneNode(true);
        this._cardImage = this._card.querySelector(".elements__image");
        this._cardImageTitle = this._card.querySelector(".elements__title");
        this._card.querySelector(".elements__like-counter").textContent = this._totalLikes; 
        

        this._cardImageTitle.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        this._handleCardLikes();
        this._showTrashIcon();
        this._setEventListeners();

        return this._card;

    }
}

export default Card;