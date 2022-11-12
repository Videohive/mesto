let content = document.querySelector('.profile');
let editProfileButton = document.querySelector('.profile__edit'); // кнопка редактирования профиля

let profileName = content.querySelector('.profile__name');
let profileAbout = content.querySelector('.profile__about');

let popup = document.querySelector('#popup');

let popupForm = document.querySelector('.popup__form'); // popup редактирования профиля
let popupName = document.getElementById('name-input'); // popup input имени
let popupAbout = document.getElementById('about-input'); // popup input о себе

let editProfileSaveButton = document.querySelector('.popup__save-button'); // кнопка сохранения настроек профиля

let closeEditProfile = document.querySelector('.popup__close-button'); // кнопка сохранения настроек профиля

function openPopup(){
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupAbout.value = profileAbout.textContent;
};

function closePopup(){
	popup.classList.remove('popup_opened');
}

function saveProfile(evt){
  evt.preventDefault();
  profileName.textContent = popupName.value;   // Вставьте новые значения с помощью textContent
  profileAbout.textContent = popupAbout.value;
  closePopup();
};

editProfileButton.addEventListener('click', openPopup);

popupForm.addEventListener('submit', saveProfile);

closeEditProfile.addEventListener('click', closePopup);
