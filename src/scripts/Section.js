class Section {
  constructor({ items, renderer }, cardContainerSelector) {
    this._items = items;
    this._renderer = renderer; 
    this._cardContainer = document.querySelector(cardContainerSelector);
  }

  renderItems() {
    this._items.forEach(item => this._renderer(item));
  }
      
  addCard(card) {
    this._cardContainer.prepend(card);
  }
}

export default Section;