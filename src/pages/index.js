// импорт стилей для вебпака

import './index.css';

// импорт классов

import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithDelete} from '../components/PopupWithDelete.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from '../components/Api.js';

// импорт переменных

import {
  profileName,
  profileAbout,
  cardsSelector, // селектор секции добавления карточек
  cardAddButton,
  selectorDeleteCard, // селектор удаления карточки
  cardDeleteButton,
  cardSubmitButton,
  selectorAddCard, // селектор контейнера с формой добавления карточки
  templateSelector,
  profileOpenButton,
  profileEditSubmitButton, // кнопка отправки формы редактирования профиля
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

const changeStatusButtonSubmit = (button, text = 'Сохранить', status = true) => {
  button.textContent = text;
  button.disabled = !status;
  status
    ?
    button.classList.remove('popup__button_disable') :
    button.classList.add('popup__button_disable');
}

const handleCardClick = (link, name) => { // открытие попапа картинки
  openImagePopup.open(link, name);
};

const openImagePopup = new PopupWithImage(selectorPopupImage) // попап картинки

const createdCard = (data) => { // создание карточки
  const newElement = new Card({
      ...data,
      idCurrentUser: userInfo.id,
    },
    templateSelector, {
      handleCardClick,
      handleCardDelete: (cardData) => {
        popupDeleteCard.open()
        popupDeleteCard.handleSubmit(() => {

          changeStatusButtonSubmit(cardDeleteButton, 'Удаляю...', false)
          api.removeCard(cardData._id)

            .then((data) => {
              if (!data) {
                return Promise.reject(`Ошибка получения данных`);
              } else {
                newElement.remove();
                changeStatusButtonSubmit(cardDeleteButton, 'Удалено', false)
              }
            })

            .catch((err) => {
              changeStatusButtonSubmit(cardDeleteButton, 'Ошибка', false)
              console.log(err);
            })

            .finally(() => {
              setTimeout(() => {
                changeStatusButtonSubmit(cardDeleteButton, 'Да', false)
                popupDeleteCard.close();
              }, 800);
            })
        })
      }
    }

  );
  return newElement.generateCard();
};

const baseCards = new Section({ // вставка карточек на страницу

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

const openEditProfilePopup = () => { // открытие попапа редактирования профиля

  const {
    name,
    about
  } = userInfo.getUserInfo();
  profileName.value = name;
  profileAbout.value = about;
  popupEditProfile.open();

};

const handleFormSubmitEditProfile = (event, valuesForm) => {
  event.preventDefault();
  changeStatusButtonSubmit(profileEditSubmitButton, 'Сохраняю...', false)
  const {
    name,
    about
  } = valuesForm;

  api.patchUserInfo(name, about)
    .then((data) => {
      if (!data) {
        return Promise.reject(`Ошибка получения данных`);
      } else {
        userInfo.setUserInfo(data.name, data.about);
        changeStatusButtonSubmit(profileEditSubmitButton, 'Сохранено', false)
      }
    })

    .catch((err) => {
      changeStatusButtonSubmit(profileEditSubmitButton, 'Ошибка', false)
      console.log(err);
    })

    .finally(() => {
      setTimeout(() => {
        changeStatusButtonSubmit(profileEditSubmitButton, 'Сохранить')
        popupEditProfile.close();
      }, 800);
    });
};

const popupEditProfile = new PopupWithForm( // попап редактирования профиля
  selectorEditProfile,
  handleFormSubmitEditProfile
);

const handleFormSubmitAddCard = (event, valuesForm) => {
  event.preventDefault();
  changeStatusButtonSubmit(cardSubmitButton, 'Cоздаю...', false)
  const {
    place,
    url
  } = valuesForm;

  api.addCard(place, url)
    .then((data) => {
      if (!data) {
        return Promise.reject(`Ошибка получения данных`);
      } else {
        const cardElement = createdCard({
          ...data,
          likes: []
        });
        baseCards.addItem(cardElement);
        changeStatusButtonSubmit(cardSubmitButton, 'Создано', false)
      }
    })

    .catch((err) => {
      changeStatusButtonSubmit(cardSubmitButton, 'Ошибка', false)
      console.log(err);
    })

    .finally(() => {
      setTimeout(() => {
        changeStatusButtonSubmit(cardSubmitButton, 'Cоздать')
        popupAddCard.close();
        validationFormAddCard.setButtonDisable() // отключение кнопки
      }, 800);
    });
};

const popupAddCard = new PopupWithForm( // попап добавления карточки
  selectorAddCard,
  handleFormSubmitAddCard
);

const popupDeleteCard = new PopupWithDelete( // попап удаления карточки
  selectorDeleteCard,
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

    baseCards.renderItems(cardsData.reverse())
  })


profileOpenButton.addEventListener('click', openEditProfilePopup); // слушатель редактирования профиля

cardAddButton.addEventListener('click', function () { // слушатель добавления карточки
  popupAddCard.open();
});
