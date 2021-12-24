export { popups, popupEditProfile, popupEditBtn, popupEditFormElement,
  nameInput, jobInput, profileTitle, profileSubtitle,
  cardsContainer, newCardPopup, popupCardOpenBtn,
  popupAddFormElement, cardDescription, cardLink, validationConfig,
  fullSizePhoto, photoName, imagePopup };

//Находим попапы
const popups = document.querySelectorAll('.popup');

//Находим попап редактирования, кнопку редактирования и закрытия
const popupEditProfile = document.querySelector('.popup_type_edit')
const popupEditBtn = document.querySelector('.profile__edit-button');

// Находим форму в DOM
const popupEditFormElement = popupEditProfile.querySelector('.popup__form');

// Находим поля формы в DOM
const nameInput = popupEditFormElement.querySelector('.popup__input_profile_name');
const jobInput = popupEditFormElement.querySelector('.popup__input_profile_job');

// Находим title и subtitle в DOM (сюда вставляются значения из формы редактирования)
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const cardsContainer = '.elements'; //находим контейнер для карточек

//добавление новых карточек
const newCardPopup = document.querySelector('.popup_type_new-card'); //находим попап создания карточки
const popupCardOpenBtn = document.querySelector('.profile__add-button'); //находим кнопку открытия формы для добавления карточек
const popupAddFormElement = newCardPopup.querySelector('.popup__form');

//находим value для описания и ссылки на картинку
const cardDescription = document.querySelector('.popup__input_element_description');
const cardLink = document.querySelector('.popup__input_element_link');

//Для попапа открытия изображения
const fullSizePhoto = document.querySelector('.popup__picture');
const photoName = document.querySelector('.popup__name');
const imagePopup = '.popup_type_image';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
