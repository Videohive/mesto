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
  avatarChangeButton,
  avatarSubmitButton,
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
  selectorEditProfileAvatar,
  selectorProfileAvatar,
  selectorProfileName,
  selectorProfileAbout,
  selectorPopupImage,
  selectorsCollection,
} from '../utils/constants.js';

const validationFormEditProfile = new FormValidator(selectorsCollection, '.popup__form-edit-profile');
const validationFormAddCard = new FormValidator(selectorsCollection, '.popup__form-add-card');
const validationFormChangeAvatar = new FormValidator(selectorsCollection, '.popup__form-avatar');

validationFormEditProfile.enableValidation();
validationFormAddCard.enableValidation();
validationFormChangeAvatar.enableValidation();

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

const handleCardLike = (id, isLiked, that) => {
  api.setLike(id, isLiked)
    .then((array) => {
      if (!array) {
        return Promise.reject(`Ошибка получения данных`);
      } else {
        that.setLikes(array.likes)
      }
    })
    .catch((err) => {
      console.log(err);
    })
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

            .then(() => {
                newElement.remove();
                changeStatusButtonSubmit(cardDeleteButton, 'Удалено', false)
                popupDeleteCard.close();
            })

            .catch((err) => {
              changeStatusButtonSubmit(cardDeleteButton, 'Ошибка', false)
              console.log(err);
            })

            .finally(() => {
                changeStatusButtonSubmit(cardDeleteButton, 'Да', false)
            })
        })
      },
      handleCardLike
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
  changeStatusButtonSubmit(profileEditSubmitButton, 'Сохранение...', false)
  const {
    name,
    about
  } = valuesForm;

  api.patchUserInfo(name, about)
    .then((data) => {
        userInfo.setUserInfo(data.name, data.about);
        changeStatusButtonSubmit(profileEditSubmitButton, 'Сохранено', false)
        popupEditProfile.close();
    })

    .catch((err) => {
      changeStatusButtonSubmit(profileEditSubmitButton, 'Ошибка', false)
      console.log(err);
    })

    .finally(() => {
        changeStatusButtonSubmit(profileEditSubmitButton, 'Сохранить')
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
        const cardElement = createdCard({
          ...data,
          likes: []
        });
        baseCards.addItem(cardElement);
        changeStatusButtonSubmit(cardSubmitButton, 'Создано', false)
        popupAddCard.close();
    })

    .catch((err) => {
      changeStatusButtonSubmit(cardSubmitButton, 'Ошибка', false)
      console.log(err);
    })

    .finally(() => {
        changeStatusButtonSubmit(cardSubmitButton, 'Cоздать')
        validationFormAddCard.setButtonDisable() // отключение кнопки
    });
};

const popupAddCard = new PopupWithForm( // попап добавления карточки
  selectorAddCard,
  handleFormSubmitAddCard
);

const popupDeleteCard = new PopupWithDelete( // попап удаления карточки
  selectorDeleteCard
);

const handleFormSubmitChangeAvatar = (event, valueForm) => {
  event.preventDefault();
  changeStatusButtonSubmit(avatarSubmitButton, 'Cохранение...', false)

  api.changeAvatar(valueForm.avatar)
    .then((data) => {
        userInfo.setAvatar(data.avatar);
        changeStatusButtonSubmit(avatarSubmitButton, 'Сохранено', false)
        popupChangeAvatar.close();
    })

    .catch((err) => {
      changeStatusButtonSubmit(avatarSubmitButton, 'Ошибка', false)
      console.log(err);
    })

    .finally(() => {
        changeStatusButtonSubmit(avatarSubmitButton, 'Сохранить')
    });
}

const popupChangeAvatar = new PopupWithForm(
  selectorEditProfileAvatar,
  handleFormSubmitChangeAvatar
);

const userInfo = new UserInfo({
  selectorProfileName,
  selectorProfileAbout,
  selectorProfileAvatar
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
    userInfo.setAvatar(userData.avatar);

    baseCards.renderItems(cardsData.reverse())
  })

  .catch((error) => {
    console.error(error);
  })

profileOpenButton.addEventListener('click', openEditProfilePopup); // слушатель редактирования профиля

cardAddButton.addEventListener('click', function () { // слушатель добавления карточки
  popupAddCard.open();
});

avatarChangeButton.addEventListener("click", function () { // слушатель замены аватара
  popupChangeAvatar.open();
});
