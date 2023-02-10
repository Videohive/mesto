// импорт стилей для вебпака

import './index.css';

// импорт классов

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from "../components/Api.js";

// импорт переменных

import {
  initialCards,
  profileName,
  profileAbout,
  cardsSelector, // селектор секции добавления карточек
  cardAddButton,
  selectorAddCard, // селектор контейнера с формой добавления карточки
  templateSelector,
  profileOpenButton,
  selectorEditProfile,
  selectorProfileName,
  selectorProfileAbout,
  selectorPopupImage,
  selectorsCollection,
} from '../utils/constants.js';

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

const baseCards = new Section({

    renderer: (item) => {
      const newCard = createdCard({
        ...item,
        idCurrentUser: userInfo.id,
      });
      baseCards.addItem(newCard);
    },
  },
  cardsSelector
);

//baseCards.renderItems(); // метод класса Section - вывод на страницу

const openEditProfilePopup = () => { // открытие попапа редактирования профиля

  const { name, about } = userInfo.getUserInfo();

  profileName.value = name;
  profileAbout.value = about;

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

const handleFormSubmitAddCard = (event, valuesForm) => {
  event.preventDefault();
  const { place, url } = valuesForm;
  const cardElement = createdCard({ name: place, link: url });
  baseCards.addItem(cardElement);
  popupAddCard.close();
  validationFormAddCard.setButtonDisable() // отключение кнопки
};

const popupAddCard = new PopupWithForm( // попап добавления карточки
  selectorAddCard,
  handleFormSubmitAddCard
);

const userInfo = new UserInfo({
  selectorProfileName,
  selectorProfileAbout,
});

// Api

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: '60cd4e7e-5160-4d08-8f0d-74282e71abaa',
    'Content-Type': 'application/json',
  },
});

const apiGetUserInfo = api.getUserInfo(); // информация о пользователи

const apiGetInitialCards = api.getInitialCards(); // стартовые карточки

Promise.all([apiGetUserInfo, apiGetInitialCards])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.id = userData._id;

    baseCards.renderItems(cardsData)
  })


profileOpenButton.addEventListener('click', openEditProfilePopup); // слушатель редактирования профиля

cardAddButton.addEventListener('click', function () { // слушатель добавления карточки
  popupAddCard.open();
});
