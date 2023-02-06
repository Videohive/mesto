export class Card {
  constructor(cardParameter, templateSelector, handleCardClick) {
    this._name = cardParameter.name;
    this._link = cardParameter.link;
    this._templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector('.element__like-button'); // Refactoring имена свойств класса должны начинаться с имени существительного
    this._buttonDelete = this._element.querySelector('.element__trash-button');
    this._cardTitle = this._element.querySelector('.element__title');
    this._cardImage = this._element.querySelector('.element__image');
  };

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardTemplate;
  };

  _handleLikeClick() {
    this._buttonLike.classList.toggle('element__like-button_active');
  };

  _handleDeleteClick() {
    this._element.remove();
    this._element = null;
  };

  _handleOpenImagePopup() {
    this.handleCardClick(this._link, this._name);
    // popupImage.src = this._cardImage.src;
    // popupImage.alt = this._cardTitle.textContent; // Refactoring добавить alt для картинки
    // popupImageCaption.textContent = this._cardTitle.textContent;
    // openPopup(imagePopup);
  };

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => this._handleLikeClick());
    this._buttonDelete.addEventListener('click', () => this._handleDeleteClick());
    this._cardImage.addEventListener('click', () => this._handleOpenImagePopup());
  };

  generateCard() {
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._cardTitle.textContent;

    this._setEventListeners();

    return this._element;
  };
}
