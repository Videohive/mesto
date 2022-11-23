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

initialCards.forEach(function (card) { // добавление карточек
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

  cardElement.querySelector('.element__image').src = card.link;
  cardElement.querySelector('.element__image').alt = card.name;
  cardElement.querySelector('.element__title').textContent = card.name;
  cardElements.append(cardElement);
});

let content = document.querySelector('.profile');
let editProfileButton = document.querySelector('.profile__edit'); // кнопка редактирования профиля
let addCardButton = document.querySelector('.profile__add'); // кнопка добавления карточки

let profileName = content.querySelector('.profile__name');
let profileAbout = content.querySelector('.profile__about');

let editProfile = document.querySelector('#edit-profile-popup'); // popup редактирования профиля
let editProfileForm = editProfile.querySelector('.popup__form'); // popup form редактирования профиля
let editProfileName = document.getElementById('name-input'); // popup input имени
let editProfileAbout = document.getElementById('about-input'); // popup input о себе
let editProfileSaveButton = document.querySelector('#save-profile'); // кнопка сохранения настроек профиля

let addCard = document.querySelector('#add-card-popup'); // popup добавления карточки
let addCardForm = addCard.querySelector('.popup__form'); // popup form редактирования профиля
let addCardPlace = document.getElementById('place-input'); // popup input имени
let addCardPlaceUrl = document.getElementById('place-url-input'); // popup input о себе
let addCardSaveButton = document.querySelector('#save-card'); // кнопка сохранения настроек профиля

let closePopupButton = document.querySelectorAll('.popup__close-button');

for (var i = 0; i < closePopupButton.length; i++) {

  closePopupButton[i].addEventListener('click', function () {

    closePopup();

  });
};

function closePopup() {
  editProfile.classList.remove('popup_opened');
  addCard.classList.remove('popup_opened');
}

function openEditProfilePopup() {
  editProfile.classList.add('popup_opened');
  editProfileName.value = profileName.textContent;
  editProfileAbout.value = profileAbout.textContent;
}

function saveProfile(evt) {
  evt.preventDefault();
  profileName.textContent = editProfileName.value; // Вставьте новые значения с помощью textContent
  profileAbout.textContent = editProfileAbout.value;
  closePopup();
};

function openAddCardPopup() {
  addCard.classList.add('popup_opened');
  addCardPlace.value = addCardPlace.textContent;
  addCardPlaceUrl.value = addCardPlaceUrl.textContent;
}

function saveCard(evt) {
  evt.preventDefault();
  closePopup();
};

editProfileButton.addEventListener('click', openEditProfilePopup);
editProfileForm.addEventListener('submit', saveProfile);

addCardButton.addEventListener('click', openAddCardPopup);
addCardForm.addEventListener('submit', saveCard);
