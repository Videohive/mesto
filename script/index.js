const cardTemplate = document.querySelector('.template-card').content; // шаблон карточки
const cardsContainer = document.querySelector('.elements');

const content = document.querySelector('.profile');
const profileOpenButton = document.querySelector('.profile__edit'); // кнопка редактирования профиля
const cardAddButton = document.querySelector('.profile__add'); // кнопка добавления карточки

const profileName = content.querySelector('.profile__name');
const profileAbout = content.querySelector('.profile__about');

const profileEdit = document.querySelector('.popup-profile'); // popup редактирования профиля
const profileEditForm = profileEdit.querySelector('.popup__form'); // popup form редактирования профиля
const profileEditName = document.getElementById('name-input'); // popup input имени
const profileEditAbout = document.getElementById('about-input'); // popup input о себе
const profileEditSaveButton = document.querySelector('#save-profile'); // кнопка сохранения настроек профиля

const cardAdd = document.querySelector('.popup-card'); // popup добавления карточки
const cardAddForm = cardAdd.querySelector('.popup__form'); // popup form редактирования профиля
const cardAddPlace = document.getElementById('place-input'); // popup input имени
const cardAddPlaceUrl = document.getElementById('place-url-input'); // popup input о себе
const cardAddSaveButton = document.querySelector('#save-card'); // кнопка сохранения настроек профиля

const imagePopup = document.querySelector('.popup-image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupImageCaption = imagePopup.querySelector('.popup__image-caption');

function createdCard(card) { // создание карточки
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardElementImage = cardElement.querySelector('.element__image');
  cardElementImage.src = card.link;
  cardElementImage.alt = card.name;
  cardElement.querySelector('.element__title').textContent = card.name;

  // кнопка лайка
  const elementLikeButton = cardElement.querySelector('.element__like-button');
  elementLikeButton.addEventListener('click', function () {
    elementLikeButton.classList.toggle('element__like-button_active');
  });

  // кнопка удаления
  const deleteCardButton = cardElement.querySelector('.element__trash-button');
  deleteCardButton.addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });

  // кнопка открытия изображения
  const imageButton = cardElement.querySelector('.element__image');
  imageButton.addEventListener('click', function () {
    openPopup(imagePopup);
    fillImagePopup(imageButton);
  });

  return cardElement;
};

function renderCard(card) {
  cardsContainer.prepend(card);
};

function fillImagePopup(element) {
  popupImage.src = element.src;
  popupImageCaption.alt = element.alt;
  popupImageCaption.textContent = element.alt;
};


// Кнопка закрытия popup
const popupCloseButtonList = document.querySelectorAll('.popup__close-button');

popupCloseButtonList.forEach(item => {
  item.addEventListener('click', function (evt) {
    closePopup(evt.target.closest('.popup'));
  });
});

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener("keydown", closePopupKeyEsc);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", closePopupKeyEsc);
};

const closePopupClickOverlay = (event, popupElement) => {
  if (event.target === event.currentTarget) {
    closePopup(popupElement);
  };
};

const closePopupKeyEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

const popupElements = document.querySelectorAll('.popup'); // массив всех элементов popup

popupElements.forEach(popupElement => { // пройтись по каждому элементу массива popupElements
  popupElement.addEventListener('click', (evt) => {
    closePopupClickOverlay(evt, popupElement);
  });
});

function openEditProfilePopup() {
  openPopup(profileEdit)
  profileEditName.value = profileName.textContent;
  profileEditAbout.value = profileAbout.textContent;
};

function saveProfile(evt) {
  evt.preventDefault();
    profileName.textContent = profileEditName.value; // Вставьте новые значения с помощью textContent
    profileAbout.textContent = profileEditAbout.value;
    closePopup(profileEdit);
};

function openAddCardPopup() {
  openPopup(cardAdd)
  cardAddPlace.value = '';
  cardAddPlaceUrl.value = '';
};

function saveCard(evt) {
  evt.preventDefault();

  const cardTitle = cardAddPlace.value;
  const cardLink = cardAddPlaceUrl.value;

  renderCard(createdCard({
    name: `${cardTitle}`,
    link: `${cardLink}`
  }));
  closePopup(cardAdd);
};

initialCards.reverse().forEach(function (card) { // добавление стартовых карточек
  renderCard(createdCard(card));
});

profileOpenButton.addEventListener('click', openEditProfilePopup);
profileEditForm.addEventListener('submit', saveProfile);

cardAddButton.addEventListener('click', openAddCardPopup);
cardAddForm.addEventListener('submit', saveCard);
