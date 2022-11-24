const initialCards = [{
    name: 'Москва',
    link: 'https://images.unsplash.com/photo-1512495039889-52a3b799c9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
  },
  {
    name: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1642668309706-7c95083de09e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80'
  },
  {
    name: 'Казань',
    link: 'https://images.unsplash.com/photo-1549563804-6cda56dfa74f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1792&q=80'
  },
  {
    name: 'Нижний Новгород<',
    link: 'https://images.unsplash.com/photo-1648500852430-99c2dddc77e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
  },
  {
    name: 'Екатеринбург',
    link: 'https://images.unsplash.com/photo-1662706287139-db5866364959?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80'
  },
  {
    name: 'Самара',
    link: 'https://images.unsplash.com/photo-1606249385312-bcb7cf44cc72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  }
];

const cardTemplate = document.querySelector('#template-card').content; // шаблон карточки
const cardElements = document.querySelector('.elements');

const content = document.querySelector('.profile');
const editProfileButton = document.querySelector('.profile__edit'); // кнопка редактирования профиля
const addCardButton = document.querySelector('.profile__add'); // кнопка добавления карточки

const profileName = content.querySelector('.profile__name');
const profileAbout = content.querySelector('.profile__about');

const editProfile = document.querySelector('#edit-profile-popup'); // popup редактирования профиля
const editProfileForm = editProfile.querySelector('.popup__form'); // popup form редактирования профиля
const editProfileName = document.getElementById('name-input'); // popup input имени
const editProfileAbout = document.getElementById('about-input'); // popup input о себе
const editProfileSaveButton = document.querySelector('#save-profile'); // кнопка сохранения настроек профиля

const addCard = document.querySelector('#add-card-popup'); // popup добавления карточки
const addCardForm = addCard.querySelector('.popup__form'); // popup form редактирования профиля
const addCardPlace = document.getElementById('place-input'); // popup input имени
const addCardPlaceUrl = document.getElementById('place-url-input'); // popup input о себе
const addCardSaveButton = document.querySelector('#save-card'); // кнопка сохранения настроек профиля

const imagePopup = document.querySelector('#image-popup');
const popupImage = imagePopup.querySelector('.popup__image');
const popupImageCaption = imagePopup.querySelector('.popup__image-caption');

function createdCard(card) { // создание карточки
  let cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__image').src = card.link;
  cardElement.querySelector('.element__image').alt = card.name;
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

  cardElements.prepend(cardElement);
}

function fillImagePopup(element) {
  popupImage.src = element.src;
  popupImageCaption.alt = element.alt;
  popupImageCaption.textContent = element.alt;
}

// Кнопка закрытия popup

const closePopupButton = document.querySelectorAll('.popup__close-button');

closePopupButton.forEach(function (item) {

  item.addEventListener('click', function (evt) {

    closePopup(evt.target.parentNode.parentNode);

  });
});

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openEditProfilePopup() {
  openPopup(editProfile)
  editProfileName.value = profileName.textContent;
  editProfileAbout.value = profileAbout.textContent;
}

function saveProfile(evt) {
  evt.preventDefault();

  if (editProfileName.value.length === 0) {
    alert('Введите имя');
  } else {
    profileName.textContent = editProfileName.value; // Вставьте новые значения с помощью textContent
    profileAbout.textContent = editProfileAbout.value;
    closePopup(editProfile);
  }
};

function openAddCardPopup() {
  openPopup(addCard)
  addCardPlace.value = '';
  addCardPlaceUrl.value = '';
}

function saveCard(evt) {
  evt.preventDefault();

  if (addCardPlace.value.length === 0) {
    alert('Введите название места');
  } else if (addCardPlaceUrl.value.length === 0) {
    alert('Введите ссылку на картинку');
  } else {

    const cardTitle = addCardPlace.value;
    const cardLink = addCardPlaceUrl.value;

    createdCard({
      name: `${cardTitle}`,
      link: `${cardLink}`
    });
    closePopup(addCard);
  }
};

initialCards.reverse().forEach(function (card) { // добавление стартовых карточек
  createdCard(card)
});

editProfileButton.addEventListener('click', openEditProfilePopup);
editProfileForm.addEventListener('submit', saveProfile);

addCardButton.addEventListener('click', openAddCardPopup);
addCardForm.addEventListener('submit', saveCard);
