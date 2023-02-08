export const initialCards = [{
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

const profileForm = document.forms.edit_profile;
export const profileName = profileForm.elements.name
export const profileAbout = profileForm.elements.about

export const profileOpenButton = document.querySelector('.profile__edit'); // кнопка редактирования профиля
export const cardAddButton = document.querySelector('.profile__add'); // кнопка добавления карточки

export const cardsSelector = '.elements' // селектор секции добавления карточек

export const selectorEditProfile = '.popup-profile'; // селектор попапа редактирования профиля
export const selectorProfileName = '.profile__name'; // селектор имени профиля
export const selectorProfileAbout = '.profile__about'; // селектор подписи профиля

export const selectorPopupImage = '.popup-image'; // селектор просмотра картинки

export const selectorAddCard = ".popup-card";
export const templateSelector = ".template-card";

export const selectorsCollection = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

