const profileForm = document.forms.edit_profile;
export const profileName = profileForm.elements.name
export const profileAbout = profileForm.elements.about

export const profileOpenButton = document.querySelector('.profile__edit'); // кнопка редактирования профиля
export const profileEditSubmitButton = profileForm.elements.save_profile;

export const cardAddButton = document.querySelector('.profile__add'); // кнопка добавления карточки
export const cardSubmitButton = document.forms.add_card.elements.save_card;
export const cardDeleteButton = document.forms.delete_card.elements.remove_card;

export const cardsSelector = '.elements' // селектор секции добавления карточек

export const selectorEditProfile = '.popup-profile'; // селектор попапа редактирования профиля
export const selectorProfileName = '.profile__name'; // селектор имени профиля
export const selectorProfileAbout = '.profile__about'; // селектор подписи профиля

export const selectorPopupImage = '.popup-image'; // селектор просмотра картинки
export const selectorDeleteCard = '.popup__card-delete'; // селектор удаления карточки

export const selectorAddCard = '.popup-card';
export const templateSelector = '.template-card';

export const selectorsCollection = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

