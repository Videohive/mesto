const cardTemplate = document.querySelector('.template-card').content; // шаблон карточки
const cardElements = document.querySelector('.elements');

const content = document.querySelector('.profile');
const profileOpenButton = document.querySelector('.profile__edit'); // кнопка редактирования профиля
const cardAddButton = document.querySelector('.profile__add'); // кнопка добавления карточки

const profileName = content.querySelector('.profile__name');
const profileAbout = content.querySelector('.profile__about');

const profileEdit = document.querySelector('.popup__profile-edit'); // popup редактирования профиля
const profileEditForm = profileEdit.querySelector('.popup__form'); // popup form редактирования профиля
const profileEditName = document.getElementById('name-input'); // popup input имени
const profileEditAbout = document.getElementById('about-input'); // popup input о себе
const profileEditSaveButton = document.querySelector('#save-profile'); // кнопка сохранения настроек профиля

const cardAdd = document.querySelector('.popup__card-add'); // popup добавления карточки
const cardAddForm = cardAdd.querySelector('.popup__form'); // popup form редактирования профиля
const cardAddPlace = document.getElementById('place-input'); // popup input имени
const cardAddPlaceUrl = document.getElementById('place-url-input'); // popup input о себе
const cardAddSaveButton = document.querySelector('#save-card'); // кнопка сохранения настроек профиля

const imagePopup = document.querySelector('.popup__image-open');
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
  deleteCardButton.addEventListener('click', function () {
    deleteCardButton.parentNode.remove();
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
  cardElements.prepend(card);
};

function fillImagePopup(element) {
  popupImage.src = element.src;
  popupImageCaption.alt = element.alt;
  popupImageCaption.textContent = element.alt;
};

// Кнопка закрытия popup

const popupCloseButton = document.querySelectorAll('.popup__close-button');

popupCloseButton.forEach(function (item) {

  item.addEventListener('click', function (evt) {

    closePopup(evt.target.parentNode.parentNode);

  });
});

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

function openEditProfilePopup() {
  openPopup(profileEdit)
  profileEditName.value = profileName.textContent;
  profileEditAbout.value = profileAbout.textContent;
};

function saveProfile(evt) {
  evt.preventDefault();

  if (profileEditName.value.length === 0) {
    alert('Введите имя');
  } else {
    profileName.textContent = profileEditName.value; // Вставьте новые значения с помощью textContent
    profileAbout.textContent = profileEditAbout.value;
    closePopup(profileEdit);
  }
};

function openAddCardPopup() {
  openPopup(cardAdd)
  cardAddPlace.value = '';
  cardAddPlaceUrl.value = '';
};

function saveCard(evt) {
  evt.preventDefault();

  if (cardAddPlace.value.length === 0) {
    alert('Введите название места');
  } else if (cardAddPlaceUrl.value.length === 0) {
    alert('Введите ссылку на картинку');
  } else {

    const cardTitle = cardAddPlace.value;
    const cardLink = cardAddPlaceUrl.value;

    renderCard(createdCard({
      name: `${cardTitle}`,
      link: `${cardLink}`
    }));
    closePopup(cardAdd);
  };
};

initialCards.reverse().forEach(function (card) { // добавление стартовых карточек
  renderCard(createdCard(card));
});

profileOpenButton.addEventListener('click', openEditProfilePopup);
profileEditForm.addEventListener('submit', saveProfile);

cardAddButton.addEventListener('click', openAddCardPopup);
cardAddForm.addEventListener('submit', saveCard);
