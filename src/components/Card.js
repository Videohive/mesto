export class Card {
  constructor(data, templateSelector, {handleCardClick, handleCardDelete, handleCardLike}) {
    console.log(data)
    this._cardData = data
    this._idOwnerCard = data.owner._id; // id владельца карточки
    this._idCurrentUser = data.idCurrentUser; // id текущего пользователя
    this._id = data._id; // id карточки
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes; // массив количество лайков карточки
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;

    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector('.element__like-button'); // Refactoring имена свойств класса должны начинаться с имени существительного
    this._likeCounter = this._element.querySelector('.element__like-count');
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
    this._handleCardLike(this._id, this._likeCurrentUser(), this);
    //this._buttonLike.classList.toggle('element__like-button_active');
  };

  _likeCurrentUser() {
    return this._likes.some((user) => user._id === this._idCurrentUser) // проверка лайка пользователя на карточке
  }

  remove(){
    this._element.remove();
    this._element = null;
  }

  _handleDeleteClick() {
    this._handleCardDelete(this._cardData)
  };

  _handleOpenImagePopup() {
    this._handleCardClick(this._link, this._name);
  };

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => this._handleLikeClick());
    this._buttonDelete.addEventListener('click', () => this._handleDeleteClick());
    this._cardImage.addEventListener('click', () => this._handleOpenImagePopup());
  };

  setLikes(array){ //установка количества лайков карточки
    this._likes = array;
    this._likeCounter.textContent = this._likes.length;

    if (this._likeCurrentUser()) { // проверка лайка, добавление или удаление класса
      this._buttonLike.classList.add('element__like-button_active');
    } else {
      this._buttonLike.classList.remove('element__like-button_active');
    }
  };

  generateCard() {
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._cardTitle.textContent;
    this.setLikes(this._likes);
    if (this._idOwnerCard !== this._idCurrentUser) this._buttonDelete.remove(); // проверка id пользователя и удаление кнопки удаления

    this._setEventListeners();

    return this._element;
  };
}
