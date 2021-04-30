class Section {
  constructor({ items, renderer }, cardContainerSelector) {
    this._items = items;
    this._renderer = renderer; 
    this._cardContainer = document.querySelector(cardContainerSelector);
  }

  renderer() {
    this._items.forEach((input) => {this._renderer(input);
    });
  }

  addItem(card) {
    this._cardContainer.prepend(card);
  }
}

export default Section;