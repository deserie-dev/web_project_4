class Card {

    constructor({ cardData, handleCardClick, handleDeleteCardClick, handleLikeCardClick, userId, cardTemplateSelector }) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._id = cardData._id;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCardClick = handleDeleteCardClick;
        this._handleLikeCardClick = handleLikeCardClick;
        this._totalLikes = cardData.likes.length;
        this._id = cardData._id;
        this._user = cardData._id;
        this._userId = userId; 
        this._ownerId = cardData.owner._id;
        this._owner = cardData.owner;
        this._likesArray = cardData.likes;
        this._cardTemplateSelector = cardTemplateSelector;
    }

    _getTemplate() {
        const cardTemplate = document.querySelector(this._cardTemplateSelector).content.querySelector(".elements__item");

        return cardTemplate;
    } 

    _getId() {
        return this._id;
    }


    handleTrashButton(evt) {
        evt.target.closest(".elements__item").remove();
    }


    _showTrashIcon() {
    if (this._ownerId !== this._userId) {
            this._card.querySelector(".elements__delete-button").remove();
            
        }
    }
    
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
        trashButton.addEventListener("click", (evt) => this._handleDeleteCardClick(evt));
        cardImage.addEventListener("click", () => this._handleCardClick());
    }    

    generateCard() {
        this._card = this._getTemplate().cloneNode(true);
        this._cardImage = this._card.querySelector(".elements__image");
        this._cardImageTitle = this._card.querySelector(".elements__title");
        this._card.querySelector(".elements__like-counter").textContent = this._totalLikes; 
        
        this._cardImageTitle.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        this._handleCardLikes();
        this._setEventListeners();
        this._showTrashIcon();

        return this._card;

    }
}

export default Card;