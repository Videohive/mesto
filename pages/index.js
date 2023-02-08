import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

// импорт переменных

import {
  initialCards,
  cardAddButton,
  profileOpenButton,
  selectorEditProfile,
  selectorProfileName,
  selectorProfileAbout,
  selectorPopupImage,
  selectorsCollection,
} from "../utils/constants.js";

const templateSelector = ".template-card";
const cardsContainer = document.querySelector('.elements');
const cardsSelector = '.elements'

const cardAdd = document.querySelector('.popup-card'); // popup добавления карточки
const cardAddForm = cardAdd.querySelector('.popup__form'); // popup form добавления карточки
const cardAddPlace = document.getElementById('place-input'); // popup input имени
const cardAddPlaceUrl = document.getElementById('place-url-input'); // popup input о себе
const cardAddSaveButton = document.querySelector('#save-card'); // кнопка сохранения настроек профиля

const validationFormEditProfile = new FormValidator(selectorsCollection, '.popup__form-edit-profile');
const validationFormAddCard = new FormValidator(selectorsCollection, '.popup__form-add-card');

validationFormEditProfile.enableValidation();
validationFormAddCard.enableValidation();

const handleCardClick = (link, name) => { // открытие попапа картинки
  openImagePopup.open(link, name);
};

const openImagePopup = new PopupWithImage(selectorPopupImage) // попап картинки

const createdCard = (values) => { // создание карточки
  const newElement = new Card({
      name: values.name,
      link: values.link,
    },
    templateSelector,
    handleCardClick
  );
  return newElement.generateCard();
};

const baseCards = new Section(
  {
    items: initialCards.reverse(),
    renderer: (item) => {
      const newCard = createdCard(item);
      baseCards.addItem(newCard);
    },
  },
  cardsSelector
);

baseCards.renderItems(); // метод класса Section - вывод на страницу

function renderCard(card) {
  cardsContainer.prepend(card);
};

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener("keydown", handleCloseByEsc);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", handleCloseByEsc);
};

const handleCloseByClick = (event, popupElement) => {
  if (event.target === event.currentTarget || event.target.classList.contains('popup__close-button')) {
    closePopup(popupElement);
  };
};

const handleCloseByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

const popupElements = document.querySelectorAll('.popup'); // массив всех элементов popup

popupElements.forEach(popupElement => { // пройтись по каждому элементу массива popupElements
  popupElement.addEventListener('click', (evt) => {
    handleCloseByClick(evt, popupElement);
  });
});

const openEditProfilePopup = () => { // открытие попапа редактирования профиля

  const { name, about } = userInfo.getUserInfo();

  const form = document.forms.edit_profile;
  form.elements.name.value = name;
  form.elements.about.value = about;

  popupEditProfile.open();

};

const handleFormSubmitEditProfile = (event, valuesForm) => {
  event.preventDefault();
  const { name, about } = valuesForm;
  userInfo.setUserInfo(name, about)
  popupEditProfile.close();
};

const popupEditProfile = new PopupWithForm( // попап редактирования профиля
  selectorEditProfile,
  handleFormSubmitEditProfile
);

function openAddCardPopup() {
  openPopup(cardAdd)
  cardAddForm.reset();
  validationFormAddCard.setButtonDisable()
};

function saveCard(evt) {
  evt.preventDefault();

  const cardTitle = cardAddPlace.value;
  const cardLink = cardAddPlaceUrl.value;

  renderCard(createdCard({
    name: `${cardTitle}`,
    link: `${cardLink}`
  }, templateSelector));
  closePopup(cardAdd);
};

const userInfo = new UserInfo({
  selectorProfileName,
  selectorProfileAbout,
});

profileOpenButton.addEventListener('click', openEditProfilePopup);
// profileEditForm.addEventListener('submit', saveProfile);

cardAddButton.addEventListener('click', openAddCardPopup);
cardAddForm.addEventListener('submit', saveCard);
