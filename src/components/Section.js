class Section {
  constructor({ items, renderer }, cardContainerSelector) {
    this._items = items;
    this._renderer = renderer; 
    this._cardContainer = document.querySelector(cardContainerSelector);
  }

  renderer() {
    this._items.forEach((item) => this._renderer(item));
  }
      
  addItem(card) {
    this._cardContainer.append(card);
  }

  addCard(card) {
    this._cardContainer.prepend(card);
  }
}

export default Section;