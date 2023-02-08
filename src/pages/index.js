import './index.css';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

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
    items: initialCards.reverse(),
    renderer: (item) => {
      const newCard = createdCard(item);
      baseCards.addItem(newCard);
    },
  },
  cardsSelector
);

baseCards.renderItems(); // метод класса Section - вывод на страницу

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

profileOpenButton.addEventListener('click', openEditProfilePopup); // слушатель редактирования профиля

cardAddButton.addEventListener('click', function () { // слушатель добавления карточки
  popupAddCard.open();
});
