export { popupEditBtn, popupEditFormElement,
  nameInput, jobInput, profileTitle, profileSubtitle,
  cardsContainer, popupCardOpenBtn, popupAddFormElement,
  validationConfig, profileAvatar,
  profileAvatarContainer, popupEditAvatarElement, avatarInput,
  elementTemplate, popupConfig };


//Находим попап редактирования, кнопку редактирования и закрытия
const popupEditProfile = document.querySelector('.popup_type_edit')
const popupEditBtn = document.querySelector('.profile__edit-button');

// Находим форму в DOM
const popupEditFormElement = popupEditProfile.querySelector('.popup__form');

// Находим поля формы в DOM
const nameInput = popupEditFormElement.querySelector('.popup__input_profile_name');
const jobInput = popupEditFormElement.querySelector('.popup__input_profile_job');

// Находим avatar, title и subtitle в DOM (сюда вставляются значения из формы редактирования)
const profileAvatar = document.querySelector('.profile__avatar');
const profileAvatarContainer = document.querySelector('.profile__avatar-container');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const cardsContainer = '.elements'; //находим контейнер для карточек

//добавление новых карточек
const newCardPopup = document.querySelector('.popup_type_new-card'); //находим попап создания карточки
const popupCardOpenBtn = document.querySelector('.profile__add-button'); //находим кнопку открытия формы для добавления карточек
const popupAddFormElement = newCardPopup.querySelector('.popup__form');

//редактирование аватара пользователя
const avatarPopup = document.querySelector('.popup_type_avatar');
const popupEditAvatarElement = avatarPopup.querySelector('.popup__form');
const avatarInput = popupEditAvatarElement.querySelector('.popup__input_avatar');

const elementTemplate = '.element__template';

const popupConfig = {
  popupImage: '.popup_type_image',
  popupSubmit: '.popup_type_submit',
  popupEdit: '.popup_type_edit',
  popupNewCard: '.popup_type_new-card',
  popupAvatar: '.popup_type_avatar'
}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
