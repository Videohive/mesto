import {Card} from "./card.js";

const templateSelector = ".template-card";
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

const cardAdd = document.querySelector('.popup-card'); // popup добавления карточки
const cardAddForm = cardAdd.querySelector('.popup__form'); // popup form редактирования профиля
const cardAddPlace = document.getElementById('place-input'); // popup input имени
const cardAddPlaceUrl = document.getElementById('place-url-input'); // popup input о себе
const cardAddSaveButton = document.querySelector('#save-card'); // кнопка сохранения настроек профиля

const imagePopup = document.querySelector('.popup-image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupImageCaption = imagePopup.querySelector('.popup__image-caption');

function createdCard(values, template) { // создание карточки
  const newElement = new Card({
      name: values.name,
      link: values.link,
    },
    template,
    openPopup
  );
  return newElement.generateCard();
};

function renderCard(card) {
  cardsContainer.prepend(card);
};

// Кнопка закрытия popup
const popupCloseButtonList = document.querySelectorAll('.popup__close-button');

popupCloseButtonList.forEach(item => {
  item.addEventListener('click', function (evt) {
    closePopup(evt.target.closest('.popup'));
  });
});

const openPopup = (popup) => {
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
  cardAddSaveButton.classList.add('popup__button_disabled');
  cardAddSaveButton.setAttribute('disabled', true);
};

function saveCard(evt) {
  evt.preventDefault();

  const cardTitle = cardAddPlace.value;
  const cardLink = cardAddPlaceUrl.value;

  renderCard(createdCard(
    {name: `${cardTitle}`,link: `${cardLink}`}, templateSelector));
    closePopup(cardAdd);
};

initialCards.reverse().forEach(function (card) { // добавление стартовых карточек
  renderCard(createdCard(card, templateSelector));
});

profileOpenButton.addEventListener('click', openEditProfilePopup);
profileEditForm.addEventListener('submit', saveProfile);

cardAddButton.addEventListener('click', openAddCardPopup);
cardAddForm.addEventListener('submit', saveCard);

export {
  imagePopup,
  popupImage,
  popupImageCaption,
  openPopup
}
