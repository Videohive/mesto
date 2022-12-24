import {imagePopup, popupImage, popupImageCaption, openPopup} from './index.js'

export class Card {
  constructor(cardParameter, templateSelector) {
    this._name = cardParameter.name;
    this._link = cardParameter.link;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__like-button');
    this._deleteButton = this._element.querySelector('.element__trash-button');
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
    this._likeButton.classList.toggle('element__like-button_active');
  };

  _handleDeleteClick() {
    this._element.remove();
    this._element = null;
  };

  _handleOpenImagePopup() {
    popupImage.src = this._cardImage.src;
    popupImageCaption.textContent = this._cardTitle.textContent;
    openPopup(imagePopup);
  };

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._handleLikeClick());
    this._deleteButton.addEventListener('click', () => this._handleDeleteClick());
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
